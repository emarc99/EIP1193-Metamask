import { useState, useEffect, useCallback } from 'react';
// import { ethers } from "ethers";
import './app.css';
// Just import the JSDoc for development reference, not actual code from 'eip1193Provider.js'

function App() {
  const [account, setAccount] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [balance, setBalance] = useState(null)
  const [address, setAddress] = useState('')
  const [nonce, setNonce] = useState(null);
  const [blockId, setBlockId] = useState('latest');

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

    // Fetch the balance of a given address
    const fetchBalance = useCallback(async (address) => {
      if (window.ethereum && address) {
        try {
          const balance = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [address, 'latest'],
          });
          console.log(balance)
          setBalance((balance))
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    }, []);

  // Set up event listeners for account or chain changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        setAccount(accounts[0])
      });

      window.ethereum.on('chainChanged', (newChainId) => {
        setChainId(newChainId)
      });

      window.ethereum.on('connect', (info) => {
        setChainId(info.chainId)
      });
      window.ethereum.on('disconnect', () => {
        setAccount(null)
        setChainId(null)

        return () => {
          window.ethereum.removeListener('accountsChanged');
          window.ethereum.removeListener('chainChanged');
          window.ethereum.removeListener('connect');
          window.ethereum.removeListener('disconnect');
        };
      })
    }
  }, [])

    // Handle balance fetching when address changes
    useEffect(() => {
      if (address) {
        fetchBalance(address)
      }
    }, )

    // Fetch Nonce using eth_getTransactionCount
  const getNonce = async (address, blockId) => {
    if (window.ethereum && address) {
      try {
        const nonceHex = await window.ethereum.request({
          method: 'eth_getTransactionCount',
          params: [address, blockId], // 'latest' refers to the most recent block
        });
        const nonceDecimal = parseInt(nonceHex, 16); // Convert HEX to Decimal
        setNonce(nonceDecimal);
      } catch (error) {
        console.error('Error fetching nonce:', error);
      }
    }
  };

  // Fetch the nonce when the account or blockId changes
  useEffect(() => {
    if (account) {
      getNonce(account, blockId);
    }
  }, [account, blockId]); // Dependencies: account and blockId

  return (
    <div className="App">
      <h1>MetaMask Connection with EIP-1193</h1>
      <button onClick={connectToMetaMask}>Connect to MetaMask</button>
      {account && <p>Connected account: {account}</p>}
      {chainId && <p>Connected to network: {chainId}</p>}
      <hr />
      <div>
        <input
          type="text"
          placeholder="Enter address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
        {balance && <p>Balance: {balance} ETH</p>}
      </div>
      <hr />
      <input
          type="text"
          placeholder="Enter block ID (default: latest)"
          value={blockId}
          onChange={(e) => setBlockId(e.target.value)}
        />

      {/* Display Nonce */}
      {nonce !== null && <p>Nonce: {nonce}</p>}
    </div>
  );
}

export default App;
