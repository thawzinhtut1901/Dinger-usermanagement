"use client"

import { UserUI } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function UserList() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(() => {
        const pageParam = searchParams.get("page");
        const page = pageParam && !isNaN(parseInt(pageParam, 10)) ? parseInt(pageParam, 10) : 1; // Check if valid number, else default to 1
        return page;
    });

    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") as string) : 10;
    const skip = (currentPage - 1) * limit;

    const sortBy = searchParams.get("sortBy") || undefined;
    const order = searchParams.get("order") || undefined;

    useEffect(() => {
        const pageParam = searchParams.get("page");
        if (!pageParam) {
            const params = new URLSearchParams();
            params.set("limit", limit.toString());
            params.set("page", "1");
            if (sortBy) {
                params.set("sortBy", sortBy);
            }
            if (order) {
                params.set("order", order);
            }
            setLoading(true);
            router.push(`/users?${params}`);
            setLoading(false); 
        }
    }, [router, limit, sortBy, order, searchParams]);

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

        setLoading(true); 
        router.push(`/users?${params}`);
        setLoading(false); 
    }, [currentPage, limit, sortBy, order, router]);

    const onUpdate = (sortBy?: string, order?: string) => {
        const params = new URLSearchParams();
        params.set("limit", limit.toString());
        params.set("page", currentPage.toString());
        if (sortBy) {
            params.set("sortBy", sortBy);
        }
        if (order) {
            params.set("order", order);
        }

        setLoading(true);
        router.push(`/users?${params}`);
        setLoading(false);
    };

    const changePage = (newPage: number) => {
        if (!isNaN(newPage) && newPage > 0) {
            setCurrentPage(newPage); 
        } else {
            setCurrentPage(1);
        }
    };

    return (
        <div className="w-full min-h-screen overflow-x-hidden">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <UserUI
                    currentPage={currentPage}
                    onPageChange={changePage}
                    skip={skip} 
                    sortBy={sortBy}
                    order={order}
                    onUpdate={onUpdate}
                    limit={limit}
                />
            )}
        </div>
    );
}

