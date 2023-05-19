

export default function RoomCard(props) {
    return (
        <main
          
            class="relative block overflow-hidden rounded-lg border border-gray-900 p-4 sm:p-6 lg:p-8"
        >
            <span
                class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-300 to-blue-600"
            ></span>

            <div class="sm:flex sm:justify-between sm:gap-4">
                <div>
                    <h3 class="text-lg font-bold text-gray-200 sm:text-xl">
                        {props.room.title}
                    </h3>

                    <p class="mt-1 text-xs font-medium text-gray-100">By {props.room?.Creator?.slice(0, 7)}...</p>
                </div>

                <div class="hidden sm:block sm:shrink-0">
                    <img
                        alt="Paul Clapton"
                        src={`https://ipfs.io/ipfs/${props.room.wallPoster}`}
                        class="h-16 w-16 rounded-lg object-cover shadow-sm"
                    />
                </div>
            </div>

            <div class="mt-4">
                <p class="max-w-[40ch] text-sm text-gray-200">
                    {props.room.description}
                </p>
            </div>

            <dl class="mt-6 flex gap-4 sm:gap-6">
                <div class="flex flex-col-reverse">
                    <dt class="text-sm font-medium text-gray-200">Published</dt>
                    <dd class="text-xs text-gray-300">{props.room.CreatedDate}</dd>
                </div>

                <div class="flex flex-col-reverse">
                    <dt class="text-sm font-medium text-gray-200">Price</dt>
                    <dd class="text-xs text-gray-300">{props.room.Price}</dd>
                </div>
            </dl>
        </main>
    )
}