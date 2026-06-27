import { useRef, useState } from "react";
import { View, Text, TextInput, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Lock, Check, ShieldCheck } from "lucide-react-native";

type Role = "investor" | "partner";

export default function Signup() {
  const router = useRouter();
  const params = useLocalSearchParams<{ role?: Role; email?: string }>();
  const role: Role = (params.role as Role) ?? "investor";
  const email = (params.email as string) ?? "";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [otpVerified, setOtpVerified] = useState(false);
  const [pwd, setPwd] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const refs = useRef<(TextInput | null)[]>([]);

  const otpFull = otp.join("").length === 6;

  const updateOtp = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = [...otp]; next[i] = v; setOtp(next);
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const verify = () => {
    if (!otpFull) { setErr("Enter the 6-digit OTP"); return; }
    setErr(""); setOtpVerified(true);
  };

  const submit = () => {
    if (!otpVerified) return verify();
    if (pwd.length < 8) { setErr("Password must be at least 8 characters"); return; }
    if (pwd !== confirm) { setErr("Passwords do not match"); return; }
    setErr(""); setDone(true);
    setTimeout(() => {
      router.replace({ pathname: role === "investor" ? "/onboarding/investor" : "/onboarding/cp" });
    }, 800);
  };

  if (done) {
    return (
      <SafeAreaView className="flex-1 bg-background items-center justify-center px-5">
        <View className="w-14 h-14 rounded-full bg-success/20 items-center justify-center mb-3">
          <Check size={28} color="#10b981" />
        </View>
        <Text className="text-sm font-semibold text-foreground">Account created!</Text>
        <Text className="text-[10px] text-muted-foreground mt-1">Redirecting to onboarding…</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-background">
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
          <ArrowLeft size={16} color="#9CA3AF" />
        </Pressable>

        <View className="items-center mt-2 mb-5">
          <Image source={require("../../assets/ripples-logo.png")} style={{ width: 120, height: 36 }} contentFit="contain" />
          <Text className="text-base font-bold text-foreground mt-3">
            {role === "investor" ? "Create Investor Account" : "Create Partner Account"}
          </Text>
          <Text className="text-[10px] text-muted-foreground mt-0.5 text-center">
            We sent a 6-digit OTP to <Text className="text-foreground font-medium">{email}</Text>
          </Text>
        </View>

        <View style={{ gap: 16 }}>
          <View>
            <Text className="text-[10px] font-semibold text-foreground">Enter OTP</Text>
            <View className="flex-row mt-2" style={{ gap: 8, justifyContent: "space-between" }}>
              {otp.map((d, i) => (
                <TextInput
                  key={i}
                  ref={(r) => (refs.current[i] = r)}
                  value={d}
                  onChangeText={(v) => updateOtp(i, v)}
                  editable={!otpVerified}
                  keyboardType="number-pad"
                  maxLength={1}
                  className={`text-center bg-secondary border rounded-xl text-sm font-bold text-foreground ${otpVerified ? "border-success/60" : "border-border"}`}
                  style={{ width: 36, height: 44, opacity: otpVerified ? 0.7 : 1 }}
                />
              ))}
            </View>
            <View className="flex-row items-center justify-between mt-2">
              {otpVerified ? (
                <View className="flex-row items-center" style={{ gap: 4 }}>
                  <ShieldCheck size={12} color="#10b981" />
                  <Text className="text-[9px] text-success">OTP verified</Text>
                </View>
              ) : (
                <Text className="text-[9px] text-muted-foreground">
                  Didn't receive? <Text className="text-gold font-semibold">Resend in 30s</Text>
                </Text>
              )}
              {!otpVerified && (
                <Pressable onPress={verify} disabled={!otpFull}>
                  <Text className="text-[10px] font-semibold text-gold" style={{ opacity: otpFull ? 1 : 0.4 }}>Verify →</Text>
                </Pressable>
              )}
            </View>
          </View>

          {otpVerified && (
            <>
              <View className="h-px bg-border" />
              <Text className="text-[11px] font-semibold text-foreground">Set your password</Text>
              <PwdField label="New Password" value={pwd} onChangeText={setPwd} placeholder="At least 8 characters" autoFocus />
              <PwdField label="Confirm Password" value={confirm} onChangeText={setConfirm} placeholder="Re-enter password" />
            </>
          )}

          {!!err && <Text className="text-[10px] text-loss">{err}</Text>}

          <Pressable
            onPress={submit}
            disabled={!otpVerified ? !otpFull : !(pwd && confirm)}
            className="bg-gold rounded-xl py-3 items-center"
            style={{ opacity: (!otpVerified ? !otpFull : !(pwd && confirm)) ? 0.4 : 1 }}
          >
            <Text className="text-accent-foreground text-xs font-semibold">
              {otpVerified ? "Create Account & Continue" : "Verify OTP"}
            </Text>
          </Pressable>

          {!otpVerified && (
            <Text className="text-[9px] text-center text-muted-foreground">Demo: enter any 6 digits</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PwdField({ label, value, onChangeText, placeholder, autoFocus }: { label: string; value: string; onChangeText: (v: string) => void; placeholder?: string; autoFocus?: boolean }) {
  return (
    <View>
      <Text className="text-[10px] text-muted-foreground">{label}</Text>
      <View className="mt-1 relative">
        <View style={{ position: "absolute", left: 10, top: 0, bottom: 0, justifyContent: "center", zIndex: 1 }}>
          <Lock size={14} color="#9CA3AF" />
        </View>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          secureTextEntry
          placeholder={placeholder}
          placeholderTextColor="#9CA3AF"
          autoFocus={autoFocus}
          className="bg-secondary border border-border rounded-xl pl-9 pr-3 py-2.5 text-xs text-foreground"
        />
      </View>
    </View>
  );
}
