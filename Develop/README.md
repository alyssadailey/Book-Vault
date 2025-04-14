# Book Vault

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Table of Contents
- [Description](#description)
- [Screenshots](#screenshots)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Credit](#credit)
- [Project Links](#project-links)
- [Questions](#questions)


## Description

Book Vault is a full-stack web application that allows users to search for books using the Google Books API, view detailed book information, and save their favorite titles to a personal collection. Each user can sign up or log in to maintain their own saved book list, ensuring a personalized experience. Saved books appear under a dedicated "Saved Books" tab, and users can also remove them at any time. The application provides a seamless user interface with dynamic feedback—once a book is saved, the "Save" button is disabled and updates to indicate it has already been saved.

The primary goal of this project was to refactor a RESTful backend into a GraphQL API, improving flexibility and efficiency in data fetching. The new GraphQL server supports all core functionality, including user authentication, book saving and deletion, and personalized book queries.

## Screenshots

Screenshot Previews of the Webpage:

###  Create a user
<img src="./assets/SS-Create-User.png" width="300">

### Post a thought
<img src="./assets/SS-Create-Thought.png" width="300">

### Add a friend
<img src="./assets/SS-Add-Friend.png" width="300">

### React to a Thought
<img src="./assets/SS-Create-Thought.png" width="300">


## Installation

1. Clone the repository:

git clone https://github.com/alyssadailey/Book-Vault.git

2. Navigate into the project directory:

cd Develop

3. Install dependencies for client and server:

npm install

cd client && npm install

4. Set up environment variables (Google Books API key, MongoDB URI, etc.) in a .env file.

5. Start the application (runs both client and GraphQL server):

npm run develop


## Usage

1. Launch the application in your browser.

2. Sign up for a new account or log in to an existing one.

3. Use the search bar to search for books by title, author, or keyword (powered by Google Books API).

4. Click "Save This Book" to add a book to your personal collection (data sent through GraphQL mutations). If the book has already been saved, the button will be disabled and display "You've already saved this book."

5. Navigate to the "Saved Books" tab to view or delete any saved titles—user-specific data is managed entirely via GraphQL queries and mutations.


## Features

- Book Search: Search the Google Books API for books based on title, author, or keywords.

- Save Books: Save books to your personal collection with a single click.

- Remove Books: Easily delete saved books from your list.

- User Authentication: Secure login and signup functionality to manage user-specific data.

- Real-time Feedback: Dynamic button updates and interface changes upon saving a book.

- Persistent Data: Saved books are stored in a database associated with each user account.

-  GraphQL API: Replaced the traditional REST API with a GraphQL server to improve query performance and flexibility.

-  MERN Stack: Built with MongoDB, Express.js, React, Node.js, and Apollo Server for GraphQL integration.


## License

This application is covered under the MIT license.


## Contributing

If you would like to contribute to my project please follow these steps!

1. Fork the repository on GitHub.
2. Clone your fork to your computer.
3. Create a new branch for your changes.
4. Make your changes and commit them using descriptive messages.
5. Push your branch and open a pull request!


## Tests

To test run:
 npm run test


## Credit

-Tutor Luis assisted in ensuring my "save this book" button was cleared on loggout.

-Utilized both Deepseek and Chat GPT to answer any questions throughout project.


## Project Links

Repository: https://github.com/alyssadailey/Book-Vault

Live application link: 



## Questions

Please reach me here with additional questions:

Github: https://github.com/alyssadailey <br>
Email: alyssadailey28@gmail.com </p>


