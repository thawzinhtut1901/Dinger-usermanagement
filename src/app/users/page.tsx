"use client"
import { UserUI } from "@/components";
import { useRouter, useSearchParams } from "next/navigation";

export default function UserList() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const limit = searchParams.get("limit") ? parseInt(searchParams.get("limit") as string) : 10;
    const sortBy = searchParams.get("sortBy") || undefined;
    const order = searchParams.get("order") || undefined;

    const onUpdate = (sortBy?: string, order?:string) => {
        const params = new URLSearchParams();
        params.set("limit", limit.toString());
        if (sortBy) {
            params.set("sortBy", sortBy);
        }
        if(order) {
            params.set("order", order)
        }
        router.push(`/users?${params}`);
    };

    return (
        <div className="bg-custom-gradient w-full min-h-screen">
            <UserUI sortBy={sortBy} order={order} onUpdate={onUpdate} limit={limit}/>
        </div>
    )
}