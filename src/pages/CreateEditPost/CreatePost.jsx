import React from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../context/authContext';
import { Navigate, useNavigate } from 'react-router-dom';
import TextEditor from './Editor';
import api from '../../utils/api';
import updateNewsfeeds from '../../utils/updateUserNewsfeeds';
import axios from 'axios';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
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

const DateRangeWrap = styled(DateRange)`
    width: 320px;
    margin: 0px auto;
`;

function CreatePost() {
    const { isLogin, jwtToken } = React.useContext(AuthContext);
    const [file, setFile] = React.useState();
    const [mainImg, setMainImg] = React.useState(null);
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');
    const [continent, setContinent] = React.useState('歐洲');
    const [country, setCountry] = React.useState('奧地利');
    const [type, setType] = React.useState('景點');
    const [travelDate, setTravelDate] = React.useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection',
        },
    ]);
    const navigate = useNavigate();
    const countryOptions = [
        { value: '台灣', label: '台灣' },
        { value: '阿富汗', label: '阿富汗' },
        { value: '日本', label: '日本' },
    ];

    const typeOptions = [
        { value: '景點', label: '景點' },
        { value: '住宿', label: '住宿' },
        { value: '交通', label: '交通' },
        { value: '省錢妙招', label: '省錢妙招' },
        { value: '恐怖故事', label: '恐怖故事' },
        { value: '證件', label: '證件' },
        { value: '其他', label: '其他' },
    ];

    const [selectedOption, setSelectedOption] = React.useState('阿富汗');

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
            const jwtToken = window.localStorage.getItem('jwtToken');
            await api.createPost(
                {
                    title,
                    content,
                    main_image: mainImg,
                    location: { continent, country },
                    type,
                    dates: { start_date: travelDate.startDate, end_date: travelDate.endDate },
                },
                jwtToken
            );
            alert('送出文章');
            await updateNewsfeeds(jwtToken);
            navigate('/');
        } catch (e) {
            console.log(e);
            alert('文章發佈失敗');
        }
    }
    const contentEndRef = React.useRef(null);
    // const scrollToBottom = () => {
    //     contentEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    // };

    const handleSelect = () => {};

    const selectionRange = {
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection',
    };

    // React.useEffect(() => {
    //     scrollToBottom();
    // }, [content]);

    if (isLogin)
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
                <Title
                    placeholder="輸入文章標題..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <SelectWrap>
                    <Selects
                        placeholder={'國家'}
                        onChange={(e) => setCountry(e.value)}
                        options={countryOptions}
                    />
                    <Selects
                        placeholder={'類別'}
                        onChange={(e) => setType(e.value)}
                        options={typeOptions}
                    />
                </SelectWrap>

                {/* <label>
                    旅遊時間：
                    <TravelDate
                        type="date"
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                    />
                </label> */}
                <TextEditor editContent={(value) => setContent(value)} />

                <DateRangeWrap
                    editableDateInputs={true}
                    onChange={(item) => setTravelDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={travelDate}
                    rangeColors={['#37BEB0', '#3ecf8e', '#fed14c']}
                />
                <Button
                    variant="contained"
                    sx={{ width: '100px', margin: '20px auto' }}
                    disableElevation
                    onClick={submitPost}
                >
                    發文
                </Button>
                <div ref={contentEndRef}></div>
            </Wrap>
        );
    else return <Navigate to="/" replace />;
}

export default CreatePost;
