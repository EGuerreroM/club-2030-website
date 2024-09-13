import { Mail } from 'lucide-react';
import React from 'react';
import type { Project } from '../../services/appwrite';

type CardsProps = Project;
const Card: React.FC<CardsProps> = ({ title, email, phone, description }) => {
  return (
    <div className="bg-blue-900 h-[346px] rounded-lg p-4 w-full shadow-md flex flex-row items-start text-blue-900 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer">
      <img
        src="public/svg/logo.svg"
        alt={title}
        className="w-[348px] h-[316px] rounded-tl-lg rounded-tr-lg mr-4" 
      />
      <div className="flex-1">
        <div className="text-2xl mb-2 text-black">{title}</div>
        <div className="text-lg mb-2 text-black">{description}</div>
        {email && <div className="text-lg mb-2 text-black">{email}</div>}
        {phone && <div className="text-lg mb-2 text-black">{phone}</div>}
        <Mail />
      </div>
    </div> 
  );
};

export default Card;

