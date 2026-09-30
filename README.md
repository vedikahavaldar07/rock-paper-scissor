Rock Paper Scissors Game
Project Overview
Rock Paper Scissors is an interactive web-based game developed using Python and Flask.
The player can play Rock, Paper, or Scissors against the computer. The game includes difficulty levels, multiple rounds, score tracking, game history, and replay options.
Technologies Used
Python
Flask
HTML
CSS
JavaScript
Browser Local Storage
Features
Three difficulty levels: Easy, Medium, and Hard
3, 5, or 7 rounds
Player and computer score tracking
Draw tracking
Round-by-round results
Game history
Replay last game
Start a new game
Responsive design for desktop and mobile
Game Rules
Rock beats Scissors.
Scissors beats Paper.
Paper beats Rock.
If both players choose the same option, the round is a draw.
Difficulty Levels
Easy
The computer chooses its move randomly.
Medium
The computer sometimes chooses randomly and sometimes uses the player's previous move to select a counter.
Hard
The computer uses the player's previous move to select a counter move.
Project Structure
rock-paper-scissors/
│
├── app.py
├── requirements.txt
├── README.md
│
├── templates/
│   └── index.html
│
└── static/
    ├── style.css
    └── script.js
Installation
1. Install Python
Make sure Python is installed on your computer.
2. Install Dependencies
Open the VS Code terminal and run:
pip install -r requirements.txt
3. Run the Application
Run:
python app.py
4. Open the Game
Open your browser and visit:
http://127.0.0.1:5000
How to Play
Select a difficulty level.
Select the number of rounds.
Click Start Game.
Choose Rock, Paper, or Scissors.
The computer selects its move.
The score is updated automatically.
Continue until all selected rounds are completed.
View the final result.
Replay the last game or start a new game.
Game History
The game stores the last 10 game results in the browser's Local Storage.
The history includes:
Date and time
Difficulty
Number of rounds
Player score
Computer score
Draws
Final result
Future Enhancements
Possible future improvements include:
Player names
Sound effects
More animations
Online multiplayer
Login system
Leaderboard
Database-based history
Conclusion
This project demonstrates how Python Flask, HTML, CSS, and JavaScript can be combined to create an interactive web application.
The Rock Paper Scissors game provides multiple difficulty levels, round selection, score tracking, game history, and replay functionality.