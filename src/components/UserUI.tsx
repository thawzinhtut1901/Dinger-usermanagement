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
import { Pagination, Stack } from "@mui/material";
import { Button } from './ui/button';
import { BsChevronDoubleLeft, BsChevronDoubleRight } from 'react-icons/bs';
import { useRouter } from 'next/navigation';

interface User {
    id: number;
    firstName: string;
    lastName: string;
    maidenName?: string;
    username: string;
    role: string;
    phone: string;
    email: string;
    image: string;
}

interface UserUIProps {
    limit: number;
    skip: number;
    sortBy?: string;
    order?: string;
    currentPage: number;           
    onPageChange: (newPage: number) => void;
    onUpdate: ( sortBy?: string, order?: string) => void;
}

const UserUI: React.FC<UserUIProps> = ({limit, sortBy, skip,  currentPage, onPageChange,  order, onUpdate}) => {
    const [localCurrentPage, setLocalCurrentPage] = useState(currentPage);
    const {data: getAllUser, isLoading} = useGetAllUsers({
        limit,
        skip: (currentPage - 1) * limit,
        sortBy,
        order,
    });

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const router = useRouter();
    const [showOrderInstruction, setShowOrderInstruction] = useState(false);

    useEffect(() => {
        const params: Record<string, string>= {};
        if (limit) {
            params.limit = limit.toString();
            if(sortBy) {
                params.sortBy = sortBy;
            }
            if(order) {
                params.order = order;
            }
            if(skip) {
                params.skip = skip.toString()
            }
            const newUrl = `${window.location.pathname}?${new URLSearchParams(params).toString()}`;
            window.history.replaceState({}, '', newUrl);
        }
    }, [limit, sortBy, order, skip]);

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

    const handleRowClick = (id: number) => {
        setSelectedId(id); 
        router.push(`/users/${id}`)
      };

      const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
        event.preventDefault();
        setLocalCurrentPage(page);
        onPageChange(page);
    };
    const handleFirstPage = () => {
        setLocalCurrentPage(1);
        onPageChange(1);
    };

    const handleLastPage = () => {
        const lastPage = Math.ceil(getAllUser?.total / limit);
        setLocalCurrentPage(lastPage);
        onPageChange(lastPage);
    };

    const handleSkip = () => {
        const totalPage = Math.ceil(getAllUser?.total / limit);
        const skipPage = localCurrentPage + 10;
        if(skipPage <= totalPage) {
            setLocalCurrentPage(skipPage);
            onPageChange(skipPage)
        }
    }

  return (
    <div className="relative flex flex-col">
        <header className="bg-slate-900 shadow w-screen text-white">
            <div className="flex justify-between items-center mx-auto px-4 py-4 max-w-7xl">
            <div className="font-bold text-xl">MyApp</div>
            <nav>
                <ul className="flex space-x-4">
                <li><a href="#" className="text-white hover:text-blue-500">Home</a></li>
                <li><a href="#" className="text-white hover:text-blue-500">Users</a></li>
                <li><a href="#" className="text-white hover:text-blue-500">Settings</a></li>
                </ul>
            </nav>
            </div>
        </header>
         <h1 className="mt-[20px] mb-4 md:ml-[60px] font-bold font-luxuriousRoman text-[35px] text-center text-slate-900 md:text-start">Users List</h1>

         <div className="flex">
          <div onClick={handleDropDown} className="relative bg-white shadow-md shadow-slate-900 mb-4 ml-8 md:ml-[60px] p-2 rounded-[10px] h-[35px] cursor-pointer">
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
          
          <div className="relative ml-4">
            <IoIosSearch
                    className="top-[7px] right-2 absolute"
                    size="20px"
                    color="gray"
                />
                <input
                    className="shadow-md shadow-slate-900 px-4 py-1 rounded-[6px] w-[320px] h-[34px]"
                    placeholder="Search..."
                />
          </div>

          {showOrderInstruction && ( 
            <div className="mx-auto font-bold text-[16px] text-red-600">Please select a sorting option before ordering.</div>
          )}
        </div>

        <div className="border-slate-500 shadow-lg shadow-slate-900 mx-[30px] mt-4 border rounded-[5px] overflow-x-auto md:overflow-x-hidden overflow-y-hidden">
            <Table>
                <TableCaption>List of Users.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead></TableHead>
                        <TableHead className="text-center text-slate-800">Profile</TableHead>   
                        <TableHead className="text-center text-slate-800">
                            {sortBy === "firstName" ? "First Name" : sortBy === "lastName" ? "Last Name" : sortBy === "maidenName" ? "Maiden Name" : "Name"}
                        </TableHead>
                        <TableHead className="text-center text-slate-800">Username</TableHead>
                        <TableHead className="text-center text-slate-800">Role</TableHead>
                        <TableHead className="text-center text-slate-800">Phone</TableHead>
                        <TableHead className="text-center text-slate-800">Email</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody> 
                   
                    {             
                        getAllUser?.users?.map((users:User) => (
                            <TableRow onClick={() => handleRowClick(users?.id)} key={users?.id}>
                                <TableCell></TableCell>
                                <TableCell className="flex justify-center">
                                    <img src={users?.image} alt="" className="my-auto md:my-0 rounded-full w-[18px] md:w-[24px] h-[18px] md:h-[24px]"/>
                                </TableCell>
                                <TableCell className="text-blue-600 text-center">
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
                                <TableCell onClick={() => handleRowClick(users?.id)} className="text-center cursor-default">See Details...</TableCell>
                            </TableRow>
                        ))
                    }
                   
                </TableBody>
            </Table>
        </div>

        <div className="flex justify-center gap-x-2 my-[30px]">
          <div className="flex ml-[20px] text-[16px]">
            <Button onClick={handleFirstPage} disabled={localCurrentPage === 1} className="flex font-bold font-roboto text-black uppercase"><BsChevronDoubleLeft/>First</Button>
            <Stack spacing={1}>
                <Pagination 
                  count={Math.ceil(getAllUser?.total / limit)} 
                  page = {currentPage}
                  onChange={handlePageChange}
                  defaultPage={1}
                  boundaryCount={1}
                  variant="outlined" 
                  shape="rounded" 
                  sx={{
                    '& .MuiPaginationItem-root': {
                    backgroundColor: '#E6E6FA',
                    color: 'black',
                  },
                    '& .MuiPaginationItem-root.Mui-selected': {
                    backgroundColor: '#0f172a',
                    color: 'white'
                  },
                    '& .MuiPaginationItem-previousNext': {
                    backgroundColor: 'transparent',
                    border: "none", 
                    color: '#9054DE',
                    '&:hover': {
                    backgroundColor: '#FFDAB9', 
                    },
                  },
                    '& .MuiPaginationItem-ellipsis': {
                    backgroundColor: 'transparent',
                    color: '#E6E6FA',  
                  },
                }}
              />
              </Stack>
              <Button onClick={handleLastPage} disabled={localCurrentPage === Math.ceil(getAllUser?.total / limit)} className="flex font-bold font-roboto text-black uppercase">Last <BsChevronDoubleRight/> </Button>
            </div> 
            
            <div className="flex pl-4">
                <Button onClick={handleSkip}  disabled={localCurrentPage === Math.ceil(getAllUser?.total / limit)} className="flex font-bold font-roboto text-[16px] text-blue-900 hover:text-blue-500">Skip to other pages</Button>
            </div>           
        </div>

        <footer className="mt-6">
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
  )
}

export default UserUI;