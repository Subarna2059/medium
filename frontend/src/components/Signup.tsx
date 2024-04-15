import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom"
import { Signuptype } from "suberna-common-medium";

export const SignupComponent = () => {
    const [signupInput, setSignupInput] = useState<Signuptype>({
        name:"",
        email:"",
        password:""
    })
    return <>
    
        <div className="h-screen flex justify-center flex-col ">
            <div className="flex justify-center">
                <div >
                    <div className="font-bold text-3xl">
                        Create Your Account
                    </div>
                    <div className="pl-4">
                        Already have an account? <Link className="underline" to={"/signin"}> Login</Link>
                    </div>
                </div>
            </div>
            <LabelledInput label="Username" placeholder="John doe" onChange={(e) => {
                setSignupInput({
                    ...signupInput,
                    email:e.target.value
                })
            }}></LabelledInput>

        <LabelledInput label="Email" placeholder="example@gmail.com" onChange={(e)=>{
                setSignupInput({
                    ...signupInput,
                    email:e.target.value
                })
            }}></LabelledInput>
        
        <LabelledInput label="Password" placeholder="*****" type="password" onChange={(e)=>
                setSignupInput({
                    ...signupInput,
                    password:e.target.value
                })
            }></LabelledInput>
        </div>

    </>
interface LabelledInputInterface {
    label:string,
    placeholder:string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    type?:string
}
    function LabelledInput({label, placeholder, onChange, type}: LabelledInputInterface) {
        return <>
        <div>
            <label className="block mb-2 text-sm font-medium  dark:text-white">{label}</label>
            <input onChange={onChange} type={type} id="first_name" className="border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder}/>
        </div>
        </>
    }
}