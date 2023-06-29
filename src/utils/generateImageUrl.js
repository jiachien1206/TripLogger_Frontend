export const imageUrl = (url) => {
    if (url) {
        if (url.includes('source')) {
            return 'https://demj1sg6qvpz9.cloudfront.net/Maldives/main-s.jpg';
        } else {
            return url.replace(
                'https://triplogger.s3.ap-northeast-1.amazonaws.com',
                'https://demj1sg6qvpz9.cloudfront.net'
            );
        }
    }
};
