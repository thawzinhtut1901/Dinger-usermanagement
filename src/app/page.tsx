"use client"
import { UserUI } from "@/components";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const limit = 10;
  // const skip = 10;
  const router = useRouter();

  // const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
      router.push("/users?limit=10");
  }, [router]);

  // const handleUpdate = (sortBy?:string, order?:string, skip?: number) => {
  //   const params = new URLSearchParams();
  //   params.set("limit", limit.toString())
  //   if(sortBy) {
  //     params.set("sortBy", sortBy)
  //   };
  //   if(order) {
  //     params.set("order", order)
  //   }
  //   if(skip) {
  //     params.set("skip", skip.toString())
  //   }
  //   router.push(`/users?${params}`)
  // }

  // const handlePageChange = (newPage: number) => {
  //   setCurrentPage(newPage);
  // };

  return (
    <div>
      {/* <UserUI  currentPage={currentPage} onPageChange={handlePageChange} skip={skip} limit={limit} onUpdate={handleUpdate}/> */}
    </div>
  );
}
