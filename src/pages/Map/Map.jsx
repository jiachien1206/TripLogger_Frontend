import React from 'react';
import styled from 'styled-components';
import api from '../../utils/api';
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents } from 'react-leaflet';
import MapComponent from './MapConponent';
import 'leaflet/dist/leaflet.css';

const StyledMapContainer = styled(MapContainer)`
    margin-top: 60px;
    z-index: 3;
`;

function Map() {
    const [countries, setCountries] = React.useState([]);

    // TODO: 打API拿所有國家的文章的座標、國名和文章摘要連結那些（首圖？）
    React.useEffect(() => {
        const fetchMapPosts = async () => {
            const res = await api.getMapPosts();
            const contryData = res.data.data;
            setCountries(contryData);
        };
        fetchMapPosts();
    }, []);
    return (
        <StyledMapContainer
            center={[0, 0]}
            zoom={3}
            minZoom={2}
            scrollWheelZoom={true}
            style={{ height: '95vh' }}
            maxBounds={[
                [-90, -220],
                [90, 220],
            ]}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapComponent countries={countries}></MapComponent>
        </StyledMapContainer>
    );
}

export default Map;
