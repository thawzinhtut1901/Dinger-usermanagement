"use client"
import { UserUI } from "@/components";
import { useGetAllUsers } from "@/hooks/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const limit = 10;
  const router = useRouter();

  useEffect(() => {
      router.push("/users?limit=10");
  }, [router]);

  const handleUpdate = (sortBy?:string, order?:string) => {
    const params = new URLSearchParams();
    params.set("limit", limit.toString())
    if(sortBy) {
      params.set("sortBy", sortBy)
    };
    if(order) {
      params.set("order", order)
    }
    router.push(`/users?${params}`)
  }
  return (
    <div>
      <UserUI limit={limit} onUpdate={handleUpdate}/>
    </div>
  );
}
