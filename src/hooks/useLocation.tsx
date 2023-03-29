import { useEffect, useRef, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import { Location } from "../interfaces/interfaces";

export const useLocation = () => {

  const [hasLocation, setHasLocation] = useState(false);
  const [routeLines, setRouteLines] = useState<Location[]>([]);
  const [initialPosition, setInitialPosition] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });
  const [userLocation, setUserLocation] = useState<Location>({
    latitude: 0,
    longitude: 0,
  });

  const watchId = useRef<number>();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    }
  }, []);

  useEffect(() => {
    getCurrentLocation().then((location) => {
      // bloquear el cambio de estado si el componente se desmontó
      if (!isMounted.current) return;

      setInitialPosition(location);
      setUserLocation(location);
      setRouteLines(routes => [...routes, location]);
      setHasLocation(true);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  const getCurrentLocation = (): Promise<Location> => {
    return new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        ({ coords }) => {
          resolve({ latitude: coords.latitude, longitude: coords.longitude });
        },
        (err) => {
          reject({ err });
        },
        {
          enableHighAccuracy: false
        }
      );
    });
  };

  const followUserLocation = () => {
    watchId.current = Geolocation.watchPosition(
      ({ coords }) => {

        if (!isMounted.current) return;

        const location: Location = {
          latitude: coords.latitude,
          longitude: coords.longitude
        }
        setRouteLines(routes => [...routes, location]);
        setUserLocation(location);
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: false,
        distanceFilter: 10,
      }
    )
  };

  const stopFollowUserLocation = () => {
    if (!watchId.current) {
      return;
    }
    Geolocation.clearWatch(watchId.current);
  }

  return {
    hasLocation,
    initialPosition,
    getCurrentLocation,
    followUserLocation,
    stopFollowUserLocation,
    userLocation,
    routeLines,
  };
};