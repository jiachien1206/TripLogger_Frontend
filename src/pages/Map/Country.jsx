import { Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import marker from '../../images/marker.svg';
import { IoEarthSharp } from 'react-icons/io5';
import { RiBuilding2Fill } from 'react-icons/ri';
import { GrMoney } from 'react-icons/gr';
import { FaCompass } from 'react-icons/fa';
import { BsTelephoneFill } from 'react-icons/bs';

const MyPopup = styled(Popup)`
    width: 30vw;
    max-width: 500px;
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
    width: 30vw;
    max-width: 500px;
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
    width: 30vw;
    max-width: 500px;
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

const CountryName = styled.h2`
    width: 100%;
    text-align: right;
    margin: 0px;
    font-size: 22px;
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

const Info = styled.div`
    padding: 10px 20px 20px;
    letter-spacing: 0.1rem;
    color: var(--primary-font);
    display: flex;
    gap: 10px;
    justify-content: space-between;
    width: 30vw;
    max-width: 500px;
`;
const InfoTitle = styled.h2`
    padding: 10px 20px 0px;
    margin: 5px 0px;
    color: var(--primary-font);
`;
const InfoCat = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    align-items: center;
`;
const InfoCatTitle = styled.div`
    font-size: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 5px;
`;
const InfoContent = styled.div``;
const InfoCoordinate = styled.div``;
const InfoPhone = styled.div``;
const InfoCapital = styled.div``;

const InfoCurrency = styled.div``;

function Country({ country, zoom, setPosts, setCountry }) {
    const map = useMap();
    let long = Math.round(Number(country.coordinate[1]));
    let lat = Math.round(Number(country.coordinate[0]));
    if (long < 0) {
        long = `${(long * -1).toString()}°W`;
    } else {
        long = `${long.toString()}°E`;
    }
    if (lat < 0) {
        lat = `${(lat * -1).toString()}°S`;
    } else {
        lat = `${lat.toString()}°N`;
    }

    return (
        <>
            <Marker
                icon={myIcon}
                position={country.coordinate}
                eventHandlers={{
                    click: () => {
                        map.setView(country.coordinate, 4);
                        setCountry(country.name.cn);
                        setPosts(country.posts);
                    },
                }}
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
                    <InfoTitle>旅遊情報</InfoTitle>
                    <Info>
                        <InfoCat>
                            <InfoCatTitle>
                                <IoEarthSharp />
                                地區
                            </InfoCatTitle>
                            <InfoContent>{country.continent}</InfoContent>
                        </InfoCat>
                        <InfoCat>
                            <InfoCatTitle>
                                <RiBuilding2Fill />
                                首都
                            </InfoCatTitle>
                            <InfoContent>{country.capital}</InfoContent>
                        </InfoCat>
                        <InfoCat>
                            <InfoCatTitle>
                                <GrMoney />
                                貨幣
                            </InfoCatTitle>
                            <InfoContent>{country.currency}</InfoContent>
                        </InfoCat>
                        <InfoCat>
                            <InfoCatTitle>
                                <FaCompass />
                                座標
                            </InfoCatTitle>
                            <InfoContent>{`(${lat} ${long})`}</InfoContent>
                        </InfoCat>
                        <InfoCat>
                            <InfoCatTitle>
                                <BsTelephoneFill />
                                國碼
                            </InfoCatTitle>
                            <InfoContent>{`+${country.phone_code}`}</InfoContent>
                        </InfoCat>
                    </Info>
                </MyPopup>
            </Marker>
        </>
    );
}

export default Country;
