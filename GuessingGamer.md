flowchart TD
    Start([Start]) --> Initial[/"Generate Random Number (1-100)"/]
    Initial --> AskUser[/Prompt user to guess the number/]
    AskUser --> InputCheck{Is input a number?}
    InputCheck -- No --> IncorrectInput["Display error: Invalid input"]
    IncorrectInput --> AskUser
    InputCheck -- Yes --> RangeCheck{Is input between 1 and 100?}
    RangeCheck -- No --> OutOfBounds["Display error: Out of range"]
    OutOfBounds --> AskUser
    RangeCheck -- Yes --> CompareGuess{Is guess equal to random number?}
    CompareGuess -- Yes --> Correct["Display: Correct guess!"]
    Correct --> End([End])
    CompareGuess -- No --> HighLowCheck{Is guess > random number?}
    HighLowCheck -- Yes --> TooHigh["Display: Too high"]
    HighLowCheck -- No --> TooLow["Display: Too low"]
    TooHigh --> AskUser
    TooLow --> AskUser

1. Start: Beginning point of game
2. Generate Random Number (Initial): Computer generates a random number
3. AskUser: User types in there guess
4. InputCheck: Checks to make sure the input was a number, If it isnt then a error will pop up and the user has to type again
5. RangeCheck: sees if input is truly between 1-100, if not then error will pop up and user has to type again
6. compareguess: Checks to see if the guess is correct, if so a congrats will pop up, if not itll check if its too high or too low
7. Too high/low: tells the user weather the guess is high or low, the user has another chance to input
8. End: game stops after correct guess