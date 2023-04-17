import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostWrap = styled.div`
    border: 1px solid #929292;
    border-radius: 10px;
    background-color: #fff;
    padding: 10px;
    margin: 10px auto;
    max-width: 800px;
`;

const PostLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const PostMainImg = styled.img`
    width: 100%;
`;

const PostTitle = styled.div`
    font-size: 24px;
`;

const PostContent = styled.div`
    font-size: 14px;

    & img {
        max-width: 100%;
    }
`;

const Post = ({ post }) => {
    return (
        <PostWrap>
            <PostLink to={post.url}>
                {/* <PostMainImg src={post.main_image}></PostMainImg> */}
                <PostTitle>{post.title}</PostTitle>
                <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />
                {/* <ReadIcon />
                <ReadNum>{readNum}</ReadNum>
                <PostContinent>{post.location.continent}</PostContinent>
                <PostCountry>{post.location.country}</PostCountry>
                <PostTags>{post.tags}</PostTags>
                <PostAuthor>{post.authorId}</PostAuthor>
                
                <PostTime>{post.dates.post_date}</PostTime> */}
            </PostLink>
            {/* <Bottom>
                {like ? <LikedButton onClick={likePost} /> : <LikeButton onClick={likePost} />}
                <LikeNum>{likeNum}</LikeNum>
                {save ? <SavedButton onClick={savePost} /> : <SaveButton onClick={savePost} />}
            </Bottom> */}
        </PostWrap>
    );
};

export default Post;
