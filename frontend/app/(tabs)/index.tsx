import React from "react";
import { View, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { Bell, Book, MapPin } from "lucide-react-native";
import AnAppComponent from "@/components/HomePage/AnAppComponent";
import HomeHeader from "@/components/HomePage/HomeHeader";

export default function HomePage() {
    const router = useRouter();
    const APP_DATA = [
        {
            id: "1",
            appName: "Smart Walk Planner",
            appDescription: "Plan your walks tailored to your needs",
            routePath: "/walkplanner",
            buttonLabel: "Plan >",
            icon: <MapPin size={60} strokeWidth={1.5} color="black" />,
        },
        {
            id: "2",
            appName: "Notification Service",
            appDescription: "Get notified about important stuff.",
            routePath: "/notifications",
            buttonLabel: "View >",
            icon: <Bell size={60} strokeWidth={1.5} color="black" />,
        },
        {
            id: "3",
            appName: "Permit Manager",
            appDescription: "Your personal permits manager.",
            routePath: "/permits",
            buttonLabel: "View >",
            icon: <Book size={60} strokeWidth={1.5} color="black" />,
        },
    ];

    const handleClick = (appName: string, routePath: any) => {
        console.log(`${appName} Clicked`);
        router.push(routePath);
    };

    return (
        <FlatList
            data={APP_DATA}
            keyExtractor={(item) => item.id}
            numColumns={2}
            
            className="flex-1 bg-white safe-area-pt tab-bar-pb"

            columnWrapperStyle={{
                justifyContent: "space-between",
                marginBottom: 16,
            }}

            ListHeaderComponent={<HomeHeader />}
            ListHeaderComponentStyle={{ marginBottom: 20 }}

            renderItem={({ item }) => (
                <View className="w-[48%]">
                    <AnAppComponent
                        appIcon={item.icon}
                        appName={item.appName}
                        appDescription={item.appDescription}
                        buttonLabel={item.buttonLabel}
                        buttonOnClick={() => handleClick(item.appName, item.routePath)}
                    />
                </View>
            )}
            showsVerticalScrollIndicator={false}
        />
    );
}