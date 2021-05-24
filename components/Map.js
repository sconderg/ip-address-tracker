import { MapContainer, TileLayer,Marker,Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import styled from 'styled-components';

const Map = ({position}) => {
    return (
        <MyMap
        center={position && position}
        zoom={14}
        scrollWheelZoom={false}
      >
      <TileLayer
        url={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2NvbmRlciIsImEiOiJja3AybzV6ZzYwN2hiMnVta3Vub2xkZnNuIn0.-7_qb8ls7hYlZavVow2cZA`}
        attribution='Map data &copy; <a href=&quot;https://www.openstreetmap.org/&quot;>OpenStreetMap</a> contributors, <a href=&quot;https://creativecommons.org/licenses/by-sa/2.0/&quot;>CC-BY-SA</a>, Imagery &copy; <a href=&quot;https://www.mapbox.com/&quot;>Mapbox</a>'
      />
        <Marker position={position && position} draggable={true} animate={true}>
          <Popup>Hey ! I live here</Popup>
        </Marker>
      </MyMap>
      
    )
}

export default Map;

const MyMap = styled(MapContainer)`
    width:100%;
    height:800px;
`;