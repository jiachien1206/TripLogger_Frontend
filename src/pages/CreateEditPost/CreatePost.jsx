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
    Toast,
} from './Components';
import Button from '@mui/material/Button';
import { countryOptions } from './countryData';
import Swal from 'sweetalert2';
import warn from '../../images/warn.gif';
import send from '../../images/send.gif';
import travel from '../../images/travel.gif';

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
                    Swal.fire({
                        type: 'warning',
                        confirmButtonColor: 'var(--primary-color)',
                        text: 'This action cannot be undone.',
                        html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">檔案須小於2MB</div></div>`,
                    });
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
                Swal.fire({
                    type: 'warning',
                    confirmButtonColor: 'var(--primary-color)',
                    html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">請上傳首圖</div></div>`,
                });
            } else if (title.length < 1 || title.length > 100) {
                Swal.fire({
                    type: 'warning',
                    confirmButtonColor: 'var(--primary-color)',
                    html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">請填寫 1 至 100 個字元的標題</div></div>`,
                });
            } else if (startDate === null || endDate === null) {
                Swal.fire({
                    type: 'warning',
                    confirmButtonColor: 'var(--primary-color)',
                    html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">請選擇旅遊日期</div></div>`,
                });
            } else if (new Date(endDate) - new Date(startDate) < 0) {
                Swal.fire({
                    type: 'warning',
                    confirmButtonColor: 'var(--primary-color)',
                    html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">旅行結束日期需晚於開始日期</div></div>`,
                });
            } else if (content.length < 17 || content.length > 20500) {
                Swal.fire({
                    type: 'warning',
                    confirmButtonColor: 'var(--primary-color)',
                    html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">請撰寫 10 至 20000 個字元的內文</div></div>`,
                });
            } else {
                Swal.fire({
                    confirmButtonColor: 'var(--primary-color)',
                    cancelButtonColor: 'var(--third-font)',
                    showCancelButton: true,
                    confirmButtonText: '送出',
                    cancelButtonText: '取消',
                    html: `<div style="width: 100%; margin: 0px auto"><img src="${send}" width="140px"><div style="font-weight:500;">送出文章</div></div>`,
                })
                    .then((result) => {
                        if (result.isConfirmed) {
                            const res = api.createPost(
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
                            Toast.fire({
                                iconHtml: `<div style="width:50px; background-color: #ffffff; display:flex;" ><img width="100%" src="${travel}" ></div>`,
                                title: '發文中～',
                            });
                            return res;
                        }
                    })
                    .then((res) => window.location.replace(`/post/${res.data.data}`))
                    .catch((e) => {
                        Swal.fire({
                            type: 'warning',
                            confirmButtonColor: 'var(--primary-color)',
                            html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">發文失敗，請稍後再試！</div></div>`,
                        });
                        console.log(e);
                    });
            }
        } catch (e) {
            Swal.fire({
                type: 'warning',
                confirmButtonColor: 'var(--primary-color)',
                html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">發文失敗，請稍後再試！</div></div>`,
            });
            console.log(e);
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
