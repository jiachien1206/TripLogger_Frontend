import React from 'react';
import styled from 'styled-components';
import { useMapEvents } from 'react-leaflet';
import Country from './Country';

function MapComponent({ countries }) {
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
                    return <Country zoom={zoomLevel} key={country._id} country={country} />;
                } else if (zoomLevel > 2) {
                    if (index % 2 === 1) {
                        return <Country zoom={zoomLevel} key={country._id} country={country} />;
                    }
                } else {
                    if (index % 4 === 1) {
                        return <Country zoom={zoomLevel} key={country._id} country={country} />;
                    }
                }
            })}
        </>
    );
}
export default MapComponent;
