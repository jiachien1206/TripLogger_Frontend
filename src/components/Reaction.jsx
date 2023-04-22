import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import like from '../images/like.gif';
import love from '../images/love.gif';
import haha from '../images/haha.gif';
import wow from '../images/wow.gif';
import sad from '../images/sad.gif';
import angry from '../images/angry.gif';
import thumbR from '../images/thumbs-up-regular.svg';
import thumbS from '../images/thumbs-up-solid.svg';

const ReactionsWrapper = styled(motion.div)`
    position: absolute;
    top: -100%;
    /* left: 50%; */
    /* transform: translateX(-50%); */
    width: 230px;
    padding: 10px 20px;
    border-radius: 100px;
    background-color: white;
    box-shadow: 0 5px 20px -2px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* opacity: 0; */
`;

const Container = styled.main`
    height: 93vh;
    display: flex;
    align-items: center;
`;

const list = {
    visible: {
        opacity: 1,
        y: 0,
        transformOrigin: '50%',
        scale: 1,
        transition: {
            when: 'beforeChildren',
            staggerChildren: 0.04,
        },
    },
    hidden: {
        opacity: 0,
        y: 50,
        transformOrigin: '50%',
        scale: 0,
    },
};

const ReactionWrapper = styled.div`
    position: relative;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: white;
    transition: 0.2s;
    transform-origin: center bottom;
    cursor: pointer;
    &:hover {
        transform: scale(1.2);
        transition: 0.2s;
    }
    // &:after {
    //     content: attr(data-reaction-name);
    //     position: absolute;
    //     top: -25px;
    //     left: 50%;
    //     transform: translateX(-50%);

    //     padding: 5px;
    //     font-size: 12px;
    //     background-color: white;
    //     color: #606770;
    //     border-radius: 5px;
    //     text-transform: capitalize;
    //     font-weight: 400;
    // }
`;
const ReactionImage = styled.img`
    width: 100%;
    height: 100%;
`;

const LikeThumb = styled.span`
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100px;
    font-weight: 600;
    color: #606770;
    fill: #606770;
    padding: 15px 20px;
    cursor: pointer;
    &:after {
        position: absolute;
        content: '';
        padding: 50px;
    }
`;

const Reaction = ({ icon, name }) => {
    return (
        <motion.div variants={list}>
            <ReactionWrapper data-reaction-name={name}>
                <ReactionImage src={icon} />
            </ReactionWrapper>
        </motion.div>
    );
};

const Button = styled.div`
    font-weight: 400;
    display: flex;
    gap: 6px;
    &.active {
        color: #236262;
    }
`;
const LikeButtonIcon = styled.div`
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-image: url(${thumbR});
    filter: invert(41%) sepia(6%) saturate(315%) hue-rotate(182deg) brightness(93%) contrast(84%);
`;
const LikedButtonIcon = styled.div`
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-image: url(${thumbS});
    filter: invert(29%) sepia(87%) saturate(293%) hue-rotate(131deg) brightness(94%) contrast(94%);
`;

const Reactions = ({ isHover, active }) => {
    // const [isHover, setIsHover] = React.useState(false);
    return (
        <>
            <LikeThumb>
                {active ? (
                    <Button className="active">{/* <LikedButtonIcon />讚 */}</Button>
                ) : (
                    <Button>
                        <LikeButtonIcon />讚
                    </Button>
                )}
                <ReactionsWrapper
                    initial="hidden"
                    animate={isHover ? 'visible' : 'hidden'}
                    variants={list}
                >
                    <Reaction icon={like} />
                    <Reaction icon={love} />
                    <Reaction icon={haha} />
                    <Reaction icon={wow} />
                    <Reaction icon={sad} />
                    <Reaction icon={angry} />
                </ReactionsWrapper>
            </LikeThumb>
        </>
    );
};
export default Reactions;
