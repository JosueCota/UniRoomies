import RoommateList from "../components/Roommates/RoommateList";
import SearchHeader from "../components/NavsHeaders/SearchHeader";


export default function Roommates() {
    return (
    <div style={{display:"flex", flexFlow:"column wrap", width: "100%", backgroundColor:"var(--main-background)"}}>
        <SearchHeader placeholder={"Budget"} type={"roommate"}/>
        <RoommateList/>
    </div>);
}