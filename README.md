# Wallet Application Setup Guide

**Prerequisites**

Before setting up the Wallet Application, make sure you have the following prerequisites:

-   **Node.js and npm**: Ensure that you have Node.js (version 14 or higher) and npm (Node Package Manager) installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).
-   **Git**: You'll need Git for cloning the project repositories. You can download Git from [git-scm.com](https://git-scm.com/).

**Step 1: Clone the Repositories**

Clone the frontend (React.js) and backend (Express.js) repositories for the Wallet Application:


Clone the frontend repository git clone git@github.com:rinzler99/wallet-application.git
**Step 2: Frontend Setup**

Navigate to the Frontend Directory

```bash
cd wallet-frontend

#Install Dependencies

npm install

npm run start
```

Configure Environment Variables

In the frontend directory, create a .env file and set the following environment variables:

REACT_APP_API_BASE_URL=https://highlevel-wallet-service.onrender.com/api

This environment variable should point to your Express.js API base URL.

Build the Frontend

```bash
npm run build
```

**Step 3: Backend Setup**

Navigate to the Backend Directory

```bash
cd wallet-backend
```

Install Dependencies

```bash
npm install
```

Configure Environment Variables

In the backend directory, create a .env file and set the following environment variables:



PORT=3000 MONGODB_URI=your-mongodb-uri

Replace your-mongodb-uri with the URI for your MongoDB database.

Start the Backend Server

```bash
npm start
```

**Step 4: Access the Application**

Your Wallet Application is now set up and running. You can access it using the following URLs:

-   **Frontend UI**: <https://highlevel-wallet-ui.netlify.app/>
-   **Express API**: <https://highlevel-wallet-service.onrender.com/>
-   **API Documentation**: <https://highlevel-wallet-service.onrender.com/api-docs/>

Database Design for Wallet Application

**Database System**

The Wallet Application uses MongoDB as its database system. MongoDB is a NoSQL database that is well-suited for storing unstructured or semi-structured data like wallet transactions.

**Database Schema**

The Wallet Application uses the following database schema:

Wallet Collection

The Wallet collection stores information about user wallets. Each wallet document contains the following fields:

-   _id: A unique identifier for the wallet (auto-generated using UUID).
-   name: The username or name associated with the wallet.
-   balance: The current balance of the wallet, stored as a floating-point number.
-   createdAt: The timestamp indicating when the wallet was created.

Transaction Collection

The Transaction collection stores information about individual transactions associated with a wallet. Each transaction document contains the following fields:

-   _id: A unique identifier for the transaction (auto-generated using UUID).
-   amount: The transaction amount, stored as a floating-point number.
-   description: A description or note for the transaction.
-   date: The timestamp indicating when the transaction occurred.
-   type: The type of transaction, which can be "CREDIT" or "DEBIT."
-   wallet: A reference to the wallet to which the transaction belongs (using the wallet's _id).

**Database Queries**

The Wallet Application uses various database queries to perform actions such as wallet setup, transaction recording, and fetching transaction history. Here are some examples of common database queries:

Wallet Setup

-   **Create a Wallet**: When a user initializes their wallet, a new wallet document is created in the Wallet collection with the provided username and initial balance.

Transaction Handling

-   **Record a Transaction**: When a user performs a transaction (credit or debit), a new transaction document is created in the Transaction collection. The wallet's balance is updated accordingly.
-   **Fetch Transaction History**: To display a user's transaction history, the application queries the Transaction collection to retrieve all transactions associated with a specific wallet, sorted by date or amount.
-   **Fetch Current Wallet Balance**: To display the current wallet balance on the transaction page, the application queries the Wallet collection to retrieve the wallet's current balance.

**Indexing**

To optimize database queries and improve performance, appropriate indexes are created on fields that are frequently used for filtering or sorting, such as the date field in the Transaction collection.

**Data Validation**

To ensure data integrity and consistency, the application may include data validation rules in the database layer to enforce constraints on fields such as transaction amount and wallet balance.

Overall, the database design for the Wallet Application is structured to efficiently handle user wallets, transactions, and provide a seamless user experience for managing finances. The application leverages MongoDB's flexibility to store and retrieve financial data in a scalable and organized manner.

**Step 6: Demo**

You can use the sample UI URL to access the Wallet Application's frontend. To interact with the application, follow these steps:

-   Visit the frontend UI URL: <https://highlevel-wallet-ui.netlify.app/>
-   If you're a new user, click on "Initialize Your Wallet" to set up your wallet with an initial balance.
-   Once your wallet is set up, you can perform transactions (credit/debit) and view your transaction history.
-   To view your transaction history, click on "View Transactions."
-   You can also use the API Documentation URL for detailed information on the available API endpoints and how to use them.

That's it! You've successfully set up and accessed the Wallet Application. Enjoy exploring and using the application.

If you encounter any issues during the setup or have any questions, feel free to ask for assistance.