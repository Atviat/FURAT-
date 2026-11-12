"use client";

import { useEffect, useRef, useState } from "react";
import maplibregl, { Map as MapLibreMap } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const anbarStyle: maplibregl.StyleSpecification = {
  version: 8,
  sources: {
    osm: {
      type: "raster",
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "osm", type: "raster", source: "osm" }],
};

export default function FuratMap() {
  const container = useRef<HTMLDivElement | null>(null);
  const map = useRef<MapLibreMap | null>(null);
  const [locationMessage, setLocationMessage] = useState("");

  useEffect(() => {
    if (!container.current || map.current) return;
    map.current = new maplibregl.Map({
      container: container.current,
      style: anbarStyle,
      center: [43.3, 33.4],
      zoom: 7,
      minZoom: 5,
      maxZoom: 17,
      attributionControl: true,
    });
    map.current.addControl(new maplibregl.NavigationControl({ showCompass: true }), "top-left");
    map.current.addControl(new maplibregl.ScaleControl({ maxWidth: 100, unit: "metric" }), "bottom-left");
    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  const locate = () => {
    if (!navigator.geolocation) {
      setLocationMessage("خدمة تحديد الموقع غير مدعومة في هذا المتصفح.");
      return;
    }
    setLocationMessage("جارٍ تحديد موقعك...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords: [number, number] = [position.coords.longitude, position.coords.latitude];
        map.current?.flyTo({ center: coords, zoom: 14, essential: true });
        new maplibregl.Marker({ color: "#8b6cff" }).setLngLat(coords).addTo(map.current!);
        setLocationMessage("تم تحديد موقعك.");
      },
      () => setLocationMessage("تعذر تحديد موقعك. تأكد من السماح بالوصول للموقع."),
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  return (
    <div className="map-frame">
      <div ref={container} className="map-canvas" />
      <button className="locate-button" type="button" onClick={locate} aria-label="حدد موقعي">
        <span>◎</span> موقعي
      </button>
      {locationMessage && <div className="location-message" role="status">{locationMessage}</div>}
    </div>
  );
}
