import { useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Lock, Check, ShieldCheck } from "lucide-react-native";
import { useAuthFlow } from "@/hooks/useAuthFlow";
import { useThemeColors } from "@/theme/ThemeContext";

export default function Signup() {
  const router = useRouter();
  const params = useLocalSearchParams<{ email?: string }>();
  const email = (params.email as string) ?? "";
  const t = useThemeColors();
  const auth = useAuthFlow();
  const refs = useRef<(TextInput | null)[]>([]);

  // Set email from params when component loads
  useEffect(() => {
    if (email && !auth.email) {
      // We're in the OTP step for new registration
      auth.setEmail(email);
    }
  }, []);

  const otpDigits = auth.otp.padEnd(6, "").split("");
  const otpFull = auth.otp.length === 6;

  const updateOtp = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const next = otpDigits.slice();
    next[i] = v;
    auth.setOtp(next.join("").slice(0, 6));
    if (v && i < 5) refs.current[i + 1]?.focus();
  };

  const handleVerifyOtp = async () => {
    await auth.verifyOtp();
  };

  const handleResendOtp = async () => {
    await auth.resendOtp();
  };

  const handleRegister = async () => {
    const result = await auth.registerUser();
    if (result) {
      // Successfully registered
      const route = auth.accountType === "investor" 
        ? "/onboarding/investor" 
        : "/onboarding/cp";
      router.replace(route);
    }
  };

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
        <Pressable onPress={() => router.back()} className="self-start p-1 -ml-1" accessibilityRole="button" accessibilityLabel="Go back" disabled={auth.loading}>
          <ArrowLeft size={16} color={t.mutedForeground} />
        </Pressable>

        <View className="items-center mt-2 mb-5">
          <Image source={require("../../assets/ripples-logo.png")} style={{ width: 120, height: 36 }} contentFit="contain" />
          <Text className="text-base font-bold text-foreground mt-3">
            {auth.step === "otp" ? "Verify Your Email" : "Create Your Account"}
          </Text>
          <Text className="text-[10px] text-muted-foreground mt-0.5 text-center">
            {auth.step === "otp" ? (
              <>
                We sent a 6-digit OTP to <Text className="text-foreground font-medium">{auth.email}</Text>
              </>
            ) : (
              "Create a strong password to secure your account"
            )}
          </Text>
        </View>

        {auth.error && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <Text className="text-[10px] text-red-600">{auth.error}</Text>
          </View>
        )}

        <View style={{ gap: 16 }}>
          {auth.step === "otp" && (
            <>
              <View>
                <Text className="text-[10px] font-semibold text-foreground">Enter OTP</Text>
                <View className="flex-row mt-2" style={{ gap: 8, justifyContent: "space-between" }}>
                  {otpDigits.map((d, i) => (
                    <TextInput
                      key={i}
                      ref={(r) => (refs.current[i] = r)}
                      value={d}
                      onChangeText={(v) => updateOtp(i, v)}
                      editable={!auth.loading}
                      keyboardType="number-pad"
                      maxLength={1}
                      className="text-center bg-secondary border border-border rounded-xl text-sm font-bold text-foreground"
                      style={{ width: 36, height: 44, opacity: 1 }}
                    />
                  ))}
                </View>
                <View className="flex-row items-center justify-between mt-2">
                  {auth.step !== "otp" ? (
                    <View className="flex-row items-center" style={{ gap: 4 }}>
                      <ShieldCheck size={12} color="#10b981" />
                      <Text className="text-[9px] text-success">OTP verified</Text>
                    </View>
                  ) : (
                    <Text className="text-[9px] text-muted-foreground">
                      Didn't receive? {auth.otpResendTime > 0 ? (
                        <Text className="text-muted-foreground">Resend in {auth.otpResendTime}s</Text>
                      ) : (
                        <Pressable onPress={handleResendOtp} disabled={auth.loading}>
                          <Text className="text-gold font-semibold">Resend</Text>
                        </Pressable>
                      )}
                    </Text>
                  )}
                  {auth.step === "otp" && (
                    <Pressable onPress={handleVerifyOtp} disabled={!otpFull || auth.loading}>
                      {auth.loading ? (
                        <ActivityIndicator size="small" color={t.gold} />
                      ) : (
                        <Text className="text-[10px] font-semibold text-gold" style={{ opacity: otpFull ? 1 : 0.4 }}>Verify →</Text>
                      )}
                    </Pressable>
                  )}
                </View>
              </View>
            </>
          )}

          {auth.step === "register" && (
            <>
              <View className="h-px bg-border" />
              <Text className="text-[11px] font-semibold text-foreground">Set your password</Text>
              
              <PwdField 
                label="New Password" 
                value={auth.password} 
                onChangeText={auth.setPassword} 
                placeholder="At least 8 characters" 
                autoFocus
                requirements={auth.passwordRequirements}
              />
              
              <PwdField 
                label="Confirm Password" 
                value={auth.confirmPassword} 
                onChangeText={auth.setConfirmPassword} 
                placeholder="Re-enter password"
              />
            </>
          )}

          <Pressable
            onPress={auth.step === "otp" ? handleVerifyOtp : handleRegister}
            disabled={auth.step === "otp" ? !otpFull || auth.loading : !(auth.password && auth.confirmPassword && auth.passwordRequirements.length && auth.passwordRequirements.uppercase && auth.passwordRequirements.number && auth.passwordRequirements.specialChar) || auth.loading}
            className="bg-gold rounded-xl py-3 items-center flex-row justify-center"
            style={{ opacity: (auth.step === "otp" ? !otpFull || auth.loading : !(auth.password && auth.confirmPassword)) ? 0.4 : 1, gap: 6 }}
          >
            {auth.loading ? (
              <ActivityIndicator color="#1F2330" size="small" />
            ) : (
              <Text className="text-accent-foreground text-xs font-semibold">
                {auth.step === "otp" ? "Verify OTP" : "Create Account & Continue"}
              </Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PwdField({ 
  label, 
  value, 
  onChangeText, 
  placeholder, 
  autoFocus,
  requirements
}: { 
  label: string; 
  value: string; 
  onChangeText: (v: string) => void; 
  placeholder?: string; 
  autoFocus?: boolean;
  requirements?: {
    length: boolean;
    uppercase: boolean;
    number: boolean;
    specialChar: boolean;
  };
}) {
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
      {requirements && (
        <View className="mt-2 space-y-1">
          <RequirementItem met={requirements.length} label="At least 8 characters" />
          <RequirementItem met={requirements.uppercase} label="At least one uppercase letter" />
          <RequirementItem met={requirements.number} label="At least one number" />
          <RequirementItem met={requirements.specialChar} label="At least one special character" />
        </View>
      )}
    </View>
  );
}

function RequirementItem({ met, label }: { met: boolean; label: string }) {
  return (
    <View className="flex-row items-center" style={{ gap: 6 }}>
      <View className={`w-3 h-3 rounded-full ${met ? 'bg-success' : 'bg-border'}`} />
      <Text className={`text-[9px] ${met ? 'text-success' : 'text-muted-foreground'}`}>{label}</Text>
    </View>
  );
}
