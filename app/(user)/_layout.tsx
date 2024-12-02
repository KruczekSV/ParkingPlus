import { Tabs } from "expo-router";
import React, { useEffect, useState } from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useStorage } from "@/hooks/api/useStorage";
import { IUser } from "@/types/IUser";

export default function UserLayout() {
  const storage = useStorage();
  const [user, setUser] = useState<IUser>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await storage.getJSON<IUser>("user");
      if (user) {
        setUser(user);
      }
    };

    fetchUser();
  }, []);

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
        name="userPanel"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "home" : "home-outline"}
              color={color}
            />
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
        key={user?.id}
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
