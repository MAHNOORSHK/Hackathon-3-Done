import Link from "next/link";
import Navbar from "../components/secondheader";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
     <Navbar/>
    <section className='w-full signup-bg-image py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28'>
      <div className='container mx-auto px-4'>
        <div className='flex flex-col items-center'>
          <h1 className='text-xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-white font-bold text-center mb-4 sm:mb-6'>
            Sign In Page
          </h1>
          <div className='text-base sm:text-lg md:text-xl flex gap-2 text-center justify-center'>
            <Link href="/" className='text-white hover:text-[#FF9F0D] transition-colors duration-300'>
              Home
            </Link>
            <span className='text-white'>/</span>
            <Link href="/" className='text-[#FF9F0D]'>
              SignIn
            </Link>
          </div>
        </div>
      </div>
    </section>
    <div className="min-h-screen bg-white">
      {/* Signin Form */}
      <section className="py-16">
        <div className="container mx-auto max-w-md bg-white shadow-lg rounded-md p-8 ">
        <SignedIn><div className="text-center"> <UserButton/>
         <h1 className="text-3xl font-bold">Welcome to Food Tuck!!</h1>
         </div>
         </SignedIn>
         <SignedOut>
          <h3 className="text-2xl font-bold mb-6 text-center">Sign In</h3>
          <form>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Name</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-[#FF9F0D]"
                placeholder="Enter your name"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Email</label>
              <input
                type="email"
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-[#FF9F0D]"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Password</label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-[#FF9F0D]"
                placeholder="Enter your password"
              />
            </div>
            </form>
            <div className="flex items-center mb-4">
              <input type="checkbox" className="mr-2" />
              <span>Remember me?</span>
            </div>
            <div
              className="w-full bg-[#FF9F0D] hover:bg-[#FF9F0D] text-white font-bold py-2 rounded text-center"
            >
              <SignInButton mode="modal"/>
            </div>
           
          </SignedOut>
        </div>
      </section>

         </div>

      </>
  );
}