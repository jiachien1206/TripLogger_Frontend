import React from 'react';
import styled from 'styled-components';
import { Block, Title } from './Components';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import api from '../../utils/api';
import axios from 'axios';
import Options from '../../components/PreferenceOptions';
import { AuthContext } from '../../context/authContext';
import CircularProgress from '@mui/material/CircularProgress';
import Swal from 'sweetalert2';
import warn from '../../images/warn.gif';
import success from '../../images/success.gif';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});

const Label = styled.label`
    margin-bottom: 5px;
    font-weight: 500;
`;
const Input = styled.input`
    width: 100%;
    outline: none;
    font-size: 16px;
    line-height: 28px;
    border: solid 1px #d4d4d4;
    border-radius: 5px;
    padding-left: 10px;
    margin-bottom: 20px;
    transition: all 0.2s;
    &:focus {
        outline: 2px solid var(--secondary-color);
        border: solid 1px #ffffff;
    }
`;

const ImageWrap = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    gap: 15px;
    width: 100%;
`;

const UploadImgName = styled.div`
    width: 100%;
    background-color: #f5f5f5;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 5px 10px;
    gap: 15px;
    color: #6f6f6f;
    font-size: 14px;
    height: 50px;
`;

const UploadImg = styled.button`
    border: none;
    border-radius: 5px;
    padding: 10px;
    height: 36px;
    background-color: #d4d4d4;
    cursor: pointer;
    color: #6f6f6f;
`;

const UploadImgButton = styled.div``;

const UploadImgInput = styled.input``;

const Setting = () => {
    const { jwtToken, setUser, user } = React.useContext(AuthContext);
    const [profileImage, setProfileImage] = React.useState();
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [file, setFile] = React.useState();
    const [locations, setLocations] = React.useState([]);
    const [types, setTypes] = React.useState([]);
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
        const getUserData = async () => {
            const userId = user.id;
            const res = await api.getUser(userId, jwtToken);
            const { name, email, location, type, image } = res.data.data;
            setName(name);
            setEmail(email);
            setLocations(location);
            setTypes(type);
            if (image) {
                setProfileImage(image);
            }
        };
        getUserData();
    }, []);

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

    const submitSetting = async () => {
        if (name.length < 1) {
            Swal.fire({
                type: 'warning',
                confirmButtonColor: 'var(--primary-color)',
                text: 'This action cannot be undone.',
                html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">使用者名稱至少需 1 個字元</div></div>`,
            });
            return;
        }
        const userId = user.id;
        const data = {
            name,
            image: profileImage,
            location_pre: locations,
            type_pre: types,
        };
        try {
            const res = await api.editUser(userId, data, jwtToken);
            const { relevantPosts } = res.data.data;
            window.localStorage.setItem('relevantPosts', JSON.stringify(relevantPosts));
            Toast.fire({
                iconHtml: `<div style="width:50px; background-color: #ffffff; display:flex;" ><img width="100%" src="${success}" ></div>`,
                title: '更新成功',
            });
            const newUser = { ...user };
            newUser.image = profileImage;
            setUser(newUser);
        } catch (e) {
            Swal.fire({
                type: 'warning',
                confirmButtonColor: 'var(--primary-color)',
                text: 'This action cannot be undone.',
                html: `<div style="width: 100%; margin: 0px auto"><img src="${warn}" width="140px"><div style="font-weight:500;">資料更新失敗，請稍後再試</div></div>`,
            });
        }
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
                    const image = url.split('?')[0];
                    setProfileImage(image);
                }
            } catch (error) {
                console.log(error);
            }
        };
        uploadImage();
    }, [file]);

    return (
        <>
            <Title>個人資料</Title>
            <Block className="profile">
                <Label>使用者名稱 Username</Label>
                <Input
                    value={name}
                    required
                    maxLength={30}
                    onChange={(e) => setName(e.target.value)}
                />
                <Label>電子郵件 Email</Label>
                <Input value={email} disabled="disabled" />
                <Label>使用者照片 Profile Image</Label>
                <ImageWrap>
                    {progress === 0 || progress === 100 ? (
                        <Avatar src={profileImage} sx={{ width: 45, height: 45 }} />
                    ) : (
                        <CircularProgress sx={{ width: 45, height: 45 }} value={progress} />
                    )}
                    <UploadImgName>
                        <UploadImg>
                            <UploadImgButton
                                variant="contained"
                                onClick={handleUploadClick}
                                disableElevation
                            >
                                上傳照片
                            </UploadImgButton>
                            <UploadImgInput
                                type="file"
                                ref={inputRef}
                                accept="image/png, image/jpeg"
                                style={{ display: 'none' }}
                                onChange={handleFileChange}
                                multiple={false}
                            />
                        </UploadImg>
                        {file ? `${file.name}` : ''}
                    </UploadImgName>
                </ImageWrap>
            </Block>
            <Title>喜歡的旅遊地點</Title>
            <Block className="setting">
                <Options options={locations} setOrder={setLocations}></Options>
            </Block>
            <Title>喜歡的文章類型</Title>
            <Block className="setting">
                <Options options={types} setOrder={setTypes}></Options>
            </Block>
            <Button
                variant="contained"
                sx={{ width: '100px', margin: '20px auto' }}
                disableElevation
                onClick={submitSetting}
            >
                更新資料
            </Button>
        </>
    );
};

export default Setting;
