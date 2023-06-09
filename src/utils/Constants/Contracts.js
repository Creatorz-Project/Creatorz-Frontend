import { ethers } from "ethers";
export const getContract = async (Address, ABI) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(Address, ABI, signer);
    return contract;
  } catch (err) {
    console.log(err);
  }
};
