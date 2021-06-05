import React, { useState } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from "react-router-dom";

function Header() {

    const [homeActive,setHomeActive] = useState(false)
    const [postsActive,setPostsActive] = useState(false)

    const NavHome = () => {
        setHomeActive(true)
        setPostsActive(false)
    }

    const NavPosts = () => {
        setHomeActive(false)
        setPostsActive(true)
    }

    return (
        <div>
            <Navbar className="p-4" bg="dark" >
                <Nav className="mr-auto">
                    <Link onClick={NavHome} className={`mr-4 nav-item ${homeActive ? "active" : ""}`}   to="/">Home</Link>
                    <Link onClick={NavPosts} className={`mr-4 nav-item ${postsActive ? "active" : ""}`}  to="/posts">Posts</Link>
                </Nav>
                <Link className="btn btn-outline-light" to="/posts/add">Add New Post</Link>
            </Navbar>
        </div>
    )
}

export default Header
