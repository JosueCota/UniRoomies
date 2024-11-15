import { Outlet } from 'react-router-dom';
import ProfileTabs from '../components/Profile/ProfileTabs';

export default function Profile() {
    
    return (
    <div style={{display:"flex", flexFlow:"column", width:"100%"}}>
        <ProfileTabs/>
        <Outlet />  

    </div>);
}