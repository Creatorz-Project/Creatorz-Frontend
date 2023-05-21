import Lottie from "react-lottie-player";
import animationData from '@/../../public/assets/success.json';

export default function SuccessDialog(props) {



    return (
        <>
            {props.open &&

                <div id="popup-modal" tabindex="-1" className="fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="p-6 text-center">
                                <Lottie className="mx-auto mb-4 w-32 h-32" loop animationData={animationData} play />
                                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                                <button data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600" onClick={() => props.openHandler()}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}