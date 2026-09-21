# Assignment 05: Online Shopping Cart

## Objective
Build a professional e-commerce shopping experience using `useReducer` and Context API for global state management.

## Technologies Used
- React (Vite)
- Context API & `useReducer` Hook
- CSS Variables and Flexbox/Grid
- Lucide React Icons

## Features
- Premium E-commerce Storefront UI
- Add/Remove products to cart
- Update quantities from Cart Drawer
- GST (18%) Calculation
- Coupon Code validation and percentage discount (`COLLEGE10` for 10% off)
- Grand total summary calculation
- Badge indicators for discounts and cart item counts

## Folder Structure
```
assignment-05-shopping-cart/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── ProductList.jsx
│   │   └── CartDrawer.jsx
│   ├── context/
│   │   └── CartContext.jsx
│   ├── styles/
│   │   ├── Navbar.css
│   │   ├── ProductList.css
│   │   └── CartDrawer.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
```

## How to Install
1. Navigate to the project directory: `cd assignment-05-shopping-cart`
2. Install dependencies: `npm install`

## How to Run
Run the development server:
```bash
npm run dev
```

## Important React Concepts Demonstrated
- **Context API**: Providing the shopping cart state (`items`, `subtotal`, `grandTotal`, etc.) to multiple components (`Navbar` and `CartDrawer`) without prop drilling.
- **`useReducer` Hook**: Managing complex state logic (adding, removing, updating items, and applying coupons) in a predictable, unified way.
- **Derived State**: Calculating `subtotal`, `discountAmount`, `gstAmount`, and `grandTotal` dynamically based on the current state of the cart items and applied coupon, rather than storing them in state unnecessarily.
