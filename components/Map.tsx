"use client";
import React, { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const Map = ({ lat, lng }: { lat?: number; lng?: number }) => {
  const mapRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
        version: "weekly",
      });

      const { Map } = await loader.importLibrary("maps");

      // Default position
      const defaultPosition = {
        lat: 9.000853762537853,
        lng: -79.583616006694,
      };
      // Use provided props if available, else use default position
      const position = lat && lng ? { lat, lng } : defaultPosition;

      //   map options
      const mapOptions: google.maps.MapOptions = {
        center: position,
        zoom: 15,
        mapId: "MY_Nextjs_MAPID",
      };

      // setup the map
      const map = new Map(mapRef.current!, mapOptions);

      // Create a marker and set its position.
      new google.maps.Marker({
        position,
        map,
      });
    };
    initMap();
  }, [lat, lng]);
  return (
    <>
      <div style={{ height: "450px" }} ref={mapRef} />
    </>
  );
};

export default Map;
