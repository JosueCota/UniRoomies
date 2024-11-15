import React, {useState, useEffect} from 'react';
import styles from "./form.module.css";
import TextInput from '../Forms/TextInput';
import SubmitBtn from '../Forms/SubmitBtn';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import { useLoginMutation } from '../../features/authApiSlice';
import { setCredentials } from "../../features/authSlice";
import Loader from '../Loader';
import { showToastError } from '../../utils/helperFunctions';
const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/roommates")
    }
  }, [navigate, user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate("/roommates")
    } catch (err) {
      showToastError(err, "logServerErr")
    }
  }

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <Form onSubmit={submitHandler} className={styles.formCont} id='loginForm'>
        <TextInput placeholder={"Email"} label={"Email"} state={email} onChange={setEmail} name={"email"} required={true} type={"text"}/>
        <TextInput placeholder={"Password"} label={"Password"} state={password} onChange={setPassword} name={"password"} required={true} type={"password"}/>
        <Link className={styles.link} to={"/register"}>Create an Account</Link>
 
        { isLoading? <Loader/>: 
        <SubmitBtn name={"Login"}/>
        }
      </Form>
    </div>
  )
}

export default LoginForm