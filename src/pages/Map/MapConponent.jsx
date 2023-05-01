import React from 'react';
import styled from 'styled-components';
import { useMapEvents } from 'react-leaflet';
import Country from './Country';

function MapComponent({ countries, setPosts, setCountry }) {
    const [zoomLevel, setZoomLevel] = React.useState();

    const mapEvents = useMapEvents({
        zoomend: () => {
            setZoomLevel(mapEvents.getZoom());
        },
    });
    return (
        <>
            {countries.map((country, index) => {
                if (zoomLevel > 3) {
                    return (
                        <Country
                            zoom={zoomLevel}
                            key={country._id}
                            country={country}
                            setPosts={setPosts}
                            setCountry={setCountry}
                        />
                    );
                } else if (zoomLevel > 2) {
                    if (index % 2 === 1) {
                        return (
                            <Country
                                zoom={zoomLevel}
                                key={country._id}
                                country={country}
                                setPosts={setPosts}
                                setCountry={setCountry}
                            />
                        );
                    }
                } else {
                    if (index % 4 === 1) {
                        return (
                            <Country
                                zoom={zoomLevel}
                                key={country._id}
                                country={country}
                                setPosts={setPosts}
                                setCountry={setCountry}
                            />
                        );
                    }
                }
            })}
        </>
    );
}
export default MapComponent;
