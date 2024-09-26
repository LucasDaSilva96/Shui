# Post Or It Didn't Happen

[**Live Demo**](http://post-or-it-didnt-happen.s3-website.eu-north-1.amazonaws.com/)

## This project provides a front-end application for interacting with the Serverless API for managing posts. The application is built using modern web technologies.

**Prerequisites**
Ensure you have the following installed on your machine:

- Node.js (v14 or later)
- npm (v6 or later) or yarn

**Installation**

1. Clone the repository:

```
git clone [<repository-url>](https://github.com/LucasDaSilva96/Shui.git)
cd client
```

2. Install the dependencies:

```
npm install

# or

yarn install

```

**Running the Application**
To start the development server, run:

```
npm run dev

# or

yarn start

```

This will start the application on http://localhost:3000 (or another port if specified).

**Available Scripts**
In the project directory, you can run:

- npm start: Runs the app in development mode.
- npm test: Launches the test runner.
- npm run build: Builds the app for production.
- npm run eject: Ejects the app configuration (use with caution).

**Project Structure**

- src/: Contains the source code of the application.
- components/: Reusable UI components.
- pages/: Page components corresponding to different routes.
- services/: API service functions for interacting with the backend.
- main.tsx: Main application component.

**Environment Variables**
Create a .env file in the root of your project to configure environment variables:

```

VITE_BASE_API_URL=the base serverless deploy url

```

**API Integration**
The front-end application interacts with the Serverless API to perform CRUD operations on posts. Ensure the API URL is correctly set in the environment variables.
