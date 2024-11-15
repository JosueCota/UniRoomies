import Nav from 'react-bootstrap/Nav';
import styles from "./profiletabs.module.css"
import { NavLink } from 'react-router-dom';

const ProfileTabs = () => {

  return (
    <div className={styles.container}>

    <Nav
      id="controlled-tab-example"
      defaultActiveKey={"roommate"}
      className={[styles.tabHeader]}
      variant='tabs'
      >
      <Nav.Item title="Roommate Details" className={[styles.tab, styles.ltab]}>
          <NavLink to={"/user"}>
              <Nav.Link eventKey="roommate"  href='/user'>Profile</Nav.Link>
          </NavLink>
      </Nav.Item>
      <Nav.Item  title="Account" className={[styles.tab, styles.rtab]}>
        <NavLink to={"/user/account"} className={styles.ltab}>
          <Nav.Link href='/user/account' eventKey="account">Account</Nav.Link>
        </NavLink>
      </Nav.Item>
        </Nav>
    </div>
  )
}

export default ProfileTabs
