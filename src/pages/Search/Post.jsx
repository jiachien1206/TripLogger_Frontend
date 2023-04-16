import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
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

const Highlight = styled(Highlighter)`
    .highlight {
        margin: 0px 3px;
        padding: 0px 8px;
        background-color: #a0d9a0;
        border-radius: 20px;
    }
`;

const Post = ({ post, keyword }) => {
    const strippedContent = post.content.replace(/(<([^>]+)>)/gi, ' ');
    const index = strippedContent.indexOf(keyword);
    let paragraph = strippedContent.substring(index - 80, index + keyword.length + 80);

    return (
        <PostWrap>
            <PostLink to={post.url}>
                {/* <PostMainImg src={post.main_image}></PostMainImg> */}
                <PostTitle>
                    <Highlight
                        highlightClassName="highlight"
                        searchWords={[keyword]}
                        autoEscape={true}
                        textToHighlight={post.title}
                    />
                </PostTitle>
                <PostContent>
                    <Highlight
                        highlightClassName="highlight"
                        searchWords={[keyword]}
                        autoEscape={true}
                        textToHighlight={paragraph}
                    />
                </PostContent>
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
