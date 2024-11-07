import { clearCredentials } from "../features/authSlice"
import { deleteSearch } from "../features/searchesSlice"
import { useLogoutMutation } from "../features/usersApiSlice";

// Doesn't remove cookies, only used after logout api call, or when jwt expires 
export const logout = async (navigate, dispatch) => {
    const [logout] = useLogoutMutation();
    
    // Function to clear global states
    dispatch(clearCredentials());
    dispatch(deleteSearch());
    
    await logout();
    navigate("/login");
}