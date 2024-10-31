import { useEffect, useState } from "react";
import { useGetRoommatesQuery } from "../../features/roommatesApiSlice";

export default function RoommateList() {

    
    const { data }  = useGetRoommatesQuery();

    return (
    <div>
        {data? data.map(child => (
            <p key={child.id}>{child.firstName}</p>
        )): null}
    </div>);
}