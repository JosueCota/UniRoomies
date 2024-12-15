import React from 'react'
import { useDispatch, useSelector} from "react-redux";
import Loader from '../Misc/Loader'

import styles from "./accountsettings.module.css"
import { setCredentials } from "../../features/authSlice"
import { useActivateUserMutation } from '../../features/usersApiSlice'
import ProfileAccountDeleteModal from './AccountDeleteModal';
import { logout, showToastError, showToastSuccess } from '../../utils/helperFunctions';
import { useNavigate } from 'react-router-dom';

//For activating or deactivity account/deleting
const AccountSettings = () => {
  const navigate = useNavigate();
  const [activateUser, {isLoading}] = useActivateUserMutation();
  const dispatch = useDispatch();

  const {user} = useSelector(state => state.auth);

  const handleActivateAccount = async() => {
    try {
      const res = await activateUser().unwrap();
      dispatch(setCredentials({...res}));
      showToastSuccess(`Successfully ${res.isActive? "Activated": "Deactivated"} Account`)
    } catch(err) {
      showToastError(err, "activateUserErr")
      if(err.status === 401) {
        logout(navigate, dispatch)
      }
    }
  }
  

  return (
    <div className={styles.container}>
      <p className={styles.info}>If you are no longer searching for a roommate or room, you can deactivate your account. This will remove you from searches in the Roommates and Rooms Pages. You will also not be able to search for others. </p>
      {isLoading? <Loader/>:
      <div className={styles.buttonCont}>
        <button className={`${styles.buttons} ${user.isActive && styles.activeButton || styles.inactiveButton}`} onClick={handleActivateAccount}>{user.isActive? "Deactivate": "Activate"} Account</button>
        <ProfileAccountDeleteModal/>
      </div>
      }
    </div>
  )
}

export default AccountSettings
