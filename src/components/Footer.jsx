import Link from "next/link";

export default function Footer() {
  return (
    <footer class="bg-[#150A22] rounded-lg shadow border-t-2 border-solid border-[#39294C]">
      <div class="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span class="text-sm sm:text-center text-gray-400">
          © 2023{" "}
          <Link href="/" class="hover:underline">
            Creatorz™
          </Link>
          . All Rights Reserved.
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
          <li>
            <Link href="/about" class="mr-4 hover:underline md:mr-6 ">
              About
            </Link>
          </li>
          <li>
            <Link href="#" class="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="https://www.notion.so/ayush45/Creatorz-394ea368aed246d7b10446c162e1e1c3"
              target="_blank"
              referrerPolicy="no-referrer"
              class="mr-4 hover:underline md:mr-6"
            >
              Documentation
            </Link>
          </li>
          <li>
            <Link href="#" class="hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
