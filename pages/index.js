import axios from 'axios';
import Head from 'next/head';
import { useRef, useState } from 'react';
import styled from 'styled-components';
import dynamic from "next/dynamic";

export default function Home() {
  const inputRef = useRef(null);
  const [ip, setIp] = useState(null);
  const [location, setLocation] = useState(null);
  const [timezone, setTimezone] = useState(null);
  const [ISP, setISP] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const handleSubmit = e => {
    e.preventDefault();
    if(inputRef.current.value) {
      axios.get(`https://geo.ipify.org/api/v1?apiKey=at_4SycYngAiFWdeRsCrDdMNqsYbv2S4&ipAddress=${inputRef.current.value}`).then(response => {
       setIp(response?.data?.ip);
       setLocation(`${response?.data?.location?.city}, ${response?.data?.location?.country}`);
       setTimezone(response?.data?.location?.timezone);
       setISP(response?.data?.isp);
       setLat(response?.data?.location?.lat);
       setLng(response?.data?.location?.lng);
      }).catch(error => console.log(error));
      inputRef.current.value = '';
    } 
  }
  const MapWithNoSSR = dynamic(() => import("../components/Map"), {
    ssr: false
  });
  
  return (
    <div>
      <Head>
        <title>Ip Address Tracker</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <h1>IP Address Tracker</h1>
        
        <form>
          <input ref={inputRef} type="text" placeholder="Search for any IP address or domain" />
          <button onClick={handleSubmit} type="submit">
              <img src="/images/icon-arrow.svg" alt="arrow" />
          </button>
        </form>
        <Info>
          <div>
            <p>IP Address</p>
            <h3>{ip ? ip : '192.212.174.101'}</h3>
          </div>
          <div>
            <p>Location</p>
            <h3>{location ? location : 'Brooklyn, NY 1001'}</h3>
          </div>
          <div>
            <p>Timezone</p>
            <h3>{timezone ? 'UTC'+timezone : 'UTC-05:00'}</h3>
          </div>
          <div>
            <p>ISP</p>
            <h3>{ISP ? ISP : 'SpaceX Starlink'}</h3>
          </div>
        </Info>
      </Header>
      <MapWithNoSSR position={lat && [lat,lng]} />
    </div>

  )
}


const Header = styled.div`
  height:30vh;
  background:url('images/pattern-bg.png') center center no-repeat;
  background-size:cover;
  position:relative;
  color:#FFF;
  display:flex;
  flex-direction:column;
  align-items:center;
  padding:30px;
  h1 {
    margin:0;
  }
  form {
    display:flex;
    border-radius:15px;
    margin-top:2em;
    align-items:center;
    input {
      padding:20px;
      border:none;
      outline:none;
      width:400px;
      border-radius:15px;
      border-top-right-radius:0;
      border-bottom-right-radius:0;
      ::placeholder {
        color:hsl(0, 0%, 59%);
      }
      @media(max-width:767px) {
        width:270px;
      }
    }
    button {
      padding:19px 20px;
      border-radius:0;
      border-top-right-radius:15px;
      border-bottom-right-radius:15px;
      border:none;
      outline:none;
      background-color:#000;
      cursor:pointer;
    }
  }
`;

const Info = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:80%;
  padding:15px 30px;
  box-shadow:1px 1px 15px hsl(0deg 0% 17% / 32%);
  position:relative;
  bottom:-20px;
  z-index:999999;
  background-color:#FFF;
  color:hsl(0, 0%, 59%);
  border-radius: 10px;
  div {
    width:calc(100% / 4);
    padding:0 25px;
    p {
      font-weight:600;
      font-size:14px;

    }
    h3 {
      color:#000;
      word-break:break-all;
    }
    :not(:last-of-type) {
      border-right:1px solid hsl(0, 0%, 88%);
    }
  }
  @media(max-width:767px) {
    flex-direction:column;
    width:90%;
    div {
      width:100%;
      text-align:center;
      :not(:last-of-type) {
        border-right:0;
      }
    }
  }
`;