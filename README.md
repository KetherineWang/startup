# startup
Startup Application for BYU CS 260

## Specification Deliverable

### Elevator Pitch


### Key Features
1. Secure account creation and login.
2. Gameplay interface where users guess the song name based on the displayed lyrics.
3. Display of lyric sentences from a database of Keshi's songs.
4. Input field for users to enter their guess of the song name.
5. Like button for user to react to a lyric sentence.
6. Score calculation based on correct answers.
7. Display of the correct song name and the corresponding YouTube link upon a correct guess.
8. Real-time notifications of game start and end, including the user's score, and when a lyric sentence is liked.
9. Persistent storage of highest scores.
10. Game ends upon the first incorrect guess.

### Technologies
- **HTML**
  - Structure for the game's main pages, login/sign-up forms, and gameplay interface.
  - Organizational elements for displaying the lyric sentences, correct song name, and corresponding YouTube link, input field for the user's guess, like button for the user to react, and showing the user's score and player ranking.
- **CSS**
  - Styling for the application, ensuring a visually appealing interface.
  - Responsive design for various screen sizes, and animation effects for transitions and notifications.
- **JavaScript**
  - Managing interactivity: processing guesses, updating scores, clicking like button, handling game logic.
  - Dynamic display of lyrics and corresponding results (song names and YouTube links).
  - Interaction with backend services for data retrieval, score submission, and like count update.
- **Web Service**
  - Backend services for user authentication (account creation and login).
  - Retrieving random lyrics and correct song names and corresponding YouTube links from the database.
  - Managing and storing user scores and like count.
- **Authentication**
  - Secure user registration and login system.
  - Ensuring that game scores and history are tied to individual user accounts.
- **Database Persistence**
  - Storing user data, including account information and game scores.
  - Maintaining a database of lyric sentences, correct song names, and corresponding YouTube links for the game.
- **WebSocket**
  - Real-time updates to all users about liked lyric sentences, game starts and ends, including user names and scores.
  - Enhancing user engagement with live notifications and game-related announcements.
- **Web Framework (React)**
  - Building the application using React for a more structured and maintainable codebase.
  - Efficiently updating and rendering components based on user interactions and real-time data.

### Design
![Login Page Design](Login Page Design.png)