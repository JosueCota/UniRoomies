import { useSelector } from "react-redux";
import SearchHeader from "../components/NavsHeaders/SearchHeader";
import { setRoomSearch } from "../features/searchesSlice";

export default function Rooms() {

    const { roomSearch } = useSelector((state) => state.search);

    return (
        <div style={{display:"flex", flexFlow:"column wrap", width: "100%"}}>
        <SearchHeader placeholder={"Price"} action={setRoomSearch} state={roomSearch} />
        Rooms
    </div>);
}