from werkzeuf.security import generate_password_hash
from flask import Flask, render_template
from db import get_users

app = Flask(__name__)

@app.route('/leaderboard')
def leaderboard():
    users = get_users()
    return render_template('leaderboard.html', users=users)