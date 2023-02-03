import { View, Text, StyleSheet, Button, Platform, ToastAndroid } from 'react-native'
import React, { useContext } from 'react'
import { PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';
import { PermissionsContext } from '../context/PermissionsContext';

const PermissionsScreen = () => {

  const { permissions, askLocationPermission } = useContext(PermissionsContext)

  return (
    <View style={styles.container}>
      <Text style={{ color: '#000' }}>PermissionsScreen</Text>
      <Button title="Permiso" onPress={askLocationPermission} />
      <Text style={{ color: '#000' }}>
        {JSON.stringify(permissions, null, 2)}
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
})