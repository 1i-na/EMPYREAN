from werkzeug.security import generate_password_hash, check_password_hash
from flask import Flask, render_template, request, redirect, url_for, session
from db import get_users, get_user, create_user

app = Flask(__name__)
app.secret_key = 'nanaisthecoolest333'

# home page
@app.route('/')
def home():
    # rediret user to login page if they aren't already signed in
    if 'user_id' in session:
        return redirect(url_for('leaderboard'))
    return redirect(url_for('login'))

# user sign up
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        username = request.form['username'].strip()
        password = request.form['password']
        section = request.form['section'].strip()

        # all fields must be filled
        if not username or not password or not section:
            return render_template('signup.html', 
                error="Please fill in all the fields.")

        # hash passwords before saving to db
        hashed_pass = generate_password_hash(password)

        # create user account
        if create_user(username, hashed_pass, section):
            return redirect(url_for('login'))
        else:
            return render_template('signup.html', 
                error="Username already exists in this section.")
    return render_template('signup.html')

# user login
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username'].strip()
        password = request.form['password']
        section = request.form['section'].strip()

        user = get_user(username, section)

        if user is None:
            return render_template('login.html', 
                error="User not found. Please check your username, password, and section.")

        stored_password = user[2]

        # compare password hash with password
        if not check_password_hash(stored_password, password):
            return render_template('login.html', 
                error="Incorrect password. Please try again.")

        # save user in session if login successful
        session['user_id'] = user[0]
        session['username'] = user[1]
        session['section'] = user[3]

        return redirect(url_for('leaderboard'))
    return render_template('login.html')

# logout
@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('login'))

# leaderboard
@app.route('/leaderboard')
def leaderboard():
    # only logged in users can view the leaderboard
    if 'user_id' not in session:
        return redirect(url_for('login'))
    users = get_users()
    return render_template('leaderboard.html', users=users)