import React from 'react'
import Image from 'next/image'
import client1 from "@/app/images/client1.png";
import client2 from "@/app/images/client2.png";
import client3 from "@/app/images/client3.png";
import client4 from "@/app/images/client4.png";

export default function Client() {
    return (
        <section className="relative text-gray-600 client-bg-image py-9">
            {/* Background Overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content */}
            <div className="relative px-5 py-14 mx-auto max-w-screen-xl">
                <div className="flex flex-wrap justify-center -m-4 text-center">
                    <div className="p-4 sm:w-1/4 w-1/2 flex flex-col items-center">
                        {/* Image */}
                        <div className="w-24 h-24 flex items-center justify-center rounded-full mb-4">
                            <Image src={client1} alt='' />
                        </div>

                        {/* Text */}
                        <h2 className="font-bold sm:text-xl text-2xl text-[#FF9F0D]">Professional Chefs</h2>
                        <p className="leading-relaxed text-gray-300 text-[30px] font-bold">420</p>
                    </div>

                    <div className="p-4 sm:w-1/4 w-1/2 flex flex-col items-center">
                        {/* Image */}
                        <div className="w-24 h-24 flex items-center justify-center rounded-full mb-4">
                            <Image src={client2} alt='' />
                        </div>

                        {/* Text */}
                        <h2 className="font-bold sm:text-xl text-2xl text-[#FF9F0D]">Items of Food</h2>
                        <p className="leading-relaxed text-gray-300 text-[30px] font-bold">320</p>
                    </div>

                    <div className="p-4 sm:w-1/4 w-1/2 flex flex-col items-center">
                        {/* Image */}
                        <div className="w-24 h-24 flex items-center justify-center rounded-full mb-4">
                            <Image src={client3} alt='' />
                        </div>

                        {/* Text */}
                        <h2 className="font-bold sm:text-xl text-2xl text-[#FF9F0D]">Years of Experience</h2>
                        <p className="leading-relaxed text-gray-300 text-[30px] font-bold">30+</p>
                    </div>

                    <div className="p-4 sm:w-1/4 w-1/2 flex flex-col items-center">
                        {/* Image */}
                        <div className="w-24 h-24 flex items-center justify-center rounded-full mb-4">
                            <Image src={client4} alt='' />
                        </div>

                        {/* Text */}
                        <h2 className="font-bold sm:text-xl text-2xl text-[#FF9F0D]">Happy Customers</h2>
                        <p className="leading-relaxed text-gray-300 text-[30px] font-bold">220</p>
                    </div> 
                </div>
            </div>
        </section>
    )
}
