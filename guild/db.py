import sqlite3

# database connection
def get_conn():
    return sqlite3.connect('rg.db')

conn = get_conn()

# users table
conn.execute('''
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

conn.commit()
conn.close()

# create user
def create_user(username, password, section, rank):
    global conn
    try:
        conn.execute('''
            INSERT INTO users (
                username, password, section, 
                rank, total_points, 
                bounties_completed, bounties_requested
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
        ''', (
            username, password, section, rank, 0, 0, 0
        ))

        conn.commit()
        return True
    except:
        return False
    finally:
        conn.close()

# get all users
def get_users():
    global conn

    users = conn.execute('''
        SELECT * FROM users
        ORDER BY total_points DESC  
    ''').fetchall()

    conn.close()
    return users

# get specific user
def get_user(username, section):
    global conn

    users = conn.execute('''
        SELECT * FROM users
        WHERE username = ? AND section = ?
    ''', (username, section)).fetchone()

    conn.close()
    return user

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