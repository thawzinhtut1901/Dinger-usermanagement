"use client"

import { useEffect, useState } from "react";
import UserList from "./users/page";

export default function Home() {
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    setShowUserList(true);
  }, []);

  return (
    <div>
      {showUserList ? (
        <UserList /> 
      ) : (
        <h1 className="flex justify-center items-center">Please Wait....</h1>
      )}
  </div>
  );
}
