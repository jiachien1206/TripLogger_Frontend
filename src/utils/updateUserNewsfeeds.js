import api from './api';

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
};

export default updateNewsfeeds;
