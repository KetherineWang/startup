# startup
Startup Application for BYU CS 260

## Specification Deliverable

### Elevator Pitch
Imagine diving into the world where melody meets poetry - this is the essence of this startup application, a unique 
game centered around the enchanting lyrics of Keshi, the celebrated Vietnamese R&B singer-songwriter. Music is an art 
form that weaves together the beauty of tunes and the depth of words, and Keshi's creations are a testament to this 
magic. For those already familiar with his music, the game offers a new lens to appreciate the intricacies of his 
lyrics. And for new listeners, it is an inviting gateway to discover the captivating melodies behind these words. This 
app does not just entertain; it connects users to the art of music in a way that is interactive, engaging, and deeply 
personal. Whether you are a long-time fan or just curious about Keshi's artistry, the game promises to be an immersive 
journey through the lyrical landscapes of his songs.

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
  - Organizational elements for displaying the lyric sentences, correct song name, and corresponding YouTube link, 
  input field for the user's guess, like button for the user to react, and showing the user's score and player ranking.
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
![Login Page Design](/Images/LoginPageDesign.png)
![Signup Page Design](/Images/SignupPageDesign.png)
![Game Entrance Page Design](/Images/GameEntrancePageDesign.png)
![Game Play Page Design](/Images/GamePlayPageDesign.png)
![User Score Page Design](/Images/UserScorePageDesign.png)
![Player Rank Page Design](/Images/PlayerRankPageDesign.png)

## HTML Deliverable
- **HTML Pages**: six HTML pages that represent:
  - the user login or "Home" page (index.html), 
  - the user signup or registration page (singup.html),
  - the game entrance page where selection buttons of "New Game" or "Back to Home" are provided (game.html),
  - the game play interface or "Play" page (play.html),
  - the player score display page displaying the individual player's current score only (score.html),
  - and the top scores or "Rank" page showcasing the top 10 highest scores from all players (rank.html).
- **Page Links**: The page links of index.html (Home), play.html (Play), and rank.html (Rank) are provided in the navigation bar or menu in the header section at the top of each of the three pages.
  - The "Sign up" link on the user login or "Home" page (index.html) redirects to the user signup or registration page (signup.html).
  - The "Register" button on the user signup or registration page (signup.html) redirects back to the user login or "Home" page (index.html).
  - The "Login to Play" button on the user login or "Home" page (index.html) redirects to the game entrance page (game.html).
  - The "New Game" button on the game entrance page (game.html) redirects to the game play interface or "Play" page (play.html).
  - The "Back to Home" button on the game entrance page (game.html) redirects back to the user login or "Home" page (index.html).
  - The "End Game..." button on the game play interface or "Play" page redirects to the player score display page (score.html).
  - The "New Game" button on the player score display page (score.html) redirects back to the game play interface or "Play" page (play.html).
  - The "View Rank" button on the player score display page (score.html) redirects to the top scores or "Rank" page (rank.html).
- **Head, Body, Header, Main, Footer**: The user login or "Home" page (index.html), the game play interface or "Play" page (play.html), and the top scores or "Rank" page (rank.html), each of the three pages has a head section, and a header, main, and footer section enclosed within a body section.
  - Each of the user signup or registration page (signup.html) and the game entrance page (game.html) have a head section, and a main and footer section enclosed within a body section. 
    - The header section which includes a navigation bar or menu of the three main page links (Home, index.html; Play, play.html; Rank, rank.html) is not included on these secondary pages. 
- **Application Textual Content**: The lyric sentences displayed on the game play interface or "Play" page is an example of the application textual content.
- **Application Image**: A "keshi" logo image is included on the user login or "Home" page (index.html) as an application image.
- **Third Party Service Call**: The "Echoes of the Day" section which displays the verses and choruses of a full song is saved as a placeholder for a lyrics retrieving API (lyrics.ovh).
- **Login Placeholder**: A login placeholder is created on the user login or "Home" page (index.html).
  - The displayed user name is shown on the game play interface (play.html) above the real-time notifications.
  - A signup placeholder is also created on the user signup or registration page (signup.html).
- **Database Data**: The application data of the highest scores of all players will be stored in the database, and the top 10 highest scores will be rendered on the top scores or "Rank" page.
- **WebSocket Data**: The real-time notifications are displayed below the displayed user name as a placeholder for WebSocket data on the game play interface (play.html) to communicate when a player starts a game, reacts to lyrics, and scores.

## CSS Deliverable
- **Header, Footer, and Main**:
  - The header which includes the navigation tabs and elements and the footer which includes my name and my GitHub startup repository link are styled similarly with a different color theme for each HTML page.
  - Main which includes the login form, third-party API service call ("Echoes of the Day"), signup form, game entrance, real-time notifications, lyrics display, emoji buttons, radio buttons, other game buttons, embedded SoundCloud soundtrack, score statements, and rank table are properly styled with CSS.
- **Navigation Elements**: Navigation Elements including the title of the game ("Echoes of keshi: A Lyric Odyssey"), the "Home" page tab, the "Play" interface tab, and the "Rank" table tab are styled similarly with different color themes throughout all HTML pages (including secondary pages, the "Signup" page, and the "Score" page, which are linked within the "Home" page and the "Play" interface, respectively).
- **Responsive to Window Resize**: Responsiveness through CSS Flexbox and Bootstrap Utility is applied and employed on all application elements throughout all HTML pages. The application is responsive to different window sizes for different devices.
- **Application Elements**: All application elements mentioned about are properly styled and carefully designed with CSS. Animation effects are also added to some application texts and backgrounds.
- **Application Text Content**: Different font families, font sizes, font colors, and font weights are used throughout all HTML pages with different purposes represented.
- **Application Image**: A different application image is appropriately used with CSS as the background for the body of each HTML page. A "keshi" logo image is also properly styled with CSS to blend in with the background image of the "Home" page.

# JavaScript Deliverable
- **Login**: 
  - Username and password will be saved to and stored in `localstorage` once entered as user input.
  - By pressing "Enter" on the keyboard or the "Login to Play" button at the bottom of the login form, it will take the player to the "Play" page.
  - Signup
    - New username, new password, and email will be saved to and stored in `localstorage` once entered as user input.
    - By pressing "Enter" on the keyboard or the "Register" button at the bottom of the signup form, it will take the player to the "Home" page for the player to log in with the player's registered username and password so that the player could log in to play.
- **database**:
  - The current player's username will be displayed at the top left corner of the "Play" page by getting and reading the user's login information from `localstorage`.
  - All the game questions are stored in and retrieved from `localstorage` but will be replaced with database data later.
    - Lyric sentences to display, four options to select from, the correct answer, and the corresponding SoundCloud soundtrack are stored in and retrieved from `localstorage` for each game question.
  - All players' scores including the corresponding dates and times that the scores are received are stored in and retrieved from `localstorage` to display the top 10 highest scores and the corresponding players' positions, names, and dates on the "Rank" page. This will be replaced with database data later.
- **WebSocket**
  - Mocked Websocket data are implemented on the left side of the "Play" page below where the current player's username is displayed by using the `setInterval()` function to simulate real-time notification messages of all players' activities including game connection, emoji reaction, and score result. This will be replaced with WebSocket later.
- **Application Interaction Logic**
  - Most application interaction logic is implemented within the "Play" page.
  - The game displays a few lyric sentences, four possible options to select from, and some emoji reactions to click with (The emoji reaction clicked will be displayed with the other real-time notification messages on the left side of the "Play" page.).
  - The player earns one point for each correct answer.
  - The "Go!" button checks the player's answer. If it is correct, the corresponding correct answer and SoundCloud soundtrack will display at the bottom of the "Play" page. If it is incorrect, an alert will show to ask the player to try again.
  - The "Skip>>" button skips to the next question.
  - The "Next>" button goes to the next question.
  - The "End..." button ends the game and will redirect the player to the "Score" page which displays the player's final score.
  - If the player chooses to start a new game by pressing the "New Game" button on the "Score" page, the player's preexisting score will be reset to zero, and it will redirect the player back to the "Play" page again to play a new game.