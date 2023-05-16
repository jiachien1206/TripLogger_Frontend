export const imageUrl = (url) => {
    const s3 = url.slice(0, 50);
    if (url) {
        if (s3 === 'https://triplogger.s3.ap-northeast-1.amazonaws.com') {
            const name = url.slice(50);
            return 'https://demj1sg6qvpz9.cloudfront.net' + name;
        }
        return url;
    }
};
