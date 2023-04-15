import axios from 'axios';
const api = {
    HOST_NAME: 'http://127.0.0.1:8080/api',
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
    addRead(postId, userId, location, tag) {
        return axios.post(`${this.HOST_NAME}/posts/${postId}/reads`, { userId, location, tag });
    },
    likePost(postId, location, tag, like, jwtToken) {
        return axios.post(
            `${this.HOST_NAME}/posts/${postId}/like`,
            { location, tag, like },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwtToken}`,
                },
            }
        );
    },
    savePost(postId, location, tag, save, jwtToken) {
        return axios.post(
            `${this.HOST_NAME}/posts/${postId}/save`,
            { location, tag, save },
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
        return axios(`${this.HOST_NAME}/user/${userId}/posts`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
    },
    getUserVisited(jwtToken) {
        return axios(`${this.HOST_NAME}/user/visited`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${jwtToken}`,
            },
        });
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
};

export default api;
