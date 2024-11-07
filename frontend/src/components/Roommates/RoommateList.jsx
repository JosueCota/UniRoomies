import { useGetRoommatesQuery } from "../../features/roommatesApiSlice";
import { logout } from "../../utils/helperFunctions";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

export default function RoommateList() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    let data
    
    try {
        data = useGetRoommatesQuery().data;
    } catch(err) {
        toast.error(err?.data?.message || err.error, {toastId: "roommateServerErr"})
        if (err.status === 401) {
            logout(navigate, dispatch);
        }
    }

    return (
    <div>
        {data? data.map(child => (
            <p key={child.id}>{child.firstName}</p>
        )): null}
    </div>);
}