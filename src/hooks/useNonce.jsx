import { useState, useEffect, useCallback } from 'react'

export const useNonce = (address, blockId = 'latest') => {
    const [nonce, setNonce] = useState(null);
  
    const fetchNonce = useCallback(async () => {
      if (window.ethereum && address) {
        try {
          const nonceHex = await window.ethereum.request({
            method: 'eth_getTransactionCount',
            params: [address, blockId],
          });
          const nonceDecimal = parseInt(nonceHex, 16);
          setNonce(nonceDecimal);
        } catch (error) {
          console.error('Error fetching nonce:', error);
        }
      }
    }, [address, blockId]);
  
    useEffect(() => {
      if (address) {
        fetchNonce();
      }
    }, [address, blockId, fetchNonce]);
  
    return nonce;
  };
  