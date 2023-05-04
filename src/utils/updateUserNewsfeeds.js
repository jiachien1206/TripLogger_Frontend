import api from './api';

const updateNewsfeeds = async (jwtToken) => {
    if (jwtToken) {
        let relevantPosts = await api.getRelevantPosts(jwtToken);
        relevantPosts = relevantPosts.data.data;
        window.localStorage.setItem('relevantPosts', JSON.stringify(relevantPosts));
        const res = await api.getLikeSaveStatus(jwtToken);
        const { saved_posts, liked_posts } = res.data.data;
        window.localStorage.setItem('likedPosts', JSON.stringify(liked_posts));
        window.localStorage.setItem('savedPosts', JSON.stringify(saved_posts));
    }
};

export default updateNewsfeeds;
