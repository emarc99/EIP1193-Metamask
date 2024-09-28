import { useState, useEffect } from 'react';
import './app.css';
// Just import the JSDoc for development reference, not actual code from 'eip1193Provider.js'

function App() {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);

  /**
   * Connects to MetaMask using EIP-1193 `request` method.
   * @returns {Promise<void>}
   */
  const connectToMetaMask = async () => {
    if (window.ethereum) {
      try {
        /** @type {Array<string>} */
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
        setAccount(accounts[0]);
        console.log('Connected account:', accounts[0]);

        const currentChainId = await window.ethereum.request({
          method: 'eth_chainId',
        });
        setChainId(currentChainId);

        console.log('Connected account:', accounts[0]);
        console.log('Connected to network:', currentChainId);

      } catch (error) {
        console.error('Error connecting:', error.message);
      }
    } else {
      console.log('MetaMask is not installed');
    }
  };

  // Set up event listeners for account or chain changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0]);
      });

      window.ethereum.on('chainChanged', (newChainId) => {
        setChainId(newChainId);
      });

      window.ethereum.on('connect', (info) => {
        setChainId(info.chainId);
      });
    }
  }, []);

  return (
    <div className="App">
      <h1>MetaMask Connection with EIP-1193</h1>
      <button onClick={connectToMetaMask}>Connect to MetaMask</button>
      {account && <p>Connected account: {account}</p>}
      {chainId && <p>Connected to network: {chainId}</p>}
    </div>
  );
}

export default App;
