# User Registration Form

A dynamic and responsive user registration form built with Next.js, React, and TypeScript. This project demonstrates a multi-step registration process with state management, form validation, and backend integration.

## Features

- Multi-step registration process
- Dynamic form field rendering
- State management using Zustand
- Form validation with Zod
- Responsive design with Tailwind CSS
- Backend integration with Next.js API routes and MongoDB

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/user-registration-form.git
   cd user-registration-form
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add your MongoDB connection string:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/src/app`: Next.js app router components
- `/src/components`: Reusable React components
- `/src/lib`: Utility functions and database connection
- `/src/store`: Zustand store for state management
- `/src/schemas`: Zod schemas for form validation
- `/pages/api`: Next.js API routes for backend logic

## Technologies Used

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Zod](https://github.com/colinhacks/zod)
- [MongoDB](https://www.mongodb.com/)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
