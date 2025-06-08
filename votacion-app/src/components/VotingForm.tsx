/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ethers } from "ethers";
import Voting from "../contracts/Voting.json";

const CONTRACT_ADDRESS = "0xe921C3E86431AB4Ee2938530ab635e0449E973DD"; // Replace with deployed contract address

const VotingForm: React.FC = () => {
  const [account, setAccount] = useState<string | null>(null);
  const [candidate, setCandidate] = useState<string>("");
  const [status, setStatus] = useState<string>("Desconectado");
  const [txStatus, setTxStatus] = useState<string>("");

  const connectWallet = async () => {
    try {
      if ((window as any)?.ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        setStatus(`Conectado: ${accounts[0].substring(0, 8)}...`);
      } else {
        setStatus("MetaMask no detectado");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error al conectar");
    }
  };

  const vote = async () => {
    if (!candidate || !account) {
      setTxStatus("Ingresa un candidato y conecta la wallet");
      return;
    }
    try {
      setTxStatus("Enviando voto...");
      const provider = new ethers.BrowserProvider((window as any)?.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        Voting.abi,
        signer
      );
      const tx = await contract.votar(candidate);
      await tx.wait();
      setTxStatus("Voto registrado!");
    } catch (error) {
      console.error(error);
      setTxStatus("Error al votar");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Voting DApp</h1>
        <button
          onClick={connectWallet}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          {account ? "Conectado" : "Conectar Wallet"}
        </button>
      </header>
      <p className="mb-4">{status}</p>
      <div className="flex flex-col space-y-4 max-w-md mx-auto">
        <input
          type="text"
          placeholder="Nombre del candidato"
          value={candidate}
          onChange={(e) => setCandidate(e.target.value)}
          className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={vote}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition disabled:bg-gray-400"
          disabled={!account || !candidate}
        >
          Votar
        </button>
        <p className="text-sm">{txStatus}</p>
      </div>
    </div>
  );
};

export default VotingForm;
