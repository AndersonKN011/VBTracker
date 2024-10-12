import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Modal, Button, Linking, TouchableOpacity} from 'react-native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync, watchPositionAsync, LocationAccuracy } from 'expo-location';
import MapView, { Marker, Polygon } from 'react-native-maps';

export default function App() {
  const [location, setLocation] = useState(null);
  const [polygonCoordinates, setPolygonCoordinates] = useState([]);
  const [polygonComplete, setPolygonComplete] = useState(false);
  const mapRef = useRef(null);
  const [alertShown, setAlertShown] = useState(false);
  const [resetPolygon, setResetPolygon] = useState(false);
  const [isDrawing, setIsDrawing] = useState(true);
  const [areaDelimited, setAreaDelimited] = useState(false);
  const [isDrawingMode, setIsDrawingMode] = useState(true);

  const phoneNumber = 'tel:+123456789'; // Substitua pelo número que você deseja chamar

  const handleCallPress = () => {
    Linking.openURL(phoneNumber);
  };

  async function requestLocationPermissions() {
    const { granted } = await requestForegroundPermissionsAsync();

    if (granted) {
      const currentPosition = await getCurrentPositionAsync();
      setLocation(currentPosition);
    }
  }

  useEffect(() => {
    requestLocationPermissions();
  }, []);

  useEffect(() => {
    if (location) {
      const { coords } = location;
      if (!polygonComplete) {
        mapRef.current?.animateCamera({
          pitch: 70,
          center: coords,
        });
      }
    }
  }, [location, polygonComplete]);

  useEffect(() => {
    watchPositionAsync({
      accuracy: LocationAccuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 1
    }, (response) => {
      setLocation(response);

      if (polygonComplete && polygonCoordinates.length >= 3) {
        if (!isPointInsidePolygon(response.coords, polygonCoordinates)) {
          // A localização está fora da área delimitada
          if (!alertShown) {
            setAlertShown(true);
          }
        } else {
          // A localização está dentro da área delimitada
          setAlertShown(false); // Ocultar alerta quando entrar na área
        }
      }
    });
  }, [polygonComplete, polygonCoordinates, alertShown]);
  
  const handleResetPolygon = () => {
    setPolygonCoordinates([]);
    setPolygonComplete(false);
  };

  function calculatePolygonArea(coordinates) {
    let area = 0;
    const numPoints = coordinates.length;

    for (let i = 0; i < numPoints; i++) {
      const p1 = coordinates[i];
      const p2 = coordinates[(i + 1) % numPoints];
      area += (p1.latitude * p2.longitude) - (p2.latitude * p1.longitude);
    }

    area = Math.abs(area) / 2;

    return area;
  }

  function isPointInsidePolygon(point, polygon) {
    if (polygon.length < 3) {
      return false;
    }

    let isInside = false;
    const x = point.longitude;
    const y = point.latitude;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].longitude;
      const yi = polygon[i].latitude;
      const xj = polygon[j].longitude;
      const yj = polygon[j].latitude;

      const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (intersect) {
        isInside = !isInside;
      }
    }

    return isInside;
  }

  const handleMapPress = (event) => {
    if (isDrawing || resetPolygon) {
      const newCoordinate = event.nativeEvent.coordinate;
      setPolygonCoordinates([...polygonCoordinates, newCoordinate]);

      if (polygonCoordinates.length >= 2) {
        setPolygonComplete(true);
        setIsDrawing(false);
        setAreaDelimited(true);
      }
      setResetPolygon(false);
    }
  };

  const handleClearPolygon = () => {
    handleResetPolygon();
    setResetPolygon(true);
    setIsDrawing(true);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 0, // Defina uma latitude inicial
          longitude: 0, // Defina uma longitude inicial
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        onPress={handleMapPress}
      >
        {polygonCoordinates.length >= 3 && !resetPolygon && (
          <Polygon
            coordinates={polygonCoordinates}
            fillColor="rgba(0, 128, 255, 0.5)"
            strokeColor="blue"
            strokeWidth={2}
          />
        )}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          />
        )}
        {!isDrawingMode && (
          <Polygon
            coordinates={polygonCoordinates}
            fillColor="rgba(0, 128, 255, 0.5)"
            strokeColor="blue"
            strokeWidth={2}
          />
        )}
      </MapView>

      <TouchableOpacity style={styles.buttonEmergency} onPress={handleCallPress}>
        <Text style={styles.textEmergency}>LIGAR PARA NÚMERO DE EMERGÊNCIA</Text>
      </TouchableOpacity>

      {alertShown && areaDelimited && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={true}
          onRequestClose={() => setAlertShown(false)}
        >
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Você saiu da área delimitada!</Text>
            <Text style={styles.modalText}>Volte imediatamente</Text>
            <Button
              title="Entendi"
              onPress={() => {
                setAlertShown(false);
                setAreaDelimited(false);
              }}
            />
          </View>
        </Modal>
      )}

      {isDrawing && !areaDelimited && (
        <Polygon
          coordinates={polygonCoordinates}
          fillColor="rgba(0, 128, 255, 0.5)"
          strokeColor="blue"
          strokeWidth={2}
        />
      )}

      <Button title="Limpar Polígono" onPress={handleClearPolygon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    marginBottom: '12%'
  },
  modalText: {
    fontSize: 24,
    color: 'white',
  },
  buttonEmergency: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
  },
  textEmergency: {
    color: 'white',
    fontSize: 14,
  }
});