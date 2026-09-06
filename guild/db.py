import sqlite3

conn = sqlite3.connect('rg.db')

# users table
conn.execute('''
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY,
        username VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        section VARCHAR(255) NOT NULL,
        rank VARCHAR(255) NOT NULL,
        total_points INT NOT NULL,
        bounties_completed INT NOT NULL,
        bounties_requested INT NOT NULL
    )
''')

# dummy user
try:
    conn.execute('''
        INSERT INTO users VALUES (
        1, 'nana', 'nanapass', 'heart', 'nana', 0, 0, 0
        )
    ''')
    conn.commit()
except:
    conn.rollback()

conn.close()