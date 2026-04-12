// map HTML lives here. Leaflet needs a browser context so we use a WebView. Other options with react native support required API connection with pay per use.

import { CASEY_COORDINATES, DEFAULT_ZOOM } from './mapConfig';

function buildMapHTML(): string {
  const { latitude, longitude } = CASEY_COORDINATES;

  return /* html */ `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
  
  <style>
    html, body, #map { 
      margin: 0; 
      height: 100%; 
      background: #f0f0f0; 
    }
  </style>
</head>

<body>
  <div id="map"></div>
  
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  
  <script>
    // Initial Map Setup
    var map = L.map('map', { zoomControl: false }).setView([${latitude}, ${longitude}], ${DEFAULT_ZOOM});
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', { 
      maxZoom: 19, 
      attribution: '© OpenStreetMap' 
    }).addTo(map);

    // Boundary Mask Logic
    // Fetch geojson and dim areas outside the City of Casey
    fetch('https://nominatim.openstreetmap.org/search?q=City+of+Casey,Victoria,Australia&format=geojson&polygon_geojson=1&limit=1', { 
      headers: { 'Accept-Language': 'en' } 
    })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var feature = data.features[0];
      var geomType = feature.geometry.type;
      var coords = feature.geometry.coordinates;
      
      var world = [[-90, -180], [90, -180], [90, 180], [-90, 180]];

      function toLeaflet(ring) { 
        return ring.map(function(p) { return [p[1], p[0]]; }); 
      }

      var holes = geomType === 'MultiPolygon' 
        ? coords.map(function(poly) { return toLeaflet(poly[0]); }) 
        : [toLeaflet(coords[0])];
      
      // Draw the inverse polygon mask
      L.polygon([world].concat(holes), { 
        color: 'none', 
        fillColor: '#000', 
        fillOpacity: 0.35, 
        interactive: false 
      }).addTo(map);

      // Draw the blue boundary line
      L.geoJSON(feature, { 
        style: { color: '#2563EB', weight: 2, fillOpacity: 0 } 
      }).addTo(map);
    });

    var userMarker = null;
    var userLocation = null;

    // --- React Native Communication ---
    function handleCommand(cmd) {
      switch(cmd.type) {
        
        case 'SET_LOCATION':
          userLocation = { lat: cmd.lat, lng: cmd.lng };
          
          if (userMarker) {
            map.removeLayer(userMarker);
          }

          userMarker = L.circleMarker([cmd.lat, cmd.lng], { 
            radius: 8, 
            color: '#FFFFFF', 
            weight: 2,
            fillColor: '#2563EB', 
            fillOpacity: 1 
          }).addTo(map);
          break;

        case 'RECENTRE':
          if (userLocation) {
            map.flyTo([userLocation.lat, userLocation.lng], 15);
          }
          break;

        case 'ZOOM_IN':  
          map.zoomIn();  
          break;

        case 'ZOOM_OUT': 
          map.zoomOut(); 
          break;
      }
    }

    function sendToRN(data) { 
      window.ReactNativeWebView.postMessage(JSON.stringify(data)); 
    }
    
    // Listeners for messages from React Native (iOS & Android)
    window.addEventListener('message', function(e) { 
      try { handleCommand(JSON.parse(e.data)); } catch(_) {} 
    });

    document.addEventListener('message', function(e) { 
      try { handleCommand(JSON.parse(e.data)); } catch(_) {} 
    });

    // Signal that map is ready
    sendToRN({ type: 'MAP_READY' });
  </script>
</body>
</html>`;
}

export const MAP_HTML = buildMapHTML();