from flask import Flask
import sqlite3
import pprint
import os

app = Flask(__name__)
db_location = 'tests/test-costumes.db'


@app.route("/")
def index():
    connection = sqlite3.connect("costumes.db")
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE costumes (name TEXT, member_count INTEGER)")
    cursor.execute("INSERT INTO costumes VALUES ('Salt and Pepper', 2)")
    cursor.execute("INSERT INTO costumes VALUES ('Gritty', 1)")


def gender_match(person, member):
    return person[0] == member['gender']


def hair_color_match(person, member):
    return person[1] == member['hair_color']


def is_costume_a_match(members, query):
    # for each person in the query, look at the members of the costume group
    # if there's a match, remove that person from the costume group

    is_good_match = True
    for person_index, person in enumerate(query['people']):
        member_removed = False
        for member_index, member in enumerate(members):
            if gender_match(person, member) and hair_color_match(person, member):
                members.pop(member_index)
                member_removed = True
                break

        if not member_removed:
            is_good_match = False
            break # person can't fit in costume group, costume is therefore bad
    return is_good_match


# How to search:
# 1. Use member_count to grab all items in main db that match that value
# 2. Use a function to create groupings (e.g. 'salt' and 'pepper' get matched into same data structure)
# 3. For each grouping, apply the other data filters from the query - discard groupings that don't match
# 4. Return a list of all matching groups

def search(query):
    # Format of query:
    # {
    #     'number_of_people': INT,
    #     'people': [
    #         ('MALE', 'BROWN')
    #         ('FEMALE', 'BROWN')
    #     ]
    # }
    connection = sqlite3.connect(db_location)
    cursor = connection.cursor()

    # Use member count to grab all items in main db that match value
    cursor.execute("SELECT * FROM costumes WHERE member_count=?", "2")
    costumes = cursor.fetchall()

    # ('Salt', 'Salt and Pepper', 2, 'NONE', 'NONE')
    # ('Pepper', 'Salt and Pepper', 2, 'NONE', 'NONE')

    # Create groupings
    costume_groups = {}
    for costume in costumes:
        if costume[1] not in costume_groups:
            costume_groups[costume[1]] = []
        costume_groups[costume[1]].append({
            'name': costume[0],
            'gender': costume[3],
            'hair_color': costume[4]
        })

    # For each grouping, apply the other data filters from the query - discard groupings that don't match
    matching_costumes = []
    for costume, members in costume_groups.items():
        if is_costume_a_match(members, query):
            matching_costumes.append({costume: members})
    
    return matching_costumes

    connection.close()