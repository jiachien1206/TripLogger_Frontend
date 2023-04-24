import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { Navigate, useNavigate } from 'react-router-dom';
import TextEditor from './Editor';
import api from '../../utils/api';
import updateNewsfeeds from '../../utils/updateUserNewsfeeds';
import axios from 'axios';
import {
    Wrap,
    MainImgWrap,
    MainImg,
    UploadImg,
    MainImgButton,
    MainImgInput,
    Title,
} from './Components';
import Select from 'react-select';
import Button from '@mui/material/Button';

const SelectWrap = styled.div`
    display: flex;

    gap: 10px;
`;
const Selects = styled(Select)`
    width: 250px;
`;

function EditPost() {
    const { isLogin } = React.useContext(AuthContext);
    const [file, setFile] = React.useState('');
    const [mainImg, setMainImg] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState();
    const [continent, setContinent] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [type, setType] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const postId = useParams().id;
    const inputRef = React.useRef(null);
    const navigate = useNavigate();

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
        const getEditPost = async (postId) => {
            const res = await api.getPost(postId);
            const { title, main_image, content, location, type, dates } = res.data.data;
            setMainImg(main_image);
            setTitle(title);
            setContinent(location.continent);
            setCountry(location.country);
            setType(type);
            setStartDate(new Date(dates.start_date).toISOString().split('T')[0]);
            setEndDate(new Date(dates.end_date).toISOString().split('T')[0]);
            setContent(content);
        };
        getEditPost(postId);
    }, []);

    React.useEffect(() => {
        const uploadImage = async () => {
            try {
                if (!file) {
                    return;
                }
                if (file.size > 2097152) {
                    alert('檔案須小於2MB');
                    setFile();
                } else {
                    const res = await api.getPresignUrl();
                    const url = res.data.data;
                    await axios.put(url, file, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });
                    const mainImage = url.split('?')[0];
                    setMainImg(mainImage);
                }
            } catch (error) {
                console.log(error);
            }
        };
        uploadImage();
    }, [file]);

    async function submitPost() {
        try {
            alert('文章更新');
            const jwtToken = window.localStorage.getItem('jwtToken');
            await api.editPost(
                postId,
                {
                    title,
                    content,
                    main_image: mainImg,
                    location: { continent, country },
                    type,
                    // dates: { travel_date: travelDate },
                },
                jwtToken
            );
            await updateNewsfeeds(jwtToken);
            navigate('/');
        } catch (e) {
            console.log(e);
            alert('文章更新失敗');
        }
    }
    const contentEndRef = React.useRef(null);
    // const scrollToBottom = () => {
    //     contentEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // };

    // React.useEffect(() => {
    //     scrollToBottom();
    // }, [content]);
    if (!isLogin) return <Navigate to="/" replace />;
    return (
        <Wrap>
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
            {<Title value={title} onChange={(e) => setTitle(e.target.value)} />}
            <SelectWrap>
                <Selects isDisabled={true} placeholder={country} />
                <Selects isDisabled={true} placeholder={type} />
            </SelectWrap>

            {<TextEditor originContent={content} editContent={(value) => setContent(value)} />}
            <label>
                旅遊時間：{startDate} ~ {endDate}
            </label>
            <Button
                variant="contained"
                sx={{ width: '100px', margin: '20px auto' }}
                disableElevation
                onClick={submitPost}
            >
                編輯完成
            </Button>
            <div ref={contentEndRef}></div>
        </Wrap>
    );
}

export default EditPost;
