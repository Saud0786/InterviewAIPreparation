import React, { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6';

const Input = ({ value, onChange, label, placeholder, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="mb-5">
      <label className="block mb-2 text-sm font-semibold text-slate-800">
        {label}
      </label>

      <div className="relative flex items-center border border-gray-300 rounded-md bg-white shadow-sm
                      focus-within:border-primary focus-within:ring-1 focus-within:ring-primary
                      transition-colors duration-300">
        <input
          type={type === "password" ? (showPassword ? "text" : "password") : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-3 text-base text-gray-900 placeholder-gray-400 bg-transparent outline-none"
        />

        {type === "password" && (
          <button
            type="button"
            onClick={toggleShowPassword}
            className="absolute right-3 text-gray-500 hover:text-primary transition-colors duration-200"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
