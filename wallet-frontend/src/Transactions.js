import React, { useState, useEffect } from 'react';
import api from './api';
import './Transactions.css';

function Transactions({ walletId }) {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState('CREDIT');
  const [currentBalance, setCurrentBalance] = useState(0);

  const fetchTransactions = async () => {
    try {
      const response = await api.fetchTransactions(walletId);
      setTransactions(response.data);
      fetchBalance();
    } catch (error) {
      console.error(error);
    }
  };
  const fetchBalance = async () => {
    try {
      const data = await api.fetchCurrentBalance(walletId);
      setCurrentBalance(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBalance();
  }, []);

  const handleTransaction = async () => {
    try {
      await api.transactWallet(walletId, amount, description, transactionType);
      setAmount('');
      setDescription('');
      setTransactionType('CREDIT');
      fetchTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="transactions-container">
      <div className="transaction-form">
        <h3>Perform a Transaction</h3>
        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button onClick={handleTransaction}>Perform Transaction</button>
        </div>
      </div>
      <div className="transaction-balance">
        <h3>Current Balance</h3>
        <p>{currentBalance}</p>
      </div>
      <div className="transaction-table">
        <h3>Transaction History</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Description</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                <td>{transaction.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Transactions;
