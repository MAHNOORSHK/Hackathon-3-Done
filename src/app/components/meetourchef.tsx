'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { client } from '@/sanity/lib/client';

interface Chef {
  _id: string;
  name: string;
  role: string;
  imageUrl: string;
}

export default function MeetOurChef() {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // GROQ Query
  const fetchChefs = async () => {
    try {
      const data: Chef[] = await client.fetch(
        `*[_type == "chef"][0..3]{
          _id,
          name,
          role,
          "imageUrl": image.asset->url
        }`
      );
      setChefs(data);
    } catch (error) {
      console.error('Error fetching chefs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChefs();
  }, []);

  if (loading) {
    return <div className="text-center text-white bg-black py-14">Loading chefs...</div>;
  }

  return (
    <section className="text-[#FFFFFF] bg-black">
      <div className="px-4 sm:px-6 lg:px-8 py-14 mx-auto max-w-screen-xl">
        <div className="flex flex-col text-center w-full mb-12">
          <h2 className="text-[#FF9F0D] text-lg font-bold font-Great Vibes">Chefs</h2>
          <p className="text-[38px] font-bold">
            <span className="text-[#FF9F0D]">Me</span>et Our Chef
          </p>
        </div>

        <div className="flex flex-wrap -m-4 justify-center">
          {chefs.map((chef) => (
            <div key={chef._id} className="p-4 sm:w-1/2 lg:w-1/4 flex justify-center">
              <div className="h-[300px] relative w-full max-w-[250px]">
                <Image
                  src={chef.imageUrl}
                  alt={chef.name}
                  className="rounded-lg w-full h-[300px] object-cover object-center"
                  width={250}
                  height={300}
                />
                <div className="w-[200px] h-[70px] absolute bottom-0 bg-[#FFFFFF] text-black px-3 py-2 rounded-bl-md flex flex-col items-start justify-center font-bold">
                  <p className="text-[18px]">{chef.name}</p>
                  <p className="text-[14px]">{chef.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
