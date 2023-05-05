import React from 'react';
import styled from 'styled-components';
import { Block, Title } from './Components';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import api from '../../utils/api';
import axios from 'axios';
import Options from '../../components/PreferenceOptions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { AuthContext } from '../../context/authContext';
import CircularProgress from '@mui/material/CircularProgress';

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
        outline: 2px solid #236262;
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
    const [snackbar, setSnackbar] = React.useState(false);
    const [success, setSuccess] = React.useState();
    const [progress, setProgress] = React.useState(0);
    React.useEffect(() => {
        const getUserData = async () => {
            // const user = window.localStorage.getItem('user');
            // const userId = JSON.parse(user).id;
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
        // const jwtToken = window.localStorage.getItem('jwtToken');
        // const _user = window.localStorage.getItem('user');
        // const userId = JSON.parse(_user).id;
        if (name.length < 1) {
            alert('使用者名稱需大於 1 個字元');
            return;
        }
        const userId = user.id;
        const data = {
            name,
            image: profileImage,
            location_pre: locations,
            type_pre: types,
        };
        const res = await api.editUser(userId, data, jwtToken);
        if (res.status === 200) {
            setSuccess(true);
            const newUser = { ...user };
            newUser.image = profileImage;
            setUser(newUser);
        } else {
            setSuccess(false);
        }
        setSnackbar(true);
    };

    const closeSnackbar = async () => {
        setSnackbar(false);
    };

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
                                accept="image/*"
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
            <Snackbar
                open={snackbar}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                onClose={closeSnackbar}
            >
                {success ? (
                    <Alert
                        variant="filled"
                        severity="success"
                        color="success"
                        sx={{
                            height: '100%',
                            padding: '5px 10px',
                            width: '200px',
                        }}
                    >
                        資料更新成功
                    </Alert>
                ) : (
                    <Alert
                        variant="filled"
                        severity="warning"
                        color="warning"
                        sx={{
                            height: '100%',
                            padding: '5px 10px',
                            width: '200px',
                        }}
                    >
                        資料更新失敗
                    </Alert>
                )}
            </Snackbar>
        </>
    );
};

export default Setting;
