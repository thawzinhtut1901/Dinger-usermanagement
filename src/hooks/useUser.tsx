"use-client"

import { getAllUsersAPI } from "@/api";
import { useQuery } from "@tanstack/react-query";

interface UsersParams {
    limit?: number,
    sortBy?: string,
    order?: string,
}

export const useGetAllUsers = (params: UsersParams) => 
    useQuery({queryKey:["all-users", params], queryFn: () => getAllUsersAPI(params)});   