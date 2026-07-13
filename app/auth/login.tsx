import { useState, useRef } from "react";
import { View, Text, Pressable, TextInput, ActivityIndicator, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Eye, EyeOff, Mail, ArrowRight } from "lucide-react-native";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { useThemeColors } from "@/theme/ThemeContext";
import { useAuthFlow } from "@/hooks/useAuthFlow";

export default function Login() {
  const router = useRouter();
  const params = useLocalSearchParams<{ role?: string }>();
  const t = useThemeColors();
  const auth = useAuthFlow();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordStep, setForgotPasswordStep] = useState(false);
  const otpInputRef = useRef<TextInput | null>(null);
  const otpRefs = useRef<Array<TextInput | null>>([]);

  const routeAccountType = params.role === "investor"
    ? "investor"
    : params.role === "partner"
      ? "cp"
      : undefined;

  const routeRole = params.role === "investor"
    ? "USER"
    : params.role === "partner"
      ? "RIPPLER"
      : undefined;

  const handleCheckEmail = async () => {
    await auth.checkEmail(routeRole);
  };

  const getRedirectRoute = (onboarding = false) => {
    const type = auth.accountType ?? routeAccountType;
    if (onboarding) {
      return type === "cp" ? "/onboarding/cp" : "/onboarding/investor";
    }
    return type === "cp" ? "/(cp)/dashboard" : "/(investor)/home";
  };

  const handleVerifyOtp = async () => {
    const verified = await auth.verifyOtp(true, routeRole);
    if (verified) {
      router.replace(getRedirectRoute(true));
    }
  };

  const handleSubmitPassword = async () => {
    const result = await auth.submitPassword(routeRole);
    if (result) {
      // Successfully verified password
      const actualRole = result.role ?? routeRole;
      const route = actualRole === "RIPPLER"
        ? "/(cp)/dashboard"
        : "/(investor)/home";
      router.replace(route);
    }
  };

  const handleForgotPassword = () => {
    setForgotPasswordStep(true);
    // TODO: Implement forgot password flow with OTP verification
  };

  const handleGoogleLogin = () => {
    auth.setError('Google sign-in is not available yet. Please use email login.');
  };

  const otpDigits = Array.from({ length: 6 }, (_, index) => auth.otp[index] ?? "");

  const updateOtpDigit = (index: number, value: string) => {
    const onlyDigits = value.replace(/[^0-9]/g, '');
    if (!/^[0-9]?$/.test(onlyDigits)) return;
    const nextOtp = otpDigits.slice();
    nextOtp[index] = onlyDigits;
    auth.setOtp(nextOtp.join(''));

    if (onlyDigits && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleBackFromPassword = () => {
    auth.setEmail("");
    auth.setPassword("");
    auth.setError("");
    auth.goBackStep();
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
            Sign In to Ripples
          </Text>
          <Text className="text-[10px] text-muted-foreground mt-0.5">
            {auth.step === "email" ? "Enter your email to continue" : `Welcome back · ${auth.email}`}
          </Text>
        </View>

        {auth.error && (
          <View className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <Text className="text-[10px] text-red-600">{auth.error}</Text>
          </View>
        )}

        {auth.step === "email" ? (
          <View style={{ gap: 12 }}>
            <View>
              <Text className="text-[10px] text-muted-foreground">Email</Text>
              <View className="mt-1 relative">
                <View style={{ position: "absolute", left: 10, top: 0, bottom: 0, justifyContent: "center", zIndex: 1 }}>
                  <Mail size={14} color="#9CA3AF" />
                </View>
                <TextInput
                  value={auth.email}
                  onChangeText={auth.setEmail}
                  placeholder="you@example.com"
                  placeholderTextColor="#9CA3AF"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  editable={!auth.loading}
                  className="bg-secondary border border-border rounded-xl pl-9 pr-3 py-2.5 text-xs text-foreground"
                />
              </View>
            </View>
            <Pressable onPress={handleCheckEmail} disabled={auth.loading || !auth.email} className="bg-gold rounded-xl py-3 items-center flex-row justify-center" style={{ opacity: auth.loading || !auth.email ? 0.6 : 1, gap: 6 }}>
              {auth.loading ? <ActivityIndicator color="#1F2330" size="small" /> : (
                <>
                  <Text className="text-accent-foreground text-xs font-semibold">Continue</Text>
                  <ArrowRight size={14} color="#1F2330" />
                </>
              )}
            </Pressable>
          </View>
        ) : auth.step === "otp" ? (
          <View style={{ gap: 12 }}>
            <View>
              <Text className="text-[10px] text-muted-foreground">Enter the 6-digit OTP</Text>
              <View style={{ marginTop: 16, paddingVertical: 6, paddingHorizontal: 4, backgroundColor: t.secondary, borderRadius: 16, borderWidth: 1, borderColor: t.border }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                  {otpDigits.map((digit, index) => (
                    <TextInput
                      key={index}
                      ref={(r) => (otpRefs.current[index] = r)}
                      value={digit}
                      onChangeText={(value) => updateOtpDigit(index, value)}
                      onKeyPress={({ nativeEvent }) => {
                        if (nativeEvent.key === 'Backspace' && !digit && index > 0) {
                          otpRefs.current[index - 1]?.focus();
                        }
                      }}
                      keyboardType="number-pad"
                      maxLength={1}
                      editable={!auth.loading}
                      placeholder="0"
                      placeholderTextColor={t.mutedForeground}
                      style={{
                        flex: 1,
                        minWidth: 42,
                        height: 52,
                        borderWidth: 1,
                        borderColor: t.border,
                        borderRadius: 14,
                        backgroundColor: t.background,
                        color: t.foreground,
                        fontSize: 18,
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        marginRight: index < 5 ? 8 : 0,
                        padding: 0,
                      }}
                      accessible
                      accessibilityLabel={`OTP digit ${index + 1}`}
                    />
                  ))}
                </View>
              </View>
              <View className="flex-row items-center justify-between mt-2">
                <Pressable onPress={handleBackFromPassword} disabled={auth.loading}>
                  <Text className="text-[10px] text-gold">← Use a different email</Text>
                </Pressable>
                <Pressable onPress={auth.resendOtp} disabled={auth.loading || auth.otpResendTime > 0}>
                  <Text className={`text-[10px] ${auth.loading || auth.otpResendTime > 0 ? 'text-muted-foreground' : 'text-gold'}`}>
                    {auth.otpResendTime > 0 ? `Resend in ${auth.otpResendTime}s` : 'Resend OTP'}
                  </Text>
                </Pressable>
              </View>
            </View>
            <Pressable onPress={handleVerifyOtp} disabled={auth.loading || auth.otp.length !== 6} className="bg-gold rounded-xl py-3 items-center" style={{ opacity: auth.loading || auth.otp.length !== 6 ? 0.6 : 1 }}>
              {auth.loading ? <ActivityIndicator color="#1F2330" size="small" /> : (
                <Text className="text-accent-foreground text-xs font-semibold">Verify OTP</Text>
              )}
            </Pressable>
          </View>
        ) : auth.step === "password" ? (
          <View style={{ gap: 12 }}>
            <View>
              <Text className="text-[10px] text-muted-foreground">Password</Text>
              <View className="mt-1 relative">
                <TextInput
                  value={auth.password}
                  onChangeText={auth.setPassword}
                  secureTextEntry={!showPassword}
                  autoFocus
                  placeholder="Enter password"
                  placeholderTextColor="#9CA3AF"
                  editable={!auth.loading}
                  className="bg-secondary border border-border rounded-xl px-3 py-2.5 pr-9 text-xs text-foreground"
                />
                <Pressable onPress={() => setShowPassword((s) => !s)} style={{ position: "absolute", right: 10, top: 0, bottom: 0, justifyContent: "center" }} disabled={auth.loading}>
                  {showPassword ? <EyeOff size={14} color="#9CA3AF" /> : <Eye size={14} color="#9CA3AF" />}
                </Pressable>
              </View>
              <Pressable onPress={handleBackFromPassword} disabled={auth.loading}>
                <Text className="text-[10px] text-gold mt-1.5">← Use a different email</Text>
              </Pressable>
            </View>
            <Pressable onPress={handleSubmitPassword} disabled={auth.loading || !auth.password} className="bg-gold rounded-xl py-3 items-center" style={{ opacity: auth.loading || !auth.password ? 0.6 : 1 }}>
              {auth.loading ? <ActivityIndicator color="#1F2330" size="small" /> : (
                <Text className="text-accent-foreground text-xs font-semibold">Log In</Text>
              )}
            </Pressable>
            <Pressable onPress={handleForgotPassword} disabled={auth.loading}>
              <Text className="text-[10px] text-muted-foreground text-center">Forgot password?</Text>
            </Pressable>
          </View>
        ) : null}

        <View className="flex-row items-center my-4" style={{ gap: 8 }}>
          <View style={{ flex: 1, height: 1 }} className="bg-border" />
          <Text className="text-[9px] text-muted-foreground">OR</Text>
          <View style={{ flex: 1, height: 1 }} className="bg-border" />
        </View>

        <Pressable onPress={handleGoogleLogin} disabled={auth.loading} className="flex-row items-center justify-center bg-secondary border border-border rounded-xl py-3" style={{ gap: 8, opacity: auth.loading ? 0.6 : 1 }}>
          <GoogleIcon size={16} />
          <Text className="text-xs font-medium text-foreground">Continue with Google</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
