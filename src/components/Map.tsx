import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import MapView, { Polyline, PROVIDER_GOOGLE } from 'react-native-maps'
import { useLocation } from '../hooks/useLocation'
import LoadingScreen from '../screens/LoadingScreen'
import Fab from './Fab'

const Map = () => {

  const [showPolyline, setShowPolyline] = useState(true);

  const {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    userLocation,
    routeLines,
  } = useLocation();

  const mapViewRef = useRef<MapView>();
  const following = useRef(true);

  useEffect(() => {
    followUserLocation();
    return () => {
      // cancel following
      stopFollowUserLocation();
    }
  }, []);

  useEffect(() => {
    if (!following.current) return;
    const { latitude, longitude } = userLocation;
    mapViewRef.current?.animateCamera({
      center: { latitude, longitude }
    });
  }, [userLocation])


  const centerPosition = async () => {
    const { latitude, longitude } = await getCurrentLocation();
    following.current = true;
    mapViewRef.current?.animateCamera({
      center: { latitude, longitude }
    })
  }

  if (!hasLocation) {
    return <LoadingScreen />;
  }

  return (
    <>
      <MapView
        ref={(el) => mapViewRef.current = el!}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        showsUserLocation
        showsMyLocationButton={false}
        style={{ flex: 1 }}
        region={{
          latitude: initialPosition.latitude,
          longitude: initialPosition.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onTouchStart={() => {
          following.current = false;
        }}
      >
        {showPolyline && <Polyline
          coordinates={routeLines}
          strokeColor="black"
          strokeWidth={3}
        />}
        {/* <Marker
          image={require('../assets/custom-marker.png')}
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          title='Título'
          description='Descripción del marcador'
        /> */}
      </MapView>
      <Fab
        iconName="compass-outline"
        onPress={centerPosition}
        style={{
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
      />
      <Fab
        iconName="brush-outline"
        onPress={() => setShowPolyline(!showPolyline)}
        style={{
          position: 'absolute',
          bottom: 80,
          right: 10,
        }}
      />
    </>
  )
}

export default Map

const styles = StyleSheet.create({})