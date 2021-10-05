#!/usr/bin/env python3
import sqlite3
import sys
sys.path.insert(0, '/home/stephen/projects/costume-db')
from server.app import search
import os


def build_test_db():
    try:
        os.remove("tests/test-costumes.db")
    except:
        pass

    connection = sqlite3.connect("tests/test-costumes.db")
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE costumes (name TEXT, group_name TEXT, member_count INTEGER, gender TEXT, hair_color TEXT)")
    cursor.execute("INSERT INTO costumes VALUES ('Salt', 'Salt and Pepper', 2, 'NONE', 'NONE')")
    cursor.execute("INSERT INTO costumes VALUES ('Pepper', 'Salt and Pepper', 2, 'NONE', 'NONE')")
    cursor.execute("INSERT INTO costumes VALUES ('Chandler Bing', 'Chandler & Monica', 2, 'MALE', 'BROWN')")
    cursor.execute("INSERT INTO costumes VALUES ('Monica Geller', 'Chandler & Monica', 2, 'FEMALE', 'BROWN')")

    connection.commit()
    connection.close()

def test_number_of_entries():
    # A quick way to get the number of rows in a table
    build_test_db()
    connection = sqlite3.connect("tests/test-costumes.db")
    cursor = connection.cursor()
    costume_count = cursor.execute("SELECT COUNT(*) FROM costumes").fetchone()[0]
    connection.close()

    assert costume_count == 4


def test_app():
    build_test_db()
    # Query: two people, male/female, brown/brown
    query = {
        'number_of_people': 2,
        'people': [
            ('MALE', 'BROWN'),
            ('FEMALE', 'BROWN')
        ]
    }
    
    assert len(search(query)) == 1