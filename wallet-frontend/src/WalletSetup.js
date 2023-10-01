import React, { useState } from 'react';
import api from './api';
import './WalletSetup.css';

function WalletSetup({ onWalletSetup }) {
  const [username, setUsername] = useState('');
  const [initialBalance, setInitialBalance] = useState('');

  const handleSetup = async () => {
    try {
      const response = await api.setupWallet(username, parseFloat(initialBalance));
      const { id } = response.data;
      localStorage.setItem('walletId', id);
      onWalletSetup(id);
    } catch (error) {
      alert(error.response.data.error);
      console.error(error);
    }
  };

  return (
    <div className="WalletSetup">
      <h3>Initialize Your Wallet</h3>
      <input
        className="input-field"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="input-field"
        type="number"
        placeholder="Initial Balance"
        value={initialBalance}
        onChange={(e) => setInitialBalance(e.target.value)}
      />
      <br />
      <button className="setup-button" onClick={handleSetup}>Initialize Wallet</button>
    </div>
  );
}

export default WalletSetup;
