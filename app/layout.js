import "@/styles/globals.css";
import Navbar from "@/components/Navbar";

export const metadata = {
  title: "Davids Blog",
  description: "Blogging just got more fun!",
};

const RootLayout = ({ children }) => (
  <html lang="en">
    <body>
    <Navbar />
    <div>{children}</div>
      </body>
  </html>
);

export default RootLayout;