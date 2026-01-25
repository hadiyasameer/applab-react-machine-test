# React Shopping Cart – Machine Test
A responsive shopping cart application built as part of a React JS machine test, focusing on clean architecture, predictable state management, and user-friendly UX.
The application uses mock product data, implements essential e-commerce rules, and follows the given technical constraints strictly.

# Objective

To build a shopping cart application with product listing, cart management, and a multi-step checkout summary using React 19, TypeScript, and Redux, without relying on third-party form or validation libraries.

# Features Implemented

- Product Listing

    - Product grid displaying 10+ mock products
    - Products categorized for easy filtering
    - Search and filter by category and price range
    - Quantity stepper with enforced limits

- Cart Management

    - Add and remove products from the cart
    - Maximum 5 units per product
    - Sliding cart sidebar with:

        - Subtotal
        - 5% tax
        - 10% discount for orders above $100
        - Final total calculation

    - Checkout Flow

        - Tab-style checkout steps:
            1 Cart Review
            2 Shipping
            3 Payment Summary (read-only)

        - Minimum cart value of $10 required to proceed
        - Basic form validation implemented m   -ually

    - State & Persistence

        - Global cart state managed using Redux
        - Cart data persisted using localStorage
        - Optimistic UI updates for a smooth user experience

- Tech Stack

    - React 19
    - TypeScript 
    - Vite for development and build
    - Redux for global state management
    - Tailwind CSS for responsive UI

- Architectural Decisions

    - Mock JSON data is used for products as per the requirement
    - Custom hooks handle cart logic and filtering to keep components clean
    - Redux slices centralize cart rules and calculations
    - No third-party libraries used for:Form building and Validation logic

- Responsiveness & UX

    - Fully mobile-responsive layout
    - Touch-friendly controls
    - Clear feedback for validation and cart updates
    - Checkout steps visually separated for better usability

- Clone & Run Locally

1. Clone the repository: git clone https://github.com/hadiyasameer/applab-react-machine-test.git
2. Navigate into the project folder: cd applab-react-machine-test
3. Install dependencies: npm install
4. Run the project: npm run dev
5. Open in browser: http://localhost:5173