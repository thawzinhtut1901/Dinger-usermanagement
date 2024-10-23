"use-client"

import { getAllUsersAPI, getUserDetailsAPI } from "@/api";
import { useQuery } from "@tanstack/react-query";

interface UsersParams {
    limit?: number,
    skip?: number,
    sortBy?: string,
    order?: string,
}

export const useGetAllUsers = (params: UsersParams) => 
    useQuery({
        queryKey:["all-users", params], 
        queryFn: () => getAllUsersAPI(params),
        enabled: !!params.limit,
    });   

export const useGetAUser = ({id}: {id:number}) => 
    useQuery({queryKey: ["a-user", id], queryFn:() => getUserDetailsAPI({id})})