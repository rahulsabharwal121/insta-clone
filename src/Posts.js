import React, {useState} from 'react'
import './Posts.css'
import Avatar from '@material-ui/core/Avatar'

function Posts({username, caption, imageurl}) {


    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                className="post__avatar"
                alt="Rahul"></Avatar>
                <h3>{username}</h3>
            </div>
  
            <img className="post__image" src={imageurl} alt="image"/>
            <h4 className="post__text"><strong>{username}</strong>{caption}</h4>
        </div>
    )
}

export default Posts
