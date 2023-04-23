import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { Navigate } from 'react-router-dom';
import TextEditor from './Editor';
import api from '../../utils/api';
import updateNewsfeeds from '../../utils/updateUserNewsfeeds';
import axios from 'axios';

const MainImgWrap = styled.div`
    display: flex;
    margin: 20px 0px;
`;
const MainImg = styled.img`
    max-height: 200px;
`;
const UploadImg = styled.div``;

const MainImgButton = styled.button`
    padding: 10px;
    margin: 10px;
`;

const MainImgInput = styled.input`
    display: 'none';
`;

const Title = styled.input`
    height: 40px;
    width: 100%;
`;

const Continent = styled.select``;

const ContinentOption = styled.option``;

const Country = styled.input``;

const Type = styled.input``;

const TravelDate = styled.input``;

const Submit = styled.button`
    margin: 20px 0px;
`;

function CreatePost() {
    const { isLogin, jwtToken } = React.useContext(AuthContext);
    const [file, setFile] = React.useState();
    const [mainImg, setMainImg] = React.useState(null);
    const [title, setTitle] = React.useState('哈修塔特好好玩');
    const [content, setContent] = React.useState('');
    const [continent, setContinent] = React.useState('歐洲');
    const [country, setCountry] = React.useState('奧地利');
    const [type, setType] = React.useState('景點');
    const [travelDate, setTravelDate] = React.useState('2023-03-02');
    const inputRef = React.useRef(null);
    const handleUploadClick = () => {
        inputRef.current.click();
    };

    const handleFileChange = async (e) => {
        if (!e.target.files) {
            return;
        }

        setFile(e.target.files[0]);
    };

    React.useEffect(() => {
        const uploadImage = async () => {
            try {
                if (!file) {
                    return;
                }
                const res = await api.getPresignUrl(jwtToken);
                const url = res.data.data;
                await axios.put(url, file, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const mainImage = url.split('?')[0];
                setMainImg(mainImage);
            } catch (error) {
                console.log(error);
            }
        };
        uploadImage();
    }, [file]);

    async function submitPost() {
        try {
            const jwtToken = window.localStorage.getItem('jwtToken');
            await api.createPost(
                {
                    title,
                    content,
                    main_image: mainImg,
                    location: { continent, country },
                    type,
                    dates: { travel_date: travelDate },
                },
                jwtToken
            );
            alert('送出文章');
            await updateNewsfeeds(jwtToken);
            window.location.replace('/');
        } catch (e) {
            console.log(e);
            alert('文章發佈失敗');
        }
    }
    const contentEndRef = React.useRef(null);
    const scrollToBottom = () => {
        contentEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    React.useEffect(() => {
        scrollToBottom();
    }, [content]);

    if (isLogin)
        return (
            <>
                <MainImgWrap>
                    <MainImg src={mainImg} />
                    <UploadImg>
                        <MainImgButton onClick={handleUploadClick}>
                            {file ? `${file.name}` : '上傳首圖'}
                        </MainImgButton>
                        <MainImgInput
                            type="file"
                            ref={inputRef}
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleFileChange}
                            multiple={false}
                        />
                    </UploadImg>
                </MainImgWrap>
                <Title value={title} onChange={(e) => setTitle(e.target.value)} />
                <label>
                    洲：
                    <Continent value={continent} onChange={(e) => setContinent(e.target.value)}>
                        <ContinentOption>{'亞洲'}</ContinentOption>;
                        <ContinentOption>{'歐洲'}</ContinentOption>
                        <ContinentOption>{'北美洲'}</ContinentOption>
                        <ContinentOption>{'大洋洲'}</ContinentOption>
                        <ContinentOption>{'南美洲'}</ContinentOption>
                        <ContinentOption>{'非洲'}</ContinentOption>
                        <ContinentOption>{'南極洲'}</ContinentOption>
                    </Continent>
                </label>
                <label>
                    國家：
                    <Country value={country} onChange={(e) => setCountry(e.target.value)} />
                </label>
                <label>
                    類別：
                    <Type value={type} onChange={(e) => setType(e.target.value)} />
                </label>
                <label>
                    旅遊時間：
                    <TravelDate
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                    />
                </label>
                <TextEditor editContent={(value) => setContent(value)} />
                <Submit type="button" onClick={submitPost}>
                    發文
                </Submit>
                <div ref={contentEndRef}></div>
            </>
        );
    else return <Navigate to="/" replace />;
}

export default CreatePost;
