import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';
import { PermissionsContext } from '../context/PermissionsContext';
import LoadingScreen from '../screens/LoadingScreen';
import MapScreen from '../screens/MapScreen';
import PermissionsScreen from '../screens/PermissionsScreen';

const Stack = createStackNavigator();

function Navigator() {

  const { permissions } = useContext(PermissionsContext);

  if (permissions.locationStatus === 'unavailable') {
    return <LoadingScreen />
  }

  return (
    <Stack.Navigator
      initialRouteName="PermissionsScreen"
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: 'white'
        }
      }}
    >
      {
        permissions.locationStatus === 'granted'
          ? <Stack.Screen name="MapScreen" component={MapScreen} />
          : <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      }
    </Stack.Navigator>
  );
}

export default Navigator;