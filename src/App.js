import "./App.css";
import mintExample from "./mintExampleAbi.json";
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
const mintExampleAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

function App() {
  //CONNECTING our app to the blockchain
  const [accounts, setAccounts] = useState([]);
  console.log(accounts);
  async function connectAccounts() {
    try {
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccounts(accounts);
      }
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    connectAccounts();
  }, []);

  //MINTING
  const [mintAmount, setMintAmount] = useState(1);

  async function handleMint() {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      //will approuve the transaction
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        mintExampleAddress,
        mintExample.abi,
        signer
      );
      try {
        const response = await contract.mint(mintAmount);
        console.log(response);
      } catch (e) {
        console.log("error", e);
      }
    }
  }

  return (
    <div className="App">
      This How creatre a mint button
      {accounts.length && (
        <div>
          <button onClick={() => setMintAmount(mintAmount - 1)}>-</button>
          {mintAmount}
          <button onClick={() => setMintAmount(mintAmount + 1)}>+</button>
          <button onClick={handleMint}>Mint</button>
        </div>
      )}
    </div>
  );
}

export default App;
