import React from 'react';
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
import { countryOptions } from './countryData';

function CreatePost() {
    const { isLogin, jwtToken } = React.useContext(AuthContext);
    const [file, setFile] = React.useState();
    const [mainImg, setMainImg] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [country, setCountry] = React.useState(['臺灣', '亞洲']);
    const [type, setType] = React.useState('景點');
    const [startDate, setStartDate] = React.useState(null);
    const [endDate, setEndDate] = React.useState(null);
    const [progress, setProgress] = React.useState(0);
    const navigate = useNavigate();

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
            if (!mainImg) {
                alert('請上傳首圖');
            } else if (title.length < 1 || title.length > 100) {
                alert('請填寫 1 至 100 個字元的標題');
            } else if (startDate === null || endDate === null) {
                alert('請選擇旅遊日期');
            } else if (new Date(endDate) - new Date(startDate) < 0) {
                alert('旅行結束日期需晚於開始日期');
            } else if (content.length < 17 || content.length > 20500) {
                alert('請撰寫 10 至 20000 個字元的內文');
            } else {
                alert('送出文章');
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
                // await updateNewsfeeds(jwtToken);
                navigate(`/post/${res.data.data}`);
            }
        } catch (e) {
            console.log(e);
            alert('文章發佈失敗');
        }
    }

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
