import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styles from "./profiletabs.module.css"
import ProfileUserTab from './ProfileUserTab';
import ProfileRoommateTab from './ProfileRoommateTab';
import ProfileAccount from './ProfileAccount';

const ProfileTabs = () => {
    const [key, setKey] = useState("user");

  return (
    <div className={styles.container}>

    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className={[styles.tabHeader]}
      
      >
      <Tab eventKey="user" title="User" tabClassName={`${styles.tab} ${styles.ltab}`}>
        <ProfileUserTab/>
      </Tab>
      <Tab eventKey="roommate" title="Roommate Details" tabClassName={`${styles.tab} ${styles.mtab}`}>
        <ProfileRoommateTab/>
      </Tab>
      <Tab eventKey="account" title="Account" tabClassName={`${styles.tab} ${styles.rtab}`}>
        <ProfileAccount/>
      </Tab>
        </Tabs>
    </div>
  )
}

export default ProfileTabs
