import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "@/components/ui/link";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useThemeColor } from "@/hooks/useThemeColor";
import { Eye, EyeOff, Lock, Mail } from "lucide-react-native";
import React, { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInSchema, signInSchema } from "./schema";

const SigninPage = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const muted = useThemeColor({}, "mutedForeground");
  const primary = useThemeColor({}, "primary");

  const [showPassword, setShowPassword] = useState(false);

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

      <View style={{ flex: 0.95, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.titleStyles} variant="title">
          Sign In
        </Text>
        <Text variant="caption" style={styles.subtitleStyles}>
          Welcome back, we&apos;re sure you have had a pleasant experience!!
        </Text>

        <View style={styles.formStyles}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="janedoe@mail.com"
                icon={Mail}
                error={errors.email?.message}
                keyboardType="email-address"
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, value } }) => (
              <Input
                value={value}
                onChangeText={onChange}
                placeholder="******"
                icon={Lock}
                secureTextEntry={!showPassword}
                error={errors.password?.message}
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

          <Button onPress={onSubmit}>Sign In</Button>

          <Text style={styles.footerText}>
            Don&apos;t have an account?{" "}
            <Link href={"/(auth)/sign-up"} replace textStyle={{ fontSize: 14 }}>
              Sign up
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
    borderRadius: 9999,
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

export default SigninPage;
