import React, { useEffect, useRef } from 'react';
import { Text, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';
import { useLocationStore } from '../stores/locationStore';

const MapScreen = () => {
  const selectedRoute = useLocationStore((state) => state.selectedRoute);
  const mapRef = useRef<MapView | null>(null);

  if (!selectedRoute || !selectedRoute.geometry) {
    return (
      <View className="flex-1 justify-center items-center">
        <Text className="text-lg text-gray-500">No route selected.</Text>
      </View>
    );
  }

  const coordinates = (selectedRoute.geometry.coordinates as [number, number][]).map(([lon, lat]) => ({
    latitude: lat,
    longitude: lon,
  }));

  useEffect(() => {
    if (mapRef.current && coordinates.length > 1) {
      mapRef.current.fitToCoordinates(coordinates, {
        edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
        animated: true,
      });
    }
  }, [selectedRoute]);

  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
        showsUserLocation
      >
        <Polyline
          coordinates={coordinates}
          strokeColor="#2563eb"
          strokeWidth={5}
        />
      </MapView>
    </View>
  );
};

export default MapScreen;