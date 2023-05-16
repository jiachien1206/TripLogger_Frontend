export const imageUrl = (url) => {
    if (url) {
        return url.replace(
            'https://triplogger.s3.ap-northeast-1.amazonaws.com',
            'https://demj1sg6qvpz9.cloudfront.net'
        );
    }
};
