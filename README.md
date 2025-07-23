# CRICSTORE - FRONTEND CLIENT UI

Cricstore is a modern, responsive, and feature-rich e-commerce frontend client for a microservices-based project. It is built with Next.js and TypeScript, offering a seamless user experience for Browse and purchasing cricket equipment. This project was bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Overview

Cricstore is the frontend client for a larger e-commerce platform that specializes in cricket equipment. It is designed to be a fast, scalable, and user-friendly interface that communicates with a backend API gateway to fetch product information, manage user authentication, and process orders. The application is built with a modern tech stack, including Next.js for server-side rendering and static site generation, Redux Toolkit for state management, and Tailwind CSS for styling.

### Key Features

* **Product Catalog:** Browse a wide range of cricket equipment with detailed product information, including images, descriptions, and customizable options.
* **User Authentication:** Secure user registration and login functionality with JWT-based authentication. It includes session management with token refresh capabilities.
* **Shopping Cart:** A persistent shopping cart that allows users to add, remove, and update quantities of items. The cart state is managed using Redux Toolkit and persisted in local storage.
* **Checkout Process:** A multi-step checkout process that includes address selection, order summary, and payment options (Cash on Delivery and Card).
* **Order Tracking:** Users can view their order history and track the status of their current orders in real-time using a stepper component and Socket.IO for live updates.
* **Responsive Design:** A fully responsive and mobile-friendly UI that provides an optimal viewing experience across a wide range of devices.
* **Toast Notifications:** User-friendly toast notifications for actions like adding items to the cart.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18.18.0 or later)
* npm, yarn, pnpm, or bun

### Installation

1.  Clone the repository:
    ```sh
    git clone https://github.com/adarsh-naik-2004/bats-client_ui.git
    ```
2.  Navigate to the project directory:
    ```sh
    cd bats-client_ui
    ```
3.  Install NPM packages:
    ```sh
    npm install
    ```
4.  Create a `.env.local` file in the root of the project and add the necessary environment variables:
    ```env
    NEXT_PUBLIC_API_GATEWAY=http://your-backend-api-gateway-url
    NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
    ```
5.  Run the development server:
    ```sh
    npm run dev
    ```
6.  Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Technologies Used

* **Framework:** [Next.js](https://nextjs.org)
* **Language:** [TypeScript](https://www.typescriptlang.org/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/)
* **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
* **Data Fetching:** [TanStack Query](https://tanstack.com/query/v4) (React Query)
* **HTTP Client:** [Axios](https://axios-http.com/)
* **Form Management:** [React Hook Form](https://react-hook-form.com/)
* **Schema Validation:** [Zod](https://zod.dev/)
* **Real-time Communication:** [Socket.IO Client](https://socket.io/docs/v4/client-installation/)

### Key Components and Functionality

* **`app/`**: Contains all the routes and UI components for the application.
    * **`(home)/`**: The main landing page of the application, which includes the product list and store selection.
    * **`cart/`**: The shopping cart page where users can review and manage their selected items.
    * **`checkout/`**: The checkout page where users can enter their shipping and payment information to place an order.
    * **`login/` & `register/`**: User authentication pages.
    * **`order/[orderId]/`**: A page that displays the status of a specific order.
    * **`orders/`**: A page that lists all the orders placed by the current user.
* **`components/`**: Contains reusable UI components.
    * **`custom/`**: Custom components built specifically for this application, such as the header, footer, and cart counter.
    * **`stepper/`**: A reusable stepper component for the order tracking page.
    * **`ui/`**: UI components from shadcn/ui, such as buttons, cards, and forms.
* **`lib/`**: Contains the application's business logic, hooks, and utilities.
    * **`actions/`**: Server-side actions for handling user login, logout, and registration.
    * **`hooks/`**: Custom React hooks for calculating totals and managing other client-side logic.
    * **`http/`**: The Axios instance and API functions for making requests to the backend.
    * **`store/`**: Redux Toolkit store, slices, and hooks for managing the application's state.
    * **`types/`**: TypeScript type definitions for the application's data structures.
    * **`utils.ts`**: Utility functions for tasks like hashing cart items and calculating prices.

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new) from the creators of Next.js. Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
