import React from "react";
import { useEffect, useState } from "react";
const LoginButton = () => {
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
  //   useEffect(() => {
  //     connectAccounts();
  //   }, []);

  return (
    <>
      {accounts.length !== 0 ? (
        "Profile"
      ) : (
        <button onClick={connectAccounts}>Login</button>
      )}
    </>
  );
};

export default LoginButton;
