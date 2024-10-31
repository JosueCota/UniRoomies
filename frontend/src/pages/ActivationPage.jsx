import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useVerifyEmailMutation } from '../features/usersApiSlice'
import { useEffect } from 'react'
import Loader from '../components/Loader'
import { toast } from 'react-toastify'

const ActivationPage = () => {

    const {token} = useParams("token");
    const [verifyEmail, {isLoading}] = useVerifyEmailMutation();
    const navigate = useNavigate();
    
    useEffect(() => {
        handleActivation();
    }, [])

    const handleActivation = async () => {
        try  {
            if (token) {          
                await verifyEmail({token})
                navigate("/login")
                toast.success("Account Activated!",{toastId:"activationSuccess"})
            } else {
                toast.error("No Token Provided")
            }
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    }
  return (
    <div>
     {isLoading && <Loader/>}
    </div>
  )
}

export default ActivationPage