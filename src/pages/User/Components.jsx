import styled from 'styled-components';

export const Block = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ffffff;
    border-radius: 7px;
    gap: 15px;
    width: 650px;
    padding: 40px 10px;
    margin-bottom: 20px;
    box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
    &.setting {
        padding: 40px 80px;
    }
    &.profile {
        padding: 40px 80px;
        align-items: flex-start;
    }
    // &.footstep {
    //     width: 600px;
    // }
`;

export const Title = styled.h2`
    padding-left: 3px;
    font-size: 28px;
`;
