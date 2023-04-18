import React from 'react';
import styled from 'styled-components';
import { UserWrap, Block, Title } from '../Components';
import Avatar from '@mui/material/Avatar';
import profile from '../../../images/profile.png';
import api from '../../../utils/api';
import axios from 'axios';
import Options from '../../../components/PreferenceOptions';

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
    const [file, setFile] = React.useState();
    const [locations, setLocations] = React.useState([]);
    const [types, setTypes] = React.useState([]);

    React.useEffect(() => {
        const getUserData = async () => {
            setProfileImage();
            setLocations(['亞洲', '歐洲', '北美洲', '大洋洲', '南美洲', '非洲', '南極洲']);
            setTypes(['交通', '住宿', '景點', '證件', '其他', '恐怖故事', '省錢妙招']);
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
            <Block>
                <Title>個人資料</Title>
                <Label>使用者名稱 Username</Label>
                <Input disabled="disabled" />
                <Label>電子郵件 Email</Label>
                <Input disabled="disabled" />
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
        </UserWrap>
    );
};

export default Setting;
