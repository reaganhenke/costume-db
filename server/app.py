from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import sqlite3
from server.individual import Individual
from server.costume_group import CostumeGroup
import logging

app = Flask(__name__)
CORS(app, support_credentials=True)
db_location = 'tests/test-costumes.db'
logging.basicConfig(level=logging.DEBUG)
#logging.getLogger('flask_cors').level = logging.DEBUG

def person_in_matrix(person, match_matrix):
    """Test whether a person is already in the match_matrix

    Args:
        person (Individual): The person we're looking for
        match_matrix (List[Boolean]): The current list of filled and unfilled slots

    Returns:
        Boolean: Whether the person is already in the matrix or not
    """
    # Checks each slot in member_list and return
    #logging.debug(f"Checking person vs. member_list: {person} | {match_matrix}")
    return not all([not person == match for match in match_matrix])


# Determine if a person from the query is a valid fit for a member of a costume group
# Person must match qualifications for the costume_member and not already be
# in the match_matrix
def possible_match(person, costume_member, match_matrix):
    """Determine if a person is a suitable match for a costume group member

    We test both:
        1. Each of the characteristics of the costume (we want all of these to be True)
        2. Whether the person has already been assigned or not (we want this to be False)

    Args:
        person (Individual): The person seeking a costume
        costume_member (Individual): The costume group member we're looking to fill
        match_matrix (List[Boolean]): The current matrix of roles that have been filled

    Returns:
        Boolean: Whether the person both matches the costume member, and is unassigned
    """
    logging.debug(f"Looking at possible match: {person} | {costume_member} | {match_matrix}")
    logging.debug(f"{person.gender} == {costume_member.gender} -> {person.gender == costume_member.gender}")
    logging.debug(f"{person.hair_color} == {costume_member.hair_color} -> {person.hair_color == costume_member.hair_color}")
    logging.debug(f"Person in match matrix? -> {person_in_matrix(person, match_matrix)}")
    return person.gender == costume_member.gender and \
           person.hair_color == costume_member.hair_color and not \
           person_in_matrix(person, match_matrix)

def is_costume_a_match(costume_group, person_list, match_matrix):
    """Given a list of people and a costume group, determine if the people satisfy the costume's constraints

    This works via a simple backtracking algorithm, similar to one used to solve Sudoku puzzles.
    If there is an unassigned slot, iterate through every person to determine if any of them are suitable
    If we find on that works, fill the slot and move onto the next one
    If no people can fill a slot, mark the previous slot as empty and start there
    We continue until we either fill the matrix (return True)
    or we determine that no person can match a costume group member (False)


    Args:
        costume_group (CostumeGroup): The costume group we're trying to fill
        person_list (List[Individual`]): The people that submitted the form
        match_matrix (List[Boolean]): A matrix tracking which slots have been filled, and by whom

    Returns:
        Boolean: Whether the group of people satisfy the constraints of the costume group
    """

    logging.debug(f"Match matrix: {match_matrix}")
    for idx, match in enumerate(match_matrix):
        logging.debug(f"{idx}, {match}, {match is None}")
        if match is None:
            for person in person_list:
                if possible_match(person, costume_group.members[idx], match_matrix):
                    logging.debug(f"{person} is a possible match!\n")
                    match_matrix[idx] = person
                    is_costume_a_match(costume_group, person_list, match_matrix)
                    if None not in match_matrix:
                        logging.debug(f"Solution found! {match_matrix}")
                        return True
                    match_matrix[idx] = None # backtrack step
                    logging.debug(f"Match matrix after backtrack: {match_matrix}")
                else:
                    logging.debug(f"{person} is not a possible match!\n")
            logging.debug("Done with all people! No solutions found")
            return False

    logging.debug("Solution found! Outside loop")
    

@app.route('/groupsearch', methods=['POST'])
@cross_origin(supports_credentials=True)
def search():
    """Given a query, return all possible costume groups the people in the query satisfy

    We first pull from the costume database all costume groups that both:
        1. Match the group size of the query
        2. Match the tags of the query, if any

    This reduces the number of costumes we match against by a fair amount

    Args:
        query (SearchQuery): The group of people, and their characteristics, for whom we're looking for costumes
    """
    json_data = request.get_json(force=True)
    person_list = create_person_list_from_query(json_data["query"])
    logging.debug("Time to search!")
    connection = sqlite3.connect(db_location)
    cursor = connection.cursor()

    # Use individual count to grab all items in main db that match value
    cursor.execute("SELECT * FROM groups WHERE group_size=?", (len(person_list),))
    costume_groups = cursor.fetchall()

    # Create groupings
    costume_groups_with_members = []

    for group in costume_groups:
        new_costume_group = CostumeGroup(*group)

        cursor.execute("SELECT * from individuals_groups WHERE group_name=?", (group[0],))
        members = cursor.fetchall()

        for member in members:
            cursor.execute("SELECT * from individuals WHERE name=?", (member[0],))
            individual = cursor.fetchall()[0]
            new_individual = Individual(*individual)
            new_costume_group.add_member(new_individual)

        costume_groups_with_members.append(new_costume_group)

    logging.debug(f"Our candidates: {costume_groups_with_members}\n")
    connection.close()

    # For each grouping, apply the other data filters from the query - discard groupings that don't match
    matching_costume_groups = []
    for costume_group in costume_groups_with_members:
        match_matrix = [None] * len(costume_group.members)
        logging.debug(f"Attempting: {costume_group.name}")
        if is_costume_a_match(costume_group, person_list, match_matrix):
            matching_costume_groups.append(costume_group)

    response_json = []
    for matching_costume in matching_costume_groups:
        response_json.append(matching_costume.__dict__())
    
    return jsonify(response_json)


def create_person_list_from_query(query):
    person_list = []
    for person in query:
        new_individual = Individual(person["name"], person["gender"].upper(), person["hair_color"].upper())
        person_list.append(new_individual)
    return person_list

@app.route('/theme/<tag>', methods=['GET'])
@cross_origin(support_credentials=True)
def get_groups_with_tag(tag):
    connection = sqlite3.connect(db_location)
    cursor = connection.cursor()

    cursor.execute("SELECT * from group_tags WHERE tag=?", (tag.lower(),))
    costume_groups = cursor.fetchall()

    response_json = get_list_of_group_dicts(costume_groups)
    return jsonify(response_json)

@app.route('/textsearch', methods=['POST'])
@cross_origin(supports_credentials=True)
def search_by_text():
    json_data = request.get_json(force=True)
    search_term = json_data["query"]

    connection = sqlite3.connect(db_location)
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM search_titles WHERE name MATCH ?", (search_term,))
    costume_groups = cursor.fetchall()

    connection.close()

    response_json = get_list_of_group_dicts(costume_groups)
    return jsonify(response_json)


def get_list_of_group_dicts(costume_groups):
    group_list = []
    connection = sqlite3.connect(db_location)
    cursor = connection.cursor()

    for costume in costume_groups:
        cursor.execute("SELECT * from groups WHERE name=?", (costume[0],))
        group = cursor.fetchall()[0]
        # unpack the tuple into function arguments
        new_costume_group = CostumeGroup(*group)
        group_list.append(new_costume_group.__dict__())
    connection.close()
    return group_list