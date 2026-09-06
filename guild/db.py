import sqlite3

def get_conn():
    return sqlite3.connect('rg.db')

def get_users():
    conn = get_conn()

    users = conn.execute('''
        SELECT * FROM users
        ORDER BY total_points DESC  
    ''').fetchall()

    conn.close()
    return users

# users table
get_conn().execute('''
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username VARCHAR(255) NOT NULL,
        password TEXT NOT NULL,
        section VARCHAR(255) NOT NULL,
        rank VARCHAR(255) NOT NULL,
        total_points INT NOT NULL,
        bounties_completed INT NOT NULL,
        bounties_requested INT NOT NULL,
        CONSTRAINT unique_rider UNIQUE (username, section)
    )
''')

# dummy user
try:
    get_conn().execute('''
        INSERT INTO users VALUES (
        1, 'nana', 'nanapass', 'heart', 'nana', 0, 0, 0
        )
    ''')
    get_conn().commit()
except:
    get_conn().rollback()

get_conn().close()