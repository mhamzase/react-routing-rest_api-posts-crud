import React, { useState, useEffect } from 'react'
import { Card, OverlayTrigger, Tooltip } from 'react-bootstrap'
import axios from 'axios'
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import {Link} from 'react-router-dom'
import { store } from "react-notifications-component";

function Posts() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        loadPosts();
    }, [])

    const loadPosts = async () => {
        const posts = await axios.get("http://localhost:3001/posts");
        setPosts(posts.data.reverse())
    }

    const removePost = async (postId) => {
        if (window.confirm('Do you want to remove post?')) {
            await axios.delete(`http://localhost:3001/posts/${postId}`)
            loadPosts();

            store.addNotification({
                title: "Post",
                message: "Removed Successfully !",
                type: "danger", // 'default', 'success', 'info', 'warning' 
                container: "top-center", // where to position the notifications
                animationIn: ["animate__animated", "animate__fadeIn"], // animate.css classes that's applied
                animationOut: ["animate__animated", "animate__fadeOut"], // animate.css classes that's applied
                dismiss: {
                    duration: 2000,
                    // onScreen: true,
                    showIcon: true
                },
                width: 400,
            });
        }
    }

    return (
        <div className="container-fluid">
            <h1 className="display-1 text-center">Posts</h1>

            <div className="row col-12">
                {
                    posts.map((post) => (

                        <Card key={post.id} className="post">
                            <div className="text-right" >
                                <OverlayTrigger overlay={<Tooltip >View</Tooltip>}>
                                    <Link className="text-secondary options" to={`/posts/${post.id}`} ><FaEye/></Link>
                                </OverlayTrigger>

                                <OverlayTrigger overlay={<Tooltip >Edit</Tooltip>}>
                                    <Link className="text-primary options" to={`/post/edit/${post.id}`}><FaEdit /></Link>
                                </OverlayTrigger>

                                <OverlayTrigger overlay={<Tooltip >Remove</Tooltip>}>
                                    <FaTrash className="text-danger options" onClick={() => removePost(post.id)} />
                                </OverlayTrigger>
                            </div>

                            <Card.Body>
                                <Card.Title>{post.title}</Card.Title>
                                <hr style={{ border: '1px solid #548f60' }} />
                                <Card.Text>{post.body}</Card.Text>
                            </Card.Body>
                        </Card>


                    ))
                }
            </div>
        </div>
    )
}

export default Posts
