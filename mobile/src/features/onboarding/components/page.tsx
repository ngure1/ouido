import { Image } from "@/components/ui/image";
import { Onboarding, OnboardingStep } from "@/components/ui/onboarding";
import { useRouter } from "expo-router";
import React from "react";

const OnboardingPage = () => {
  const router = useRouter();

  const WelcomeImage = () => (
    <Image
      source={require("@/assets/images/organize-onboarding.png")}
      width={300}
      aspectRatio={1}
    />
  );

  const FeaturesImage = () => (
    <Image
      source={require("@/assets/images/focus-onboarding.png")}
      width={300}
      aspectRatio={1}
    />
  );

  const StartImage = () => (
    <Image
      source={require("@/assets/images/celebration-onboarding.png")}
      width={300}
      aspectRatio={1}
    />
  );
  const steps: OnboardingStep[] = [
    {
      id: "1",
      title: "Organize your day",
      description: "Stay on top of tasks with a clean, mobile-first workflow.",
      image: <WelcomeImage />,
    },
    {
      id: "2",
      title: "Focus on what matters",
      description: "Use Today to zero in and complete your priorities.",
      image: <FeaturesImage />,
    },
    {
      id: "3",
      title: "Celebrate progress",
      description: "Track completions and keep momentum with helpful insights.",
      image: <StartImage />,
    },
  ];

  return (
    <Onboarding
      steps={steps}
      onComplete={() => router.replace("/(auth)/sign-up")}
      onSkip={() => router.replace("/(auth)/sign-up")}
    />
  );
};

export default OnboardingPage;
