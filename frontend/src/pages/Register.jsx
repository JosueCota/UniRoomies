import RegisterForm from "../components/Forms/RegisterForm";
import BrandHeader from "../components/NavsHeaders/BrandHeader";

export default function Register() {
    return (
    <div style={{width:"100%"}}>
        <BrandHeader/>        
        <RegisterForm/>  
    </div>);
}