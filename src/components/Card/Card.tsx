import { Mail, MapPin, Phone, UsersRound } from 'lucide-react';
import React from 'react';
import type { Project } from '../../services/appwrite';

type CardsProps = Project;

const Card: React.FC<CardsProps> = ({ title, email, phone, description, organization, address }) => {
  return (
    <div className="bg-white rounded-lg p-4 w-full md:max-w-[600px] lg:max-w-[900px] mx-auto shadow-md flex flex-col md:flex-row items-start text-blue-900 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden h-auto mt-8 mb-8 px-4 md:px-8">
      <img
        src="public/svg/logo.svg"
        alt={title}
        className="w-full h-[200px] md:w-[100%] md:h-auto md:max-w-[348px] md:max-h-[256px] rounded-tl-lg rounded-tr-lg mb-4 md:mb-0 md:mr-4 object-contain"
      />
      <div className="flex-1 flex flex-col">
        <div className="text-xl md:text-2xl mb-2 text-black flex-1">
          <div className="break-words">{title}</div>
        </div>
        <div className="text-base md:text-lg mb-2 text-black flex-1">
          <div className="break-words">{description}</div>
        </div>
        {address && (
          <div className="flex items-center text-base md:text-lg mb-2 text-black flex-1">
            <MapPin className='mr-2' />
            <div className="break-words">{address}</div>
          </div>
        )}
        {organization && (
          <div className="flex items-center text-base md:text-lg mb-2 text-black flex-1">
            <UsersRound className="mr-2" />
            <div className="break-words">{organization}</div>
          </div>
        )}
        {email && (
          <div className="flex items-center text-base md:text-lg mb-2 text-black flex-1">
            <Mail className="mr-2" />
            <div className="break-words">{email}</div>
          </div>
        )}
        {phone && (
          <div className="flex items-center text-base md:text-lg mb-2 text-black flex-1">
            <Phone className="mr-2" />
            <div className="break-words">{phone}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;