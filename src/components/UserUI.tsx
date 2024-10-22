"use client"

import { useGetAllUsers } from '@/hooks';
import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { RiFilter2Fill } from 'react-icons/ri';
import { IoIosSearch } from 'react-icons/io';

interface UserUIProps {
    limit: number;
    sortBy?: string;
    order?: string;
    onUpdate: ( sortBy?: string, order?: string) => void;
}

const UserUI: React.FC<UserUIProps> = ({limit, sortBy, order, onUpdate}) => {
    const {data: getAllUser} = useGetAllUsers({
        limit,
        sortBy,
        order,
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showOrderInstruction, setShowOrderInstruction] = useState(false);

    useEffect(() => {
        const params: any = {};
        if (limit) {
            params.limit = limit.toString();
            if(sortBy) {
                params.sortBy = sortBy;
            }
            if(order) {
                params.order = order;
            }
            // Update the URL with the new limit
            const newUrl = `${window.location.pathname}?${new URLSearchParams(params).toString()}`;
            window.history.replaceState({}, '', newUrl);
        }
    }, [limit, sortBy, order]);

    console.log(getAllUser)

    const handleDropDown = () => {
        setIsDropdownOpen(!isDropdownOpen)
      }

    const handelSortBy = (option: string) => {
        onUpdate(option, order);
        setShowOrderInstruction(false);
        setIsDropdownOpen(false);
    }

    const handleOrder = (orderOption: string) => {
        if (!sortBy) {
            setShowOrderInstruction(true); 
            setIsDropdownOpen(true)
        } else {
        onUpdate(sortBy, orderOption);
        setIsDropdownOpen(false)
        }
    }

  return (
    <div className="flex flex-col">
         <h1 className="my-4 ml-7 font-bold font-luxuriousRoman text-[35px] text-orange-700">Users List</h1>

         <div className="flex">
          <div onClick={handleDropDown} className="relative bg-white shadow-md mb-4 ml-7 p-2 rounded-[10px] h-[35px] cursor-pointer">
              <RiFilter2Fill  className="w-[18px] h-[18px]"/>
              
            {
              isDropdownOpen && (
                <div className="top-full left-0 z-10 absolute bg-white shadow-lg mt-2 py-2 rounded-md w-48">
                    <div>
                        <h1 className="mx-4 border-b border-b-slate-700 font-luxuriousRoman text-gray-600 cursor-default">Sort by Name</h1> 
                        <button onClick={() => handelSortBy("firstName")} className="block hover:bg-gray-100 px-4 py-2 w-full font-mono text-left">
                            First Name
                        </button>
                        <button onClick={() => handelSortBy("lastName")} className="block hover:bg-gray-100 px-4 py-2 w-full font-mono text-left">
                            Last Name
                        </button>
                        <button onClick={() => handelSortBy("maidenName")} className="block hover:bg-gray-100 px-4 py-2 w-full font-mono text-left">
                            Maiden Name
                        </button>
                    </div>

                    <div className="mt-2">
                    {showOrderInstruction && (
                        <div className="ml-2 text-[13px] text-red-600">Please select a sorting option before ordering.</div>
                    )}
                        <h1 className="mx-4 border-b border-b-slate-700 font-luxuriousRoman text-gray-600 cursor-default">Ordering</h1> 
                        <button onClick={() => handleOrder("asc")} className="block hover:bg-gray-100 px-4 py-2 w-full font-mono text-left">
                            Ascending Order
                        </button>
                        <button onClick={() => handleOrder("desc")} className="block hover:bg-gray-100 px-4 py-2 w-full font-mono text-left">
                            Descending Order
                        </button>
                    </div>
                </div>
              )
            }
          </div>

          {/* <div onClick={handleOrderDown} className="relative bg-white shadow-md mb-4 ml-7 p-2 rounded-[10px] h-[35px]">
            <HiSortAscending className="w-[18px] h-[18px]"/>

            {
              isOrdering && (
                <div className="top-full left-0 z-10 absolute bg-white shadow-lg mt-2 py-2 rounded-md w-48">
                    <div>
                        <h1 className="mx-4 border-b border-b-slate-700 text-gray-600 cursor-default">Ordering</h1> 
                        <button className="block hover:bg-gray-100 px-4 py-2 w-full text-left">
                            Ascending Order
                        </button>
                        <button className="block hover:bg-gray-100 px-4 py-2 w-full text-left">
                            Decending Order
                        </button>
                    </div>

                </div>
              )
            }
          </div> */}
          
          <div className="relative ml-4">
            <IoIosSearch
                    className="top-[7px] right-2 absolute"
                    size="20px"
                    color="gray"
                />
                <input
                    className="shadow-md px-4 py-1 rounded-[6px] w-[320px] h-[34px]"
                    placeholder="Search..."
                    // value={search}
                    // onChange={handleSearchChange}
                />
          </div>

          {showOrderInstruction && ( // Show instruction if sortBy is not selected
            <div className="mx-auto font-bold text-[16px] text-red-600">Please select a sorting option before ordering.</div>
          )}
        </div>

        <div className="border-slate-500 shadow-lg shadow-slate-400 mx-[30px] border rounded-[5px]">
            <Table>
                <TableCaption>List of Users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead className="text-center">Profile</TableHead>   
                        <TableHead className="text-center">
                            {sortBy === "firstName" ? "First Name" : sortBy === "lastName" ? "Last Name" : sortBy === "maidenName" ? "Maiden Name" : "Name"}
                        </TableHead>
                        <TableHead className="text-center">Username</TableHead>
                        <TableHead className="text-center">Role</TableHead>
                        <TableHead className="text-center">Phone</TableHead>
                        <TableHead className="text-center">Email</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        getAllUser?.users?.map((users:any) => (
                            <TableRow key={users?.id}>
                                <TableCell></TableCell>
                                <TableCell className="flex justify-center">
                                    <img src={users?.image} alt="" className="rounded-full w-[24px] h-[24px]"/>
                                </TableCell>
                                <TableCell className="text-center">
                                    {
                                        sortBy === "firstName" ? users?.firstName :
                                        sortBy === "lastName" ? users?.lastName :
                                        sortBy === "maidenName" ? users?.maidenName || "No Madien Name":
                                        `${users?.firstName} ${users?.lastName} ${users?.maidenName}`
                                    }
                                </TableCell>
                                <TableCell className="text-center">@{users?.username}</TableCell>
                                <TableCell className="text-center">{users?.role}</TableCell>
                                <TableCell className="text-center">{users?.phone}</TableCell>
                                <TableCell className="text-center">{users?.email}</TableCell>
                            </TableRow>
                        ))
                    }
                   
                </TableBody>
            </Table>
        </div>
        
    </div>
  )
}

export default UserUI;