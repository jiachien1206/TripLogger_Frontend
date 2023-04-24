import styled from 'styled-components';

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
    gap: 20px;
`;
export const MainImg = styled.img`
    max-height: 200px;
`;
export const UploadImg = styled.div``;

export const MainImgButton = styled.button`
    background-color: transparent;
    padding: 10px 15px;
    border-radius: 6px;
    border: none;
    font-size: 16px;
    font-weight: 500;
    background-color: #d4d4d4;
    cursor: pointer;
    color: #6f6f6f;
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
`;
