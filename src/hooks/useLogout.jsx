import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserContext } from "../context/UserContext";

function useLogout() {
  const navigate = useNavigate();
  const { setUserData } = useUserContext();

  return () => {
    sessionStorage.clear();
    setUserData({});

    toast.success("User Logout Successful", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });

    navigate("/");
  };
}

export default useLogout;
