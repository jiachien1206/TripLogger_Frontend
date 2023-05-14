import React from 'react';
import { AuthContext } from '../../context/authContext';
import { Navigate } from 'react-router-dom';
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
import { countryOptions } from './countryData';
import { Alerts, Toast } from '../../utils/alerts';

function CreatePost() {
    const { isLogin, jwtToken, logout } = React.useContext(AuthContext);
    const [file, setFile] = React.useState();
    const [mainImg, setMainImg] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [country, setCountry] = React.useState(['臺灣', '亞洲']);
    const [type, setType] = React.useState('景點');
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [progress, setProgress] = React.useState(0);

    const typeOptions = [
        { value: '景點', label: '景點' },
        { value: '住宿', label: '住宿' },
        { value: '交通', label: '交通' },
        { value: '省錢妙招', label: '省錢妙招' },
        { value: '恐怖故事', label: '恐怖故事' },
        { value: '證件', label: '證件' },
        { value: '其他', label: '其他' },
    ];

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
            if (!mainImg) {
                Alerts.noImage();
            } else if (title.length < 1 || title.length > 100) {
                Alerts.invalidPostTitle();
            } else if (
                startDate === null ||
                endDate === null ||
                new Date(endDate) - new Date(startDate) < 0
            ) {
                Alerts.invalidDates();
            } else if (content.length < 17 || content.length > 20500) {
                Alerts.invalidPostContent();
            } else {
                try {
                    const result = await Alerts.submitPost();
                    if (result.isConfirmed) {
                        const res = await api.createPost(
                            {
                                title,
                                content,
                                main_image: mainImg,
                                location: { continent: country[1], country: country[0] },
                                type,
                                dates: { start_date: startDate, end_date: endDate },
                            },
                            jwtToken
                        );
                        await Toast.submittingPost();
                        window.location.replace(`/post/${res.data.data}`);
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

    const ref = React.useRef();
    if (isLogin)
        return (
            <EditorWrap>
                <MainImgWrap>
                    {mainImg && <MainImg src={mainImg} />}
                    {progress !== 0 && progress < 100 && <CircularStatic progress={progress} />}
                    <UploadImg>
                        <MainImgButton onClick={handleUploadClick}>
                            {file ? `變更首圖` : '上傳首圖'}
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
                <Title
                    autoFocus
                    placeholder=" 輸入文章標題..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <SelectWrap>
                    <Selects
                        defaultValue={{ value: ['臺灣', '亞洲'], label: '🇹🇼臺灣 Taiwan' }}
                        onChange={(e) => setCountry(e.value)}
                        options={countryOptions}
                    />
                    <Selects
                        defaultValue={{ value: '景點', label: '景點' }}
                        onChange={(e) => setType(e.value)}
                        options={typeOptions}
                    />
                    <DateInput
                        type="text"
                        ref={ref}
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => (e.target.type = 'text')}
                        placeholder="旅行開始日期"
                        onChange={(e) => {
                            setStartDate(e.target.value);
                        }}
                        max={new Date().toISOString().split('T')[0]}
                    ></DateInput>
                    <DateInput
                        type="text"
                        ref={ref}
                        onFocus={(e) => (e.target.type = 'date')}
                        onBlur={(e) => (e.target.type = 'text')}
                        placeholder="旅行結束日期"
                        onChange={(e) => {
                            setEndDate(e.target.value);
                        }}
                        max={new Date().toISOString().split('T')[0]}
                    ></DateInput>
                </SelectWrap>
                <BottomWrap>
                    <TextEditor editContent={(value) => setContent(value)} />
                    <Button
                        variant="contained"
                        sx={{ width: '100px', margin: '0px auto' }}
                        disableElevation
                        onClick={submitPost}
                    >
                        發文
                    </Button>
                </BottomWrap>
            </EditorWrap>
        );
    else return <Navigate to="/" replace={false} />;
}

export default CreatePost;
