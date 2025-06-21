import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { ActivityIndicator, Alert, FlatList, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLocationStore } from '../stores/locationStore';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useLocalSearchParams();
  const setStart = useLocationStore((state) => state.setStart);
  const setEnd = useLocationStore((state) => state.setEnd);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = useCallback(async (text: string) => {
    setQuery(text);
    if (text.length < 2) {
      setResults([]);
      return;
    }

    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    try {
      const res = await fetch(
        `https://www.onemap.gov.sg/api/common/elastic/search?searchVal=${encodeURIComponent(
          text
        )}&returnGeom=Y&getAddrDetails=Y&pageNum=1`,
        { signal: controller.signal }
      );
      const data = await res.json();
      setResults(data.results || []);
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        setResults([]);
        Alert.alert('Error', 'Failed to fetch search results. Please try again.');
      }
    }
    setLoading(false);
  }, []);

  const handleSelect = (item: any) => {
    const location = {
      name: item.SEARCHVAL,
      address: item.ADDRESS,
      lat: item.LATITUDE,
      lon: item.LONGITUDE,
    };
    if (params.type === 'start') {
      setStart(location);
    } else {
      setEnd(location);
    }
    router.back();
  };

  return (
    <View className="flex-1 bg-white px-4 pt-10">
      <Text className="text-2xl font-bold mb-4">Search Location</Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 mb-4 bg-gray-50"
        placeholder="Type a place or address"
        value={query}
        onChangeText={handleSearch}
        autoFocus
      />
      {loading && <ActivityIndicator className="mb-4" />}
      <FlatList
        data={results}
        keyExtractor={(item, index) =>
          (item.SEARCHVAL ?? '') +
          (item.LAT ?? '') +
          (item.LON ?? '') +
          (item.ADDRESS ?? '') +
          index // ensures uniqueness even if fields are missing
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            className="py-3 border-b border-gray-100"
            onPress={() => handleSelect(item)}
          >
            <Text className="text-base text-gray-800">{item.SEARCHVAL}</Text>
            <Text className="text-xs text-gray-500">{item.ADDRESS}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !loading && query.length > 1 ? (
            <Text className="text-gray-400 text-center mt-8">No results found.</Text>
          ) : null
        }
      />
    </View>
  );
}