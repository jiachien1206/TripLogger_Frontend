import React from 'react';
import { useParams } from 'react-router-dom';
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
    ButtonsWrap,
} from './Components';
import Button from '@mui/material/Button';
import { Alerts, Toast } from '../../utils/alerts';

function EditPost() {
    const { isLogin, jwtToken, logout } = React.useContext(AuthContext);
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
            try {
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
            } catch (e) {
                Alerts.serverError();
            }
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
                    Alerts.imageTooBig();
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
            } catch (e) {
                if (e.response.status === 401) {
                    const result = await Alerts.unauthorized();
                    if (result.isConfirmed) {
                        logout();
                    }
                } else {
                    Alerts.serverError();
                }
            }
        };
        uploadImage();
    }, [file]);

    const submitPost = async () => {
        try {
            if (title.length < 1 || title.length > 100) {
                Alerts.invalidPostTitle();
            } else if (content.length < 17 || content.length > 20500) {
                Alerts.invalidPostContent();
            } else {
                try {
                    const result = await Alerts.submitPost();

                    if (result.isConfirmed) {
                        const res = await api.editPost(
                            postId,
                            {
                                title,
                                content,
                                main_image: mainImg,
                            },
                            jwtToken
                        );
                        await Toast.updatingPost();
                        window.location.replace(`/post/${postId}`);
                    }
                } catch (e) {
                    if (e.response.status === 401) {
                        const result = await Alerts.unauthorized();
                        if (result.isConfirmed) {
                            logout();
                        }
                    } else {
                        Alerts.serverError();
                    }
                }
            }
        } catch (e) {
            Alerts.serverError();
        }
    };
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
                <ButtonsWrap>
                    <Button
                        variant="outlined"
                        sx={{ width: '100px' }}
                        disableElevation
                        onClick={() => navigate(-1)}
                    >
                        取消
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ width: '100px' }}
                        disableElevation
                        onClick={submitPost}
                    >
                        編輯完成
                    </Button>
                </ButtonsWrap>
            </BottomWrap>
        </EditorWrap>
    );
}

export default EditPost;
