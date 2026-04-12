import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useWalks } from '../context/SavedCustomWalks';

export default function Index() {
  const { walks, deleteWalk } = useWalks();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.headerTitle}>My Custom Walks</Text>

        <Link href="/CustomWalk" asChild>
          <TouchableOpacity style={styles.addButton}>
            <Ionicons name="add" size={24} color="#FFF" />
            <Text style={styles.addButtonText}>Add Custom Walk</Text>
          </TouchableOpacity>
        </Link>

        {/* Dynamic rendering of the stored Array */}
        {walks.map((walk: any) => (
          <View key={walk.id} style={styles.card}>
            
            <View style={styles.cardHeader}>
              <Text style={styles.walkTitle}>{walk.cuswalkname || "Unnamed Walk"}</Text>
              <Text style={styles.walkDistance}>{walk.distance} km</Text>
            </View>

            <View style={styles.cardActions}>
              {/* Pass the explicit object ID via the router parameters to initiate Edit Mode */}
              <Link href={{ pathname: "/CustomWalk", params: { id: walk.id } }} asChild>
                <TouchableOpacity style={styles.actionButton}>
                  <Ionicons name="pencil" size={20} color="#007AFF" />
                  <Text style={[styles.actionText, { color: '#007AFF' }]}>Edit</Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity style={styles.actionButton} onPress={() => deleteWalk(walk.id)}>
                <Ionicons name="trash" size={20} color="#FF3B30" />
                <Text style={[styles.actionText, { color: '#FF3B30' }]}>Delete</Text>
              </TouchableOpacity>
            </View>
            
          </View>
        ))}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F2F2F7' },
  container: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', marginBottom: 24, color: '#000' },
  addButton: { flexDirection: 'row', backgroundColor: '#007AFF', padding: 16, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 24 },
  addButtonText: { color: '#FFF', fontSize: 18, fontWeight: '600', marginLeft: 8 },
  card: { backgroundColor: '#FFF', padding: 16, borderRadius: 12, marginBottom: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 3, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  walkTitle: { fontSize: 18, fontWeight: '600', color: '#000' },
  walkDistance: { fontSize: 16, color: '#666' },
  cardActions: { flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: '#F0F0F0', paddingTop: 12 },
  actionButton: { flexDirection: 'row', alignItems: 'center', marginLeft: 16 },
  actionText: { marginLeft: 4, fontSize: 15, fontWeight: '500' }
});