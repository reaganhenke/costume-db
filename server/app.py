from flask import Flask
import sqlite3

app = Flask(__name__)

@app.route("/")
def index():
    connection = sqlite3.connect("costumes.db")
    cursor = connection.cursor()
    cursor.execute("CREATE TABLE costumes (name TEXT, member_count INTEGER)")
    cursor.execute("INSERT INTO costumes VALUES ('Salt and Pepper', 2)")
    cursor.execute("INSERT INTO costumes VALUES ('Gritty', 1)")

    # A quick way to get the number of rows in a table
    costume_count = cursor.execute("SELECT COUNT(*) FROM costumes").fetchone()[0]
    return f"Hello World! There are currently {costume_count} costumes in the main database."
