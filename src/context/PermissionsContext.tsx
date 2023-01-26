import { createContext, useState } from "react";
import { PermissionStatus } from "react-native-permissions";

export interface PermissionsState {
  locationStatus: PermissionStatus;
}

export const permissionInitState: PermissionsState = {
  locationStatus: 'unavailable',
}

// el objeto "permissions" contendrá todos los permisos que se requieran verificar en la aplicación
type PermissionsContextProps = {
  permissions: PermissionsState;
  askLocationPermission: () => void;
  checkLocationPermission: () => void;
}

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({ children }: any) => {

  const [permissions, setPermissions] = useState(permissionInitState);

  const askLocationPermission = () => {

  };

  const checkLocationPermission = () => {

  };

  return (
    <PermissionsContext.Provider value={{
      permissions,
      askLocationPermission,
      checkLocationPermission,
    }}>
      {children}
    </PermissionsContext.Provider>
  )
}