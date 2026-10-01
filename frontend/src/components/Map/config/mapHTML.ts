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
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>

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

    var currentTileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '© OpenStreetMap'
    }).addTo(map);

    function setTheme(isDark) {
      map.removeLayer(currentTileLayer);
      if (isDark) {
        currentTileLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap, © CARTO',
          subdomains: 'abcd'
        }).addTo(map);
        map.getPanes().tilePane.style.filter = 'brightness(1.6) contrast(0.9)';
        document.body.style.background = '#1a1a2e';
      } else {
        currentTileLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        }).addTo(map);
        map.getPanes().tilePane.style.filter = '';
        document.body.style.background = '#f0f0f0';
      }
    }

    var userMarker = null;
    var userLocation = null;
    var hasCentredOnUser = false;

    var clusterGroup = L.markerClusterGroup({ maxClusterRadius: 60 });
    map.addLayer(clusterGroup);

    var iconStore = {};
    var hiddenTypes = {};
    var routeStore = {};
    var routeRequestId = 0;

    function drawRoute(id, routeOptions) {
      clearRoutes();
      var thisRequestId = ++routeRequestId;

      var points = Array.isArray(routeOptions) ? routeOptions : (routeOptions.points || []);
      var targetDistanceKm = !Array.isArray(routeOptions) ? (routeOptions.targetDistanceKm || null) : null;
      var selectedFilters = !Array.isArray(routeOptions) ? (routeOptions.selectedFilters || []) : [];
      var routeGeoJson = !Array.isArray(routeOptions) ? routeOptions.routeGeoJson : null;
      var distanceText = !Array.isArray(routeOptions) ? routeOptions.distanceText : null;
      var durationText = !Array.isArray(routeOptions) ? routeOptions.durationText : null;

      var latlngs = points.map(function(p) { return [p.lat, p.lng]; });

      var casingStyle = { color: '#FFFFFF', weight: 12, opacity: 1, lineCap: 'round', lineJoin: 'round' };
      var lineStyle = { color: '#2563EB', weight: 7, opacity: 1, lineCap: 'round', lineJoin: 'round' };
      var fbCasing = { color: '#FFFFFF', weight: 12, opacity: 0.6, lineCap: 'round', lineJoin: 'round', dashArray: '10 8' };
      var fbLine = { color: '#2563EB', weight: 7, opacity: 0.5, lineCap: 'round', lineJoin: 'round', dashArray: '10 8' };

      var startDot = { radius: 8, color: '#FFFFFF', weight: 3, fillColor: '#2563EB', fillOpacity: 1 };
      var endDot = { radius: 8, color: '#2563EB', weight: 3, fillColor: '#FFFFFF', fillOpacity: 1 };

      function addLayers(path, cs, ls) {
        if (!path || path.length === 0) return;

        var casing = L.polyline(path, cs).addTo(map);
        var line = L.polyline(path, ls).addTo(map);

        var first = path[0];
        var last = path[path.length - 1];
        var isLoop = Math.abs(first[0] - last[0]) < 0.000001 && Math.abs(first[1] - last[1]) < 0.000001;

        var startMarker = L.circleMarker(first, startDot)
          .addTo(map)
          .bindTooltip(isLoop ? 'Start / End' : 'Start', { permanent: true, direction: 'top', offset: [0, -10] });

        var endMarker = isLoop ? null : L.circleMarker(last, endDot)
          .addTo(map)
          .bindTooltip('End', { permanent: true, direction: 'top', offset: [0, -10] });

        casing.on('click', function() { sendToRN({ type: 'ROUTE_TAPPED', id: id }); });
        line.on('click', function() { sendToRN({ type: 'ROUTE_TAPPED', id: id }); });

        map.fitBounds(line.getBounds(), { padding: [40, 40] });
        routeStore[id] = [casing, line, startMarker].concat(endMarker ? [endMarker] : []);
      }

      // 1. If pre-computed GeoJSON is provided (e.g. from a custom walk), render it immediately
      if (routeGeoJson) {
        var parsedGeo = routeGeoJson;
        if (typeof parsedGeo === 'string') {
          try { parsedGeo = JSON.parse(parsedGeo); } catch(_) {}
        }
        var feature = parsedGeo && parsedGeo.features && parsedGeo.features[0];
        if (feature && feature.geometry && feature.geometry.coordinates && feature.geometry.coordinates.length > 1) {
          var geoCoords = feature.geometry.coordinates.map(function(c) { return [c[1], c[0]]; });
          addLayers(geoCoords, casingStyle, lineStyle);

          var summary = feature.properties && feature.properties.summary;
          var dist = distanceText || (summary ? (summary.distance / 1000).toFixed(1) + ' km' : '');
          var dur = durationText || (summary ? Math.round(summary.duration / 60) + ' mins' : '');
          if (dist) {
            sendToRN({ type: 'ROUTE_INFO', id: id, distance: dist, duration: dur });
          }
          return;
        }
      }

      // 2. If already have a full polyline path (more than 2 coordinates and no generation parameters), render directly
      if (latlngs.length > 2 && !targetDistanceKm && selectedFilters.length === 0) {
        addLayers(latlngs, casingStyle, lineStyle);
        if (distanceText) {
          sendToRN({ type: 'ROUTE_INFO', id: id, distance: distanceText, duration: durationText || '' });
        }
        return;
      }

      var start = points[0] || userLocation;
      var end = points.length > 1 ? points[points.length - 1] : null;

      if (!start) {
        sendToRN({
          type: 'ROUTE_ERROR',
          id: id,
          message: 'User location is not available yet.'
        });
        return;
      }

      var requestBody = {
        title: id,
        start: {
          lat: start.lat,
          lng: start.lng
        }
      };

      if (end) {
        requestBody.end = {
          lat: end.lat,
          lng: end.lng
        };
      }

      if (targetDistanceKm) {
        requestBody.targetDistanceKm = targetDistanceKm;
      }

      if (selectedFilters.length > 0) {
        requestBody.selectedFilters = selectedFilters;
      }

      if (latlngs.length === 0) latlngs = [[start.lat, start.lng]];

      function fetchRoute(url) {
        return fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody)
        }).then(function(r) {
          if (!r.ok) throw new Error('Route request failed: ' + r.status);
          return r.json();
        });
      }

      fetchRoute('http://localhost:5156/api/custom-walk-route')
        .catch(function() {
          return fetchRoute('http://10.0.2.2:5156/api/custom-walk-route');
        })
        .then(function(data) {
          if (thisRequestId !== routeRequestId) return;
          var routeGeoJson = data.routeGeoJson;
          var feature = routeGeoJson.features[0];

          sendToRN({
            type: 'ROUTE_INFO',
            id: id,
            distance: data.distanceText,
            duration: data.durationText
          });

          addLayers(
            feature.geometry.coordinates.map(function(c) { return [c[1], c[0]]; }),
            casingStyle,
            lineStyle
          );
        })
        .catch(function(error) {
          if (thisRequestId !== routeRequestId) return;
          sendToRN({ type: 'ROUTE_FALLBACK', id: id, message: String(error) });
          if (points.length >= 2) addLayers(latlngs, fbCasing, fbLine);
        });
    }

    function clearRoutes() {
      Object.keys(routeStore).forEach(function(id) { routeStore[id].forEach(function(l) { map.removeLayer(l); }); });
      routeStore = {};
    }

    function addMapIcon(id, lat, lng, iconClass, color, label, iconType) {
      if (iconStore[id]) {
        if (iconStore[id].onMap) clusterGroup.removeLayer(iconStore[id].marker);
        delete iconStore[id];
      }

      var marker = L.marker([lat, lng], {
        icon: L.divIcon({
          html: '<div style="width:40px;height:40px;border-radius:50%;background:' + color + ';display:flex;align-items:center;justify-content:center;box-shadow:0 2px 6px rgba(0,0,0,0.35)"><i class="' + iconClass + '" style="color:white;font-size:18px;"></i></div>',
          className: '',
          iconSize: [40, 40],
          iconAnchor: [20, 20],
        })
      });

      if (label) marker.bindTooltip(label, { permanent: false, direction: 'top', offset: [0, -14] });

      marker.on('click', function() {
        sendToRN({ type: 'ICON_TAPPED', label: label });
        if (!userLocation) return;
        clearRoutes();
        drawRoute('nav-route', { points: [userLocation, { lat: lat, lng: lng }] });
      });

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
          if (!hasCentredOnUser) {
            hasCentredOnUser = true;
            map.setView([cmd.lat, cmd.lng], ${DEFAULT_ZOOM});
          }
          break;
        case 'RECENTRE':
          if (userLocation) map.flyTo([userLocation.lat, userLocation.lng], ${DEFAULT_ZOOM});
          break;
        case 'ZOOM_IN':
          map.zoomIn();
          break;
        case 'ZOOM_OUT':
          map.zoomOut();
          break;
        case 'ADD_ICON':
          addMapIcon(cmd.id, cmd.lat, cmd.lng, cmd.iconClass, cmd.color, cmd.label, cmd.iconType);
          break;
        case 'ROUTE_TO':
          if (userLocation) {
            drawRoute('nav-route', { points: [userLocation, { lat: cmd.lat, lng: cmd.lng }] });
          } else {
            map.flyTo([cmd.lat, cmd.lng], 16);
          }
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
        case 'SET_THEME':
          setTheme(cmd.isDark);
          break;
        case 'DRAW_ROUTE':
          drawRoute(cmd.id, {
            points: cmd.points || [],
            targetDistanceKm: cmd.targetDistanceKm,
            selectedFilters: cmd.selectedFilters || [],
            routeGeoJson: cmd.routeGeoJson,
            distanceText: cmd.distanceText,
            durationText: cmd.durationText
          });
          break;
        case 'CLEAR_ROUTES':
          clearRoutes();
          break;
      }
    }

    function sendToRN(data) { window.ReactNativeWebView.postMessage(JSON.stringify(data)); }
    window.addEventListener('message', function(e) { try { handleCommand(JSON.parse(e.data)); } catch(_) {} });
    document.addEventListener('message', function(e) { try { handleCommand(JSON.parse(e.data)); } catch(_) {} });

    fetch('https://nominatim.openstreetmap.org/search?q=City+of+Casey,Victoria,Australia&format=geojson&polygon_geojson=1&limit=1', { headers: { 'Accept-Language': 'en' } })
      .then(function(r) { return r.json(); })
      .then(function(data) {
        var feature = data.features && data.features[0];
        if (feature && feature.geometry && (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon')) {
          handleCommand({ type: 'SET_BOUNDARY', feature: feature });
        }
      })
      .catch(function() {});

    sendToRN({ type: 'MAP_READY' });
  </script>
</body>
</html>`;
}

export const MAP_HTML = buildMapHTML();
