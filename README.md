📦 Order Tracker Management System
A full-stack web application designed to help logistics managers efficiently track, manage, and update the status of shipping orders. The system features a dashboard for managers and a public-facing page for customers to track their orders using a unique tracking ID.

✨ Features
Manager Dashboard (Private)
Secure Authentication: Managers can create an account and log in securely.

Order Creation (CRUD): Easily add new orders, including recipient name, destination city, and package weight.

Order Management:

Edit: Modify details (name, city, weight) of existing orders using a dedicated modal.

Status Update: Quickly change the status (In Warehouse, On the Way, Delivered).

Delete: Remove outdated or incorrect orders.

Filtering: Filter the main order table by Status (via the sidebar) or by Destination City (via the search bar).

Responsive Design: Optimized layout for desktop and mobile screens.

Customer Tracking (Public)
Public Tracking Page: Customers can check the latest status of their parcel by entering the unique Order ID.

⚙️ Technology Stack
This project follows the MERN stack architecture, utilizing Tailwind CSS for rapid styling.

Frontend
React: JavaScript library for building the user interface.

React Router DOM: For handling client-side routing.

Context API (AuthContext): For global state management (user authentication state and API instance).

Axios: HTTP client for making API requests.

Tailwind CSS: Utility-first CSS framework for styling and responsiveness.

Lucide React: Icon library used for UI elements.

Backend
Node.js & Express: Runtime environment and web framework for the REST API.

MongoDB & Mongoose: NoSQL database and ODM for data persistence.

JSON Web Tokens (JWT): For manager authentication and authorization.

bcryptjs: For secure password hashing.
