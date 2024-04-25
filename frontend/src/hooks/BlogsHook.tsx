import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

interface Blogs{
   "title":string,
    "content":string,
    "id":number,
    "author": {
        "name":string
    }
}

export const useSingleBlog = ({id} : {id:string}) =>{
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs>();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
        )
        .then(response => {
            setBlogs(response.data.data),
            setLoading(false)
        })
    }, []);
    return {
        loading,
        blogs,
    }
    
}

export const useBlog = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blogs[]>([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        }
        )
        .then(response => {
            setBlogs(response.data.posts),
            setLoading(false)
        })
    }, []);
    return {
        loading,
        blogs,
    }
}