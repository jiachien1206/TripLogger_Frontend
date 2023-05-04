import axios from 'axios';
const api = {
    // eslint-disable-next-line no-undef
    HOST_NAME: `${process.env.REACT_APP_SERVER}/api`,
    getNewPosts(page = 1) {
        return axios(`${this.HOST_NAME}/latest-posts?paging=${page}`);
    },
    getTopPosts(page = 1) {
        return axios(`${this.HOST_NAME}/top-posts?paging=${page}`);
    },
    getRelevantPosts(jwtToken) {
        return axios(`${this.HOST_NAME}/relevant-posts`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    getPost(postId) {
        return axios(`${this.HOST_NAME}/posts/${postId}`);
    },
    getPosts(postIds) {
        return axios(`${this.HOST_NAME}/posts?ids=${postIds}`);
    },
    getPostNumbers(postId) {
        return axios(`${this.HOST_NAME}/posts/${postId}/num`);
    },
    getContinentPosts(continent, types, page) {
        return axios(`${this.HOST_NAME}/continents/${continent}?types=${types}&paging=${page}`);
    },
    addRead(postId, userId, location, type) {
        return axios.post(`${this.HOST_NAME}/posts/${postId}/reads`, { userId, location, type });
    },
    likePost(postId, data, jwtToken) {
        return axios.post(`${this.HOST_NAME}/posts/${postId}/like`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    savePost(postId, location, type, save, jwtToken) {
        return axios.post(
            `${this.HOST_NAME}/posts/${postId}/save`,
            { location, type, save },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
    },
    getLikeSaveStatus(jwtToken) {
        return axios(`${this.HOST_NAME}/posts-user-status`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    getMapPosts() {
        return axios(`${this.HOST_NAME}/map-posts`);
    },
    getUserPosts(userId) {
        return axios(`${this.HOST_NAME}/user/${userId}/posts`);
    },
    getUserVisited(userId, jwtToken) {
        return axios(`${this.HOST_NAME}/user/visited`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    getUserSavedPosts(userId, postIds, jwtToken) {
        return axios.post(
            `${this.HOST_NAME}/user/saved`,
            { postIds },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
    },
    createPost(post, jwtToken) {
        return axios.post(`${this.HOST_NAME}/post`, post, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    signup(data) {
        return axios.post(`${this.HOST_NAME}/user/signup`, data);
    },
    checkUser(data) {
        return axios.post(`${this.HOST_NAME}/user/signup-email`, data);
    },
    createUserNewsfeed(jwtToken) {
        return axios.post(
            `${this.HOST_NAME}/user/newsfeed`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
    },
    signin(data) {
        return axios.post(`${this.HOST_NAME}/user/signin`, data);
    },
    postsUserStatusUpdated(jwtToken) {
        return axios.delete(`${this.HOST_NAME}/relevant-posts`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    getPresignUrl(jwtToken) {
        return axios(`${this.HOST_NAME}/post/presignUrl`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    editPost(postId, post, jwtToken) {
        return axios.put(`${this.HOST_NAME}/post/${postId}`, post, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    deletePost(postId, jwtToken) {
        return axios.delete(`${this.HOST_NAME}/post/${postId}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    searchPost(keyword) {
        return axios(`${this.HOST_NAME}/search?keyword=${keyword}`);
    },
    writeComment(postId, comment, jwtToken) {
        return axios.post(`${this.HOST_NAME}/posts/${postId}/comment`, comment, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    getUser(userId, jwtToken) {
        return axios(`${this.HOST_NAME}/user/setting`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    editUser(userId, data, jwtToken) {
        return axios.put(`${this.HOST_NAME}/user/setting`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    logout(data, jwtToken) {
        return axios.post(`${this.HOST_NAME}/user/logout`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    getNotification(jwtToken) {
        return axios(`${this.HOST_NAME}/user/notification`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    readNotification(jwtToken) {
        return axios.put(
            `${this.HOST_NAME}/user/notification`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
    },
};

export default api;
