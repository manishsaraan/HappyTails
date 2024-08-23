import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

function HeroSection() {
  return (
    <section className="bg-gradient-to-b from-yellow-50 via-green-50 to-blue-50 py-20">
      <div className="container mx-auto text-center max-w-[800px]">
        <div className="mb-8">
          <Image
            src="/path-to-your-logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="mx-auto"
          />
        </div>
        <div className="flex justify-center mb-6">
          <Image
            src="/path-to-customer-avatars.png"
            alt="Happy Customers"
            width={300}
            height={50}
          />
        </div>
        <div className="flex justify-center items-center mb-2">
          <span className="text-lg font-semibold mr-2">Happy Customers</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
              </svg>
            ))}
          </div>
        </div>
        <h1 className="text-5xl font-bold mb-6">
          Need a dependable<br />developer for your startup?
        </h1>
        <p className="text-xl mb-10 text-gray-700">
          Let's transform your innovative ideas into reality. Specializing in fast-paced projects,<br />
          I integrate seamlessly with your team to deliver dynamic solutions tailored to your business needs.
        </p>
        <Button className="bg-black text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-800 transition">
          Book Your Free Consultation →
        </Button>
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="App">
      <HeroSection />
    </div>
  );
}

export default App;