"use client"

import { useGetAUser } from "@/hooks";
import {  useParams } from "next/navigation";
import { FaPhoneSquareAlt } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { FaBirthdayCake } from "react-icons/fa";
import { IoWallet } from "react-icons/io5";
import { PiBankFill } from "react-icons/pi";

const UserDetails = () => {
    const { id } = useParams();

    let userId: number | undefined;

    if (typeof id === 'string') {
        userId = parseInt(id, 10);
    } else if (Array.isArray(id) && id.length > 0) {
        userId = parseInt(id[0], 10);
    }

    const {data: getUser}  = useGetAUser({id: userId!});
    console.log(getUser)
  return (
    <div className="flex flex-col min-h-screen">
      <header className="fixed bg-slate-900 shadow w-screen text-white">
        <div className="flex justify-between items-center mx-auto px-4 py-4 max-w-7xl">
          <div className="font-bold text-xl">MyApp</div>
          <nav>
            <ul className="flex space-x-4">
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Home</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Users</a></li>
              <li><a href="#" className="text-gray-600 hover:text-blue-500">Settings</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow mx-auto mt-[80px] p-6 max-w-7xl">
        <div className="bg-black bg-opacity-65 shadow p-6 rounded-lg text-white">
          <div className="flex items-center">
            <img 
              src={getUser?.image} 
              alt="Profile" 
              className="bg-white mr-6 rounded-full w-24 h-24"
            />
            <div>
              <h1 className="font-bold text-2xl">{getUser?.firstName} {getUser?.lastName} {getUser?.maidenName}</h1>
              <p className="text-slate-300">{getUser?.email}</p>
              {/* <button className="bg-blue-500 hover:bg-blue-600 mt-2 px-4 py-2 rounded text-white">
                Edit Profile
              </button> */}
            </div>
          </div>
        </div>

        <div className="bg-black bg-opacity-65 shadow-black shadow-md mt-6 p-4 rounded-lg">
            <div className="bg-custom-gradient p-4 rounded-tr-full rounded-bl-full">
                <div className="bg-custom-gradient p-4 rounded-tl-full rounded-br-full text-slate-800">
                  <div className="border-white/20 bg-slate-400 bg-opacity-30 backdrop-blur-md backdrop-filter p-5 rounded-[4px]">
                    <h2 className="mb-4 font-bold text-[24px]">User Details</h2>
                    <div className="space-y-2">
                        <div>
                        <span className="font-semibold text-[18px]">Username:</span> <span className="ml-3 font-serif text-[18px] text-blue-900">@{getUser?.username}</span>
                        </div>
                        <div>
                        <span className="font-semibold text-[18px]">Bio:</span> <span className="ml-3 font-serif text-[18px]">{getUser?.bio}</span>
                        </div>
                        <div className="flex">
                        <span className="flex mt-[1px] font-semibold"><FaPhoneSquareAlt className="mt-1 w-[18px] h-[18px]"/> :</span> <span className="ml-3 font-roboto text-[18px]">{getUser?.phone}</span>
                        </div>

                        <div className="flex">
                          <span className="flex mt-[2px] font-semibold"><FaAddressCard className="mt-[2px] w-[18px] h-[18px]"/>:</span> 
                          <span className="ml-3 font-serif text-[18px]">
                              {`${getUser?.address?.address}, ${getUser?.address?.city},`}
                          </span> <br /> 
                          <span className="ml-3 font-serif text-[18px]">{`${getUser?.address?.state}, ${getUser?.address?.country}`}</span>
                        </div>

                        <div>
                        <span className="font-semibold text-[18px]">Gender:</span> <span className="ml-3 font-serif text-[18px]">{getUser?.gender}</span>
                        </div>

                        <div className="flex">
                        <span className="flex font-semibold"><FaBirthdayCake className="w-[18px]"/>:</span> <span className="ml-3 font-roboto text-[18px]">{getUser?.birthDate}</span>
                        </div>
                        <div>
                        <span className="font-semibold text-[18px]">University:</span> <span className="ml-3 font-serif text-[18px]">{getUser?.university}</span>
                        </div>
                        <div>
                        <span className="font-semibold text-[18px]">Works at:</span> <span className="ml-3 font-serif text-[18px]">{getUser?.company?.title} at {getUser?.company?.name}</span>
                        </div>

                        <h1 className="mb-4 pt-4 font-bold text-[24px]">Other Information</h1>

                        <div className="flex">
                          <span className="flex font-semibold"><IoWallet  className="mt-[2px] w-[18px] h-[18px]"/>:</span> <span className="ml-3 font-serif text-[18px]">{getUser?.crypto?.coin}</span>
                        </div>

                        <div className="flex">
                          <span className="flex font-semibold"><PiBankFill className="mt-[2px] w-[18px] h-[18px]"/>:</span> <span className="ml-3 font-serif text-[18px]">{getUser?.bank?.currency}</span>
                        </div>
                      
                    </div>
                  </div>
                </div>
            </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="shadow mt-6">
        <div className="mx-auto px-4 py-4 max-w-7xl text-center">
          <p className="text-gray-500">© 2024 MyApp. All rights reserved.</p>
          <ul className="flex justify-center space-x-4 mt-2">
            <li><a href="#" className="text-gray-600 hover:text-blue-500">Privacy Policy</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-500">Terms of Service</a></li>
            <li><a href="#" className="text-gray-600 hover:text-blue-500">Contact Us</a></li>
          </ul>
        </div>
      </footer>
    </div>
  );
};


export default UserDetails