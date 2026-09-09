    function drawRoute(id, routeOptions) {
      clearRoutes();
      var thisRequestId = ++routeRequestId;

      var points = Array.isArray(routeOptions) ? routeOptions : (routeOptions.points || []);
      var targetDistanceKm = !Array.isArray(routeOptions) ? (routeOptions.targetDistanceKm || null) : null;
      var selectedFilters = !Array.isArray(routeOptions) ? (routeOptions.selectedFilters || []) : [];

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

      var latlngs = points.map(function(p) {
        return [p.lat, p.lng];
      });

      if (latlngs.length === 0) {
        latlngs = [[start.lat, start.lng]];
      }

      var casingStyle = {
        color: '#FFFFFF',
        weight: 12,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round'
      };

      var lineStyle = {
        color: '#2563EB',
        weight: 7,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round'
      };

      var fbCasing = {
        color: '#FFFFFF',
        weight: 12,
        opacity: 0.6,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: '10 8'
      };

      var fbLine = {
        color: '#2563EB',
        weight: 7,
        opacity: 0.5,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: '10 8'
      };

      var startDot = {
        radius: 8,
        color: '#FFFFFF',
        weight: 3,
        fillColor: '#2563EB',
        fillOpacity: 1
      };

      var endDot = {
        radius: 8,
        color: '#2563EB',
        weight: 3,
        fillColor: '#FFFFFF',
        fillOpacity: 1
      };

      function addLayers(path, cs, ls) {
        if (!path || path.length === 0) return;

        var casing = L.polyline(path, cs).addTo(map);
        var line = L.polyline(path, ls).addTo(map);

        var first = path[0];
        var last = path[path.length - 1];

        var isLoop =
          Math.abs(first[0] - last[0]) < 0.000001 &&
          Math.abs(first[1] - last[1]) < 0.000001;

        var startMarker = L.circleMarker(first, startDot)
          .addTo(map)
          .bindTooltip(isLoop ? 'Start / End' : 'Start', {
            permanent: true,
            direction: 'top',
            offset: [0, -10]
          });

        var endMarker = isLoop
          ? null
          : L.circleMarker(last, endDot)
              .addTo(map)
              .bindTooltip('End', {
                permanent: true,
                direction: 'top',
                offset: [0, -10]
              });

        casing.on('click', function() {
          sendToRN({ type: 'ROUTE_TAPPED', id: id });
        });

        line.on('click', function() {
          sendToRN({ type: 'ROUTE_TAPPED', id: id });
        });

        map.fitBounds(line.getBounds(), {
          padding: [40, 40]
        });

        routeStore[id] = [casing, line, startMarker].concat(endMarker ? [endMarker] : []);
      }

      fetch('http://localhost:5156/api/custom-walk-route', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      })
        .then(function(r) {
          if (!r.ok) throw new Error('Route request failed');
          return r.json();
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
            feature.geometry.coordinates.map(function(c) {
              return [c[1], c[0]];
            }),
            casingStyle,
            lineStyle
          );
        })
        .catch(function(error) {
          if (thisRequestId !== routeRequestId) return;

          sendToRN({
            type: 'ROUTE_FALLBACK',
            id: id,
            message: String(error)
          });

          if (points.length >= 2) {
            addLayers(latlngs, fbCasing, fbLine);
          }
        });
    }