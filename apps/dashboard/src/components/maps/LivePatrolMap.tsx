import { CircleMarker, MapContainer, Polyline, TileLayer, Tooltip, ZoomControl } from "react-leaflet";
import type { LatLngExpression } from "leaflet";

const route: LatLngExpression[] = [
  [-6.20945, 106.84484],
  [-6.20915, 106.84512],
  [-6.20898, 106.84543],
  [-6.20882, 106.84574],
  [-6.20863, 106.84604],
  [-6.20836, 106.84631],
  [-6.20812, 106.84658],
];

const checkpointData = [
  { id: "CP-01", name: "Gerbang timur", position: route[0], status: "complete" },
  { id: "CP-02", name: "Loading dock", position: route[1], status: "complete" },
  { id: "CP-03", name: "Pintu darurat", position: route[2], status: "complete" },
  { id: "CP-04", name: "Koridor penyimpanan", position: route[3], status: "complete" },
  { id: "CP-05", name: "Ruang generator", position: route[4], status: "current" },
  { id: "CP-06", name: "Tangki air", position: route[5], status: "pending" },
  { id: "CP-07", name: "Gerbang selatan", position: route[6], status: "pending" },
];

export function LivePatrolMap() {
  return <MapContainer className="np-leaflet-dark h-full w-full bg-[var(--np-night)]" center={[-6.2088, 106.8457]} zoom={17} zoomControl={false} scrollWheelZoom>
    <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <ZoomControl position="topright" />
    <Polyline positions={route} pathOptions={{ color: "#25b9e8", weight: 4, opacity: .86, dashArray: "8 8" }} />
    {checkpointData.map((checkpoint) => <CircleMarker key={checkpoint.id} center={checkpoint.position} radius={checkpoint.status === "current" ? 11 : 7} pathOptions={{ color: checkpoint.status === "complete" ? "#5ee0af" : checkpoint.status === "current" ? "#8fdcff" : "#607481", fillColor: checkpoint.status === "complete" ? "#17835b" : checkpoint.status === "current" ? "#25b9e8" : "#1c313d", fillOpacity: 1, weight: checkpoint.status === "current" ? 4 : 2 }}>
      <Tooltip direction="top" offset={[0, -8]}><span className="font-medium">{checkpoint.id}</span> · {checkpoint.name}</Tooltip>
    </CircleMarker>)}
    <CircleMarker center={[-6.20872, 106.84588]} radius={9} pathOptions={{ color: "#ffffff", fillColor: "#0876c9", fillOpacity: 1, weight: 3 }}>
      <Tooltip permanent direction="bottom" offset={[0, 10]}>Rizky Pratama</Tooltip>
    </CircleMarker>
  </MapContainer>;
}
