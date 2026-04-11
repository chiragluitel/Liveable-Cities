import React, { useState } from "react";
import { Stack } from "expo-router";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

export default function WalkSelected() {
  const [expanded, setExpanded] = useState(false);

  const handleNearbyPress = (place: string) => {
    console.log(`${place} pressed`);
  };

  const toggleSheet = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.phoneFrame}>
          <View style={styles.topSection}>
            <Pressable style={styles.backRow}>
              <Ionicons name="chevron-back" size={24} color="#111" />
              <Text style={styles.backText}>Home</Text>
            </Pressable>

            {!expanded && <Text style={styles.screenTitle}>Walk Selected</Text>}
          </View>

          <View style={[styles.mapPlaceholder, expanded && styles.mapExpanded]}>
            <Text style={styles.mapText}>Map Placeholder</Text>

            <View style={styles.mapFloatingButtons}>
              <Pressable style={styles.mapIconButton}>
                <MaterialIcons name="map" size={22} color="#6b6b6b" />
              </Pressable>
              <Pressable style={styles.mapIconButton}>
                <Ionicons name="paper-plane-outline" size={20} color="#6b6b6b" />
              </Pressable>
            </View>

            <View style={styles.userLocationBubble}>
              <Text style={styles.userLocationText}>User location</Text>
              <Ionicons name="close" size={14} color="#777" />
            </View>

            <View style={styles.routeOutline} />
            <View style={[styles.mapPin, styles.redPin]} />
            <View style={[styles.mapPin, styles.bluePin]} />
            <View style={[styles.mapPin, styles.greenPin]} />
          </View>

          <View
            style={[
              styles.sheet,
              expanded ? styles.sheetExpanded : styles.sheetCollapsed,
            ]}
          >
            <Pressable onPress={toggleSheet} style={styles.handleButton}>
              <View style={styles.sheetHandle} />
            </Pressable>

            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.sheetScrollContent}
            >
              <View style={styles.titleRow}>
                <Text style={styles.walkName}>[Selected Place Name]</Text>

                <View style={styles.topRightIcons}>
                  <Pressable style={styles.circleIconButton}>
                    <Feather name="share" size={20} color="#8a8a8a" />
                  </Pressable>
                  <Pressable style={styles.circleIconButton}>
                    <Ionicons name="close" size={22} color="#8a8a8a" />
                  </Pressable>
                </View>
              </View>

              <Text style={styles.walkMeta}>
                4.8 ⭐ <Text style={styles.blueText}>· 3.8 km, 40 mins</Text> .Easy
              </Text>

              <View style={styles.actionRow}>
                <Pressable style={styles.primaryAction}>
                  <Ionicons
                    name="navigate-circle-outline"
                    size={20}
                    color="#fff"
                  />
                  <Text style={styles.primaryActionText}>Start Walk</Text>
                </Pressable>

                <Pressable style={styles.secondaryAction}>
                  <Ionicons name="download-outline" size={20} color="#111" />
                  <Text style={styles.secondaryActionText}>Download</Text>
                </Pressable>

                <Pressable style={styles.secondaryAction}>
                  <Ionicons name="ellipsis-horizontal" size={20} color="#111" />
                  <Text style={styles.secondaryActionText}>More</Text>
                </Pressable>
              </View>

              <View style={styles.galleryRow}>
                <View style={styles.galleryImage}>
                  <Text style={styles.galleryText}>Image 1</Text>
                </View>
                <View style={styles.galleryImage}>
                  <Text style={styles.galleryText}>Image 2</Text>
                </View>
                <View style={styles.galleryImageNarrow}>
                  <Text style={styles.galleryText}>Image 3</Text>
                </View>
              </View>

              {expanded && (
                <>
                  <Text style={styles.sectionHeading}>About</Text>
                  <Text style={styles.aboutText}>
                    A calm scenic walk with paved paths, shaded areas, and nearby
                    community facilities
                  </Text>

                  <View style={styles.tagRow}>
                    <View style={styles.darkTag}>
                      <Text style={styles.darkTagText}>Well-Lit 💡</Text>
                    </View>
                    <View style={styles.lightTag}>
                      <Text style={styles.lightTagText}>Quieter Route 🌙</Text>
                    </View>
                    <View style={styles.darkTag}>
                      <Text style={styles.darkTagText}>Accessible</Text>
                    </View>
                  </View>

                  <Text style={styles.nearbyHeading}>Nearby</Text>

                  <Pressable
                    style={styles.nearbyButton}
                    onPress={() => handleNearbyPress("Public Toilets")}
                  >
                    <View style={[styles.nearbyIconCircle, styles.purpleCircle]}>
                      <MaterialIcons name="wc" size={28} color="#111" />
                    </View>
                    <Text style={styles.nearbyLabel}>Public Toilets</Text>
                  </Pressable>

                  <Pressable
                    style={styles.nearbyButton}
                    onPress={() => handleNearbyPress("Parks")}
                  >
                    <View style={[styles.nearbyIconCircle, styles.greenCircle]}>
                      <Ionicons name="leaf-outline" size={26} color="#111" />
                    </View>
                    <Text style={styles.nearbyLabel}>Parks</Text>
                  </Pressable>

                  <Pressable
                    style={styles.nearbyButton}
                    onPress={() => handleNearbyPress("Rest Areas")}
                  >
                    <View style={[styles.nearbyIconCircle, styles.grayCircle]}>
                      <MaterialIcons name="event-seat" size={24} color="#111" />
                    </View>
                    <Text style={styles.nearbyLabel}>Rest Areas</Text>
                  </Pressable>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#dcdcdc",
  },
  phoneFrame: {
    flex: 1,
    width: "100%",
    maxWidth: 430,
    alignSelf: "center",
    backgroundColor: "#ffffff",
    overflow: "hidden",
  },
  topSection: {
    backgroundColor: "#ffffff",
    paddingTop: 18,
    paddingHorizontal: 20,
    paddingBottom: 8,
  },
  backRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  backText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111",
    marginLeft: 4,
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111",
  },
  mapPlaceholder: {
    height: 430,
    backgroundColor: "#d8e2d7",
    position: "relative",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  mapExpanded: {
    marginTop: -8,
  },
  mapText: {
    color: "#5b5b5b",
    fontSize: 16,
    fontWeight: "500",
  },
  mapFloatingButtons: {
    position: "absolute",
    right: 16,
    top: 110,
    gap: 10,
  },
  mapIconButton: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: "#edf0ea",
    justifyContent: "center",
    alignItems: "center",
  },
  userLocationBubble: {
    position: "absolute",
    top: 150,
    left: 112,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
    boxShadow: "0px 3px 10px rgba(0,0,0,0.10)",
  },
  userLocationText: {
    fontSize: 14,
    color: "#444",
    fontWeight: "500",
  },
  routeOutline: {
    position: "absolute",
    width: 150,
    height: 190,
    borderWidth: 4,
    borderColor: "#111",
    borderRadius: 18,
    top: 112,
    left: 122,
    transform: [{ rotate: "8deg" }],
  },
  mapPin: {
    position: "absolute",
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 6,
  },
  redPin: {
    backgroundColor: "#ff2d2d",
    borderColor: "#8d0000",
    left: 56,
    top: 224,
  },
  bluePin: {
    backgroundColor: "#4c8df6",
    borderColor: "#1958b8",
    left: 170,
    top: 214,
  },
  greenPin: {
    backgroundColor: "#12c05c",
    borderColor: "#0a7f3b",
    right: 76,
    bottom: 86,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#eef0ec",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 16,
    paddingTop: 10,
    boxShadow: "0px -2px 14px rgba(0,0,0,0.08)",
  },
  sheetCollapsed: {
    height: 340,
  },
  sheetExpanded: {
    top: 70,
    bottom: 0,
  },
  handleButton: {
    alignItems: "center",
    paddingBottom: 10,
  },
  sheetHandle: {
    width: 56,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#c9c9c9",
  },
  sheetScrollContent: {
    paddingBottom: 36,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 10,
  },
  walkName: {
    flex: 1,
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "800",
    color: "#111",
  },
  topRightIcons: {
    flexDirection: "row",
    gap: 10,
    marginTop: 2,
  },
  circleIconButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#dfe3de",
    justifyContent: "center",
    alignItems: "center",
  },
  walkMeta: {
    fontSize: 15,
    color: "#111",
    marginTop: 6,
    marginBottom: 18,
  },
  blueText: {
    color: "#2677e8",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 16,
  },
  primaryAction: {
    flex: 1,
    backgroundColor: "#000",
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  primaryActionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  secondaryAction: {
    flex: 1,
    backgroundColor: "#dcdedd",
    borderRadius: 14,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  secondaryActionText: {
    color: "#111",
    fontWeight: "700",
    fontSize: 14,
  },
  galleryRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  galleryImage: {
    flex: 1,
    height: 145,
    borderRadius: 14,
    backgroundColor: "#cfcfcf",
    justifyContent: "center",
    alignItems: "center",
  },
  galleryImageNarrow: {
    width: 60,
    height: 145,
    borderRadius: 14,
    backgroundColor: "#cfcfcf",
    justifyContent: "center",
    alignItems: "center",
  },
  galleryText: {
    color: "#666",
    fontSize: 14,
  },
  sectionHeading: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },
  aboutText: {
    fontSize: 15,
    lineHeight: 22,
    color: "#222",
    marginBottom: 18,
  },
  tagRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
    flexWrap: "wrap",
  },
  darkTag: {
    backgroundColor: "#000",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  darkTagText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
  lightTag: {
    backgroundColor: "#d7d7db",
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  lightTagText: {
    color: "#111",
    fontSize: 13,
    fontWeight: "500",
  },
  nearbyHeading: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111",
    marginBottom: 14,
  },
  nearbyButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 22,
  },
  nearbyIconCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  purpleCircle: {
    backgroundColor: "#9b94f1",
  },
  greenCircle: {
    backgroundColor: "#19c58a",
  },
  grayCircle: {
    backgroundColor: "#b8c0b7",
  },
  nearbyLabel: {
    fontSize: 18,
    color: "#111",
    fontWeight: "400",
  },
});