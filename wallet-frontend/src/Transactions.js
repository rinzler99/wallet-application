import React, { useState, useEffect } from 'react';
import api from './api';
import './Transactions.css';

function Transactions({ walletId }) {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [transactionType, setTransactionType] = useState('CREDIT');
  const [currentBalance, setCurrentBalance] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'amount'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'

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
      const res = await api.getWalletById(walletId);
      setCurrentBalance(res.data.data.balance);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchBalance();
  }, [walletId, currentPage, itemsPerPage, sortBy, sortOrder]);

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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const exportToCSV = () => {
    const csvContent = 'data:text/csv;charset=utf-8,';
    const header = ['Date', 'Amount', 'Description', 'Type'].join(',');

    const rows = transactions.map((transaction) =>
      [transaction.date, transaction.amount, transaction.description, transaction.type].join(',')
    );

    const csv = [header, ...rows].join('\n');
    const encodedCSV = encodeURI(csvContent + csv);
    const link = document.createElement('a');
    link.setAttribute('href', encodedCSV);
    link.setAttribute('download', 'transactions.csv');
    document.body.appendChild(link);
    link.click();
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
              <th ><button onClick={toggleSortOrder}>Date</button></th>
              <th ><button onClick={toggleSortOrder}>Amount</button></th>
              <th>Description</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {currentTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.description}</td>
                <td>{transaction.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastItem >= transactions.length}>
            Next Page
          </button>
          <button onClick={exportToCSV}>Export CSV</button>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
