import React, {useState, useEffect } from 'react'
import axios from "axios"

import Posts from './components/posts'
import "./App.css"
import Pagination from './components/Pagination'

const App = () => {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage] = useState(10)

  useEffect(() => {
   const fetchPosts = async () => {
    setLoading(true)
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
    setPosts(res.data)
    setLoading(false)
  } 
  fetchPosts()
  }, [])

  const indexOfLastPost = currentPage * postsPerPage // 10
  const indexOfFirstPost = indexOfLastPost - postsPerPage //10 - 10 = 0
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost) //(0,10)
  
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }


  return (
    <div className="container">
      <h1 className="text-primary mb3">My Blog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination paginate={paginate} postsPerPage={postsPerPage} totalPosts={posts.length} />
    </div>
  )
}

export default App