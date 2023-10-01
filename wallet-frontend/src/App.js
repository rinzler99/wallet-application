import React, { useState, useEffect } from 'react';
import WalletSetup from './WalletSetup';
import Transactions from './Transactions';

function App() {
  const [walletId, setWalletId] = useState(null);

  useEffect(() => {
    const storedWalletId = localStorage.getItem('walletId');
    if (storedWalletId) {
      setWalletId(storedWalletId);
    }
  }, []);

  const clearWallet = () => {
    localStorage.removeItem('walletId');
    setWalletId(null);
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: 'center' }}>Wallet Application</h1>
      {walletId ? (
        <>
          <button onClick={clearWallet} style={{ margin: '10px auto', display: 'block' }}>
            Clear
          </button>
          <Transactions walletId={walletId} />
        </>
      ) : (
        <WalletSetup onWalletSetup={(id) => setWalletId(id)} />
      )}
    </div>
  );
}

export default App;
