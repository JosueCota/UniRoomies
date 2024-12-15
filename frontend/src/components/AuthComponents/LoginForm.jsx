import React, {useState, useEffect} from 'react';
import styles from "./form.module.css";
import TextInput from '../Forms/TextInput';
import GeneralButton from '../Forms/GeneralButton';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import { useLoginMutation } from '../../features/authApiSlice';
import { setCredentials } from "../../features/authSlice";
import Loader from '../Misc/Loader';
import { showToastError, showToastWarning } from '../../utils/helperFunctions';
import PasswordInput from '../Forms/PasswordInput';

//Login form responsible for logins and setting credential states
const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user && user.isActive) {
      navigate("/roommates/1")
    } else if (user) {
      navigate("/user")
    }
  }, [navigate, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}));

      if (res.isActive !== false) {
        // navigate("/roommates")
      } else {
        showToastWarning("Activate Your Account to Search!")
        navigate("/user")
      }
    } catch (err) {
      showToastError(err, "logServerErr")
    }
  }

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <Form onSubmit={submitHandler} className={styles.formCont} id='loginForm'>
        <TextInput placeholder={"Email"} label={"Email"} state={email} onChange={setEmail} name={"email"} required={true} type={"text"}/>
        <PasswordInput placeholder={"Password"} label={"Password"} state={password} onChange={setPassword} name={"password"}/>
        <Link className={styles.link} to={"/register"}>Create an Account</Link>
 
        { isLoading? <Loader/>: 
        <GeneralButton name={"Login"} type={'submit'}/>
        }
      </Form>
    </div>
  )
}

export default LoginForm
