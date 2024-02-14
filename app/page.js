import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
    <Navbar />
    <section className="w-full h-screen flex-center flex-col bg-cover bg-center bg-no-repeat"
    style={{ backgroundImage: "url('/images/kaneki.jpg')" }}
    >
      <h1 className="text-black text-4xl font-bold text-center">This is the Home page</h1>
    </section>
    <Footer />
    </>
    );
}
export default Home 
