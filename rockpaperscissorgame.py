import random
options=("rock","paper","scissor")
running=True
while running:
    player=None
    computer=random.choice(options)
    while player not in options:
        player=input("enter rock, paper, or scissor:")
        print(f"player chose {player}")
        print(f"computer chose {computer}")
        if player==computer:
            print("it is a tie!")
        elif player=="rock" and computer=="paper":
            print("you win!")
        elif player=="scissor" and computer=="paper":
            print("you win!")
        elif player=="paper" and computer=="rock":
            print("you win!")
        else:
            print("you lose!")
    play_again=input("do you want to play again?(y/n):").lower()
    if not play_again=="y":
        running =False
print("Thank you for playing")

