import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import like from '../images/like.gif';
import love from '../images/love.gif';
import haha from '../images/haha.gif';
import wow from '../images/wow.gif';
import sad from '../images/sad.gif';
import angry from '../images/angry.gif';
import { AiOutlineHeart } from 'react-icons/ai';

const ReactionsWrapper = styled(motion.div)`
    position: absolute;
    top: -300%;
    width: 230px;
    padding: 10px 20px;
    border-radius: 100px;
    background-color: white;
    box-shadow: 0 5px 20px -2px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 100;
    &.post {
        top: -5%;
        left: 103%;
    }
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
`;

const AiOutlineHeartS = styled(AiOutlineHeart)`
    font-size: 32px;
    transition: all 0.3s;
    &:hover {
        color: var(--red);
        font-size: 39px;
    }
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
    gap: 5px;
    &.active {
        color: var(--red);
    }
`;

const Reactions = ({ isHover, active, page }) => {
    return (
        <>
            {page === 'post' ? (
                <>
                    <AiOutlineHeartS />
                    <ReactionsWrapper
                        initial="hidden"
                        animate={isHover ? 'visible' : 'hidden'}
                        variants={list}
                        className="post"
                    >
                        <Reaction icon={like} />
                        <Reaction icon={love} />
                        <Reaction icon={haha} />
                        <Reaction icon={wow} />
                        <Reaction icon={sad} />
                        <Reaction icon={angry} />
                    </ReactionsWrapper>
                </>
            ) : (
                <LikeThumb>
                    {active ? (
                        <Button className="active"></Button>
                    ) : (
                        <Button>
                            <AiOutlineHeart style={{ fontSize: '21px', fontWeight: 'bold' }} />
                            喜歡
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
            )}
        </>
    );
};
export default Reactions;
