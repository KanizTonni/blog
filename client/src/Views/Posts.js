import React, {useState, useContext, useEffect} from 'react';
import { LoginContext } from '../LoginContext';
import Axios from 'axios';
import './Posts.css'


export default function Posts({submitPost, updatePost, deletePost, setPost_description, postMessage, allPosts}) {

    return (
        <div className="posts">
            <h2>{JSON.parse(localStorage.getItem('full_name'))}</h2>
            <h4>{JSON.parse(localStorage.getItem('phone'))}</h4>
            <div className="post-input-container">
                <p>Type your posts</p>
                <input type="text" onChange={(e) => setPost_description(e.target.value)} />
                <button type="submit" onClick={submitPost}>Submit</button>
            </div>
            <h4>{postMessage}</h4>
                {allPosts.map((val) => {
                    return (
                        <>
                        <div className="prev-post-container">
                            <div className="prev-posts">
                                <p className="content">{val.Id}    {val.post_desc}</p>
                                <p className="time-date">{val.inserted_time}</p>
                            </div>
                            <div className="operation">
                                <input type="text" onChange={(e) => setPost_description(e.target.value)} />
                                <button onClick={() => {updatePost(val.Id)}}>Update</button>
                                <button onClick={() => {deletePost(val.Id)}}>Delete</button>
                            </div>
                            
                        </div>
                        </>
                    )
                })}
        </div>
    )
}
