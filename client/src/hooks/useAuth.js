import { useEffect, useState } from "react";

const useAuth = () => {
  const [isLogged, setIsLogged] = useState({ isLogged: false });

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLogged") ? localStorage.getItem("isLogged") : false;
    setIsLogged((prevState) => ({ ...prevState, isLogged: loginStatus }));
  }, []);

  return isLogged;
};

export default useAuth;
