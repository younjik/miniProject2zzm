import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { motion } from "framer-motion";
import {
  LocateFixed,
  Star,
  AlertCircle,
  Utensils,
  Navigation,
} from "lucide-react";
import { restaurants } from "../../data.js";
import { reverseGeocode } from "../../lib/geocode.js";
import { haversineKm } from "../../lib/recommend.js";
import pinUrl from "../../assets/pin.png";
import RestaurantCard from "../RestaurantCard.jsx";
import { getNaverMapUrl } from "../../lib/naverMap.js";

const DEFAULT_CENTER = { lat: 37.5662, lng: 126.991 }; // 을지로3가

const restaurantIcon = L.icon({
  iconUrl: pinUrl,
  iconSize: [34, 34],
  iconAnchor: [17, 32],
  popupAnchor: [0, -30],
});

const meIcon = L.divIcon({
  className: "me-marker",
  html: '<span class="me-marker-pulse"></span><span class="me-marker-dot"></span>',
  iconSize: [18, 18],
  iconAnchor: [9, 9],
});

function FlyTo({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo([center.lat, center.lng], 15, { duration: 0.8 });
  }, [center, map]);
  return null;
}

export default function MapScreen({ onOpenDetail, favorites = [], onToggleFavorite }) {
  const [myLocation, setMyLocation] = useState(null);
  const [address, setAddress] = useState("");
  const [locating, setLocating] = useState(false);
  const [locateError, setLocateError] = useState("");
  const nearbySectionRef = useRef(null);

  const origin = myLocation || DEFAULT_CENTER;
  const nearbyRestaurants = restaurants
    .map((r) => ({ ...r, distance: haversineKm(origin.lat, origin.lng, r.lat, r.lng) }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, 8);

  const scrollToNearby = () => {
    nearbySectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const openDirectionsToNearest = () => {
    const nearest = nearbyRestaurants[0];
    if (nearest) window.open(getNaverMapUrl(nearest), "_blank", "noopener,noreferrer");
  };

  const locate = () => {
    if (!navigator.geolocation) {
      setLocateError("이 브라우저에서는 위치 확인이 안 돼요.");
      return;
    }
    setLocating(true);
    setLocateError("");
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setMyLocation({ lat: latitude, lng: longitude });
        const addr = await reverseGeocode(latitude, longitude);
        setAddress(addr || "현재 위치");
        setLocating(false);
      },
      () => {
        setLocateError(
          "위치 정보를 가져올 수 없어요. 위치 권한을 확인해주세요.",
        );
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 8000 },
    );
  };

  return (
    <>
      <h2 className="step-title">근처 맛집</h2>
      <p className="step-desc">
        {address ? `${address} 근처예요` : "지도를 움직여 주변을 둘러보세요"}
      </p>

      <div className="map-card">
        <MapContainer
          center={[DEFAULT_CENTER.lat, DEFAULT_CENTER.lng]}
          zoom={14}
          zoomControl={false}
          scrollWheelZoom={true}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FlyTo center={myLocation} />
          {myLocation && (
            <Marker position={[myLocation.lat, myLocation.lng]} icon={meIcon} />
          )}
          {restaurants.map((r) => (
            <Marker key={r.id} position={[r.lat, r.lng]} icon={restaurantIcon}>
              <Popup>
                <div className="map-popup">
                  <div className="map-popup-name">{r.name}</div>
                  <div className="map-popup-meta">
                    <Star size={12} fill="currentColor" /> {r.rating}{" "}
                    <span>· {r.region}</span>
                  </div>
                  <button
                    type="button"
                    className="map-popup-btn"
                    onClick={() => onOpenDetail(r.id)}
                  >
                    상세보기
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        <motion.button
          type="button"
          className="map-nearby-btn"
          whileTap={{ scale: 0.96 }}
          onClick={scrollToNearby}
        >
          <Utensils size={14} /> 내 주변 맛집 찾기
        </motion.button>

        <motion.button
          type="button"
          className="map-locate-fab"
          whileTap={{ scale: 0.92 }}
          onClick={locate}
          disabled={locating}
          aria-label="현재 위치 찾기"
        >
          <LocateFixed size={19} />
        </motion.button>

        <motion.button
          type="button"
          className="map-directions-btn"
          whileTap={{ scale: 0.96 }}
          onClick={openDirectionsToNearest}
        >
          <Navigation size={14} /> 길찾기
        </motion.button>
      </div>

      {locateError && (
        <p className="field-hint error">
          <AlertCircle size={14} /> {locateError}
        </p>
      )}

      <div className="map-nearby-section" ref={nearbySectionRef}>
        <h3 className="map-nearby-title">
          {myLocation ? "내 주변 맛집" : "을지로3가 근처 맛집"}
        </h3>
        <div className="map-nearby-scroll">
          {nearbyRestaurants.map((r, i) => (
            <div key={r.id} className="map-nearby-item">
              <RestaurantCard
                restaurant={r}
                index={i}
                onClick={() => onOpenDetail(r.id)}
                isFavorite={favorites.includes(r.id)}
                onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(r.id) : undefined}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
