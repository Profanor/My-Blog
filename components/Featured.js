import Image from 'next/image';

const Featured = () => {
  return (
    <div id="featured" className="w-full h-screen grid grid-cols-3 gap-4 ml-2 p-24">
      <div className="relative overflow-hidden">
        <Image src="/images/gojou1.png" alt="Image 1" width={300} height={200} className="w-full h-auto transition-transform duration-300 transform hover:scale-110" />
        <div className="bg-gray-200 p-4 text-center text-black text-2xl">Is Gojou dead?</div>
      </div>
      <div className="relative overflow-hidden">
        <Image src="/images/killua.jpeg" alt="Image 2" width={300} height={400} className="w-full h-auto transition-transform duration-300 transform hover:scale-110" />
        <div className="bg-gray-200 p-4 text-center text-black text-2xl">Why anime fans prefer Killua to Gon</div>
      </div>
      <div className="relative overflow-hidden">
        <Image src="/images/naruto.png" alt="Image 1" width={300} height={200} className="w-full h-auto transition-transform duration-300 transform hover:scale-110" />
        <div className="bg-gray-200 p-4 text-center text-black text-2xl">Top 5 strongest naruto characters</div>
      </div>
      <div className="relative overflow-hidden">
        <Image src="/images/zenitsu.jpeg" alt="Image 2" width={300} height={400} className="w-full h-auto transition-transform duration-300 transform hover:scale-110" />
        <div className="bg-gray-200 p-4 text-center text-black text-2xl">when Zenitsu flips the switch</div>
      </div>
      <div className="relative overflow-hidden">
        <Image src="/images/solo-level.jpeg" alt="Image 2" width={300} height={400} className="w-full h-auto transition-transform duration-300 transform hover:scale-110" />
        <div className="bg-gray-200 p-4 text-center text-black text-2xl">solo levelling tops the anime ranking for 2024</div>
      </div>
      <div className="relative overflow-hidden">
        <Image src="/images/eren.jpeg" alt="Image 2" width={300} height={400} className="w-full h-auto transition-transform duration-300 transform hover:scale-110" />
        <div className="bg-gray-200 p-4 text-center text-black text-2xl">eren's choices..good or good?</div>
      </div>
    </div>
  );
};

export default Featured;
