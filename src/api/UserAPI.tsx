import BaseURL from "@/services/apiEndPoint"

interface UsersParams {
    limit?: number,
    skip?: number,
    sortBy?: string,
    order?: string,
}

export const getAllUsersAPI = async(params : UsersParams=({})) => {
    const {sortBy, skip = 10, order, limit = 10} = params;

    const queryParams = new URLSearchParams();
    if(sortBy) {
        queryParams.append("sortBy", sortBy)
    }
    if(order) {
        queryParams.append("order", order)
    }
    if(skip) {
        queryParams.append("skip", skip.toString())
    }
    queryParams.append ("limit", limit.toString());

    const response: Response = await fetch(`${BaseURL}/users?${queryParams}`, {
        headers: {
            Accept : "application/json",
            "Content-Type" : "application/json",
        },
        mode: "cors",
        method: "GET",
        redirect: "follow",
    });
    const result = await response.json();
    if(!response.json){
        throw new Error(result.message)
    };
    return result;
}

export const getUserDetailsAPI = async({id} : {id:number}) => {
    const response: Response = await fetch(`${BaseURL}/users/${id}`, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        mode: "cors",
        method: "GET",
        redirect: "follow",
    });
    const result = await response.json();
    if(!response.json) {
        throw new Error(result.message)
    };
    return result;
}