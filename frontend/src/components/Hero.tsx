import React , { useState } from "react";
import TalkToAI from "./TalkToAI";



export default function Hero() {
  const [isTalkingToAI, setIsTalkingToAI] = useState(false);
  
  return (
    <section className="text-center py-16 px-4">
      <h1 className="text-5xl font-bold text-gray-900 mb-4">
        Hi, I’m <span className="text-indigo-600">Shashi Tiwari</span>
      </h1>

      <p className="text-lg md:text-xl text-gray-600 mb-8">
        Frontend Developer • Backend Engineer • AI Explorer
      </p>

      <div className="flex justify-center gap-4 flex-wrap mb-10">

        <a href="#resume" className="border h-10  border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100">
          View Resume
        </a>

        <TalkToAI isTalkingToAI={isTalkingToAI} setIsTalkingToAI={setIsTalkingToAI} />


        <a href="#projectGrid" className="border h-10 border-gray-300 px-6 py-2 rounded-lg hover:bg-gray-100">
          View Projects
        </a>
      </div>
    </section>
  );
}