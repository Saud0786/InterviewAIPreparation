import React, { useState } from "react";
import interfaceImage from "../assets/interface.jpg";
import { useNavigate } from "react-router-dom";
import { LuSparkles } from "react-icons/lu";
import {APP_FEATURES as APP, APP_FEATURES} from "../utils/data"; 

import Signup from "./Auth/Signup";
import Modal from "../components/Modal";
import Login from "./Auth/Login";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import ProfileInfoCard from "../components/Cards/ProfileInfoCard";

function LandingPage() {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currPage, setCurrPage] = useState("login");

  const handleCTA = () => {

    if(!user){
      setOpenAuthModal(true);
    }else{
      navigate("/dashboard");
    }

  };

  return (
    <>
      {/* Hero Section */}
      <div className="w-full min-h-full bg-[#FFFCEF] ">
        {" "}
        {/* Gradient blob */}
        {/* Floating + glowing blob */}
        <div className="w-[300px] h-[300px] bg-amber-200 blur-[65px] absolute top-0 left-0 opacity-80 animate-blob1 animate-glow" />
        {/* Rotation + blob movement */}
        <div className="w-[300px] h-[300px] bg-pink-300 blur-[70px] absolute top-20 left-15 opacity-60 animate-blob2 animate-spin-slow" />
        {/* Color-shifting + blob3 movement */}
        <div className="w-[300px] h-[300px] blur-[60px] absolute top-40 left-15 opacity-50 animate-blob3 animate-color-shift" />
        {/* Main Content */}
        <div className="container mx-auto px-4 pt-6 pb-6 relative z-10">
          {" "}
          {/* Adjusted padding */}
          {/* Header */}
          <header className="flex justify-between items-center mb-12">
            <div className="text-xl text-black font-bold">
              Interview Prep AI
            </div>
            {user ? <ProfileInfoCard/> :<button
              className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:from-black hover:to-black hover:text-white border border-none transition-colors duration-300 cursor-pointer"
              onClick={() => setOpenAuthModal(true)} // Opens the authentication modal on click
            >
              Login / Sign Up
            </button>}
          </header>
          {/* Hero Content */}
          <div className="flex flex-col md:flex-row items-center">
            {/* Left Column */}
            <div className="w-full md:w-1/2 pr-0 md:pr-6 mb-6">
              <div className="flex items-center justify-start mb-3">
                <div className="flex items-center gap-2 text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles />
                  AI Powered
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl text-black font-medium mb-4 leading-tight">
                Ace Interviews with
                <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,#FF9324_0%,#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  AI-Powered
                </span>{" "}
                Learning
              </h1>
            </div>

            {/* Right Column */}
            <div className="w-full md:w-1/2">
              <p className="text-[17px] text-gray-900 mr-0 md:mr-10 mb-6 leading-relaxed">
                Get role-specific questions, expand answers when you need them,
                dive deeper into concepts, and organize everything your way.
                From preparation to mastery — your ultimate interview toolkit is
                here.
              </p>
              <button
                className="bg-black text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors duration-300 cursor-pointer"
                onClick={handleCTA} // Calls handleCTA function on click
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Image Section */}
      <div className="pt-12 md:pt-0 pb-12 bg-[#FFFCEF]">
        {/* Adjusted padding */}
        <section className="flex items-center justify-center">
          <img
            src={interfaceImage} // Image to display
            alt="Interface Preview"
            className="w-[90vw] max-w-4xl rounded-xl shadow-lg border border-gray-200 transition-transform duration-500 ease-in-out hover:scale-105" // Styling for the image
          />
        </section>
      </div>

     {/* Footer Section */}
      <div className="bg-[#FFFCEF] pt-16 pb-10 px-4 md:px-16 text-gray-800">
  <section>
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Features That Make You Shine
    </h2>

    {/* First 3 cards in 3 columns */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {APP_FEATURES.slice(0, 3).map((feature) => (
        <div
          key={feature.id}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md transition-all duration-300 transform hover:scale-95 hover:shadow-[0_8px_30px_rgba(255,193,7,0.4)]"
        >
          <h3 className="text-xl font-semibold text-black mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>

    {/* Remaining 2 cards in 2 columns */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
      {APP_FEATURES.slice(3).map((feature) => (
        <div
          key={feature.id}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-md transition-all duration-300 transform hover:scale-95 hover:shadow-[0_8px_30px_rgba(255,193,7,0.4)]"
        >
          <h3 className="text-xl font-semibold text-black mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 text-sm">{feature.description}</p>
        </div>
      ))}
    </div>
  </section>

  {/* Footer note */}
  <div className="text-center text-sm text-gray-500 mt-14">
    Made with ❤️ by <span className="text-black font-medium">Saud Ansari</span>
  </div>
      </div>
            

        <Modal isOpen={openAuthModal} onClose ={()=>{
          setOpenAuthModal(false);
          setCurrPage("login");
           }} 
          hideHeader
          >
           <div>
            {currPage ==="login" && (
              <Login setCurrPage={setCurrPage} />
            )}
            {currPage ==="signup" && (
              <Signup setCurrPage={setCurrPage} />
            )}
           </div>
          
          </Modal>    


    </>
  );
}

export default LandingPage;
