import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Signuptype } from "suberna-common-medium";
import { BACKEND_URL } from "../config"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
    const [signupInput, setSignupInput] = useState<Signuptype>({
        name: "",
        email: "",
        password: ""
    })

    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type === "signup" ? "signup" : "signin"}`, type === "signup" ? {
                username: signupInput.name,
                email: signupInput.email,
                password: signupInput.password,
            } : {
                email: signupInput.email,
                password: signupInput.password,
            });
            const jwt = response.data;
            localStorage.setItem("token", jwt);
            navigate("./blogs")
        } catch (e) {
            "error"
        }
    }
    return <>
        <div className="flex justify-center">
            <div className="h-screen flex justify-center flex-col w-[50VH] ">
                <div className="flex justify-center">
                    <div >
                        <div className="font-bold text-3xl">
                            {type === "signup" ? "Create Your Account" : "Sign in to your account"}
                        </div>
                        <div className="pl-4">
                            {type === "signup" ? "Already have an account" : "Don't have an accunt"} ? <Link className="underline" to={type === "signup" ? "/signin" : "/Signup"}>{type === "signup" ? "Login" : "Signup"}</Link>
                        </div>
                    </div>
                </div>
                {type === "signup" ? <LabelledInput label="Username" placeholder="John doe" onChange={(e) => {
                    setSignupInput({
                        ...signupInput,
                        name: e.target.value
                    })
                }}></LabelledInput> : null}
                <LabelledInput label="Email" placeholder="example@gmail.com" onChange={(e) => {
                    setSignupInput({
                        ...signupInput,
                        email: e.target.value
                    })
                }}></LabelledInput>
                <LabelledInput label="Password" placeholder="*****" type="password" onChange={(e) =>
                    setSignupInput({
                        ...signupInput,
                        password: e.target.value
                    })
                }></LabelledInput>
                <button onClick={sendRequest} type="button" className="mt-4 2-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "signup" : "signin"}</button>

            </div>
        </div>

    </>
}
    interface LabelledInputInterface {
        label: string,
        placeholder: string;
        onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
        type?: string
    }
    function LabelledInput({ label, placeholder, onChange, type }: LabelledInputInterface) {
        return <>
            <div >
                <label className="block mb-2 mt-2 text-sm font-medium  font-semibold">{label}</label>
                <input onChange={onChange} type={type} id="first_name" className="border border-gray-300  text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} />
            </div>
        </>
    }
