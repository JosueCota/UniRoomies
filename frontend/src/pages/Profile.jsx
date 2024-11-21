import { Outlet } from 'react-router-dom';
import Tabs from '../components/Profile/Tabs';

export default function Profile() {
    
    return (
    <div style={{display:"flex", flexFlow:"column", width:"100%"}}>
        <Tabs/>
        <Outlet />  

    </div>);
}