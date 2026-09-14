# Rock Paper Scissors Game

A simple console-based Rock Paper Scissors game built with Python. The player competes against the computer, which randomly selects rock, paper, or scissor.

## Project Overview

The Rock Paper Scissors Game is a beginner-friendly Python project designed to practice fundamental programming concepts.

The player enters their choice, and the computer randomly selects one of the available options. The program then compares both choices and displays whether the result is a win, loss, or tie.

The player can also choose to play multiple rounds.

## Features

### 1. Player Choice

The player can enter one of the following options:

* Rock
* Paper
* Scissor

### 2. Computer Choice

The computer randomly selects an option using Python's `random` module.

```python
computer = random.choice(options)
```

### 3. Game Result

The program compares the player's choice with the computer's choice and determines the result.

Possible results:

* Tie
* You Win
* You Lose

### 4. Play Again

After each round, the player is asked whether they want to play again.

```text
do you want to play again?(y/n):
```

If the player enters `y`, another round starts. Otherwise, the program ends.

## Technologies Used

* Python 3
* `random` module
* Standard Python libraries
* Console/Terminal

## Project Structure

```text
Rock-Paper-Scissors/
│
├── rockpaperscissorgame.py
└── README.md
```

## Requirements

Make sure Python 3 is installed on your computer.

Check your Python version using:

```bash
python --version
```

or:

```bash
python3 --version
```

## How to Run

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/rock-paper-scissors.git
```

### 2. Open the Project Folder

```bash
cd rock-paper-scissors
```

### 3. Run the Program

```bash
python rockpaperscissorgame.py
```

## How the Game Works

The program first creates the available choices:

```python
options = ("rock", "paper", "scissor")
```

The computer then randomly selects one of these options:

```python
computer = random.choice(options)
```

The player is asked to enter their choice:

```python
player = input("enter rock, paper, or scissor:")
```

The program compares the two choices and determines the winner.

## Winning Conditions

The player wins when:

| Player  | Computer |
| ------- | -------- |
| Rock    | Scissor  |
| Paper   | Rock     |
| Scissor | Paper    |

The player loses when the computer chooses the option that beats the player's choice.

If both choices are the same, the result is a tie.

## Example Output

```text
enter rock, paper, or scissor:rock
player chose rock
computer chose scissor
you win!

do you want to play again?(y/n):y
```

Another example:

```text
enter rock, paper, or scissor:paper
player chose paper
computer chose paper
it is a tie!

do you want to play again?(y/n):n

Thank you for playing
```

## Python Concepts Practiced

| Concept           | Usage                               |
| ----------------- | ----------------------------------- |
| Variables         | Storing player and computer choices |
| Tuples            | Storing available game options      |
| `random.choice()` | Selecting the computer's choice     |
| `while` loop      | Running multiple rounds             |
| `if-elif-else`    | Determining the game result         |
| `input()`         | Getting user input                  |
| `print()`         | Displaying game information         |
| String methods    | Converting input using `.lower()`   |
| Boolean values    | Controlling the game loop           |

## Future Improvements

This project can be improved by adding:

* Input validation for incorrect choices
* Score tracking
* Number of rounds
* Win/loss statistics
* Best-of-three or best-of-five mode
* Improved user interface
* Computer difficulty levels
* Rock Paper Scissors Lizard Spock mode
* Graphical User Interface (GUI)

## Current Limitations

This is a beginner-level educational project.

Currently:

* The game does not maintain a score.
* The player can enter invalid choices.
* The game only supports rock, paper, and scissor.
* There is no graphical interface.
* There is no persistent game history.

## Project Goal

The main goal of this project is to practice Python programming fundamentals by creating a simple interactive game using loops, conditional statements, user input, tuples, and random selection.

## Author

**Rishu Shah**

A beginner Python project created for learning and practicing programming concepts.

## License

This project is created for educational purposes. You are free to use, modify, and improve the code for learning and personal projects.
