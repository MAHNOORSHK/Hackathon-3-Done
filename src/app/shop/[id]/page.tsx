"use client";
import { FaShoppingCart } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { createClient } from "next-sanity";
import Navbar from "@/app/components/secondheader";
import { useAppDispatch } from "@/app/store/hooks";
import { addToCart } from "@/app/store/features/cart";
import { useEffect, useState } from "react";
import Link from "next/link";

const client = createClient({
  projectId: "cm2r6qk4",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
});

interface FoodDetail {
  _id: string;
  name: string;
  price: number;
  originalPrice: number;
  imageUrl: string;
  description: string;
  category: string;
  tags: string[];
  available: boolean;
}

const FoodDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const [food, setFood] = useState<FoodDetail | null>(null);
  const [similarProducts, setSimilarProducts] = useState<FoodDetail[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const fetchFoodData = async () => {
      const paramsData = await params;
      const foodId = paramsData.id;

      const foodQuery = `*[_type == "food" && _id == "${foodId}"]{
        _id,
        name,
        price,
        originalPrice,
        "imageUrl": image.asset->url,
        description,
        category,
        tags,
        available
      }`;

      const data = await client.fetch(foodQuery);
      setFood(data[0] || null);

      if (data[0]?.tags?.length > 0) {
        const similarQuery = `*[_type == "food" && _id != "${foodId}" && "${data[0].tags[0]}" in tags]{
          _id,
          name,
          price,
          originalPrice,
          "imageUrl": image.asset->url,
          description,
          category,
          tags,
          available
        }[0...4]`;

        const similarData = await client.fetch(similarQuery);
        setSimilarProducts(similarData);
      }
    };

    fetchFoodData();
  }, [params]);

  const handleAddToCart = () => {
    if (food) {
      dispatch(
        addToCart({
          _id: food._id,
          name: food.name,
          price: food.price,
          imageUrl: food.imageUrl,
          quantity: 1,
        })
      );
      router.push("/shopcart");
    }
  };

  if (!food) return <div className="text-center py-20">Loading...</div>;

  return (
    <>
      <Navbar />
       {/* Hero Section */}
       <section className="w-full signup-bg-image py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center">
            <h1 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white font-bold text-center mb-4 sm:mb-6">
              Shop Detail
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
                Shop Detail
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="container mx-auto px-6 lg:px-16 py-10">
        {/* Food Details Section */}
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Image Section */}
          <div className="w-full lg:w-1/3">
            <Image
              src={food.imageUrl}
              alt={food.name}
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
          {/* Details Section */}
          <div className="w-full lg:w-1/2">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{food.name}</h1>
            <p className="text-gray-600 mb-2">{food.category}</p> {/* Category */}
            {food.originalPrice && food.originalPrice !== food.price && (
              <p className="text-lg font-medium text-gray-500 line-through">
                ${food.originalPrice.toFixed(2)}
              </p>
            )}
            <p className="text-2xl font-semibold text-gray-900 mb-4">
              ${food.price.toFixed(2)}
            </p> {/* Current Price */}
            {food.tags && food.tags.length > 0 && (
              <div className="mb-2">
                {food.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-4 py-2 bg-gray-200 text-sm rounded-full mr-2 mb-2"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
            <p className="text-gray-600 mb-2">{food.description}</p> {/* Description */}
            <span
              className={`px-3 py-1 rounded-full ${
                food.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
              }`}
            >
              {food.available ? "Available" : "Out of Stock"}
            </span> {/* Availability */}
            <button
              onClick={handleAddToCart}
              className="px-8 py-4 bg-[#FF9F0D] text-white rounded-lg shadow-md hover:bg-[#FF7F00] transition mt-6"
            >
              Add to Cart <FaShoppingCart className="inline ml-2" />
            </button>
          </div>
        </div>

        {/* Similar Products Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">Similar Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {similarProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white border border-gray-200 rounded-lg shadow hover:shadow-lg transition p-4"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={300}
                  height={300}
                  className="rounded-lg mb-4"
                />
                <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
                {product.originalPrice && product.originalPrice !== product.price && (
                  <p className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </p> 
                )}
                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        imageUrl: product.imageUrl,
                        quantity: 1,
                      })
                    );
                    router.push("/shopcart");
                  }}
                  className="w-full py-2 bg-[#FF9F0D] text-white rounded-md hover:bg-[#FF7F00] transition"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FoodDetailPage;
