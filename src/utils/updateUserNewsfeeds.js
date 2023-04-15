import api from './api';

const matchStatus = (posts, saved_posts, liked_posts) => {
    return posts.map((post) => {
        if (saved_posts.includes(post._id)) {
            post.save_status = true;
        } else {
            post.save_status = false;
        }
        if (liked_posts.includes(post._id)) {
            post.like_status = true;
        } else {
            post.like_status = false;
        }
        return post;
    });
};

const updateNewsfeeds = async (jwtToken) => {
    const status = await api.getLikeSaveStatus(jwtToken);
    const { saved_posts, liked_posts } = status.data.data;
    let relevantPosts = await api.getRelevantPosts(jwtToken);
    relevantPosts = relevantPosts.data.data;
    let topPosts = await api.getTopPosts();
    topPosts = topPosts.data.data;
    let newPosts = await api.getNewPosts();
    newPosts = newPosts.data.data;

    const relevantPostsResult = matchStatus(relevantPosts, saved_posts, liked_posts);
    const topPostsResult = matchStatus(topPosts, saved_posts, liked_posts);
    const newPostsResult = matchStatus(newPosts, saved_posts, liked_posts);
    window.localStorage.setItem('relevantPosts', JSON.stringify(relevantPostsResult));
    window.localStorage.setItem('topPosts', JSON.stringify(topPostsResult));
    window.localStorage.setItem('newPosts', JSON.stringify(newPostsResult));
    // await api.postsUserStatusUpdated(jwtToken);
};

export default updateNewsfeeds;
