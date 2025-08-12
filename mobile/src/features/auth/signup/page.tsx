import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Colors } from "@/theme/colors";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet } from "react-native";
import { SignUpSchema, signUpSchema } from "./schema";

const SignupPage = () => {
  const muted = useThemeColor({}, "mutedForeground");
  const primary = useThemeColor({}, "primary");

  const [showPassword, setShowPassword] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <View style={{ flex: 1 }}>
      <View style={{ position: "absolute" }}>
        <View
          style={[
            styles.roundedBall,
            {
              backgroundColor: primary,
            },
          ]}
        />
      </View>
      <View
        style={{
          flex: 0.95,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={styles.titleStyles} variant="title">
          Create an account
        </Text>
        <Text variant="caption" style={styles.subtitleStyles}>
          Welcome to ouido, the best task manager there !!
        </Text>
        <View style={styles.formStyles}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                error={errors?.email?.message}
                placeholder="janedoe@mail.com"
                icon={Mail}
                keyboardType="email-address"
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                onChangeText={onChange}
                value={value}
                placeholder="******"
                icon={Lock}
                error={errors?.password?.message}
                secureTextEntry={!showPassword}
                rightComponent={
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    {showPassword ? (
                      <EyeOff size={20} color={muted} />
                    ) : (
                      <Eye size={20} color={muted} />
                    )}
                  </Pressable>
                }
              />
            )}
          />
          <Button onPress={onSubmit}>Create Account</Button>

          <Text style={styles.footerText}>
            Already have an account?{" "}
            <Link href={"/(auth)/sign-in"} replace textStyle={{ fontSize: 14 }}>
              Sign in
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  roundedBall: {
    width: 250,
    aspectRatio: 1,
    backgroundColor: Colors.dark.primary,
    borderRadius: "100%",
    position: "relative",
    left: -120,
    top: 0,
  },
  titleStyles: {
    textAlign: "center",
  },
  subtitleStyles: {
    fontSize: 14,
    textAlign: "center",
    maxWidth: "80%",
    alignSelf: "center",
  },
  formStyles: {
    marginTop: 20,
    marginBottom: 10,
    gap: 16,
    maxWidth: "90%",
    alignSelf: "center",
  },
  footerText: {
    fontSize: 14,
  },
});

export default SignupPage;
