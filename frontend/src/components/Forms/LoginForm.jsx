import React, {useState, useEffect} from 'react';
import styles from "./form.module.css";
import TextInput from './TextInput';
import SubmitBtn from './SubmitBtn';
import { Form, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector} from "react-redux";
import { useLoginMutation } from '../../features/usersApiSlice';
import { setCredentials } from "../../features/authSlice";
import { toast } from "react-toastify";
import Loader from '../Loader';
import { useVerifyEmailMutation } from '../../features/usersApiSlice';
const LoginForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/roommates")
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({email, password}).unwrap();
      dispatch(setCredentials({...res}));
      navigate("/roommates")
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
  }

  return (
    <div className={styles.container}>
      <h2>Login</h2>
      <Form onSubmit={submitHandler} className={styles.formCont}>
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
