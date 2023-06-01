import { useState } from "react";
import TokenInfoModal from "./TokenInfoModal.jsx";
import { getContract } from "@/utils/Constants/Contracts.js";
import { Marketplace as MAddress } from "@/utils/Constants/Addresses.js";
import { Marketplace as MABI } from "@/utils/Constants/ABIs.js";
import BuyModal from "./BuyModal.jsx";

export default function TokenCard(props) {
  const [open, setOpen] = useState(false);
  const [openBuyModal, setOpenBuyModal] = useState(false);

  const openBuyModalHandler = () => {
    setOpenBuyModal(!openBuyModal);
  };

  const openHandler = () => {
    setOpen(!open);
  };

  const BuyToken = async (event, amount) => {
    event.preventDefault();
    console.log(amount);
    console.log(props.token.Holder);
    try {
      const contract = await getContract(MAddress, MABI);
      const tx = await contract.buySocialToken(
        props.token.SocialTokenId,
        amount,
        props.token.Holder
      );
      await tx.wait();
    } catch (err) {
      console.log(err);
    }
  };

  console.log(open);

  return (
    <div className="!z-5 relative flex flex-col rounded-[20px] bg-clip-border shadow-3xl shadow-shadow-500 w-full !p-4 3xl:p-![18px]">
      <div className="h-full w-full">
        <div className="relative w-full">
          <img
            src="https://images.unsplash.com/photo-1676911809759-77bb68b691c9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=749&q=80"
            className="mb-3 h-[200px] w-full object-cover rounded-xl 3xl:h-full 3xl:w-full"
            alt=""
          />
          {/* <button class="absolute top-3 right-3 flex items-center justify-center rounded-full bg-white p-2 text-brand-500 hover:cursor-pointer">
                        <div class="flex h-full w-full items-center justify-center rounded-full text-xl hover:bg-gray-50">
                            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="32" d="M352.92 80C288 80 256 144 256 144s-32-64-96.92-64c-52.76 0-94.54 44.14-95.08 96.81-1.1 109.33 86.73 187.08 183 252.42a16 16 0 0018 0c96.26-65.34 184.09-143.09 183-252.42-.54-52.67-42.32-96.81-95.08-96.81z"></path></svg>
                        </div> 
                    </button> */}
        </div>
        <div onClick={() => openHandler()}>
          <div className="mb-3 flex items-center justify-between px-1 md:items-start">
            <div className="mb-2">
              <p className="text-lg font-bold text-navy-700">
                {" "}
                {props.token.title}{" "}
              </p>
              <p className="mt-1 text-sm font-medium text-gray-500 md:mt-2">
                By {props.token?.Creator?.slice(0, 7)}...
              </p>
            </div>
            {/* <div class="flex flex-row-reverse md:mt-2 lg:mt-0">
                        <span class="z-0 ml-px inline-flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#E0E5F2] text-xs text-navy-700 ">+5</span><span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                            <img class="h-full w-full rounded-full object-cover" src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar1.eeef2af6dfcd3ff23cb8.png" alt="" />
                        </span>
                        <span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                            <img class="h-full w-full rounded-full object-cover" src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar2.5692c39db4f8c0ea999e.png" alt="" />
                        </span>
                        <span class="z-10 -mr-3 h-8 w-8 rounded-full border-2 border-white">
                            <img class="h-full w-full rounded-full object-cover" src="https://horizon-tailwind-react-git-tailwind-components-horizon-ui.vercel.app/static/media/avatar3.9f646ac5920fa40adf00.png" alt="" />
                        </span>
                    </div> */}
          </div>
        </div>
        <div className="flex items-center justify-between md:items-center lg:justify-between ">
          <div className="flex">
            <p className="!mb-0 text-sm font-bold text-brand-500">
              Amount for Sale: <span>{props.token.AmountListedByHolder}</span>
            </p>
          </div>
          <button
            onClick={() => openBuyModalHandler()}
            className="linear rounded-[15px] bg-sky-700 hover:bg-sky-600 px-4 py-2 text-base font-medium text-white transition duration-200 hover:bg-brand-800 active:bg-brand-700"
          >
            Buy
          </button>
        </div>
      </div>
      <TokenInfoModal
        openHandler={openHandler}
        open={open}
        data={props.token}
      />
      <BuyModal
        openHandler={openBuyModalHandler}
        open={openBuyModal}
        buyToken={BuyToken}
      />
    </div>
  );
}
