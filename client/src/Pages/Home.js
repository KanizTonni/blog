import React, {useState, useContext, useEffect} from 'react';
import { LoginContext } from '../LoginContext';
import Axios from 'axios';

import Posts from '../Views/Posts';

export default function Home() {
    const {state, setState} = useContext(LoginContext);
    const [post_description, setPost_description] = useState('');
    const [postError, setPostError] = useState('');
    const [postMessage, setPostMessage] = useState('');
    const [allPosts, setAllPosts] = useState([]);

    {/**submiting post */}
    const submitPost = () => {
        if(post_description) {
            Axios.post('http://localhost:3001/postSubmit', {
            post: post_description,
            id: JSON.parse(localStorage.getItem('id')),
            }).then((response) => {
                viewPosts()
                setPost_description('')
            }, (error) => {
                console.log(error);
            });
        } else {
            setPostError('Nothing typed! type to post');
        }
    }

    {/**viewing all post */}
    const viewPosts = () => {
        Axios.post('http://localhost:3001/postView', {
            id: JSON.parse(localStorage.getItem('id')),
            }).then((response) => {
                if(response.data.message){
                    setPostMessage(response.data.message)
                } else {
                    setAllPosts(response.data);
                    setPostMessage('')
                }
            }, (error) => {
                console.log(error);
        });
    }

    {/**update  post */}
    const updatePost = (postId) => {
        if(post_description) {
            Axios.post('http://localhost:3001/updateSubmit', {
            post: post_description,
            postId: postId,
            }).then((response) => {
                viewPosts()
                setPost_description('')
            }, (error) => {
                console.log(error);
            });
        }
    }

    {/**delete post */}
    const deletePost = (postId) => {
        Axios.post('http://localhost:3001/deletePost', {
            postId: postId,
            }).then((response) => {
            }, (error) => {
                console.log(error);
            });
    }
    
    const setItems = () => {
        setState({loggedIn: JSON.parse(localStorage.getItem('loggedIn'))});
    }

    useEffect(() => {
        setItems();
        viewPosts();
    }, []);

    return (
        <div>
            {state.loggedIn ? (
                <>
                <Posts 
                    submitPost={submitPost} 
                    updatePost={updatePost}
                    deletePost={deletePost}
                    setPost_description={setPost_description}
                    postMessage={postMessage}
                    allPosts={allPosts}
                     />
                <p>{postError}</p>
                </>
                ) : (
                <>
                <h2>login to see the post</h2>
                </>
            )}
        </div>
    )
}
