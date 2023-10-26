import {useState, useEffect} from "react";
import {ethers} from "ethers";
import atm_abi from "../artifacts/contracts/Assessment.sol/Assessment.json";

export default function HomePage() {
  const [ethWallet, setEthWallet] = useState("");
  const [address, setAddress] = useState("");
  const [atm, setATM] = useState("");
  const [tokennumber, setNumOfTokens] = useState("");
  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const atmABI = atm_abi.abi;

  const getWallet = async() => {
    if (window.ethereum) {
      setEthWallet(window.ethereum);
    }

    if (ethWallet) {
      const account = await ethWallet.request({method: "eth_accounts"});
      handleAccount(account);
    }
  }

  const handleAccount = (account) => {
    if (account) {
      console.log ("Account connected: ", account);
      setAddress(account);
    }
    else {
      console.log("No account found");
    }
  }

  const connectAccount = async() => {
    if (!ethWallet) {
      alert('MetaMask wallet is required to connect');
      return;
    }
  
    const accounts = await ethWallet.request({ method: 'eth_requestAccounts' });
    handleAccount(accounts);
    
    // once wallet is set we can get a reference to our deployed contract
    getATMContract();
  };

  const getATMContract = () => {
    const provider = new ethers.providers.Web3Provider(ethWallet);
    const signer = provider.getSigner();
    const atmContract = new ethers.Contract(contractAddress, atmABI, signer);
 
    setATM(atmContract);
  }

  const getNumOfTokens = async() => {
    if (atm) {
      setNumOfTokens((await atm.getTokenSupply()).toNumber());
    }
  }

  const MINT = async() => {
    if (atm) {
      let tx = await atm.mintToken(document.getElementById('numberEth').value);
      await tx.wait()
      getNumOfTokens();
    }
  }

  const BURN = async() => {
    if (atm) {
      let tx = await atm.burnToken(document.getElementById('numberEth').value);
      await tx.wait()
      getNumOfTokens();
    }
  }

  const initUser = () => {
    // Check to see if user has Metamask
    if (!ethWallet) {
      return <p>Please install Metamask in order to use this ATM.</p>
    }

    // Check to see if user is connected. If not, connect to their account
    if (!address) {
      return <button onClick={connectAccount}>Please connect your Metamask wallet</button>
    }

    if (tokennumber == undefined) {
      getNumOfTokens();
    }

    return (
      <div>
        <p>Account Address: {address}</p>
        <p>Number of TOKENS: {tokennumber}</p>
        <input type="number" id="numberEth" placeholder="Input number of tokens..."></input>
        <br></br><br></br>
        <button onClick={MINT}>MINT</button>
        <button onClick={BURN}>BURN</button>
      </div>
    )
  }

  useEffect(() => {getWallet();}, []);

  return (
    <main className="container">
      <header><h1>Welcome to the Metacrafters ATM!</h1></header>
      {initUser()}
      <style jsx>{`
        .container {
          text-align: center
        }
      `}
      </style>
    </main>
  )
}