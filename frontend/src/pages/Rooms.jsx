import SearchHeader from "../components/NavsHeaders/SearchHeader";

export default function Rooms() {
    return (
        <div style={{display:"flex", flexFlow:"column wrap", width: "100%"}}>
        <SearchHeader placeholder={"Price"} type={"room"} />
        Rooms
    </div>);
}