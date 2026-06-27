import { useState } from "react";
import { View, Text, Pressable, TextInput, ActivityIndicator, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Eye, EyeOff, Mail, ArrowRight } from "lucide-react-native";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { useThemeColors } from "@/theme/ThemeContext";

const DEMO = {
  investor: { email: "investor@ripples.demo", password: "demo1234" },
  partner: { email: "partner@ripples.demo", password: "partner1234" },
} as const;

type Role = keyof typeof DEMO;

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams<{ role?: Role }>();
  const role: Role = (params.role as Role) ?? "investor";
  const demo = DEMO[role];

  const [stage, setStage] = useState<"email" | "password">("email");
  const [email, setEmail] = useState(demo.email);
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [checking, setChecking] = useState(false);

  const isExistingEmail = (e: string) => /@ripples\.demo$/i.test(e.trim());
  const t = useThemeColors();

  const goHome = () => {
    if (role === "investor") router.replace("/(investor)/home");
    else router.replace("/(cp)/dashboard");
  };

  const checkEmail = () => {
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) { setErr("Enter a valid email"); return; }
    setErr(""); setChecking(true);
    setTimeout(() => {
      setChecking(false);
      if (isExistingEmail(email)) setStage("password");
      else router.push({ pathname: "/auth/signup", params: { role, email } });
    }, 700);
  };

  const submitPassword = () => {
    if (email.trim() === demo.email && password === demo.password) { setErr(""); goHome(); }
    else setErr("Invalid password. Demo password: " + demo.password);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: t.background }}>
      <View pointerEvents="none" style={{ position: "absolute", top: 0, left: 0, right: 0, height: 300 }}>
        <LinearGradient
          colors={["rgba(184,153,104,0.18)", "rgba(184,153,104,0.04)", "transparent"]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={{ flex: 1 }}
        />
      </View>
      <ScrollView contentContainerStyle={{ padding: 20, paddingTop: 8 }} keyboardShouldPersistTaps="handled">
        <Pressable onPress={() => router.back()} className="self-start p-1 -ml-1" accessibilityRole="button" accessibilityLabel="Go back">
          <ArrowLeft size={16} color={t.mutedForeground} />
        </Pressable>

        <View className="items-center mt-2 mb-5">
          <Image source={require("../../assets/ripples-logo.png")} style={{ width: 120, height: 36 }} contentFit="contain" />
          <Text className="text-base font-bold text-foreground mt-3">
            {role === "investor" ? "Investor Sign In" : "Partner Sign In"}
          </Text>
          <Text className="text-[10px] text-muted-foreground mt-0.5">
            {stage === "email" ? "Enter your email to continue" : `Welcome back · ${email}`}
          </Text>
        </View>

        {stage === "email" ? (
          <View style={{ gap: 12 }}>
            <View>
              <Text className="text-[10px] text-muted-foreground">Email</Text>
              <View className="mt-1 relative">
                <View style={{ position: "absolute", left: 10, top: 0, bottom: 0, justifyContent: "center", zIndex: 1 }}>
                  <Mail size={14} color="#9CA3AF" />
                </View>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  className="bg-secondary border border-border rounded-xl pl-9 pr-3 py-2.5 text-xs text-foreground"
                />
              </View>
            </View>
            {!!err && <Text className="text-[10px] text-loss">{err}</Text>}
            <Pressable onPress={checkEmail} disabled={checking} className="bg-gold rounded-xl py-3 items-center flex-row justify-center" style={{ opacity: checking ? 0.6 : 1, gap: 6 }}>
              {checking ? <ActivityIndicator color="#1F2330" size="small" /> : (
                <>
                  <Text className="text-accent-foreground text-xs font-semibold">Continue</Text>
                  <ArrowRight size={14} color="#1F2330" />
                </>
              )}
            </Pressable>
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            <View>
              <Text className="text-[10px] text-muted-foreground">Password</Text>
              <View className="mt-1 relative">
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry={!show}
                  autoFocus
                  placeholder="Enter password"
                  placeholderTextColor="#9CA3AF"
                  className="bg-secondary border border-border rounded-xl px-3 py-2.5 pr-9 text-xs text-foreground"
                />
                <Pressable onPress={() => setShow((s) => !s)} style={{ position: "absolute", right: 10, top: 0, bottom: 0, justifyContent: "center" }}>
                  {show ? <EyeOff size={14} color="#9CA3AF" /> : <Eye size={14} color="#9CA3AF" />}
                </Pressable>
              </View>
              <Pressable onPress={() => { setStage("email"); setPassword(""); setErr(""); }}>
                <Text className="text-[10px] text-gold mt-1.5">← Use a different email</Text>
              </Pressable>
            </View>
            {!!err && <Text className="text-[10px] text-loss">{err}</Text>}
            <Pressable onPress={submitPassword} className="bg-gold rounded-xl py-3 items-center">
              <Text className="text-accent-foreground text-xs font-semibold">Log In</Text>
            </Pressable>
            <Pressable><Text className="text-[10px] text-muted-foreground text-center">Forgot password?</Text></Pressable>
          </View>
        )}

        <View className="flex-row items-center my-4" style={{ gap: 8 }}>
          <View style={{ flex: 1, height: 1 }} className="bg-border" />
          <Text className="text-[9px] text-muted-foreground">OR</Text>
          <View style={{ flex: 1, height: 1 }} className="bg-border" />
        </View>

        <Pressable onPress={goHome} className="flex-row items-center justify-center bg-secondary border border-border rounded-xl py-3" style={{ gap: 8 }}>
          <GoogleIcon size={16} />
          <Text className="text-xs font-medium text-foreground">Continue with Google</Text>
        </Pressable>

        <View className="mt-5 bg-secondary/60 border border-dashed border-border rounded-xl p-3">
          <Text className="text-[10px] font-semibold text-gold mb-1">Demo</Text>
          <Text className="text-[10px] text-muted-foreground">
            Existing: <Text className="text-foreground">{demo.email}</Text> / <Text className="text-foreground">{demo.password}</Text>
          </Text>
          <Text className="text-[10px] text-muted-foreground mt-0.5">New user: any other email triggers OTP signup</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
