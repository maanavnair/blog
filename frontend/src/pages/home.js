import React, { useEffect, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { format } from 'date-fns';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('https://blogify-backend-lake.vercel.app/home', {
        credentials: 'include',
      });
      try{
        if(res.ok){
          const data = await res.json()
          setBlogs(data.blogs);
        }
        else{
          console.log('Internal Server Error');
        }
      }
      catch(err){
        console.log('Error Fetching Blogs');
      }
    }
    fetchBlogs();
  }, [])

  const list = blogs && blogs.map((blog) => (
    <div key={blog._id} className='blog-list-item'>
      <Link to={`/blog/${blog._id}`} className='blog-list-heading'>
        <h1>{blog.title}</h1>
      </Link>
      <p className='blog-list-para'><span className='home-author-name'>{blog.username}</span><span>{format(new Date(blog.createdAt), 'dd-MM-yyyy HH:mm:ss')}</span></p>
      <p className='blog-desc'>{blog.desc}</p>
    </div>
  ));


  return (
    <div className='home-page'>
      <h1>Blogs</h1>
      {blogs && list}
    </div>
  )
}

export default Home