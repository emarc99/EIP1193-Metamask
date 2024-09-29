import { useState } from 'react';
import { useMetaMask } from './hooks/useMetaMask';
import { useBalance } from './hooks/useBalance';
import { useNonce } from './hooks/useNonce';
import './app.css';

function App() {
  const { account, chainId, connectToMetaMask } = useMetaMask();
  const [address, setAddress] = useState('');
  const [blockId, setBlockId] = useState('latest');

  const balance = useBalance(address);
  const nonce = useNonce(account, blockId);

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
        {!balance && <p>Balance: {balance} ETH</p>}
      </div>
      <hr />
      <input
          type="text"
          placeholder="Enter block ID (default: latest)"
          value={blockId}
          onChange={(e) => setBlockId(e.target.value)}
        />
      {nonce !== null && <p>Nonce: {nonce}</p>}
    </div>
  );
}

export default App;

