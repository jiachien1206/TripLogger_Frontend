import React from 'react';
import api from '../../utils/api.js';
import updateNewsfeeds from '../../utils/updateUserNewsfeeds.js';
import EmailPwd from './EmailPwd.jsx';
import Location from './Location.jsx';
import Type from './Type.jsx';
import { AuthContext } from '../../context/authContext';
import { Navigate, useNavigate } from 'react-router-dom';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import { Title } from './Components.jsx';
import styled from 'styled-components';
import Swal from 'sweetalert2';
import travel from '../../images/travel.gif';
import warn from '../../images/warn.gif';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: false,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
});

const Wrap = styled.div`
    background-color: white;
    width: 100%;
    height: 100%;
    z-index: 100;
    position: fixed;
    top: 0;
`;

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 550,
    height: 570,
    bgcolor: '#ffffff',
    boxShadow: 24,
    borderRadius: '10px',
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    alignItems: 'center',
    color: '#050505',
    fontWeight: 500,
    fontSize: '18px',
    cursor: 'default',
    padding: '50px 10px',
};

const steps = ['註冊帳號', '請排序喜歡的旅遊地點', '請排序喜歡的文章類型'];

const Signup = () => {
    const { isLogin, saveUserData } = React.useContext(AuthContext);
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [inputStatus, setInputStatus] = React.useState(true);
    const [password, setPassword] = React.useState('');
    const [activeStep, setActiveStep] = React.useState(0);
    const [locations, setlocations] = React.useState([
        '亞洲',
        '歐洲',
        '北美洲',
        '大洋洲',
        '南美洲',
        '非洲',
        '南極洲',
    ]);
    const [types, setTypes] = React.useState([
        '交通',
        '住宿',
        '景點',
        '證件',
        '其他',
        '恐怖故事',
        '省錢妙招',
    ]);
    const navigate = useNavigate();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    async function signup() {
        try {
            const res = await api.signup({
                name,
                email,
                password,
                location_pre: locations,
                type_pre: types,
            });
            Toast.fire({
                iconHtml: `<div style="width:50px; background-color: #ffffff; display:flex;" ><img width="100%" src="${travel}" ></div>`,
                title: '註冊成功！',
            });
            const { user, accessToken } = res.data.data;
            const userData = { id: user._id, name: user.name, image: user.image };
            window.localStorage.setItem('user', JSON.stringify(userData));
            window.localStorage.setItem('jwtToken', accessToken);
            await api.createUserNewsfeed(accessToken);
            await updateNewsfeeds(accessToken);
            userData['jwtToken'] = accessToken;
            saveUserData(userData);
            navigate('/');
        } catch (e) {
            Swal.fire({
                type: 'warning',
                confirmButtonColor: 'var(--primary-color)',
                text: 'This action cannot be undone.',
                html: `<div style="width: 100%; margin: 0px auto;"><img src="${warn}" width="140px"><div style="font-weight:500;">註冊失敗，請稍後再試</div></div>`,
            });
            console.log(e);
        }
    }
    if (isLogin) return <Navigate to="/" replace={false} />;
    return (
        <Wrap>
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                open={true}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        TransitionComponent: Fade,
                    },
                }}
            >
                <Fade in={true}>
                    <Box sx={style}>
                        <Stepper activeStep={activeStep}>
                            {steps.map((label, index) => {
                                const stepProps = {};
                                const labelProps = {};

                                return (
                                    <Step key={label} {...stepProps}>
                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                    </Step>
                                );
                            })}
                        </Stepper>
                        {activeStep === 0 ? (
                            <React.Fragment>
                                <EmailPwd
                                    setInputStatus={setInputStatus}
                                    name={name}
                                    setName={setName}
                                    email={email}
                                    setEmail={setEmail}
                                    password={password}
                                    setPassword={setPassword}
                                ></EmailPwd>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1 }}>
                                    <Button color="inherit" disabled={true} sx={{ mr: 1 }}>
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    {inputStatus ? (
                                        <Button onClick={handleNext}>Next</Button>
                                    ) : (
                                        <Button disabled={true} onClick={handleNext}>
                                            Next
                                        </Button>
                                    )}
                                </Box>
                            </React.Fragment>
                        ) : activeStep === 1 ? (
                            <React.Fragment>
                                <Title>{steps[1]}</Title>
                                <Location
                                    locations={locations}
                                    setLocations={setlocations}
                                ></Location>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1 }}>
                                    <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleNext}>Next</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Title>{steps[2]}</Title>
                                <Type types={types} setTypes={setTypes}></Type>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 1 }}>
                                    <Button color="inherit" onClick={handleBack} sx={{ mr: 1 }}>
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={signup}>Submit</Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </Box>
                </Fade>
            </Modal>
        </Wrap>
    );
};

export default Signup;
