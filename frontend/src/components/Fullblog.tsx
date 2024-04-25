import { AppBar } from "./AppBar"

interface BlogProps {
    title: string,
    content: string,
    author: string,
}
export const FullBlog = ({
    title,
    content,
    author,
}: BlogProps) => {

    return <>
        <AppBar></AppBar>
        <div className="flex justify-center pt-12">
            <div className="grid grid-cols-12 px-10 w-[70VW] mt-4 ">
                <div className="grid col-span-8   ">
                    <div className="font-bold text-4xl">
                        {title}
                    </div>
                    <div className="text-sm text-slate-400 mt-3 mb-4">
                        Posted on August 24, 2024
                    </div>
                    <div>
                        {content}
                    </div>
                </div>
                <div className="grid col-span-4 h-16 pl-8 font-semibold">
                    <div>
                        Author
                    </div>
                    <div className=" flex items-center text-xl mt-3">
                        <div className="relative inline-flex items-center justify-center  overflow-hidden bg-slate-100 rounded-full dark:bg-slate-400 w-5 h-5 mr-3 ml-2">
                            <span className="text-sm text-gray-600 dark:text-gray-300">{author[0]}</span>
                        </div>
                        <div className="font-bold">
                        {author}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    
}