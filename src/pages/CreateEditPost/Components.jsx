import styled from 'styled-components';
import Select from 'react-select';
import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const EditorWrap = styled.div`
    margin: 0px auto 10px;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 8px;
    max-width: 900px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 100;
`;

export const MainImgWrap = styled.div`
    display: flex;
    gap: 20px;
`;
export const MainImg = styled.img`
    max-height: 200px;
    margin-right: 25px;
`;
export const UploadImg = styled.div``;

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

CircularProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export const CircularStatic = ({ progress }) => {
    return <CircularProgressWithLabel value={progress} />;
};

import LinearProgress from '@mui/material/LinearProgress';
function LinearProgressWithLabel(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="body2" color="text.secondary">{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
};

export const LinearWithValueLabel = ({ progress }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <LinearProgressWithLabel value={progress} />
        </Box>
    );
};

export const MainImgButton = styled.button`
    background-color: transparent;
    padding: 10px 15px;
    border-radius: 6px;
    font-size: 16px;
    font-weight: bold;
    border: 1px solid #00684a;
    cursor: pointer;
    color: #00684a;
`;

export const MainImgInput = styled.input`
    display: 'none';
`;

export const Title = styled.input`
    font-size: 40px;
    width: 100%;
    border: none;
    font-weight: 600;
    color: #515151;
    &:focus-visible {
        outline: none !important;
    }
    &::placeholder {
        opacity: 0.3;
    }
`;
export const SelectWrap = styled.div`
    display: flex;
    gap: 10px;
    width: 100%;
    justify-content: space-between;
`;
export const Selects = styled(Select)`
    width: 24%;
`;

export const DateInput = styled.input`
    display: flex;
    width: 24%;
    border: 1px solid #bfbfbf;
    border-radius: 4px;
    font-size: 16px;
    color: #333333;
    padding-left: 8px;
    cursor: default;
    &.edit {
        background-color: #f2f2f2;
        border-color: #e6e6e6;
        color: grey;
    }
`;

export const BottomWrap = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export const PlaceHolder = styled.div`
    width: 100%;
    height: 20.02px;
`;
