import Navbar from "@/components/Navbar";
import Video from "@/components/Video";
import Content from "@/components/Content";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
    <Navbar />
      <Video />
        <Content />
          <Featured />
            <Footer />
    </>
  );
};

export default Home;