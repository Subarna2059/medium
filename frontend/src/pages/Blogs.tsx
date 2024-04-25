import { BlogCard } from "../components/BlogCard"
import { AppBar } from "../components/AppBar"
import { useBlog } from "../hooks/BlogsHook"
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blogs = () => {
    const {loading, blogs} = useBlog();
    if (loading) {
        return <div>
            <AppBar></AppBar>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
            <BlogSkeleton></BlogSkeleton>
        </div>
    }
    return <>

        <AppBar />
        {blogs.map(posts=>{
            return <div>
            <BlogCard id={posts.id} author={posts.author.name || "Anynomous"} content={posts.content} title={posts.title} publishedDate={"2nd feb 2024"} />
            </div>
        })}


    </>
}