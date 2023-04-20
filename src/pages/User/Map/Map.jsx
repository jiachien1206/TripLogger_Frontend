import React from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import mapData from './countries.json';
import { Block, Title } from '../Components';

const Wrapper = styled.div`
    margin: 0 auto;
    width: 720px;
    height: 1000px;
    padding: 5px;
    background-color: #ffffff;
`;

const Mymap = styled(MapContainer)`
    background-color: #ffffff;
    width: 580px;
`;

const countryStyle = {
    fillColor: '#f5f5f5',
    fillOpacity: 1,
    color: 'grey',
    weight: 1,
};

const Map = () => {
    const [visitedcountries, setVistedcountries] = React.useState([]);
    const [isLoaded, setIsloaded] = React.useState(false);
    React.useEffect(() => {
        const fetchUserVisited = async (userId, jwtToken) => {
            const res = await api.getUserVisited(userId, jwtToken);
            const userVistied = res.data.data;
            setVistedcountries(userVistied);
            setIsloaded(true);
        };
        let user = window.localStorage.getItem('user');
        const userId = JSON.parse(user).id;
        const jwtToken = window.localStorage.getItem('jwtToken');
        fetchUserVisited(userId, jwtToken);
    }, []);
    const countryPopup = (country, layer) => {
        const countryName = country.properties.ADMIN;
        layer.bindPopup(countryName);
    };
    const renderVisited = (country, layer) => {
        const iso3 = visitedcountries.map((country) => country.iso3);
        if (iso3.includes(country.properties.ISO_A3)) {
            layer.setStyle({ fillColor: '#00ed64' });
        }
    };
    return (
        <>
            <Title>旅遊足跡</Title>
            <Block>
                <Mymap
                    dragging={false}
                    scrollWheelZoom={false}
                    zoomControl={false}
                    doubleClickZoom={false}
                    minZoom={1}
                    zoom={1}
                    center={[0, 0]}
                    style={{ height: '500px', zIndex: '5' }}
                >
                    {isLoaded && (
                        <GeoJSON
                            style={countryStyle}
                            data={mapData.features}
                            onEachFeature={(country, layer) => {
                                countryPopup(country, layer);
                                renderVisited(country, layer);
                            }}
                        />
                    )}
                </Mymap>
            </Block>
        </>
    );
};

export default Map;
