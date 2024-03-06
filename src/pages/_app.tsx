import Navbar from "@/components/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className="flex justify-between font-montserrat">
      <div className="xl:w-[18%] w-0">
        <Navbar />
      </div>
      <Component {...pageProps} />
    </main>
  );
}
