import React from "react";
import * as Icons from "react-icons/fa"; // Import all icons from react-icons/fa
import { useRouter } from "next/navigation";

interface CategoryCardProps {
  icon: string; // Icon class name (e.g., "FaLock")
  name: string;
  count: number;
  id: string; // Add ID for navigation
}

const CategoryCard = ({ icon, name, count,id }:CategoryCardProps) => {

  // Dynamically resolve the icon component using the icon name
  const router = useRouter()
  const IconComponent = Icons[icon];
  console.log("icnnn",icon)
  const handleCardClick = () => {
    router.push(`/categories/notes/${id}`); // Navigate to category detail page
  };

  return (
    <div  onClick={handleCardClick} className=" cursor-pointer flex flex-col items-center justify-center bg-purple-300 rounded-md p-4 w-32 h-32 shadow-md">
      {/* Render the icon if it exists */}
      <div className="text-4xl">
        {IconComponent ? <IconComponent /> : null}
      </div>
      <div className="mt-2 text-center text-gray-900 font-semibold">
        {name}({count})
      </div>
    </div>
  );
};

export default CategoryCard;
