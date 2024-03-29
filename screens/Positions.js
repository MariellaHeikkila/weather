import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import Weather from './Weather';

export default function Position() {

  const [latitude, setLatitude] = useState(0)
  const [longitude, setLongitude] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      try {
        if (status === 'granted') {
            const location = await Location.getCurrentPositionAsync({accuracy: 6});
            setLatitude(location.coords.latitude)
            setLongitude(location.coords.longitude)
            setIsLoading(false)
      } else {

      setIsLoading(false)
    }
    } catch (error) {
        alert(error)
        setIsLoading(false)
    }
})();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>        
      </View>
    );
  } else {
  return (
    <View style={styles.container}>
      <Text>Location:</Text>
      <Text>{latitude.toFixed(3)}, {longitude.toFixed(3)}</Text>
      <Weather latitude={latitude} longitude={longitude} />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10
  }
});
