import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create the context
const MetaMaskContext = createContext();

// Create a provider component
export const MetaMaskProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [chainId, setChainId] = useState(null);

  // Connect to MetaMask
  const connectToMetaMask = useCallback(async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });
        setChainId(currentChainId);
      } catch (error) {
        console.error('Error connecting:', error);
      }
    } else {
      console.log('MetaMask is not installed');
    }
  }, []);

  // Set up event listeners for account or chain changes
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => setAccount(accounts[0]);
      const handleChainChanged = (newChainId) => setChainId(newChainId);
      const handleConnect = (info) => setChainId(info.chainId);
      const handleDisconnect = () => {
        setAccount(null);
        setChainId(null);
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      window.ethereum.on('connect', handleConnect);
      window.ethereum.on('disconnect', handleDisconnect);

      // Cleanup listeners on unmount
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
        window.ethereum.removeListener('connect', handleConnect);
        window.ethereum.removeListener('disconnect', handleDisconnect);
      };
    }
  }, []);

  return (
    <MetaMaskContext.Provider value={{ account, chainId, connectToMetaMask }}>
      {children}
    </MetaMaskContext.Provider>
  );
};

// Custom hook to access MetaMask context
export const useMetaMask = () => {
  return useContext(MetaMaskContext);
};

