import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

type FilterSwitchProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

export default function FilterSwitch({
  label,
  value,
  onChange,
}: FilterSwitchProps) {
  return (
    <View style={styles.switchContainer}>
      <Text style={styles.switchLabel}>{label}</Text>

      <Switch value={value} onValueChange={onChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },

  switchLabel: {
    fontSize: 17,
    color: '#000',
  },
});