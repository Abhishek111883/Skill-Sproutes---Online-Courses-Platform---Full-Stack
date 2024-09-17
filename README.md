# Skill Sprouts

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
   ``bash
   cd ../Backend
   npm install
   ```
