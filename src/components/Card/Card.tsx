import { Mail, MapPin, Phone, UsersRound } from 'lucide-react';
import type React from 'react';
import type { Project } from '../../services/appwrite';

type CardsProps = Project;

const Card: React.FC<CardsProps> = ({ title, email, phone, description, organization, address }) => {
  return (
    <div className="bg-white rounded-lg p-4 w-full mx-auto shadow-md flex flex-col gap-4 md:flex-row items-start md:items-center text-blue-900 hover:bg-gray-100 hover:shadow-lg transition-all duration-300 ease-in-out overflow-hidden h-auto min-h-[352px] px-4 md:px-8">
      <div className="w-full flex justify-center items-center md:w-2/4 lg:w-[20rem] ">
        <img src="/svg/logo.svg" alt={title} className="w-full h-full max-w-64 object-cover rounded-tl-lg rounded-tr-lg" />
      </div>
      <div className="flex flex-col w-full gap-2 h-full ">
        <div className="text-xl md:text-2xl  text-black ">
          <div className="break-words">{title}</div>
        </div>
        <div className="text-base md:text-lg  text-black ">
          <div className="break-words line-clamp-6">{description}</div>
        </div>
        {address && (
          <div className="flex items-center text-base md:text-lg gap-2 text-black">
            <MapPin className="w-6 h-6" />
            <p className="break-words flex-1">{address}</p>
          </div>
        )}
        {organization && (
          <div className="flex items-center text-base md:text-lg gap-2 text-black">
            <UsersRound className="w-6 h-6" />
            <p className="break-words">{organization}</p>
          </div>
        )}
        {email && (
          <div className="flex items-center text-base md:text-lg gap-2 text-black">
            <Mail className="w-6 h-6" />
            <p className="break-words">{email}</p>
          </div>
        )}
        {phone && (
          <div className="flex items-center text-base md:text-lg gap-2 text-black">
            <Phone className="w-6 h-6" />
            <p className="break-words">{phone}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
