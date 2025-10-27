import localFont from "next/font/local";
import "../globals.css";
import Footer from "../Components/Footer";
import StoreProvider from "../StoreContext/store";
import AvatarChat from "../Components/AvatarChat";
import { Suspense } from "react";
import Loader from "../Components/Loader";
import { userId } from "../utils/constants";
import Header from "../Components/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "PixelBD",
  description: "Get all kind of next gen devices",
  icons : {
    icon : 'https://www.outletexpense.xyz/uploads/259-Shydul-Amir-Jihad/1761208216.png'
  }
};



export default async function RootLayout({ children }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/public/categories/${userId}`,{next : {revalidate : 360}});
  const data = await res.json();


  

 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased nunito`}
      >
      <StoreProvider>
          <Suspense fallback={<Loader />}>
          <div className=" bg-white">
          <Header data={data}/>
            {children}
            {/* <AvatarChat /> */}
          </div>
          <Footer data={data}/>
          </Suspense>
      </StoreProvider>
      </body>
    </html>
  );
}
