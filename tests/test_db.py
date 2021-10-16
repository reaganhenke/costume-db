#!/usr/bin/env python3
import sqlite3
import sys
sys.path.insert(0, '/home/stephen/projects/costume-db')
from server.app import search, get_groups_with_tag
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

    cursor.execute("CREATE TABLE groups (name TEXT, group_size INTEGER, description TEXT, image_url TEXT)")
    cursor.execute("INSERT INTO groups VALUES ('Salt and Pepper', 2, 'An all-time classic', 'https://i5.walmartimages.com/asr/5dd3ac4f-c6f5-4fd3-bed7-ce1a0199e913_1.997790a424bc609bbcc6dc883e5d3474.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF')")
    cursor.execute("INSERT INTO groups VALUES ('Monica and Chandler', 2, 'Friends first, lovers later, Monica and Chandler make a perfect pair.', 'https://i.imgur.com/q1F6tzO.png')")

    # Group is a keyword in sqlite3, use group_name instead
    cursor.execute("CREATE TABLE individuals_groups (individual TEXT, group_name TEXT)")
    cursor.execute("INSERT INTO individuals_groups VALUES ('Salt', 'Salt and Pepper')")
    cursor.execute("INSERT INTO individuals_groups VALUES ('Pepper', 'Salt and Pepper')")
    cursor.execute("INSERT INTO individuals_groups VALUES ('Monica Geller', 'Monica and Chandler')")
    cursor.execute("INSERT INTO individuals_groups VALUES ('Chandler Bing', 'Monica and Chandler')")

    cursor.execute("CREATE TABLE group_tags (group_name TEXT, tag TEXT)")
    cursor.execute("INSERT INTO group_tags VALUES ('Salt and Pepper', 'Classic')")
    cursor.execute("INSERT INTO group_tags VALUES ('Monica and Chandler', 'Television')")


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
    query = [
        { "name": "person1", "gender": "male", "hair_color": "brown" },
        { "name": "person2", "gender": "female", "hair_color": "brown" }
    ]    
    assert len(search(query)) == 1

def test_tags():
    build_test_db()
    query = {
        "tag": 'Television'    
    }
    assert len(get_groups_with_tag(query)) == 1