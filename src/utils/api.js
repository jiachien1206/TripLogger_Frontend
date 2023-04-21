import axios from 'axios';
const api = {
    HOST_NAME: 'http://127.0.0.1:8000/api',
    getNewPosts() {
        return axios(`${this.HOST_NAME}/latest-posts`);
    },
    getTopPosts() {
        return axios(`${this.HOST_NAME}/top-posts`);
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
    getPostNumbers(postId) {
        return axios(`${this.HOST_NAME}/posts/${postId}/num`);
    },
    getContinentPosts(continent) {
        return axios(`${this.HOST_NAME}/continents/${continent}`);
    },
    addRead(postId, userId, location, type) {
        return axios.post(`${this.HOST_NAME}/posts/${postId}/reads`, { userId, location, type });
    },
    likePost(postId, location, type, like, jwtToken) {
        return axios.post(
            `${this.HOST_NAME}/posts/${postId}/like`,
            { location, type, like },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
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
    getUserPosts(userId, jwtToken) {
        return axios(`${this.HOST_NAME}/users/${userId}/posts`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    getUserVisited(userId, jwtToken) {
        return axios(`${this.HOST_NAME}/users/${userId}/visited`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    getUserSavedPosts(userId, postIds, jwtToken) {
        return axios.post(
            `${this.HOST_NAME}/users/${userId}/saved`,
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
    getPresignUrl() {
        return axios(`${this.HOST_NAME}/post/presignUrl`, {
            headers: {
                'Content-Type': 'application/json',
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
        return axios(`${this.HOST_NAME}/users/${userId}/setting`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    editUser(userId, data, jwtToken) {
        return axios.put(`${this.HOST_NAME}/users/${userId}/setting`, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
};

export default api;
