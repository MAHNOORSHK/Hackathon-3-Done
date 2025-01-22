"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaSearch, FaShareAlt, FaShoppingCart, FaHeart } from "react-icons/fa";
import Navbar from "../components/secondheader";
import blogauthor from "@/app/images/blogauthor.png";
import { createClient } from "next-sanity";

const client = createClient({
  projectId: "cm2r6qk4", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2023-01-01", // Use a recent date for the API version
  useCdn: true, // Set to false for fresh data
});

interface Food {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
}

const ShopPage = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const fetchFoods = async (query: string) => {
    const groqQuery = `*[_type == "food" && name match "${query}*"]{
      _id,
      name,
      "imageUrl": image.asset->url,
      price
    }`;

    try {
      const data = await client.fetch(groqQuery);
      setFoods(data);
    } catch (err) {
      console.error("Failed to fetch foods:", err);
      setFoods([]);
    }
  };

  useEffect(() => {
    fetchFoods(searchTerm);
  }, [searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = (e.target as HTMLFormElement)["search"].value.trim();
    setSearchTerm(query);
  };

  return (
    <>
      <Navbar />
      <section className="w-full signup-bg-image py-16 sm:py-20 md:py-24 lg:py-28 xl:py-32">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center">
            <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white font-bold text-center mb-6">
              Our Shop
            </h1>
            <div className="text-base sm:text-lg md:text-xl flex gap-2 text-center justify-center">
              <Link
                href="/"
                className="text-white hover:text-[#FF9F0D] transition-colors duration-300"
              >
                Home
              </Link>
              <span className="text-white">/</span>
              <Link href="/shop" className="text-[#FF9F0D]">
                Shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto py-8 px-6 lg:px-12">
          <div className="flex flex-wrap lg:flex-nowrap gap-8">
            {/* Food Section */}
            <div className="w-full lg:w-3/4">
              {/* Search Field */}
              <form onSubmit={handleSearch} className="flex w-full mb-6">
                <input
                  type="text"
                  name="search"
                  placeholder="Search your keyword..."
                  className="flex-1 px-4 py-2 border border-gray-300 bg-white rounded-l-md focus:outline-none focus:ring-0 focus:ring-[#FF9F0D] focus:border-[#FF9F0D] text-gray-700"
                />
                <button
                  type="submit"
                  className="bg-[#FF9F0D] px-4 rounded-r-md text-white flex items-center justify-center"
                >
                  <FaSearch />
                </button>
              </form>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.length > 0 ? (
                  foods.map((food) => (
                    <div
                      key={food._id}
                      className="bg-white rounded-md shadow-md overflow-hidden group relative"
                    >
                      <Image
                        src={food.imageUrl}
                        alt={food.name}
                        className="w-full h-50 object-cover"
                        width={300}
                        height={300}
                      />
                      <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Link
                          href="#"
                          className="text-white bg-gray-800 p-2 rounded-full hover:bg-[#FF9F0D]"
                        >
                          <FaShareAlt />
                        </Link>
                        <Link
                          href={`/shop/${food._id}`}  // Dynamic Link
                          className="text-white bg-gray-800 p-2 rounded-full hover:bg-[#FF9F0D]"
                        >
                          <FaShoppingCart />
                        </Link>

                        <Link
                          href="#"
                          className="text-white bg-gray-800 p-2 rounded-full hover:bg-[#FF9F0D]"
                        >
                          <FaHeart />
                        </Link>
                      </div>
                      <div className="p-4">
                        <h4 className="text-lg font-semibold">{food.name}</h4>
                        <p className="text-sm text-[#FF9F0D]">${food.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center">
                    <p className="text-xl text-gray-700">No products found.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 p-4 border-l-2">
              {/* Author Card */}
              <div className="bg-white rounded-md shadow-md p-4 mb-6">
                <Image
                  src={blogauthor}
                  alt="Author"
                  className="w-20 h-20 rounded-full mx-auto mb-3"
                  width={80}
                  height={80}
                />
                <h4 className="text-center font-bold text-lg mb-2">John Doe</h4>
                <p className="text-center text-sm text-gray-600">
                  Passionate about delivering the best meals. Explore our
                  curated collection of culinary delights!
                </p>
              </div>

              {/* Categories */}
              <div className="bg-white rounded-md shadow-md p-4 mb-6">
                <h4 className="font-bold text-lg mb-4 text-[#FF9F0D]">Categories</h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-[#FF9F0D]">
                      Breakfast
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-[#FF9F0D]">
                      Lunch
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-[#FF9F0D]">
                      Dinner
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-gray-700 hover:text-[#FF9F0D]">
                      Snacks
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Feedback Section */}
              <div className="bg-white rounded-md shadow-md p-4">
                <h4 className="font-bold text-lg mb-4 text-[#FF9F0D]">Feedback</h4>
                <textarea
                  placeholder="Leave your feedback..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md mb-3"
                ></textarea>
                <button className="bg-[#FF9F0D] w-full py-2 rounded-md text-white font-bold">
                  Submit
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopPage;
