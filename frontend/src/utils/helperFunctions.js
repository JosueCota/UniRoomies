import { clearCredentials } from "../features/authSlice"
import { deleteSearch } from "../features/searchesSlice"
import { useLogoutMutation } from "../features/authApiSlice";
import { toast } from "react-toastify";

// Doesn't remove cookies, only used after logout api call, or when jwt expires 
export const logout = async (navigate, dispatch) => {
    const [logout] = useLogoutMutation();
    
    // Function to clear global states
    dispatch(clearCredentials());
    dispatch(deleteSearch());
    
    await logout();
    navigate("/login");
}



//Toast Error Utility Functions
export const showToastError = (err, id) => {
    toast.error(err?.data?.message || err.error || err, id ? {toastId: id}:null)
}

export const showToastSuccess = (success, id) => {
    toast.success(success, id ? {toastId: id} : null)
}

export const showToastWarning = (message, id) => {
    toast.warn(message, id ? {toastId: id} : null)
}
