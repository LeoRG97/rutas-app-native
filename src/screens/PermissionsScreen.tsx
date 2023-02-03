import { View, Text, StyleSheet, Button, Platform, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import { PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';
import { PermissionsContext } from '../context/PermissionsContext';
import BlackButton from '../components/BlackButton';

const PermissionsScreen = () => {

  const { permissions, askLocationPermission } = useContext(PermissionsContext)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Es necesario el uso del GPS para usar esta aplicación
      </Text>
      <BlackButton
        title="Permiso"
        onPress={askLocationPermission}
      />
      <Text style={{ color: '#000', marginTop: 20, }}>
        Estado del permiso: "{permissions.locationStatus}"
      </Text>
    </View>
  )
}

export default PermissionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    width: 250,
    color: '#000',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  }
})