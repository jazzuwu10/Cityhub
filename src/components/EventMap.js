import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function EventMap({ events }) {
  useEffect(() => {
    const map = L.map("event-map").setView([31.6340, 74.8723], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap",
    }).addTo(map);

    events.forEach((event) => {
      if (event.lat && event.lng) {

        const popupContent = `
          <div style="width:220px; font-family:sans-serif;">
            <img 
              src="${event.image}" 
              alt="${event.title}" 
              style="width:100%; height:120px; object-fit:cover; border-radius:8px; margin-bottom:6px;"
            />
            <b>${event.title}</b><br/>
            <small>${event.date}</small><br/>
            <span>🔥 ${event.crowd}% booked</span>
            <br/><br/>
            
            <a 
  href="https://www.google.com/maps/dir/?api=1&destination=${event.lat},${event.lng}&travelmode=driving"
  target="_blank"
  style="
    display:inline-block;
    padding:6px 10px;
    background:#00ccff;
    color:black;
    border-radius:6px;
    text-decoration:none;
    font-weight:600;
    margin-bottom:6px;
  "
>
  📍 Get Directions
</a>
          </div>
        `;

        L.marker([event.lat, event.lng])
          .addTo(map)
          .bindPopup(popupContent);
      }
    });

    return () => {
      map.remove();
    };

  }, [events]);

  return (
    <div
      id="event-map"
      style={{
        height: "400px",
        marginTop: "30px",
        borderRadius: "12px",
      }}
    ></div>
  );
}

export default EventMap;