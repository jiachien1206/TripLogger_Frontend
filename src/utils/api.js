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
};

export default api;
