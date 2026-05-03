// map HTML lives here. Leaflet needs a browser context so we use a WebView. Other options with react native support required API connection with pay per use.

import { CASEY_COORDINATES, DEFAULT_ZOOM } from './mapConfig';

function buildMapHTML(): string {
  const { latitude, longitude } = CASEY_COORDINATES;

  return /* html */ `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.css"/>
  <link rel="stylesheet" href="https://unpkg.com/leaflet.markercluster@1.5.3/dist/MarkerCluster.Default.css"/>

  <style>
    html, body, #map { margin: 0; height: 100%; background: #f0f0f0; }
  </style>
</head>

<body>
  <div id="map"></div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script src="https://unpkg.com/leaflet.markercluster@1.5.3/dist/leaflet.markercluster.js"></script>

  <script>
    var map = L.map('map', { zoomControl: false }).setView([${latitude}, ${longitude}], ${DEFAULT_ZOOM});

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    var userMarker = null;
    var userLocation = null;

    // All icon markers are managed through the cluster group
    var clusterGroup = L.markerClusterGroup({ maxClusterRadius: 60 });
    map.addLayer(clusterGroup);

    // iconStore tracks every marker along with its type and whether it is in the cluster
    var iconStore = {};   // id → { marker, iconType, onMap }
    var hiddenTypes = {}; // iconType → true when hidden

    var routeStore = {}; // id → [casing, line, startDot, endDot]

    function drawRoute(id, points) {
      if (routeStore[id]) routeStore[id].forEach(function(l) { map.removeLayer(l); });
      var latlngs     = points.map(function(p) { return [p.lat, p.lng]; });
      var coords      = points.map(function(p) { return p.lng+','+p.lat; }).join(';');
      var casingStyle = { color: '#FFFFFF', weight: 12, opacity: 1,   lineCap: 'round', lineJoin: 'round' };
      var lineStyle   = { color: '#2563EB', weight: 7,  opacity: 1,   lineCap: 'round', lineJoin: 'round' };
      var fbCasing    = { color: '#FFFFFF', weight: 12, opacity: 0.6, lineCap: 'round', lineJoin: 'round', dashArray: '10 8' };
      var fbLine      = { color: '#2563EB', weight: 7,  opacity: 0.5, lineCap: 'round', lineJoin: 'round', dashArray: '10 8' };
      var startDot    = { radius: 8, color: '#FFFFFF', weight: 3, fillColor: '#2563EB', fillOpacity: 1 };
      var endDot      = { radius: 8, color: '#2563EB', weight: 3, fillColor: '#FFFFFF', fillOpacity: 1 };
      function addLayers(path, cs, ls) {
        var casing = L.polyline(path, cs).addTo(map);
        var line   = L.polyline(path, ls).addTo(map);
        var first = latlngs[0], last = latlngs[latlngs.length-1];
        var isLoop = first[0] === last[0] && first[1] === last[1];
        var start = L.circleMarker(first, startDot).addTo(map).bindTooltip(isLoop ? 'Start / End' : 'Start', { permanent: true, direction: 'top', offset: [0, -10] });
        var end   = isLoop ? null : L.circleMarker(last, endDot).addTo(map).bindTooltip('End', { permanent: true, direction: 'top', offset: [0, -10] });
        casing.on('click', function() { sendToRN({ type: 'ROUTE_TAPPED', id: id }); });
        line.on('click', function() { sendToRN({ type: 'ROUTE_TAPPED', id: id }); });
        map.fitBounds(line.getBounds(), { padding: [40, 40] });
        routeStore[id] = [casing, line, start].concat(end ? [end] : []);
      }
      fetch('https://routing.openstreetmap.de/routed-foot/route/v1/foot/'+coords+'?overview=full&geometries=geojson')
        .then(function(r){return r.json();})
        .then(function(data){
          var route = data.routes[0];
          var distKm = (route.distance / 1000).toFixed(1) + ' km';
          sendToRN({ type: 'ROUTE_INFO', id: id, distance: distKm });
          addLayers(route.geometry.coordinates.map(function(c){return [c[1],c[0]];}), casingStyle, lineStyle);
        })
        .catch(function(){
          sendToRN({ type: 'ROUTE_FALLBACK', id: id });
          addLayers(latlngs, fbCasing, fbLine);
        });
    }

    function clearRoutes() {
      Object.keys(routeStore).forEach(function(id) { routeStore[id].forEach(function(l) { map.removeLayer(l); }); });
      routeStore = {};
    }

    function addMapIcon(id, lat, lng, emoji, label, iconType) {
      if (iconStore[id]) {
        if (iconStore[id].onMap) clusterGroup.removeLayer(iconStore[id].marker);
        delete iconStore[id];
      }

      var marker = L.marker([lat, lng], {
        icon: L.divIcon({
          html: '<div style="font-size:40px;line-height:1;filter:drop-shadow(0 1px 3px rgba(0,0,0,0.5))">' + emoji + '</div>',
          className: '',
          iconSize: [48, 48],
          iconAnchor: [24, 24],
        })
      });

      if (label) marker.bindTooltip(label, { permanent: false, direction: 'top', offset: [0, -14] });

      var hidden = !!hiddenTypes[iconType];
      if (!hidden) clusterGroup.addLayer(marker);
      iconStore[id] = { marker: marker, iconType: iconType, onMap: !hidden };
    }

    function clearMapIcons() {
      Object.keys(iconStore).forEach(function(id) {
        if (iconStore[id].onMap) clusterGroup.removeLayer(iconStore[id].marker);
      });
      iconStore = {};
    }

    function setTypeVisibility(iconType, visible) {
      if (visible) {
        delete hiddenTypes[iconType];
        Object.keys(iconStore).forEach(function(id) {
          var entry = iconStore[id];
          if (entry.iconType === iconType && !entry.onMap) {
            clusterGroup.addLayer(entry.marker);
            entry.onMap = true;
          }
        });
      } else {
        hiddenTypes[iconType] = true;
        Object.keys(iconStore).forEach(function(id) {
          var entry = iconStore[id];
          if (entry.iconType === iconType && entry.onMap) {
            clusterGroup.removeLayer(entry.marker);
            entry.onMap = false;
          }
        });
      }
    }

    function handleCommand(cmd) {
      switch(cmd.type) {
        case 'SET_LOCATION':
          userLocation = { lat: cmd.lat, lng: cmd.lng };
          if (userMarker) map.removeLayer(userMarker);
          userMarker = L.circleMarker([cmd.lat, cmd.lng], {
            radius: 8, color: '#FFFFFF', weight: 2, fillColor: '#2563EB', fillOpacity: 1
          }).addTo(map);
          break;
        case 'RECENTRE':
          if (userLocation) map.flyTo([userLocation.lat, userLocation.lng], 15);
          break;
        case 'ZOOM_IN':
          map.zoomIn();
          break;
        case 'ZOOM_OUT':
          map.zoomOut();
          break;
        case 'ADD_ICON':
          addMapIcon(cmd.id, cmd.lat, cmd.lng, cmd.emoji, cmd.label, cmd.iconType);
          break;
        case 'CLEAR_ICONS':
          clearMapIcons();
          break;
        case 'SET_TYPE_VISIBILITY':
          setTypeVisibility(cmd.iconType, cmd.visible);
          break;
        case 'SET_BOUNDARY':
          var bf = cmd.feature;
          var bgt = bf.geometry.type;
          var bc = bf.geometry.coordinates;
          var bworld = [[-90,-180],[90,-180],[90,180],[-90,180]];
          var bToLL = function(ring) { return ring.map(function(p){return [p[1],p[0]];}); };
          var bholes = bgt === 'MultiPolygon'
            ? bc.map(function(poly){return bToLL(poly[0]);})
            : [bToLL(bc[0])];
          L.polygon([bworld].concat(bholes), { color:'none', fillColor:'#000', fillOpacity:0.35, interactive:false }).addTo(map);
          L.geoJSON(bf, { style:{ color:'#2563EB', weight:2, fillOpacity:0 } }).addTo(map);
          break;
        case 'DRAW_ROUTE':
          drawRoute(cmd.id, cmd.points);
          break;
        case 'CLEAR_ROUTES':
          clearRoutes();
          break;
      }
    }

    function sendToRN(data) { window.ReactNativeWebView.postMessage(JSON.stringify(data)); }
    window.addEventListener('message', function(e) { try { handleCommand(JSON.parse(e.data)); } catch(_) {} });
    document.addEventListener('message', function(e) { try { handleCommand(JSON.parse(e.data)); } catch(_) {} });

    sendToRN({ type: 'MAP_READY' });
  </script>
</body>
</html>`;
}

export const MAP_HTML = buildMapHTML();
