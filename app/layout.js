'use client';
import Navbar from "@/components/Navbar";
import { SessionProvider } from 'next-auth/react';
import "@/styles/globals.css";

// export const metadata = {
//   title: "Davids Blog",
//   description: "Blogging just got more fun!",
// };

const RootLayout = ({ children, session }) => (
  <html lang="en">
    <body>
      <SessionProvider session={session}>
        <Navbar />
        <div>{children}</div>
      </SessionProvider>
    </body>
  </html>
);

export default RootLayout;
