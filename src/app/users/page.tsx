"use client"
import { UserUI } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserList() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [currentPage, setCurrentPage] = useState(() => {
        const page = searchParams.get("page");
        return page ? parseInt(page, 10) : 1;
      });
    
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") as string) : 10;
    const skip = (currentPage - 1) * limit;
    const sortBy = searchParams.get("sortBy") || undefined;
    const order = searchParams.get("order") || undefined;

    useEffect(() => {
        const params = new URLSearchParams();
        params.set("limit", limit.toString());
        params.set("page", currentPage.toString());
        if (sortBy) {
          params.set("sortBy", sortBy);
        }
        if (order) {
          params.set("order", order);
        }
        router.push(`/users?${params}`);
      }, [currentPage, limit, sortBy, order, router]);

    const onUpdate = (sortBy?: string, order?:string) => {
        const params = new URLSearchParams();
        params.set("limit", limit.toString());
        params.set("page", currentPage.toString());
        if (sortBy) {
            params.set("sortBy", sortBy);
        }
        if(order) {
            params.set("order", order)
        }

        router.push(`/users?${params}`);
    };

    const changePage = (newPage: number) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        const currentPage = searchParams.get("page");
        if (currentPage) {
            setCurrentPage(parseInt(currentPage, 10)); 
        }
    }, [searchParams]);

    return (
        <div className="bg-custom-gradient w-full min-h-screen">
            <UserUI currentPage={currentPage} onPageChange={changePage} skip={skip} sortBy={sortBy} order={order} onUpdate={onUpdate} limit={limit}/>
        </div>
    )
}