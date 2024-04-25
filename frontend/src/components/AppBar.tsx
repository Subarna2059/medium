import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
export const AppBar = () => {
    return <>
    <div className="flex justify-center mt-3 h-16 ">
        <div className="border-b flex justify-between w-[70VW] pl-2 pr-2 items-center">
            <Link to={"/blogs"}>
            <div className="flex justify-center flex-col cursor-pointer">
                Medium
            </div>
            </Link>
            <div>
                <Link to={"/publish"}>
            <button type="button" className="mr-10 h-10 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">New Blog</button>
            </Link> 
                <Avatar name={"U"} size={"big"}/>
            </div>
        </div>
        </div>
    </>
}