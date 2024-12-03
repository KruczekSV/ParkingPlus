import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function AdminLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#FFFFFF",
        tabBarStyle: { backgroundColor: "#374151", borderTopWidth: 0 },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarItemStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="parking"
        options={{
          title: "Parking",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? "car" : "car-outline"} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="historyPage"
        options={{
          title: "History",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "receipt" : "receipt-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "person" : "person-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
