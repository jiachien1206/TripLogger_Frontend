import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import marker from '../../images/marker.svg';

const MyPopup = styled(Popup)`
    min-width: 300px;
    cursor: default;
    .leaflet-popup-content-wrapper {
        padding: 0px;
        border-radius: 15px;
    }
    .leaflet-popup-content {
        margin: 0px;
    }
    a.leaflet-popup-close-button {
        color: #ffffff;
    }
`;

const CountryImage = styled.div`
    position: relative;
    aspect-ratio: 18/9;
    width: 100%;
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    top: 5;
`;
const CountryImageCover = styled.div`
    position: absolute;
    padding: 10px;
    font-size: 18px;
    font-weight: 600;
    color: var(--white);
    cursor: default;
    background-color: rgb(93 93 93 / 30%);
    width: 100%;
    text-align: right;
    height: 100%;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    display: flex;
    align-items: end;
`;

const CountryName = styled.div`
    width: 100%;
    text-align: right;
`;

const PostLink = styled(Link)`
    text-decoration: none;
    padding: 5px;
`;
const Post = styled.div`
    margin: 5px 5px 0px 5px;
`;

const myIcon = L.icon({
    iconUrl: marker,
    iconSize: [20, 20],
    iconAnchor: null,
    popupAnchor: [0, 0],
    shadowUrl: null,
    shadowSize: null,
    shadowAnchor: null,
});

function Country({ country, zoom }) {
    const map = useMap();

    return (
        <>
            <Marker
                icon={myIcon}
                position={country.coordinate}
                // eventHandlers={{
                //     click: () => {
                //         map.setView(country.coordinate, 4);
                //     },
                // }}
            >
                <MyPopup>
                    <CountryImage
                        style={{
                            backgroundImage: `url("${country.main_image}")`,
                        }}
                    >
                        <CountryImageCover>
                            <CountryName>{`${country.emoji} ${country.name.cn} ${country.name.en}`}</CountryName>
                        </CountryImageCover>
                    </CountryImage>

                    {country.posts.map((post) => {
                        return (
                            <PostLink key={post._id} to={`/post/${post._id}`} target="_blank">
                                <Post>{post.title}</Post>
                            </PostLink>
                        );
                    })}
                </MyPopup>
            </Marker>
        </>
    );
}

export default Country;
