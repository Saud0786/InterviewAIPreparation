import React from 'react';

const SpinnerLoader = () => {
  return (
    <div role="status" >
        <svg
             aria-hidden="true"
            className="inline w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-orange-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1l12 12M13 1L1 13"
            />
          </svg>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default SpinnerLoader;
