import React, {useState,useEffect} from "react";
import axios from "axios";
import CommentCreate from "./CommentCreate";
import CommentList from "./CommentList";

export default () => {
    const [posts,setPosts] = useState({});

    const fetchPosts = async() => {
        const res = await axios.get('http://localhost:4002/posts');
        console.log("postList ->",res.data);
        setPosts(res.data);
    }

    useEffect(() =>{
        fetchPosts();
    },[]);
    // console.log(posts);

     // it will return an array of all the values of the post dict
     const renderedPosts = Object.values(posts)
    .map(post => {
        return (
            <div className="card"
            style = {{width:'30%',marginBottom:'20px'}}
            key ={post.id}>
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentList comments = {post.comments}/>
                    <CommentCreate postId={post.id}/>
                </div>
            </div>

        )
    });
    return <div className="d-flex flex-row flex-wrap justify-content-between" >  {renderedPosts}</div> 
};
