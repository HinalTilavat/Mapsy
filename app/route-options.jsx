import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useLocationStore } from '../stores/locationStore';

export default function RouteOptionsScreen() {
  const start = useLocationStore((state) => state.start);
  const end = useLocationStore((state) => state.end);
  const setSelectedRoute = useLocationStore((state) => state.setSelectedRoute);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!start || !end) {
      Alert.alert('Missing points', 'Please select both start and end points.');
      router.replace('/');
      return;
    }

    if (__DEV__) {
      console.log("start:", start);
      console.log("end:", end);
    }

    const fetchRoutes = async () => {
      setLoading(true);
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        console.log('Route options:', data);
        setRoutes(data.routes || []);
      } catch (e) {
        Alert.alert(
          'Error',
          e.message === 'Network response was not ok'
            ? 'Route service unavailable. Please try again later.'
            : 'Failed to fetch route options. Please check your internet connection and try again.'
        );
      }
      setLoading(false);
    };

    fetchRoutes();
  }, [start, end]);

  const handleSelectRoute = (route) => {
    setSelectedRoute(route);
    router.push('/map');
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" />
        <Text className="mt-4 text-gray-500">Fetching route options...</Text>
      </View>
    );
  }

  if (!routes.length) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-lg text-gray-500">No routes found.</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white pt-10 px-4">
      <Text className="text-2xl font-bold mb-4">Route Options</Text>
      <FlatList
        data={routes}
        keyExtractor={(_, idx) => idx.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            className="mb-4 p-4 bg-blue-50 rounded-xl border border-blue-200"
            onPress={() => handleSelectRoute(item)}
          >
            <Text className="text-lg font-semibold text-blue-800 mb-2">
              Option {index + 1}
            </Text>
            <Text className="text-gray-700">
              Distance: {(item.distance / 1000).toFixed(2)} km
            </Text>
            <Text className="text-gray-700">
              Duration: {(item.duration / 60).toFixed(1)} min
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}