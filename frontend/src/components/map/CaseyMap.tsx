import { forwardRef, useImperativeHandle, useRef } from 'react';
import { View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import ZoomControls from './components/ZoomControls';
import RecentreButton from './components/RecentreButton';
import { MAP_HTML } from './config/mapHTML';
import { getLocation } from './config/useMapLocation';

export type CaseyMapHandle = {
  recentre: () => void;
};

const CaseyMap = forwardRef<CaseyMapHandle>((_, ref) => {
  const webViewRef = useRef<WebView>(null);
  const isReady = useRef(false);

  // Helper to send commands to the Leaflet JS context
  function send(cmd: object) {
    if (!isReady.current) return;
    webViewRef.current?.injectJavaScript(`handleCommand(${JSON.stringify(cmd)});true;`);
  }

  function onMessage(e: WebViewMessageEvent) {
    const msg = JSON.parse(e.nativeEvent.data);
    
    if (msg.type === 'MAP_READY') {
      isReady.current = true;
      // Immediately try to get user location and update the map once it's loaded
      getLocation().then(loc => {
        if (loc) send({ type: 'SET_LOCATION', lat: loc.lat, lng: loc.lng });
      });
    }
  }

  // Allows parent components to trigger a recentre manually if needed
  useImperativeHandle(ref, () => ({
    recentre: () => send({ type: 'RECENTRE' }),
  }));

  return (
    <View style={{ flex: 1 }}>
      <WebView
        ref={webViewRef}
        originWhitelist={['*']}
        source={{ html: MAP_HTML }}
        style={{ flex: 1 }}
        javaScriptEnabled
        onMessage={onMessage}
      />

      <RecentreButton onPress={() => send({ type: 'RECENTRE' })} />
      
      <ZoomControls
        onZoomIn={() => send({ type: 'ZOOM_IN' })}
        onZoomOut={() => send({ type: 'ZOOM_OUT' })}
      />
    </View>
  );
});

export default CaseyMap;