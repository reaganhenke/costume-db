from flask import Flask
import sqlite3
import os
from server.individual import Individual
from server.costume_group import CostumeGroup
import copy

app = Flask(__name__)
db_location = 'tests/test-costumes.db'


@app.route("/")
def index():
    connection = sqlite3.connect("costumes.db")
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE costumes (name TEXT, individual_count INTEGER)")
    cursor.execute("INSERT INTO costumes VALUES ('Salt and Pepper', 2)")
    cursor.execute("INSERT INTO costumes VALUES ('Gritty', 1)")

def is_costume_a_match(costume_group, query):
    # for each person in the query, look at the individuals of the costume group
    # if there's a match, remove that person from the costume group

    member_list = copy.deepcopy(costume_group.members)
    # deep copy to avoid mutating costume_group

    is_good_match = True
    for person_index, person in enumerate(query['people']):
        individual_removed = False
        for individual_index, individual in enumerate(member_list):
            if individual.hair_color_matches(person[1]) and \
               individual.gender_matches(person[0]):
                # remove individual from List
                for member in member_list:
                    if member.name == individual.name:
                        member_list.pop(individual_index)
                        break
                individual_removed = True
                break

        if not individual_removed:
            is_good_match = False
            break # person can't fit in costume group, costume is therefore bad
    return is_good_match


def search(query):
    connection = sqlite3.connect(db_location)
    cursor = connection.cursor()

    # Use individual count to grab all items in main db that match value
    cursor.execute("SELECT * FROM groups WHERE group_size=?", (query['number_of_people'],))
    costume_groups = cursor.fetchall()

    # Create groupings
    costume_groups_with_members = []

    for group in costume_groups:
        costume_group_name = group[0]
        new_costume_group = CostumeGroup(costume_group_name)

        cursor.execute("SELECT * from individuals_groups WHERE group_name=?", (costume_group_name,))
        members = cursor.fetchall()

        for member in members:
            cursor.execute("SELECT * from individuals WHERE name=?", (member[0],))
            individual = cursor.fetchall()[0]
            new_individual = Individual(individual[0], individual[1], individual[2])
            new_costume_group.add_member(new_individual)

        costume_groups_with_members.append(new_costume_group)

   # For each grouping, apply the other data filters from the query - discard groupings that don't match
    matching_costume_groups = []
    for costume_group in costume_groups_with_members:
        if is_costume_a_match(costume_group, query):
            matching_costume_groups.append(costume_group)
    
    return matching_costume_groups

    connection.close()