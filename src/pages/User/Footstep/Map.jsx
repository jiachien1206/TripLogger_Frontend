import React from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import mapData from './countries.json';

const Wrapper = styled.div`
    margin: 140px auto 0px;
    width: 1050px;
    height: 1090px;
    border: 1px solid grey;
    border-radius: 5px;
    padding: 5px;
    background-color: #ffffff;
`;

const Mymap = styled(MapContainer)`
    background-color: #ffffff;
`;

const countryStyle = {
    fillColor: '#f5f5f5',
    fillOpacity: 1,
    color: 'grey',
    weight: 1,
};

const MapBlock = () => {
    const [visitedcountries, setVistedcountries] = React.useState([]);
    const [isLoaded, setIsloaded] = React.useState(false);
    React.useEffect(() => {
        const fetchUserVisited = async (jwtToken) => {
            const res = await api.getUserVisited(jwtToken);
            const userVistied = res.data.data;
            setVistedcountries(userVistied);
            setIsloaded(true);
        };
        const jwtToken = window.localStorage.getItem('jwtToken');
        fetchUserVisited(jwtToken);
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
            <Wrapper>
                <h2>旅遊足跡</h2>
                <Mymap
                    dragging={false}
                    scrollWheelZoom={false}
                    zoomControl={false}
                    doubleClickZoom={false}
                    minZoom={2}
                    zoom={2}
                    center={[0, 0]}
                    style={{ height: '1000px', zIndex: '5' }}
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
            </Wrapper>
        </>
    );
};

export default MapBlock;
