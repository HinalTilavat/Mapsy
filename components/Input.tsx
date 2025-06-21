import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

type InputProps = {
  label: string;
  value: string;
  onPress?: () => void;
} & TextInputProps;

const Input: React.FC<InputProps> = ({ label, value, onPress, ...props }) => (
  <View className="mb-4">
    <Text className="mb-1 text-base font-semibold text-gray-700">{label}</Text>
    <TextInput
      className="border border-gray-300 rounded-lg px-4 py-3 bg-white text-base"
      value={value}
      editable={!onPress}
      pointerEvents={onPress ? 'none' : 'auto'}
      {...props}
    />
    {onPress && (
      // Overlay a pressable area if navigation is needed
      <View
        className="absolute inset-0"
        pointerEvents="auto"
        onTouchEnd={onPress}
      />
    )}
  </View>
);

export default Input;