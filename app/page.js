import Navbar from "@/components/Navbar";
import Video from "@/components/Video";
import Content from "@/components/Content";
import Featured from "@/components/Featured";
import Footer from "@/components/Footer";
import ScrollToTopButton from "@/components/Scroll/ScrollToTopButton";

const Home = () => {
  return (
    <>
    <Navbar />
      <Video />
        <Content />
          <Featured />
            <Footer />
            <ScrollToTopButton />
    </>
  );
};

export default Home;