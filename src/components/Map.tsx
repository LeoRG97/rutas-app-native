import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'

const Map = () => {
  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={{ flex: 1 }}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >
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
    </>
  )
}

export default Map

const styles = StyleSheet.create({})