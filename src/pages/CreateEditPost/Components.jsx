import styled from 'styled-components';
import Select from 'react-select';

export const Wrap = styled.div`
    margin: 0px auto 10px;
    background-color: #ffffff;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 8px;
    max-width: 900px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const MainImgWrap = styled.div`
    display: flex;
`;
export const MainImg = styled.img`
    max-height: 200px;
    margin-right: 25px;
`;
export const UploadImg = styled.div``;

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
