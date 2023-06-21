import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import Spinner from './Spinner'

const Blogs = () => {
    const { loading, posts } = useContext(AppContext)
    return (
        <div>
            {
                loading ? (
                    <Spinner />
                ) : (
                    posts.length === 0 ?
                        (
                            <div>
                                <p>No Post Found</p>
                            </div>
                        ) :
                        (
                            posts.map((post) => (
                                <div>
                                    <p className='font-bold'>{post.title}</p>
                                    <p>
                                        By <span>{post.author}</span> on <span>{post.category}</span>
                                    </p>
                                    <p>Posted on {post.date}</p>
                                    <p>{post.content}</p>
                                    <div>
                                        {post.tags.map((tag) => {
                                            return <span>{`#$(tag)`}</span>
                                        })}
                                    </div>
                                </div>
                            ))
                        )
                )
            }
        </div>
    )
}

export default Blogs