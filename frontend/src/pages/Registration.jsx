import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useVerifyEmailMutation } from '../features/authApiSlice'
import { useEffect } from 'react'
import Loader from '../components/Misc/Loader'
import { toast } from 'react-toastify'

//Activation page that reroutes to login if successful
const RegistrationPage = () => {

    const {token} = useParams("token");
    const [verifyEmail, {isLoading}] = useVerifyEmailMutation();
    const navigate = useNavigate();
    
    useEffect(() => {
        handleRegistration();
    }, [])

    const handleRegistration = async () => {
        try  {
            if (token) {          
                await verifyEmail({token})
                navigate("/login")
                toast.success("Account Activated!",{toastId:"registrationSuccess"})
            } else {
                toast.error("No Token Provided")
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
            navigate("/register")
        }
    }
  return (
    <div>
     {isLoading && <Loader/>}
    </div>
  )
}

export default RegistrationPage
