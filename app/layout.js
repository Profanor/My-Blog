import Navbar from "@/components/Navbar";
import "@/styles/globals.css";

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