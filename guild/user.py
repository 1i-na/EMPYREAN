class User:
    def __init__(self, user_id: int, username: str, password: str, 
                 section: str, rank: str, total_points: int, 
                 bounties_completed: int, bounties_requested: int):
        self.user_id = user_id
        self.username = username
        self.password = password
        self.section = section
        self.rank = rank
        self.total_points = total_points
        self.bounties_completed = bounties_completed
        self.bounties_requested = bounties_requested

    def __str__(self):
        return f"{self.username}#{self.rank}"