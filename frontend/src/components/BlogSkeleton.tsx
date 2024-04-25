
export const BlogSkeleton = () => {
    return <>
    <div className="w-screen flex justify-center">
        <div role="status" className=" animate-pulse ">
            <div className="flex justify-center mt-8 mb-12 cursor-pointer">
                <div className="flex justify-items-start  border-b-2 border-slate-200 w-[50VW] pb-4	">
                    <div className="">
                        <div className="flex">
                            <div className="flex justify-center flex-col">
                                <div className="h-2.5 bg-gray-200 rounded-full  w-[50VW] mb-4"></div>

                            </div>
                            <div className="h-2 bg-gray-200 rounded-full   mb-2.5"></div>

                        </div>

                        <div className="font-bold text-2xl mb-2">
                            <div className="h-2 bg-gray-200 rounded-full   mb-2.5"></div>

                        </div>
                        <div className="text-md font-thin">
                            <div className="h-2 bg-gray-200 rounded-full   mb-2.5"></div>

                        </div>
                        <div className="text-slate-400 text-sm font-thin mt-5 ">
                            <div className="h-2 bg-gray-200 rounded-full   mb-2.5"></div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
        </div>
    </>
}

// function Skeleton() {
//     return <>
//         <div role="status" className="max-w-sm animate-pulse">
//             <div className="h-2.5 bg-gray-200 rounded-full  w-48 mb-4"></div>
//             <div className="h-2 bg-gray-200 rounded-full  max-w-[360px] mb-2.5"></div>
//             <div className="h-2 bg-gray-200 rounded-full  mb-2.5"></div>
//             <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
//             <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
//             <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
//             <span className="sr-only">Loading...</span>
//         </div>
//     </>
// }   
// }
