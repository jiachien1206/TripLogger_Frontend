import React from 'react';
import styled from 'styled-components';
import { UserWrap, Block, Title } from '../Components';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import profile from '../../../images/profile.png';
import api from '../../../utils/api';
import axios from 'axios';
import Options from '../../../components/PreferenceOptions';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const Label = styled.label`
    margin-top: 10px;
    font-weight: 500;
`;
const Input = styled.input`
    width: 100%;
    outline: 0;
    font-size: 16px;
    line-height: 28px;
    transition: border-color 1s;
    border: solid 1px #d4d4d4;
    border-radius: 5px;
    padding-left: 10px;
    &:hover {
        border: 2px solid #d4d4d4;
    }
    &:focus {
        border: 2px solid #236262;
    }
    disabled: true;
`;

const ImageWrap = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    gap: 15px;
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
    const [profileImage, setProfileImage] = React.useState(profile);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [file, setFile] = React.useState();
    const [locations, setLocations] = React.useState([]);
    const [types, setTypes] = React.useState([]);
    const [snackbar, setSnackbar] = React.useState(false);
    const [success, setSuccess] = React.useState();
    React.useEffect(() => {
        const getUserData = async () => {
            const jwtToken = window.localStorage.getItem('jwtToken');
            const user = window.localStorage.getItem('user');
            const userId = JSON.parse(user).id;
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

    const submitSetting = async () => {
        const jwtToken = window.localStorage.getItem('jwtToken');
        const user = window.localStorage.getItem('user');
        const userId = JSON.parse(user).id;
        const data = {
            name,
            email,
            image: profileImage,
            location_pre: locations,
            type_pre: types,
        };
        const res = await api.editUser(userId, data, jwtToken);
        if (res.status === 200) {
            setSuccess(true);
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
                const res = await api.getPresignUrl();
                const url = res.data.data;
                await axios.put(url, file, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const image = url.split('?')[0];
                setProfileImage(image);
            } catch (error) {
                console.log(error);
            }
        };
        uploadImage();
    }, [file]);

    return (
        <UserWrap>
            <Block style={{ padding: '40px 80px' }}>
                <Title>個人資料</Title>
                <Label>使用者名稱 Username</Label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
                <Label>電子郵件 Email</Label>
                <Input value={email} disabled="disabled" />
                <Label>使用者照片 Profile Image</Label>
                <ImageWrap>
                    <Avatar src={profileImage} sx={{ width: 45, height: 45 }} />
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
            <Block>
                <Title>喜歡的旅遊地點</Title>
                <Options options={locations} setOrder={setLocations}></Options>
            </Block>
            <Block>
                <Title>喜歡的文章類型</Title>
                <Options options={types} setOrder={setTypes}></Options>
            </Block>
            <Button variant="contained" disableElevation onClick={submitSetting}>
                更新設定
            </Button>
            <Snackbar
                open={snackbar}
                autoHideDuration={2000}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
                            // color: 'warning',
                            height: '100%',
                            padding: '5px 10px',
                            width: '200px',
                        }}
                    >
                        資料更新失敗
                    </Alert>
                )}
            </Snackbar>
        </UserWrap>
    );
};

export default Setting;
