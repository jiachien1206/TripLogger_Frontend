import React from 'react';
import styled from 'styled-components';
import api from '../../utils/api';
import { MapContainer, TileLayer } from 'react-leaflet';
import MapComponent from './MapConponent';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';
import { Alerts } from '../../utils/alerts.js';
import { imageUrl } from '../../utils/generateImageUrl';

const Wrap = styled.div`
    margin-top: 60px;
    display: flex;
`;
const StyledMapContainer = styled(MapContainer)`
    z-index: 3;
    position: fixed;
    top: 60px;
`;

const Sildebar = styled.div`
    position: fixed;
    top: 60px;
    right: 0;
    width: 25vw;
    height: 95vh;
    background-color: var(--white);
    transition: all 0.5s;
    z-index: 100;
    padding: 20px 25px 10px;
    display: flex;
    flex-direction: column;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    align-items: center;
`;

const SidebarTitle = styled.div`
    background-color: var(--primary-color);
    color: var(--white);
    padding: 10px 20px;
    font-size: 22px;
    border-radius: 100px;
    margin-bottom: 20px;
    font-weight: 600;
`;

const Post = styled(Link)`
    display: flex;
    justify-content: space-between;
    min-height: 7vh;
    align-items: center;
    cursor: pointer;
    text-decoration: none;
    color: #4a4a4a;
    padding: 5px 0px;
    gap: 3px;
    align-items: center;
    width: 22vw;
`;

const PostLeft = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`;

const Rank = styled.div`
    background-color: var(--primary-color);
    width: 30px;
    height: 30px;
    text-align: center;
    color: var(--white);
    border-radius: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    letter-spacing: 0;
    padding: 10px;
`;
const PostImg = styled.img`
    width: 4vw;
    height: 100%;
    border-radius: 5px;
    object-fit: cover;
`;
const TopPostTitle = styled.div`
    display: flex;
    font-weight: 500;
`;
const Divider = styled.div`
    height: 2px;
    background-color: #459a825f;
    width: 22vw;
    border-radius: 100px;
    margin: 1vh 0;
`;

function Map() {
    const [countries, setCountries] = React.useState([]);
    const [country, setCountry] = React.useState('全站');
    const [posts, setPosts] = React.useState([]);

    React.useEffect(() => {
        const fetchMapPosts = async () => {
            try {
                const res = await api.getMapPosts();
                const contryData = res.data.data;
                const top = await api.getTopPosts();
                setPosts(top.data.data.posts.slice(0, 8));
                setCountries(contryData);
            } catch (e) {
                Alerts.serverError();
            }
        };
        fetchMapPosts();
    }, []);
    return (
        <Wrap>
            <StyledMapContainer
                center={[23.5, 121]}
                zoom={3}
                minZoom={2}
                scrollWheelZoom={true}
                style={{ height: '100vh', width: '75vw' }}
                maxBounds={[
                    [-90, -220],
                    [90, 220],
                ]}
                className="full"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapComponent
                    countries={countries}
                    setPosts={setPosts}
                    setCountry={setCountry}
                ></MapComponent>
            </StyledMapContainer>

            <Sildebar>
                <SidebarTitle>
                    {country}TOP{posts.length}
                </SidebarTitle>
                {posts.map((p, index) => {
                    return (
                        <>
                            <Post key={p._id} to={`/post/${p._id}`} target="_blank">
                                <PostLeft>
                                    <Rank>{index + 1}</Rank>
                                    <TopPostTitle>{p.title}</TopPostTitle>
                                </PostLeft>
                                <PostImg src={imageUrl(p.main_image)} />
                            </Post>
                            <Divider />
                        </>
                    );
                })}
            </Sildebar>
        </Wrap>
    );
}

export default Map;
