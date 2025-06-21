import { useRouter } from 'expo-router';
import React from 'react';
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native';
import Input from '../components/Input';
import { useLocationStore } from '../stores/locationStore';

export default function RouteInputScreen() {
  const router = useRouter();
  const start = useLocationStore((state) => state.start);
  const end = useLocationStore((state) => state.end);

  const handleStartPress = () => {
    router.push('/search?type=start');
  };
  const handleEndPress = () => {
    router.push('/search?type=end');
  };
  const handleConfirm = () => {
    router.push('/route-options');
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-gray-100"
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View className="flex-1 justify-center items-center px-6">
        <View className="w-full bg-white rounded-2xl shadow-lg p-6">
          <Text className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Plan Your Route
          </Text>
          <Input
            label="Start Point"
            value={start?.name || ''}
            placeholder="Choose starting location"
            onPress={handleStartPress}
            editable={false}
          />
          <Input
            label="End Point"
            value={end?.name || ''}
            placeholder="Choose destination"
            onPress={handleEndPress}
            editable={false}
          />
          <TouchableOpacity
            className={`mt-6 py-3 rounded-xl ${
              start && end
                ? 'bg-blue-600'
                : 'bg-blue-300'
            }`}
            disabled={!start || !end}
            onPress={handleConfirm}
          >
            <Text className="text-white text-lg font-semibold text-center">
              Confirm Route
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}