import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('restaurants.db')

# Create a cursor
cursor = conn.cursor()

# Execute an SQL query to select data
cursor.execute('SELECT * FROM restaurants')

# Fetch all the data
data = cursor.fetchall()

# Print the data (replace with your processing logic)
for row in data:
    print(row)

# Close the cursor and connection
cursor.close()
conn.close()
