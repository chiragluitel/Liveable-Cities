import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import * as Location from 'expo-location';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import ZoomControls from './components/ZoomControls';
import RecentreButton from './components/RecentreButton';
import FilterButton from './components/FilterButton';
import { MAP_HTML } from './config/mapHTML';
import { watchLocation } from './config/useMapLocation';
import { MAP_ICONS, ICON_DEFINITIONS, IconName, MapIconEntry } from './config/mapIcons';
import { MapRoute } from './config/mapRouting';
import { DEFAULT_VISIBLE_ICONS } from './config/mapConfig';

export type CaseyMapHandle = {
  recentre: () => void;
  addIcon: (entry: MapIconEntry) => void;
  clearIcons: () => void;
  drawRoute: (route: MapRoute) => void;
  clearRoutes: () => void;
};

type CaseyMapProps = {
  onRouteInfo?: (id: string, distance: string) => void;
  onRouteTap?: (id: string) => void;
  onIconTap?: (label: string) => void;
  animatedSheetPosition?: SharedValue<number>;
};


const CaseyMap = forwardRef<CaseyMapHandle, CaseyMapProps>(({ onRouteInfo, onRouteTap, onIconTap, animatedSheetPosition }, ref) => {
  const webViewRef = useRef<WebView>(null);
  const isReady = useRef(false);
  const locationSub = useRef<Location.LocationSubscription | null>(null);

  function send(cmd: object) {
    if (!isReady.current) return;
    webViewRef.current?.injectJavaScript(`handleCommand(${JSON.stringify(cmd)});true;`);
  }

  function sendRoute(route: MapRoute) {
    send({ type: 'DRAW_ROUTE', id: route.id, points: route.points });
  }

  function sendIcon(entry: MapIconEntry) {
    const def = ICON_DEFINITIONS[entry.name];
    const id = `${entry.name}-${entry.lat}-${entry.lng}`;
    send({ type: 'ADD_ICON', id, lat: entry.lat, lng: entry.lng, iconClass: def.iconClass, color: def.color, label: def.label, iconType: entry.name });
  }

  function onMessage(e: WebViewMessageEvent) {
    const msg = JSON.parse(e.nativeEvent.data);

    if (msg.type === 'MAP_READY') {
      isReady.current = true;

      setTimeout(() => {
        // Apply default visibility for any types hidden by default
        (Object.keys(ICON_DEFINITIONS) as IconName[]).forEach(iconType => {
          if (!DEFAULT_VISIBLE_ICONS.includes(iconType)) {
            send({ type: 'SET_TYPE_VISIBILITY', iconType, visible: false });
          }
        });

        MAP_ICONS.forEach(sendIcon);

        // Start continuous location tracking
        watchLocation(loc => {
          send({ type: 'SET_LOCATION', lat: loc.lat, lng: loc.lng });
        }).then(sub => {
          locationSub.current = sub;
        });
      }, 0);
    }

    if (msg.type === 'ROUTE_INFO') onRouteInfo?.(msg.id, msg.distance);
    if (msg.type === 'ROUTE_TAPPED') onRouteTap?.(msg.id);
    if (msg.type === 'ICON_TAPPED') onIconTap?.(msg.label);
  }

  function handleFilterToggle(iconType: IconName, visible: boolean) {
    send({ type: 'SET_TYPE_VISIBILITY', iconType, visible });
  }

  // Stop tracking location when the map unmounts
  useEffect(() => {
    return () => { locationSub.current?.remove(); };
  }, []);

  useImperativeHandle(ref, () => ({
    recentre:    () => send({ type: 'RECENTRE' }),
    addIcon:     (entry: MapIconEntry) => sendIcon(entry),
    clearIcons:  () => send({ type: 'CLEAR_ICONS' }),
    drawRoute:   (route: MapRoute) => sendRoute(route),
    clearRoutes: () => send({ type: 'CLEAR_ROUTES' }),
  }));

  return (
    <View className="flex-1">
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: MAP_HTML }}
        className="flex-1"
        javaScriptEnabled
        onMessage={onMessage}
      />

      <FilterButton onToggle={handleFilterToggle} />

      <RecentreButton
        onRecentrePress={() => send({ type: 'RECENTRE' })}
        animatedSheetPosition={animatedSheetPosition}
      />

      <ZoomControls
        onZoomIn={() => send({ type: 'ZOOM_IN' })}
        onZoomOut={() => send({ type: 'ZOOM_OUT' })}
        animatedSheetPosition={animatedSheetPosition}
      />
    </View>
  );
});

export default CaseyMap;
