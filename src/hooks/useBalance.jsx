import { useState, useEffect, useCallback } from 'react'

export const useBalance = (address) => {
    const [balance, setBalance] = useState(null);
  
    const fetchBalance = useCallback(async () => {
      if (window.ethereum && address) {
        try {
          const balanceHex = await window.ethereum.request({
            method: 'eth_getBalance',
            params: [address, 'latest'],
          });
          const balanceDecimal  = parseInt((balanceHex, 16)/1e18);
          setBalance(balanceDecimal);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    }, [address]);
  
    // Fetch balance whenever the address changes
    useEffect(() => {
      if (address) {
        fetchBalance();
      }
    }, [address, fetchBalance]);
  
    return balance;
  };
  