import { useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import styles from "./profiletabs.module.css"
import ProfileUserTab from './ProfileUserTab';
import ProfileRoommateTab from './ProfileRoommateTab';

const ProfileTabs = () => {
    const [key, setKey] = useState("account");

  return (
    <div className={styles.container}>

    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className={[styles.tabHeader]}
      
      >
      <Tab eventKey="account" title="Account" tabClassName={`${styles.tab} ${styles.ltab}`}>
        <ProfileUserTab/>
      </Tab>
      <Tab eventKey="roommate" title="Roommate Details" tabClassName={`${styles.tab} ${styles.rtab}`}>
        <ProfileRoommateTab/>
      </Tab>
        </Tabs>
    </div>
  )
}

export default ProfileTabs
