import { ExpoConfig, ConfigContext } from "expo/config";
const IS_DEV = process.env.APP_VARIANT === "development";

module.exports = (): ExpoConfig => {
    return {
        owner: "rodsar",
        name: IS_DEV ? "Simple Reminders (S)" : "Simple Reminders",
        slug: "simple-reminders",
        scheme: "simplereminders",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./assets/images/icon.png",
        userInterfaceStyle: "automatic",
        splash: {
            image: "./assets/images/splash.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        assetBundlePatterns: ["**/*"],
        backgroundColor: "#000000",
        ios: {
            bundleIdentifier: IS_DEV
                ? "com.rodsarhan.simplereminders.staging"
                : "com.rodsarhan.simplereminders",
            supportsTablet: true,
        },
        android: {
            package: IS_DEV
                ? "com.rodsarhan.simplereminders.staging"
                : "com.rodsarhan.simplereminders",
            adaptiveIcon: {
                foregroundImage: "./assets/images/adaptive-icon.png",
                backgroundColor: "#ffffff",
            },
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png",
        },
        plugins: ["expo-router"],
        experiments: {
            typedRoutes: true,
        },
        extra: {
            eas: {
                projectId: "03c57294-b20d-4053-a49b-902f96380579",
            },
        },
    };
};
