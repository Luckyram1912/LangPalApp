import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const { width, height } = Dimensions.get("window");

// ---------- Start Conversation Screen ----------
function ConversationScreen() {
  const conversations = [
    {
      id: "1",
      name: "Maria",
      message: "Hola! How’s your Spanish going?",
      time: "2m ago",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      id: "2",
      name: "Kenji",
      message: "Let's practice French tonight!",
      time: "10m ago",
      avatar: "https://randomuser.me/api/portraits/men/35.jpg",
    },
    {
      id: "3",
      name: "Amira",
      message: "Guten Tag! Ready for our next session?",
      time: "1h ago",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    },
  ];

  return (
    <LinearGradient colors={["#FFF3E6", "#ffffff"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, padding: 20 }}>
        <Text style={styles.chatHeader}>Recent Conversations 💬</Text>
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.chatCard}>
              <Image source={{ uri: item.avatar }} style={styles.chatAvatar} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatMessage}>{item.message}</Text>
              </View>
              <Text style={styles.chatTime}>{item.time}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

// ---------- Home Screen ----------
// ---------- Home Screen ----------
function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const [darkMode, setDarkMode] = useState(false);
  const theme = darkMode ? darkTheme : lightTheme;

  const [scale1] = useState(new Animated.Value(1));
  const [scale2] = useState(new Animated.Value(1));
  const animateIn = (s: Animated.Value) =>
    Animated.spring(s, { toValue: 0.95, friction: 5, useNativeDriver: true }).start();
  const animateOut = (s: Animated.Value) =>
    Animated.spring(s, { toValue: 1, friction: 5, useNativeDriver: true }).start();

  // ✨ Floating background bubbles
  const bubble1 = useRef(new Animated.Value(0)).current;
  const bubble2 = useRef(new Animated.Value(0)).current;
  const bubble3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const floatAnim = (val: Animated.Value, delay = 0) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(val, {
            toValue: 1,
            duration: 4000,
            delay,
            useNativeDriver: true,
          }),
          Animated.timing(val, {
            toValue: 0,
            duration: 4000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };
    floatAnim(bubble1, 0);
    floatAnim(bubble2, 800);
    floatAnim(bubble3, 1600);
  }, []);

  const translateY1 = bubble1.interpolate({ inputRange: [0, 1], outputRange: [10, -10] });
  const translateY2 = bubble2.interpolate({ inputRange: [0, 1], outputRange: [-8, 8] });
  const translateY3 = bubble3.interpolate({ inputRange: [0, 1], outputRange: [12, -12] });
  const opacityAnim = (val: Animated.Value) =>
    val.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <LinearGradient
        colors={darkMode ? ["#0E1F1A", "#101010"] : ["#C7FFE8", "#FDF4FF"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBackground}
      >
        {/* ✨ Background bubbles (behind all content) */}
        <Animated.View
          style={[
            styles.bubble,
            {
              top: 80,
              left: 30,
              backgroundColor: "#9CF7D3",
              opacity: opacityAnim(bubble1),
              transform: [{ translateY: translateY1 }, { scale: 1.1 }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.bubble,
            {
              bottom: 100,
              right: 40,
              backgroundColor: "#BFD8FF",
              opacity: opacityAnim(bubble2),
              transform: [{ translateY: translateY2 }, { scale: 0.9 }],
            },
          ]}
        />
        <Animated.View
          style={[
            styles.bubble,
            {
              top: 250,
              right: 120,
              backgroundColor: "#FFE1C7",
              opacity: opacityAnim(bubble3),
              transform: [{ translateY: translateY3 }, { scale: 1.0 }],
            },
          ]}
        />

        {/* ✨ Foreground content (unchanged) */}
        <View style={styles.homeCenterContainer}>
          <Image
            source={require("../../assets/images/langpal_logo.png")}
            style={styles.homeLogo}
          />

          <Text style={[styles.homeTitle, { color: theme.primary }]}>
            Connect the World with Language 🌍
          </Text>
          <Text style={[styles.homeSub, { color: theme.text }]}>
            Real conversations. Real progress. Find partners and start chatting.
          </Text>

          <View style={styles.buttonGroup}>
            <Animated.View style={{ transform: [{ scale: scale1 }], width: "100%" }}>
              <TouchableOpacity
                style={[styles.ctaButton, { backgroundColor: theme.primary }]}
                onPress={() => navigation.navigate("Partners")}
                onPressIn={() => animateIn(scale1)}
                onPressOut={() => animateOut(scale1)}
              >
                <Ionicons name="people" size={18} color="#fff" />
                <Text style={styles.ctaText}>Find a Partner</Text>
              </TouchableOpacity>
            </Animated.View>

            <Animated.View
              style={{ transform: [{ scale: scale2 }], width: "100%", marginTop: 14 }}
            >
              <TouchableOpacity
                style={[styles.ctaButton, { backgroundColor: theme.secondary }]}
                onPress={() => navigation.navigate("Start Conversation")}
                onPressIn={() => animateIn(scale2)}
                onPressOut={() => animateOut(scale2)}
              >
                <Ionicons name="chatbubble-ellipses" size={18} color="#fff" />
                <Text style={styles.ctaText}>Start Conversation</Text>
              </TouchableOpacity>
            </Animated.View>
          </View>

          <TouchableOpacity
            onPress={() => setDarkMode(!darkMode)}
            style={[styles.modeToggle, { borderColor: theme.primary }]}
          >
            <Ionicons name={darkMode ? "sunny" : "moon"} size={16} color={theme.primary} />
            <Text style={{ color: theme.primary, marginLeft: 6 }}>
              Switch to {darkMode ? "Light" : "Dark"} Mode
            </Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}


// ---------- Partner Screen ----------
function PartnerScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const partners = [
    { name: "Maria", native: "Spanish", learning: "English" },
    { name: "Kenji", native: "Japanese", learning: "French" },
    { name: "Amira", native: "Arabic", learning: "German" },
    { name: "Luca", native: "Italian", learning: "Korean" },
    { name: "Sophia", native: "German", learning: "Spanish" },
  ];

  return (
    <LinearGradient colors={["#E8F3FF", "#ffffff"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ alignItems: "center", paddingHorizontal: 20, paddingVertical: 10 }}>
          <Text style={styles.partnersTitleBlue}>Find Your Language Partner 🌎</Text>
          <FlatList
            data={partners}
            keyExtractor={(item) => item.name}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item }) => (
              <View style={styles.partnerCardBlue}>
                <Ionicons name="person-circle-outline" size={45} color="#007AFF" />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.partnerNameBlue}>{item.name}</Text>
                  <Text style={styles.partnerTextBlue}>Native: {item.native}</Text>
                  <Text style={styles.partnerTextBlue}>Learning: {item.learning}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Start Conversation")}
                  style={styles.chatNowButton}
                >
                  <LinearGradient
                    colors={["#00C6FF", "#0072FF"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.chatNowGradient}
                  >
                    <Ionicons name="chatbubbles" size={16} color="#fff" />
                    <Text style={styles.chatNowText}>Chat Now</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ---------- Profile Screen ----------
function ProfileScreen() {
  return (
    <LinearGradient colors={["#FFFCE6", "#ffffff"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View style={styles.profileCard}>
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/41.jpg" }}
            style={styles.profileAvatar}
          />
          <Text style={styles.profileName}>Lakshman</Text>
          <Text style={styles.profileDetail}>Native: English</Text>
          <Text style={styles.profileDetail}>Learning: Spanish</Text>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

// ---------- Tabs + Stack ----------
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Partners") iconName = "people";
          else if (route.name === "Profile") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#00B386",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Partners" component={PartnerScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function MainApp() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Start Conversation" component={ConversationScreen} />
    </Stack.Navigator>
  );
}

// ---------- Themes ----------
const lightTheme = {
  background: "#fff",
  text: "#333",
  primary: "#00B386",
  secondary: "#008060",
};

const darkTheme = {
  background: "#1E1E1E",
  text: "#ddd",
  primary: "#00FFAA",
  secondary: "#007755",
};

// ---------- Styles ----------
const styles = StyleSheet.create({
  gradientBackground: { flex: 1 },
  homeCenterContainer: {
    flex: 1,
    justifyContent: "center", // perfect vertical centering
    alignItems: "center",
    paddingHorizontal: 25,
    paddingBottom: 70,
  },
  homeLogo: {
    width: width * 0.45,
    height: height * 0.25,
    resizeMode: "contain",
    marginBottom: 15,
  },
  bubble: {
    position: "absolute",
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.6,
  },
  homeTitle: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 5,
    lineHeight: 26,
  },
  homeSub: {
    fontSize: 15,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 25,
    lineHeight: 20,
    maxWidth: "90%",
  },
  buttonGroup: {
    width: "85%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  ctaButton: {
    width: "100%",
    paddingVertical: 13,
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  ctaText: { color: "#fff", fontSize: 16, fontWeight: "700", marginLeft: 8 },
  modeToggle: {
    marginTop: 25,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
  },

  chatHeader: { fontSize: 22, fontWeight: "bold", color: "#FF6B3C", marginBottom: 10 },
  chatCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 18,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  chatAvatar: { width: 50, height: 50, borderRadius: 25 },
  chatName: { fontSize: 16, fontWeight: "bold", color: "#333" },
  chatMessage: { fontSize: 14, color: "gray" },
  chatTime: { fontSize: 12, color: "#999" },

  partnersTitleBlue: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#007AFF",
    marginVertical: 10,
    textAlign: "center",
  },
  partnerCardBlue: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginVertical: 8,
    width: width * 0.9,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  partnerNameBlue: { fontSize: 18, fontWeight: "bold", color: "#007AFF" },
  partnerTextBlue: { fontSize: 14, color: "#444" },
  chatNowButton: { marginLeft: 10 },
  chatNowGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 15,
  },
  chatNowText: { color: "#fff", fontSize: 13, fontWeight: "600", marginLeft: 5 },

  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 25,
    padding: 30,
    width: width * 0.85,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  profileAvatar: { width: 100, height: 100, borderRadius: 50, marginBottom: 15 },
  profileName: { fontSize: 22, fontWeight: "bold", color: "#00B386" },
  profileDetail: { fontSize: 16, color: "#555", marginTop: 5 },
});
