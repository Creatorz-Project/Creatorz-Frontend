import { useState } from "react";
export default function BuyModal(props) {
  const [amount, setAmount] = useState(0);

  return (
    <>
      {props.open && (
        <main
          id="content"
          role="main"
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full flex items-center justify-center bg-[rgba(0,0,0,0.5)]"
        >
          <div class="mt-7  rounded-xl shadow-lg bg-gray-800 border-gray-700 w-[28%]">
            <div class="p-4 sm:p-7">
              <div class="text-center">
                <h1 class="block text-2xl font-bold text-white">Buy Token</h1>
                <p class="mt-2 text-sm text-gray-400">
                  fill these details to buy token
                  {/* <a class="text-blue-600 decoration-2 hover:underline font-medium" href="#">
                                    Login here
                                </a> */}
                </p>
              </div>

              <div class="mt-5">
                <form>
                  <div class="grid gap-y-4">
                    <div>
                      <label
                        for="ownerPercentage"
                        class="block text-sm font-bold ml-1 mb-2 text-white"
                      >
                        Amount You want to Buy
                      </label>
                      <input
                        placeholder="buying amount"
                        type="number"
                        onChange={(e) => setAmount(e.target.value)}
                        name="ownerPercentage"
                        className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 shadow-sm text-black"
                      />
                    </div>
                    {amount.length > 0 ? (
                      <button
                        // type="submit"
                        onClick={(event) => props.buyToken(event, amount)}
                        class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
                      >
                        Buy Token
                      </button>
                    ) : (
                      <button
                        class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
                        disabled
                      >
                        Buy Token
                      </button>
                    )}
                    <button
                      onClick={() => props.openHandler()}
                      class="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-gray-600 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all text-sm focus:ring-offset-gray-800"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
