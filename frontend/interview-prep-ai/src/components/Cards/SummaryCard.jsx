import React from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-300/40 rounded-xl p-3 overflow-hidden cursor-pointer hover:shadow-xl shadow-gray-100 relative group transition-shadow duration-300"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 cursor-pointer relative flex flex-col sm:flex-row sm:items-start gap-4"
        style={{
          background: colors.bgcolor,
        }}
      >
        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-0 sm:mr-4">
          <span className="text-lg font-semibold text-black">{getInitials(role)}</span>
        </div>

        {/* Content Container */}
        <div className="flex-grow">
          <div className="flex justify-between items-start flex-wrap">
            {/* Title and Skills */}
            <div className="min-w-0">
              <h2 className="text-lg md:text-xl font-medium truncate">{role}</h2>
              <p className="text-xs text-gray-900 mt-1 truncate">{topicsToFocus}</p>
            </div>
          </div>
        </div>

        <button
          className="hidden group-hover:flex items-center gap-2 text-xs text-rose-500 font-medium bg-rose-50 px-3 py-1 rounded border border-rose-100 hover:border-rose-200 cursor-pointer absolute top-3 right-3 z-10"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          aria-label="Delete summary card"
        >
          <LuTrash2 />
        </button>
      </div>

      <div className="px-3 pb-3">
        <div className="flex flex-wrap items-center gap-3 mt-4">
          <div className="text-[10px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full whitespace-nowrap">
            Experience: {experience} {experience === 1 ? "Year" : "Years"}
          </div>

          <div className="text-[10px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full whitespace-nowrap">
            {questions} Q&A
          </div>

          <div className="text-[10px] font-medium text-black px-3 py-1 border border-gray-900 rounded-full whitespace-nowrap">
            Last Updated: {lastUpdated}
          </div>
        </div>

        {/* Description */}
        <p className="text-[12px] text-gray-500 font-medium line-clamp-2 mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
