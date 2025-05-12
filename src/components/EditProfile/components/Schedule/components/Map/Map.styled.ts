import styled from 'styled-components';

export const MapWrapper = styled.div`
  position: relative;
  height: 356px;
  display: flex;

  align-items: end;
`;

export const GeocoderWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: white;
  padding: 5px 15px;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
`;

export const MapContainer = styled.div`
  height: 356px;
  border-radius: 6px;
  width: 100%;
  position: absolute;

  .leaflet-container.leaflet-touch-drag.leaflet-touch-zoom {
    height: 100%;
  }
  .leaflet-control-geocoder {
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(28, 27, 32, 1);
    height: 100px;
    margin: 0;
    width: 100%;
    border: none;
    border-radius: 0px;

    /* display: flex;
    flex-direction: row-reverse; */

    .leaflet-control-geocoder-form {
      display: block;
      background-color: transparent;
    }

    input {
      border: 1px solid #ccc;
      width: 100%;
      visibility: visible;
      background-color: transparent;
      color: #fff;
      border-radius: 4px;
    }
    button {
      display: none;
    }

    .leaflet-control-geocoder-form-no-error {
      display: none;
    }

    ul {
      background: #ccc;

      li {
        width: 100%;

        a {
          width: 100%;
          display: flex;
          gap: 2px;
        }
      }
    }
  }

  .leaflet-control-geocoder-form {
    background: white;
    border-radius: 6px;
  }
`;

export const Title = styled.h4`
  position: absolute;
  z-index: 999999;
  top: 46px;
  text-align: center;
  margin: 0;
`;
