import { View, Text, StyleSheet, Button, Platform, ToastAndroid } from 'react-native'
import React from 'react'
import { PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

const PermissionsScreen = () => {

  const checkLocationPermission = async () => {
    let permissionStatus: PermissionStatus;
    if (Platform.OS === 'ios') {
      permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
    } else {
      permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    }
    console.log({ permissionStatus });
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: '#000' }}>PermissionsScreen</Text>
      <Button title="Permiso" onPress={checkLocationPermission} />
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
})