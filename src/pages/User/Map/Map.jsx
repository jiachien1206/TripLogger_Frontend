import React from 'react';
import { MapContainer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';
import api from '../../../utils/api.js';
import mapData from './countries.json';
import { Block, Title } from '../Components';
import { AiFillPushpin } from 'react-icons/ai';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import mapDemo from '../../../images/mapDemo.gif';
import { Alerts } from '../../../utils/alerts.js';
import { AuthContext } from '../../../context/authContext';

const Mymap = styled(MapContainer)`
    background-color: #ffffff;
    width: 580px;
`;

const Info = styled.div`
    display: flex;
    align-items: center;
    font-weight: 500;
    margin-bottom: 20px;
    cursor: default;
`;

const Highlight = styled.div`
    border-bottom: 2px solid var(--primary-color);
    cursor: pointer;
`;

const countryStyle = {
    fillColor: '#f5f5f5',
    fillOpacity: 1,
    color: 'grey',
    weight: 1,
};

const mapDemoBlock = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const style = {
    outline: 'none',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    height: 260,
    boxShadow: 24,
    borderRadius: '15px',
};

const Map = () => {
    const { jwtToken, logout } = React.useContext(AuthContext);
    const [visitedcountries, setVistedcountries] = React.useState([]);
    const [isLoaded, setIsloaded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    React.useEffect(() => {
        const fetchUserVisited = async (userId) => {
            try {
                const res = await api.getUserVisited(userId, jwtToken);
                const userVistied = res.data.data;
                setVistedcountries(userVistied);
                setIsloaded(true);
            } catch (e) {
                if (e.response.status === 401) {
                    const result = await Alerts.unauthorized();
                    if (result.isConfirmed) {
                        logout();
                    }
                } else {
                    Alerts.serverError();
                }
            }
        };
        let user = window.localStorage.getItem('user');
        const userId = JSON.parse(user).userId;
        fetchUserVisited(userId, jwtToken);
    }, []);

    const countryPopup = (country, layer) => {
        const countryName = country.properties.ADMIN;
        layer.bindPopup(countryName);
    };
    const renderVisited = (country, layer) => {
        const iso3 = visitedcountries.map((country) => country.iso3);
        if (iso3.includes(country.properties.ISO_A3)) {
            layer.setStyle({ fillColor: 'var(--light-green)' });
        }
    };

    return (
        <>
            <Title>旅遊足跡</Title>
            {isLoaded && (
                <>
                    <Block style={{}}>
                        <Mymap
                            minZoom={1}
                            zoom={1}
                            center={[0, 0]}
                            style={{ height: '550px', zIndex: '5' }}
                            maxBounds={[
                                [-90, -220],
                                [90, 220],
                            ]}
                        >
                            <GeoJSON
                                style={countryStyle}
                                data={mapData.features}
                                onEachFeature={(country, layer) => {
                                    countryPopup(country, layer);
                                    renderVisited(country, layer);
                                }}
                            />
                        </Mymap>
                    </Block>
                    <Info>
                        <AiFillPushpin style={{ marginRight: '10px', fontSize: '20px' }} />
                        發文可以為地圖上色，紀錄旅遊足跡！
                        <Highlight onClick={handleOpen}>看範例</Highlight>
                    </Info>
                </>
            )}

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <mapDemoBlock>
                        <img src={mapDemo} style={{ width: '100%', borderRadius: '15px' }} />
                    </mapDemoBlock>
                </Box>
            </Modal>
        </>
    );
};

export default Map;
