# Digital Wallet Frontend

A **secure, role-based, and user-friendly frontend application** for a Digital Wallet System (similar to bKash or Nagad) built using **React.js, Redux Toolkit, RTK Query, and Tailwind CSS**. This app interacts with a backend API to allow Users, Agents, and Admins to perform financial operations and manage wallets seamlessly.

---

## 🔗 Live Link

- **Website Live Link:** [digital-wallet-api-nu.vercel.app](https://client-digital-wallet.vercel.app)

---

## 📦 Project Setup

### Clone the repository

```bash
git clone https://github.com/Sabuj-Chowdhury/client-digital-wallet.git
cd client-digital-wallet
```

### Install dependencies

```bash
npm install
```

### Environment Variables

Create a `.env` file in the root and add:

```env
VITE_BASE_URL=https://digital-wallet-api-nu.vercel.app/api/v1
```

> You can change this to your local backend if running locally.

### Run Locally

```bash
npm run dev
```

The app will run at [http://localhost:5173](http://localhost:5173) by default.

### Build for Production

```bash
npm run build
npm run preview
```

---

## 💥 Features

### Public Landing

- Home Page with a hero banner, tagline, and call-to-action buttons
- About Page — Service story, mission, and team details
- Features Page — List of app features with visuals/icons
- Pricing Page (dummy structure) — Shows free plans
- Contact Page — Inquiry form (simulated)
- FAQ Page — Common questions and answers

### Authentication

- JWT-based login and registration
- Role selection during registration (User or Agent)
- Role-based redirection after login
- Persisted authentication state
- Logout functionality

### User Dashboard

- Overview with wallet balance, quick actions, and recent transactions
- Deposit money (via Agent simulation)
- Withdraw money
- Send money to other users (search by phone/email)
- Transaction history with pagination and filtering
- Profile management — update name, phone, and password

### Agent Dashboard

- Overview with cash-in/out summary and recent activity
- Add money to a user’s wallet
- Withdraw money from a user’s wallet
- View all transactions handled by the agent
- Commission history (optional)
- Profile management — update personal info and password

### Admin Dashboard

- Overview with total users, agents, transaction count, and volume
- Manage users (view, block/unblock)
- Manage agents (approve, suspend)
- View all transactions with advanced filters
- Profile management — update admin account settings

### General Features

- Role-based navigation menu
- Loading indicators and global error handling
- Form validations (required fields, numeric checks, positive amounts)
- Pagination for long lists
- Dynamic data visualizations (cards, charts, tables)
- Toast Notifications for success/error messages
- Guided Tour highlighting key features
- Fully responsive design for all devices

---

## 🔗 Backend & API

- **Backend GitHub Repo:** [digital-wallet-api](https://github.com/Sabuj-Chowdhury/digital-wallet-api)
- **API Live Link:** [digital-wallet-api-nu.vercel.app](https://digital-wallet-api-nu.vercel.app)

---

## 👤 Demo Login Credentials

### Admin

- Phone: `+8801308766895`
- Password: `12345678`

### Agent

- Phone: `+8801920005950`
- Password: `123456`

### User

- Phone: `+8801818194811`
- Password: `123456`

> You can use these credentials to test the app without registration.

---

## 🛠️ Technologies Used

- **Frontend:** React.js, TypeScript, TailwindCSS, ShadCN/UI
- **State Management:** Redux Toolkit & RTK Query
- **Forms & Validation:** react-hook-form, zod
- **UI Components:** Radix UI, ShadCN, Lucide Icons
- **Notifications:** Sonner
- **Routing:** React Router v7
- **Animations & Transitions:** Tailwind Animations

---

## 🗑️ Authentication

- JWT-based auth stored in cookies
- Role-based access control for Users, Agents, and Admins
- Automatic state persistence on refresh

---

## 🚀 Getting Started

1. Clone the frontend repo
2. Install dependencies
3. Set up `.env` file
4. Run `npm run dev` to start the app
5. Connect with the backend API (either live or local)
6. Use demo credentials to log in

---

## 🎨 UI/UX Considerations

- Fully responsive design
- Consistent color theme and typography
- Interactive, smooth transitions
- Accessible and user-friendly interface
- Skeleton loaders for data delays

---

## 📜 Notes

- Currently, some features (like premium plans) are **dummy placeholders** for demonstration.
- API requests can be pointed to a **mock server** or a real backend by updating `VITE_BASE_URL`.

---

## 🚀 Contribution

Feel free to fork the repo and contribute!
Open an issue or submit a pull request for bug fixes or feature enhancements.

---
