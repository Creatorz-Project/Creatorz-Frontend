export default function InfoModal(props) {
  return (
    <>
      {props.open && (
        <div
          id="popup-modal"
          tabindex="-1"
          class="flex justify-center items-center bg-opacity-50 bg-gray-900 fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div class="relative w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                onClick={() => props.setOpen(false)}
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                data-modal-hide="popup-modal"
              >
                <span class="sr-only">Close</span>
              </button>
              <div class="p-6 text-center">
                <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Buy social tokens to support creators and their projects while
                  enjoying exclusive perks and rewards. Your investment not only
                  empowers creators but also grants you access to unique
                  benefits and experiences. Join the community, uplift creators,
                  and unlock exciting rewards with social tokens.
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  onClick={() => props.setOpen(false)}
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
