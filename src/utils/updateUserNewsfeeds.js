import api from './api';
import React from 'react';
// const matchStatus = (posts, saved_posts, liked_posts) => {
//     return posts.map((post) => {
//         if (saved_posts.includes(post._id)) {
//             post.save_status = true;
//         } else {
//             post.save_status = false;
//         }
//         if (liked_posts.includes(post._id)) {
//             post.like_status = true;
//         } else {
//             post.like_status = false;
//         }
//         return post;
//     });
// };

const updateNewsfeeds = async (jwtToken) => {
    if (jwtToken) {
        const status = await api.getLikeSaveStatus(jwtToken);
        const { saved_posts, liked_posts } = status.data.data;
        window.localStorage.setItem('likedPosts', JSON.stringify(liked_posts));
        window.localStorage.setItem('savedPosts', JSON.stringify(saved_posts));
        let relevantPosts = await api.getRelevantPosts(jwtToken);
        relevantPosts = relevantPosts.data.data;
        window.localStorage.setItem('relevantPosts', JSON.stringify(relevantPosts));
    }
    let topPosts = await api.getTopPosts();
    topPosts = topPosts.data.data;
    let newPosts = await api.getNewPosts();
    newPosts = newPosts.data.data;
    window.localStorage.setItem('topPosts', JSON.stringify(topPosts));
    window.localStorage.setItem('newPosts', JSON.stringify(newPosts));

    // const relevantPostsResult = matchStatus(relevantPosts, saved_posts, liked_posts);
    // const topPostsResult = matchStatus(topPosts, saved_posts, liked_posts);
    // const newPostsResult = matchStatus(newPosts, saved_posts, liked_posts);

    // await api.postsUserStatusUpdated(jwtToken);
};

export default updateNewsfeeds;
