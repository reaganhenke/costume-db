#!/usr/bin/env python3
import sqlite3
import sys
sys.path.insert(0, '/home/stephen/projects/costume-db')
from server.app import search
import os
from server.individual import Individual



def build_test_db():
    try:
        os.remove("tests/test-costumes.db")
    except:
        pass

    connection = sqlite3.connect("tests/test-costumes.db")
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE individuals (name TEXT, gender TEXT, hair_color TEXT)")
    cursor.execute("INSERT INTO individuals VALUES ('Salt', 'NONE', 'NONE')")
    cursor.execute("INSERT INTO individuals VALUES ('Pepper', 'NONE', 'NONE')")
    cursor.execute("INSERT INTO individuals VALUES ('Chandler Bing', 'MALE', 'BROWN')")
    cursor.execute("INSERT INTO individuals VALUES ('Monica Geller', 'FEMALE', 'BROWN')")

    cursor.execute("CREATE TABLE groups (name TEXT, group_size INTEGER)")
    cursor.execute("INSERT INTO groups VALUES ('Salt and Pepper', 2)")
    cursor.execute("INSERT INTO groups VALUES ('Monica and Chandler', 2)")

    # Group is a keyword in sqlite3, use group_name instead
    cursor.execute("CREATE TABLE individuals_groups (individual TEXT, group_name TEXT)")
    cursor.execute("INSERT INTO individuals_groups VALUES ('Salt', 'Salt and Pepper')")
    cursor.execute("INSERT INTO individuals_groups VALUES ('Pepper', 'Salt and Pepper')")
    cursor.execute("INSERT INTO individuals_groups VALUES ('Monica Geller', 'Monica and Chandler')")
    cursor.execute("INSERT INTO individuals_groups VALUES ('Chandler Bing', 'Monica and Chandler')")


    connection.commit()
    connection.close()

def test_number_of_entries():
    build_test_db()
    connection = sqlite3.connect("tests/test-costumes.db")
    cursor = connection.cursor()
    # A quick way to get the number of rows in a table
    costume_count = cursor.execute("SELECT COUNT(*) FROM individuals").fetchone()[0]
    connection.close()

    assert costume_count == 4


def test_app():
    build_test_db()
    # Query: two people, male/female, brown/brown
    query = {
        'number_of_people': 2,
        'people': [
            Individual('p1', 'MALE', 'BROWN'),
            Individual('p2', 'FEMALE', 'BROWN')
        ]
    }
    
    assert len(search(query)) == 1