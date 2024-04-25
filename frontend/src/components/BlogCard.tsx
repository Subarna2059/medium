import { Link } from "react-router-dom"

interface BlogProps {
    author: string,
    title: string,
    content: string,
    publishedDate: string,
    id:number,
}
export const BlogCard = ({
    author,
    title,
    content,
    publishedDate,
    id,
}: BlogProps) => {
    return <><Link to={`/blog/${id}`}>
        <div className="flex justify-center mt-8 mb-12 cursor-pointer">
            <div className="flex justify-items-start  border-b-2 border-slate-200 w-[50VW] pb-4	">
                <div className="">
                    <div className="flex">
                        <div className="flex justify-center flex-col">
                            <Avatar name={author} size={"small"}></Avatar>
                        </div>
                        <div className="font-normal text-black  pl-2"> {author} </div> <div className="pl-2 text-gray-600">. {publishedDate}</div>
                    </div>

                    <div className="font-bold text-2xl mb-2">
                        {title}
                    </div>
                    <div className="text-md font-thin">
                        {content.slice(0, 100) + "..."}
                    </div>
                    <div className="text-slate-400 text-sm font-thin mt-5 ">
                        {`${Math.ceil(content.length / 100)} minutes`}
                    </div>

                </div>
            </div>
        </div>
        </Link>
    </>
}

export function Avatar({ name, size }: { name: string, size:"big"|"small"
 }) {
    return <>
        <div className={`relative inline-flex items-center justify-center  overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 ${size==="big" ? "w-8 h-8" : "w-5 h-5" }`}>
            <span className={`font-medium text-gray-600 dark:text-gray-300  ${size === "big" ? "text-sm" : "text-xs"}`}>{name[0]}</span>
        </div>

    </>
}