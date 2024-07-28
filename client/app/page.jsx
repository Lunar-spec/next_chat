import Image from "next/image";
import Link from "next/link";
import ThemeButton from "@/components/shared/ThemeButton";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full items-center gap-8 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-md lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Let&apos;s talk!!&nbsp;🦜
          <span>
            <ThemeButton />
          </span>
        </p>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[400px] before:w-full sm:before:w-[680px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-yellow-500 after:via-[#ff01b3] after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-yellow-400 before:dark:opacity-10 after:dark:from-red-500 after:dark:via-[#ff01b3] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/chat.svg"
          alt="Chat Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="flex justify-between w-full flex-col lg:flex-row gap-4 lg:mx-32">
        <Link
          href={"/login"}
          className="group rounded-sm border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Login{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Login and start talking!
          </p>
        </Link>

        <Link
          href={"/register"}
          className="group rounded-sm border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Register{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Register to get started!
          </p>
        </Link>
        <Link
          href={'/chat'}
          className="group rounded-sm border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Enter the room{" "}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              →
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            Click here to start talking!
          </p>
        </Link>
      </div>
    </main>
  );
}
