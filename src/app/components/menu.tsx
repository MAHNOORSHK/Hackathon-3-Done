"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaShareAlt, FaShoppingCart } from "react-icons/fa";
import { createClient } from "next-sanity";

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
}

interface SanityFoodData {
  _id: string;
  name: string;
  imageUrl: string;
  price: number;
}

const client = createClient({
  projectId: "cm2r6qk4", // Replace with your Sanity project ID
  dataset: "production", // Replace with your dataset name
  apiVersion: "2023-01-01", // Use a recent date for the API version
  useCdn: true, // Set to false for fresh data
});

export default function Menu() {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetchSimilarProducts();
  }, []);

  const fetchSimilarProducts = async () => {
    try {
      // Sanity GROQ query to fetch products from your dataset
      const groqQuery = `*[_type == "food"]{
        _id,
        name,
        "imageUrl": image.asset->url,
        price
      }`;

      const data: SanityFoodData[] = await client.fetch(groqQuery);

      if (data) {
        // Use the first 4 products (adjust as needed)
        const similarProductsData: Product[] = data.slice(0, 4).map((item: SanityFoodData) => ({
          _id: item._id,
          name: item.name,
          imageUrl: item.imageUrl, // Corrected to point to the URL
          price: item.price || 19.99,  // Default price if not found
        }));
        setSimilarProducts(similarProductsData);
      }
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  return (
    <div className="w-full bg-black text-[#FF9F0D]">
      {/* Main container with left-right padding */}
      <section className="text-[#FFFFFF] bg-black">
        <div className="px-4 sm:px-6 lg:px-8 py-14 mx-auto max-w-screen-xl">
          {/* Similar Products Section */}
          <p className="text-[38px] font-bold text-center mb-5">
            <span className="text-[#FF9F0D]">Our</span> Shop
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarProducts.map((product) => (
              <div
                key={product._id}
                className="bg-[#1a1a1a] rounded-md shadow-lg overflow-hidden group relative transform hover:scale-105 transition-transform duration-300"
              >
                {/* Main Image */}
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-50 object-cover"
                  width={300}
                  height={300}
                />

                {/* Hover Overlay with Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link
                    href="#"
                    className="text-[#FF9F0D] bg-gray-800 p-2 rounded-full hover:bg-[#FF9F0D] hover:text-black"
                  >
                    <FaShareAlt />
                  </Link>
                  <Link
                    href={`/shop/${product._id}`}
                    className="text-[#FF9F0D] bg-gray-800 p-2 rounded-full hover:bg-[#FF9F0D] hover:text-black"
                  >
                    <FaShoppingCart />
                  </Link>
                  <Link
                    href="#"
                    className="text-[#FF9F0D] bg-gray-800 p-2 rounded-full hover:bg-[#FF9F0D] hover:text-black"
                  >
                    <FaHeart />
                  </Link>
                </div>

                {/* Product Details */}
                <div className="p-4 text-center">
                  <h4 className="text-lg font-semibold">{product.name}</h4>
                  <p className="text-sm text-[#FF9F0D] font-medium">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Show More Button */}
          <div className="text-center mt-10">
            <Link
              href="/shop"
              className="inline-block bg-[#FF9F0D] text-black px-8 py-3 rounded-md font-semibold hover:bg-[#e08e0c]"
            >
              Show More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
