import Image from "next/image";
import Link from "next/link";

const Content = () => {
  return (
    <div id="about" className="w-full min-h-screen h-3/4 flex-center flex-col items-center border border-white">
      <div className="flex flex-col md:flex-row items-center">
        <div className="md:ml-14 p-8 mt-24">
          <Image src="/images/kaneki.jpeg" alt="image" width={800} height={600} layout="responsive" />
        </div>
        <div className="text-center md:text-left ml-0 md:ml-14 p-14 mt-10">
          <p className="text-2xl mt-14">Welcome to <span className="text-orange-500">Apex</span> Blog<br/>
            I'm a part of a generation that loves anime, movies, and video games.<br/>
            Now, think about when you stumble upon an awesome series –<br/> the excitement is real! 
            You want to dive deep, learn everything there is to know, <br/>and maybe even share your newfound knowledge with friends.<br/>
            Well, that’s what Apex Blog is all about!<br/>
            See if you find something that makes you say, Wow, that’s cool! Have fun!”
            click here to view  
            <Link href="/posts" className="text-orange-500"> posts</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Content;
