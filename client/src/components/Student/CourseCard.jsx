import React from "react";

const CourseCard = ({ title, description, image, duration, level }) => {
  return (
    <div
      className="
        w-80 p-6 rounded-xl 
        bg-gradient-to-br from-black/10 via-black/5 to-transparent 
        border border-gray-700 
        hover:shadow-lg hover:scale-[1.02] 
        transition-all duration-300
      "
    >
      {/* Image */}
      <div className="mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-44 object-cover rounded-lg border border-gray-600"
        />
      </div>

      {/* Title */}
      <h3 className="text-lg font-bold text-white mb-2">{title}</h3>

      {/* Description */}
      <p className="text-gray-300 text-sm leading-relaxed mb-4">
        {description}
      </p>

      {/* Details */}
      <div className="flex justify-between text-gray-400 text-xs mb-4">
        <span>⏳ {duration}</span>
        <span>📈 {level}</span>
      </div>

      {/* Button */}
      <button
        className="
          w-full py-2 px-4 
          bg-blue-600 text-white rounded-lg 
          hover:bg-blue-500 transition
        "
      >
        View Details
      </button>
    </div>
  );
};

export default CourseCard;
