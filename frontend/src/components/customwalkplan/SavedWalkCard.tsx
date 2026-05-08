import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Link } from 'expo-router';
import WalkActionButton from './WalkActionButton';

type Walk = {
  id: string;
  cuswalkname?: string;
  distance?: string;
};

type SavedWalkCardProps = {
  walk: Walk;
  onDelete: (id: string) => void;
};

export default function SavedWalkCard({ walk, onDelete }: SavedWalkCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.walkTitle}>
          {walk.cuswalkname || 'Unnamed Walk'}
        </Text>

        <Text style={styles.walkDistance}>
          {walk.distance} km
        </Text>
      </View>

      <View style={styles.cardActions}>
        <Link href={{ pathname: './customwalkplanner/CustomWalk', params: { id: walk.id } }} asChild>
          <WalkActionButton
            iconName="pencil"
            label="Edit"
            color="#007AFF"
          />
        </Link>

        <WalkActionButton
          iconName="trash"
          label="Delete"
          color="#FF3B30"
          onPress={() => onDelete(walk.id)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  walkTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },

  walkDistance: {
    fontSize: 16,
    color: '#666',
  },

  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
});