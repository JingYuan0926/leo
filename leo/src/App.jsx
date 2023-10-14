import { useState } from "react";
import reactLogo from "./assets/react.svg";
import aleoLogo from "./assets/aleo.svg";
import "./App.css";
import helloworld_program from "../helloworld_1/build/main.aleo?raw";
import { AleoWorker } from "./workers/AleoWorker.js";
import React from 'react';
import paymentImage from './payment.png';
import { useMemo } from "react";
import { WalletProvider } from "@demox-labs/aleo-wallet-adapter-react";
import { WalletModalProvider } from "@demox-labs/aleo-wallet-adapter-reactui";
import { LeoWalletAdapter } from "@demox-labs/aleo-wallet-adapter-leo";
import {
  DecryptPermission,
  WalletAdapterNetwork,
} from "@demox-labs/aleo-wallet-adapter-base";
import { WalletMultiButton } from "@demox-labs/aleo-wallet-adapter-reactui";


const aleoWorker = AleoWorker();
function App() {
  const [count, setCount] = useState(0);
  const [account, setAccount] = useState(null);
  const [executing, setExecuting] = useState(false);
  const [deploying, setDeploying] = useState(false);

  const generateAccount = async () => {
    const key = await aleoWorker.getPrivateKey();
    setAccount(await key.to_string());
  };

  async function execute() {
    setExecuting(true);
    const result = await aleoWorker.localProgramExecution(
      helloworld_program,
      "main",
      ["5u32", "5u32"],
    );
    setExecuting(false);

    alert(JSON.stringify(result));
  }

  async function deploy() {
    setDeploying(true);
    try {
      const result = await aleoWorker.deployProgram(helloworld_program);
      console.log("Transaction:")
      console.log("https://explorer.hamp.app/transaction?id=" + result)
      alert("Transaction ID: " + result);
    } catch (e) {
      console.log(e)
      alert("Error with deployment, please check console for details");
    }
    setDeploying(false);
  }

  const wallets = useMemo(
    () => [
      new LeoWalletAdapter({
        appName: "Leo Demo App",
      }),
    ],
    []
  );

  const buttonStyles = {
    position: 'absolute',
    top: '150px', // Adjust the top position as needed
    left: '1060px', // Adjust the left position as needed
    backgroundColor: '#007bff', // Change to your desired background color
    color: '#fff', // Change to your desired text color
    padding: '10px 30px', // Change to your desired padding
    border: 'none', // Remove the border or set your desired border style
    // Add more styles as needed
  };

  const buttonStyles2 = {
    position: 'absolute',
    top: '450px', // Adjust the top position as needed
    left: '725px', // Adjust the left position as needed
    backgroundColor: '#007bff', // Change to your desired background color
    color: '#fff', // Change to your desired text color
    padding: '10px 40px', // Change to your desired padding
    border: 'none', // Remove the border or set your desired border style
    // Add more styles as needed
  };
  

  return (

    <WalletProvider
      wallets={wallets}
      decryptPermission={DecryptPermission.UponRequest}
      network={WalletAdapterNetwork.Localnet}
      autoConnect
    >
      <WalletModalProvider>
        <div className="image-container">
          <img src={paymentImage} alt="Image" />
          <div className="button-container">
          <div className="button-container">
          <button
              className="payment-button" // Add a class to the Payment button
              disabled={deploying}
              onClick={deploy}
              style={buttonStyles2} // Apply position styles to the Payment button
            >
              {deploying ? 'Done Payment' : 'Payment'}
            </button>
            <WalletMultiButton style={buttonStyles} />
          </div>
        </div>
           </div>
      </WalletModalProvider>
    </WalletProvider>
  );
}

export default App;
