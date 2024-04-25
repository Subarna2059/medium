import { useParams } from "react-router-dom"
import { FullBlog } from "../components/Fullblog"
import { useSingleBlog } from "../hooks/BlogsHook"
import { BlogSkeleton } from "../components/BlogSkeleton"
import { AppBar } from "../components/AppBar"

export const Blog = () => {
    const {id} = useParams();
    const {loading, blogs} = useSingleBlog({
        id:id||""
    });
    if (loading||!blogs) {
        return<div>
            <AppBar></AppBar>
            <BlogSkeleton></BlogSkeleton>
        </div>
    }
    return <>
        <div>
            <FullBlog title={blogs.title} content={blogs.content} author={blogs.author.name}></FullBlog>
        </div>
  
    </>
}