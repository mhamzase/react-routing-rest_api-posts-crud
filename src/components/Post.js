
  
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import {FaHome} from 'react-icons/fa'

const Post = () => {
    const [post, setPost] = useState({
        title: "",
        body: "",
    });
    const { id } = useParams();

    

    const loadPost = async () => {
        const post = await axios.get(`http://localhost:3001/posts/${id}`);
        setPost(post.data);
    };

    useEffect(() => {
        loadPost();
    }, []);

    
    return (
        <div className="container py-4">
            <Link className="text-success" style={{fontSize:'80px'}} to="/"><FaHome /></Link>
            <h1 className="display-4">Post Id: <b>{id}</b></h1>
            <hr style={{height:'2px',backgroundColor:'gray'}}/>
            <ul className="list-group w-50 shadow-lg">
                <li className="list-group-item"><b>Title : </b> {post.title}</li>
                <li className="list-group-item"><b>Body : </b> {post.body}</li>
            </ul>
        </div>
    );
};

export default Post;