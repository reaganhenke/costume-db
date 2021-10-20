#!/usr/bin/env python3
import sqlite3
import sys
sys.path.insert(0, '/home/stephen/projects/costume-db')
from server.app import search, get_groups_with_tag, search_by_text
import requests
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

    cursor.execute("CREATE TABLE groups (name TEXT, group_size INTEGER, description TEXT, image_url TEXT, origin TEXT, fandom_url TEXT)")
    cursor.execute("INSERT INTO groups VALUES ('Salt and Pepper', 2, 'An all-time classic', 'https://i5.walmartimages.com/asr/5dd3ac4f-c6f5-4fd3-bed7-ce1a0199e913_1.997790a424bc609bbcc6dc883e5d3474.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF', 'Blue''s Clues', 'https://bluesclues.fandom.com/wiki/The_Spice_Family')")
    cursor.execute("INSERT INTO groups VALUES ('Monica and Chandler', 2, 'Friends first, lovers later, Monica and Chandler make a perfect pair.', 'https://i.imgur.com/q1F6tzO.png', 'Friends', 'https://friends.fandom.com/wiki/Monica_and_Chandler')")

    # Group is a keyword in sqlite3, use group_name instead
    cursor.execute("CREATE TABLE individuals_groups (individual TEXT, group_name TEXT)")
    cursor.execute("INSERT INTO individuals_groups VALUES ('Salt', 'Salt and Pepper')")
    cursor.execute("INSERT INTO individuals_groups VALUES ('Pepper', 'Salt and Pepper')")
    cursor.execute("INSERT INTO individuals_groups VALUES ('Monica Geller', 'Monica and Chandler')")
    cursor.execute("INSERT INTO individuals_groups VALUES ('Chandler Bing', 'Monica and Chandler')")

    cursor.execute("CREATE TABLE group_tags (group_name TEXT, tag TEXT)")
    cursor.execute("INSERT INTO group_tags VALUES ('Salt and Pepper', 'classic')")
    cursor.execute("INSERT INTO group_tags VALUES ('Monica and Chandler', 'television')")

    cursor.execute("CREATE VIRTUAL TABLE search_titles USING fts5(name)")
    cursor.execute("INSERT INTO search_titles VALUES ('Salt and Pepper')")
    cursor.execute("INSERT INTO search_titles VALUES ('Monica and Chandler')")


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


def test_search():
    build_test_db()
    # Query: two people, male/female, brown/brown
    query = {
        "query": [
            { "name": "person1", "gender": "male", "hair_color": "brown" },
            { "name": "person2", "gender": "female", "hair_color": "brown" }
        ]
    }
    res = requests.post("http://localhost:5000/groupsearch", json=query)
    assert res.status_code == 200
    assert len(res.json()) == 1
    assert res.json()[0]["name"] == "Monica and Chandler"

def test_tags():
    build_test_db()
    tag = 'Television'
    res = requests.get(f"http://localhost:5000/tag/{tag}")
    assert res.status_code == 200
    assert len(res.json()) == 1
    assert res.json()[0]["name"] == "Monica and Chandler"


def test_tagsearch():
    build_test_db()
    query = {
        "query": "salt"
    }
    res = requests.post("http://localhost:5000/textsearch", json=query)
    assert res.status_code == 200
    assert len(res.json()) == 1
    assert res.json()[0]["name"] == "Salt and Pepper"