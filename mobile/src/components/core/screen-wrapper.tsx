import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ScreenWrapperProps {
  children: React.ReactNode;
}

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children }) => {
  return <SafeAreaView style={styles.bodyWrapper}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  bodyWrapper: {
    paddingHorizontal: 10,
    flex: 1,
  },
});

export default ScreenWrapper;
