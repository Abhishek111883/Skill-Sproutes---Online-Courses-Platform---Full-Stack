# Skill Sprouts #

Skill Sproutes is an online course platform where users can explore, purchase, and manage courses. The platform provides different interfaces and functionalities depending on the user role (Student, Instructor, or Admin), ensuring a personalized experience for each. It offers a seamless user experience with a strong authentication system and a dark mode for enhanced aesthetics.

## Features

### General
- Dark Mode for an improved viewing experience.
- Secure authentication system using Firebase.
- Purchase courses and add them to the cart for later checkout.

### User (Student)
- Browse available courses.
- Add courses to your cart and proceed to checkout.
- Access and track purchased courses.

### Instructor
- Add and manage courses.
- View the status of your courses (pending or approved).
- Remove courses if needed.

### Admin
- Full control over platform maintenance, including user and class management.
- Approve or reject pending courses.
- Manage users and their details.

## Tech Stack

- **Frontend:** ReactJS
- **Backend:** NodeJS, ExpressJS
- **Database:** MongoDB
- **Authentication:** Firebase
- **REST APIs:** Used for CRUD operations with MongoDB
- **UI Library:** Tailwind for styled components
- **Styling:** TailwindCSS (with dark mode support)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/skill-sproutes.git
   cd skill-sproutes
   ```

2. Install the dependencies for both the frontend and backend:
   
   # Install frontend dependencies
   ```bash
   cd frontend
   npm install
   ```

   # Install backend dependencies
   ```bash
   cd ../Backend
   npm install
   ```
   
3. Set up environment variables:

   - Create a .env file in the root of both the client and server directories.
   - For the backend (Backend/.env):
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   FIREBASE_API_KEY=your_firebase_api_key
   ```

   - For the frontend (client/.env):
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
   ```
   
4. Run the application:

   - Backend (Server):

   ```bash
   cd server
   npm start
   ```
   
   - Frontend (Client):

   ```bash
   cd frontend
   npm run dev
   ```
5. Open your browser and navigate to http://localhost:5173.

## Payments with Stripe

Skill Sproutes integrates Stripe for handling payments, ensuring secure and reliable transactions. Users can add courses to their cart and proceed to checkout using Stripe's payment gateway, which supports multiple payment methods and currencies.

To test payments:
   1. Use Stripe's test card numbers provided in their documentation.
   2. Ensure your Stripe keys are correctly set in the environment variables.

## Contributions

Contributions are welcome and appreciated! To contribute:

1. Fork the repository.
2. Create a new branch for your feature or bug fix (`git checkout -b feature-name`).
3. Make your changes and commit them (`git commit -m "Add feature/fix bug"`).
4. Push the branch (`git push origin feature-name`).
5. Open a Pull Request explaining the changes.

Please ensure your code follows best practices and is well-documented. Before submitting, make sure to run tests and verify that everything works correctly.

Thank you for contributing to Skill Sproutes!

