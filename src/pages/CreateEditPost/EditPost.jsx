import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { Navigate, useNavigate } from 'react-router-dom';
import TextEditor from './Editor';
import api from '../../utils/api';
import axios from 'axios';
import {
    EditorWrap,
    MainImgWrap,
    MainImg,
    UploadImg,
    MainImgButton,
    MainImgInput,
    Title,
    SelectWrap,
    Selects,
    DateInput,
    CircularStatic,
    BottomWrap,
} from './Components';
import Button from '@mui/material/Button';

function EditPost() {
    const { isLogin, jwtToken } = React.useContext(AuthContext);
    const [file, setFile] = React.useState('');
    const [mainImg, setMainImg] = React.useState('');
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState();
    const [continent, setContinent] = React.useState('');
    const [country, setCountry] = React.useState('');
    const [type, setType] = React.useState('');
    const [startDate, setStartDate] = React.useState('');
    const [endDate, setEndDate] = React.useState('');
    const [progress, setProgress] = React.useState(0);
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

    const onUploadProgress = (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        setProgress(percent);
    };

    React.useEffect(() => {
        const uploadImage = async () => {
            try {
                if (!file || (file.type !== 'image/png' && file.type !== 'image/jpeg')) {
                    return;
                }
                if (file.size > 2097152) {
                    alert('檔案須小於2MB');
                    setFile();
                } else {
                    const res = await api.getPresignUrl(jwtToken);
                    const url = res.data.data;
                    await axios.put(url, file, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                        onUploadProgress,
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
            if (title.length < 1 || title.length > 100) {
                alert('請填寫 1 至 100 個字元的標題');
            } else if (content.length < 17 || content.length > 20500) {
                alert('請撰寫 10 至 20000 個字元的內文');
            } else {
                console.log(content);
                alert('文章更新');
                await api.editPost(
                    postId,
                    {
                        title,
                        content,
                        main_image: mainImg,
                    },
                    jwtToken
                );
                // await updateNewsfeeds(jwtToken);
                navigate(`/post/${postId}`);
            }
        } catch (e) {
            console.log(e);
            alert('文章更新失敗');
        }
    }
    if (!isLogin) return <Navigate to="/" replace={false} />;
    return (
        <EditorWrap>
            <MainImgWrap>
                <MainImg src={mainImg} />
                {progress !== 0 && progress < 100 && <CircularStatic progress={progress} />}
                <UploadImg>
                    <MainImgButton onClick={handleUploadClick}>
                        {file ? '變更首圖' : '上傳首圖'}
                    </MainImgButton>
                    <MainImgInput
                        type="file"
                        ref={inputRef}
                        accept="image/png, image/jpeg"
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
                <DateInput
                    className="edit"
                    type="date"
                    value={startDate}
                    disabled="disabled"
                ></DateInput>
                <DateInput
                    className="edit"
                    type="date"
                    value={endDate}
                    disabled="disabled"
                ></DateInput>
            </SelectWrap>
            <BottomWrap>
                {<TextEditor originContent={content} editContent={(value) => setContent(value)} />}
                <Button
                    variant="contained"
                    sx={{ width: '100px', margin: '0px auto' }}
                    disableElevation
                    onClick={submitPost}
                >
                    編輯完成
                </Button>
            </BottomWrap>
        </EditorWrap>
    );
}

export default EditPost;
