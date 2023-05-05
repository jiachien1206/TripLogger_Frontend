import styled from 'styled-components';

export const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border-radius: 15px;
    gap: 15px;
    width: 650px;
    padding: 40px 10px;
    margin-bottom: 20px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    font-size: 17px;
    &.setting {
        padding: 40px 80px;
    }
    &.profile {
        padding: 60px 80px;
        align-items: flex-start;
    }
`;

export const Title = styled.h2`
    padding-left: 3px;
    font-size: 27px;
`;
