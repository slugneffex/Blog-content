import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/Header'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Blogdetails from '../components/Blogdetails';
// import { baseUrl } from '../baseUrl';


const Blogpage = () => {
    const newBaseUrl = "https://codehelp-apis.vercel.app/api/"

    const [blog, setBlog] = useState(null);
    const [relatedBlogs, setRelatedBlogs] = useState([]);
    const location = useLocation();
    let navigation = useNavigate();
    const {setLoading, loading} = useContext(AppContext);

    const blogId = location.pathname.split("/").at(-1);

    async function fetchRelatedBlogs() {
        setLoading(true);
        let url = `${newBaseUrl}get-blog?blogId=${blogId}`
        try {
            const res = await fetch(url);
            const data = await res.json();
            setBlog(data.blog);
            setRelatedBlogs(data.relatedBlogs)
        }

        catch(error) {
            console.log("Error");
            setBlog(null);
            setRelatedBlogs([]);
        }

        setLoading(false)
    }

    useEffect( () => {
        if(blogId) {
            fetchRelatedBlogs();
        }
    }, [location.pathname])


    return (
        <div>
            <Header />
            <div className='mt-[90px]'>
                <button
                onClick={() => navigation(-1)}
                >
                    Back
                </button>
            </div>
            {
                loading ? <p>Loading</p> : 
                blog ? (
                    <div>
                        <Blogdetails post={blog}/>
                        <h2>Related Blogs</h2>
                        {
                            relatedBlogs.map((post) => {
                                <div key={post.id}>
                                    <Blogdetails post={post} />
                                </div>
                            })
                        }
                    </div>
                ) : (
                    <div>
                        <p>No blog Found</p>
                    </div>
                )
            }

        </div>
    )
}

export default Blogpage
