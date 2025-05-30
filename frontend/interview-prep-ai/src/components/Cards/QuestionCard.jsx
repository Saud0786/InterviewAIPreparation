import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../../Pages/InterviewPrep/components/AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef();

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 20); // a bit more padding for comfort
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg mb-5 shadow-xl shadow-gray-200 border border-gray-200 group transition-shadow hover:shadow-2xl">
      {/* Question header */}
      <div className="flex items-start justify-between cursor-pointer px-5 py-4">
        <div className="flex items-start gap-3.5 max-w-[calc(100%-120px)]">
          <span className="text-xs md:text-sm font-semibold text-gray-400 leading-[18px] select-none">
            Q
          </span>
          <h3
            className="text-sm md:text-base font-medium text-gray-900 mr-0 md:mr-20 break-words"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        {/* Buttons */}
        <div className="flex items-center ml-4 relative space-x-2">
          <div
            className={`flex items-center gap-2 ${
              isExpanded ? "md:flex" : "md:hidden group-hover:flex"
            }`}
          >
            <button
              className="flex items-center gap-1 text-xs md:text-sm text-indigo-800 font-semibold bg-indigo-50 px-3 py-1 rounded border border-indigo-100 hover:border-indigo-300 transition"
              onClick={onTogglePin}
              aria-label={isPinned ? "Unpin question" : "Pin question"}
            >
              {isPinned ? <LuPinOff size={14} /> : <LuPin size={14} />}
              <span className="hidden md:inline">{isPinned ? "Unpin" : "Pin"}</span>
            </button>

            <button
              className="flex items-center gap-1 text-xs md:text-sm text-cyan-800 font-semibold bg-cyan-50 px-3 py-1 rounded border border-cyan-100 hover:border-cyan-300 transition"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore();
              }}
              aria-label="Learn more about this question"
            >
              <LuSparkles size={16} />
              <span className="hidden md:inline">Learn More</span>
            </button>
          </div>

          <button
            className="text-gray-400 hover:text-gray-600 focus:outline-none transition"
            onClick={toggleExpand}
            aria-label={isExpanded ? "Collapse answer" : "Expand answer"}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Expandable answer content */}
      <div
        className="overflow-hidden transition-max-height duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          className="mt-3 mb-6 text-gray-700 bg-gray-50 px-6 py-4 rounded-b-lg"
          ref={contentRef}
        >
          <AIResponsePreview content={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
