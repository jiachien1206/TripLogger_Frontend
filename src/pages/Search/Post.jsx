import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Highlighter from 'react-highlight-words';
import { RiMapPin2Fill } from 'react-icons/ri';

const PostWrap = styled(Link)`
    border-radius: 15px;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    cursor: pointer;
    display: flex;
    text-decoration: none;
    color: inherit;
    height: 250px;
    transition: all 0.2s;
    &:hover {
        transform: translate(0, -2px);
    }
`;

const PostMainImg = styled.img`
    width: 325px;
    object-fit: cover;
    border-top-left-radius: 15px;
    border-bottom-left-radius: 15px;
`;

const PostText = styled.div`
    padding: 0px 20px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

const PostTitle = styled.h2`
    font-size: 24px;
    margin: 20px 0px 0px;
`;

const PostContent = styled.div`
    font-size: 15px;
    line-height: 1.6;
    & img {
        max-width: 100%;
    }
`;

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
`;

const Location = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 17px;
    color: #65676b;
    margin-right: 30px;
`;

const PostType = styled.div``;

const PostTime = styled.div`
    color: #65676b;
`;

const RiMapPin2FillS = styled(RiMapPin2Fill)`
    font-size: 19px;
    color: #005647;
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
    const keywordList = keyword.split(' ');
    const strippedContent = post.content.replace(/(<([^>]+)>)/gi, ' ');
    const utcDate = new Date(post.date);
    const dateTime = utcDate.toLocaleString();
    const [date] = dateTime.split(' ');
    let lastIndex = 0;
    const paragraphs = keywordList.map((keyword) => {
        const index = strippedContent.indexOf(keyword);
        if (lastIndex === 0) {
            lastIndex = index;
            return strippedContent.substring(index - 50, index + keyword.length + 50);
        }
        if (index - lastIndex > 80) {
            lastIndex = index;
            return strippedContent.substring(index - 50, index + keyword.length + 50);
        }
    });

    return (
        <PostWrap to={post.url}>
            {console.log(post)}
            <PostMainImg src={post.main_image}></PostMainImg>
            <PostText>
                <PostTitle>
                    <Highlight
                        highlightClassName="highlight"
                        searchWords={keywordList}
                        autoEscape={true}
                        textToHighlight={post.title}
                    />
                </PostTitle>

                {paragraphs.map((paragraph) => {
                    return (
                        <>
                            <PostContent key={paragraph}>
                                <Highlight
                                    highlightClassName="highlight"
                                    searchWords={keywordList}
                                    autoEscape={true}
                                    textToHighlight={paragraph}
                                />
                            </PostContent>
                        </>
                    );
                })}
                <Bottom>
                    <Location>
                        <RiMapPin2FillS />
                        {post.continent} | {post.country}
                        <PostType>#{post.type}</PostType>
                    </Location>
                    <PostTime>{date}</PostTime>
                </Bottom>
            </PostText>
            {/* <ReadIcon />
                <ReadNum>{readNum}</ReadNum>
                <PostContinent>{post.location.continent}</PostContinent>
                <PostCountry>{post.location.country}</PostCountry>
                <PostType>{post.type}</PostType>
                <PostAuthor>{post.authorId}</PostAuthor>
                
                <PostTime>{post.dates.post_date}</PostTime> */}
            {/* </PostLink> */}
            {/* <Bottom>
                {like ? <LikedButton onClick={likePost} /> : <LikeButton onClick={likePost} />}
                <LikeNum>{likeNum}</LikeNum>
                {save ? <SavedButton onClick={savePost} /> : <SaveButton onClick={savePost} />}
            </Bottom> */}
        </PostWrap>
    );
};

export default Post;
