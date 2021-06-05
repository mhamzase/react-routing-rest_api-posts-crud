import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory , useParams} from 'react-router-dom';
import { store } from "react-notifications-component";

function AddPost() {

    const [post, setPost] = useState({
        title: '',
        body: ''
    })

    const [checkTitle, setCheckTitle] = useState(false);
    const [checkBody, setCheckBody] = useState(false);

    const { title, body } = post;
    let history = useHistory();

    let {id} = useParams();

    const handleTitleInput = (e) => {
        if (!title || !title.trim()) {
            setCheckTitle(true)
        }
        else {
            setCheckTitle(false)
        }
        setPost({ ...post, [e.target.name]: e.target.value })
    }

    const handleBodyInput = (e) => {
        if (!body || !body.trim()) {
            setCheckBody(true)
        }
        else {
            setCheckBody(false)
        }
        setPost({ ...post, [e.target.name]: e.target.value })
    }


    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (title && title.trim()) {
            if (body && body.trim()) {
                await axios.put(`http://localhost:3001/posts/${id}`, post);
                history.push("/posts");

                store.addNotification({
                    title: "Post",
                    message: "Updated Successfully !",
                    type: "default", // 'default', 'success', 'info', 'warning' 
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
            else
            {
                setCheckBody(true)
                setCheckTitle(false)
            }
        }
        else
        {
            setCheckTitle(true)
        }
    }


    useEffect(() => {
        loadPost();
    }, [])

    const loadPost = async () => {
        const post = await axios.get(`http://localhost:3001/posts/${id}`);
        setPost(post.data)
    }




    return (
        <div className="container">
            <h1 className="display-4 text-center mt-4">Update Post</h1>
            <div className="row mt-5">
                <div className="col-8 m-auto">
                    <form onSubmit={(e) => handleSubmitForm(e)}>
                        <input onChange={(e) => handleTitleInput(e)} type="text" name="title" className="form-control mb-3" placeholder="Title" value={title} />
                        {checkTitle ? <p className="text-danger">Title can't empty!</p> : null}
                        <textarea onChange={(e) => handleBodyInput(e)} name="body" style={{ resize: 'none' }} rows="6" type="text" className="form-control mb-3" placeholder="Body" value={body}></textarea>
                        {checkBody ? <p className="text-danger">Body can't empty!</p> : null}
                        <button type="submit" className="btn btn-info col-12">Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddPost
