import axios from "axios"
import { useState } from "react"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"

interface InputType {
    title: string,
    content: string,
}

export const InputBoxes = () => {
    const [blogData, setBlogData] = useState<InputType>({
        title: "",
        content: ""
    })
    const navigate = useNavigate();
    async function sendRequest() {
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title: blogData.title,
            content: blogData.content,
         }, {
            headers:{
                "Authorization": localStorage.getItem("token")
            },
        },
        )
        if(response) {
            navigate(`../blog/${response.data.data.id}`)
        } 
    }
    return <>
        <div className="mb-6 flex justify-center">
            <div className="max-w-screen-lg h-[68VH] w-full mt-4 ">
                <input type="text" onChange={(e) => {
                    setBlogData({
                        ...blogData,
                        title: e.target.value
                    })
                }}
                    className="block font-semibold w-full text-[24px] p-4 text-gray-900 shadow rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500" placeholder="Title" />
                <textarea rows={8} onChange={(e) => {
                    setBlogData({
                        ...blogData,
                        content: e.target.value
                    }
                )
                }} className="mt-2 focus:outline-none pt-2 block p-2.5 h-full shadow w-full text-sm text-gray-900 bg-gray-50 text-lg rounded-lg focus:ring-blue-500  " placeholder="Write your thoughts here..."></textarea>
                <div className="  flex justify-end">
                    <button type="button" onClick={sendRequest} className=" mt-3  h-10 focus:outline-none text-white bg-blue-500 hover:bg-vlue-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Publish Blog</button>
                </div>
            </div>
        </div>
    </>
}