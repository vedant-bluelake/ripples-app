import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, ArrowRight, Check, Upload, Building2, Wallet } from "lucide-react-native";
import { Field, TInput, Segmented } from "@/components/forms/Field";

type Step = 1 | 2 | 3 | 4 | 5;

export default function CPOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const onClose = () => router.replace("/");
  const onDone = () => router.replace("/(cp)/dashboard");

  const [pan, setPan] = useState(""); const [dob, setDob] = useState("");
  const [fullName, setFullName] = useState(""); const [nickname, setNickname] = useState("");
  const [mobile, setMobile] = useState(""); const [otpSent, setOtpSent] = useState(false);
  const [address, setAddress] = useState(""); const [qualification, setQualification] = useState("");

  const [exp, setExp] = useState(""); const [aum, setAum] = useState("");
  const [arn, setArn] = useState(""); const [bio, setBio] = useState(""); const [photo, setPhoto] = useState("");

  const [nism, setNism] = useState(""); const [panCard, setPanCard] = useState(""); const [aadhaar, setAadhaar] = useState("");
  const [arnCard, setArnCard] = useState(""); const [arnFrom, setArnFrom] = useState(""); const [arnTo, setArnTo] = useState("");

  const [acctType, setAcctType] = useState<"Savings" | "Current">("Savings");
  const [acctNo, setAcctNo] = useState(""); const [ifsc, setIfsc] = useState(""); const [cheque, setCheque] = useState("");

  const [agree, setAgree] = useState(false);

  const next = () => setStep((s) => (s < 5 ? ((s + 1) as Step) : s));
  const back = () => (step === 1 ? onClose() : setStep((s) => (s - 1) as Step));

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-4 pt-4 pb-2 flex-row items-center" style={{ gap: 8 }}>
        <Pressable onPress={back}><ArrowLeft size={16} color="#9CA3AF" /></Pressable>
        <View style={{ flex: 1 }} />
        <Image source={require("../../assets/ripples-logo.png")} style={{ width: 90, height: 22 }} contentFit="contain" />
      </View>

      <Text className="text-center text-sm font-bold text-foreground mb-3">Become a Certified Partner</Text>

      <View className="px-5 mb-4">
        <View className="flex-row items-center">
          {[1, 2, 3, 4, 5].map((n, i) => {
            const past = step > n; const now = step === n;
            return (
              <View key={n} className="flex-row items-center" style={{ flex: i < 4 ? 1 : 0 }}>
                <View className={`w-6 h-6 rounded-full items-center justify-center border-2 ${past ? "bg-gold border-gold" : now ? "border-gold" : "border-border"}`}>
                  {past ? <Check size={12} color="#1F2330" /> : <Text className={`text-[10px] font-bold ${now ? "text-gold" : "text-muted-foreground"}`}>{n}</Text>}
                </View>
                {i < 4 && <View className={`h-px mx-1 ${past ? "bg-gold" : "bg-border"}`} style={{ flex: 1 }} />}
              </View>
            );
          })}
        </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32 }}>
        {step === 1 && (
          <>
            <Text className="text-xs font-bold text-foreground mb-3">Basic Information</Text>
            <Field label="PAN Number *"><TInput value={pan} onChangeText={(t) => setPan(t.toUpperCase().slice(0, 10))} placeholder="ABCDE1234F" tracking /></Field>
            <Field label="Date of Birth *"><TInput value={dob} onChangeText={setDob} placeholder="DD/MM/YYYY" /></Field>
            <Field label="Full Name *"><TInput value={fullName} onChangeText={setFullName} placeholder="Enter your name" /></Field>
            <Field label="Unique Nickname *"><TInput value={nickname} onChangeText={setNickname} placeholder="Enter unique nickname" /></Field>
            <Text className="text-[11px] font-bold text-foreground mt-2 mb-2">Mobile Number Verification</Text>
            <Field label="Mobile Number *">
              <View className="flex-row" style={{ gap: 8 }}>
                <View style={{ flex: 1 }}><TInput value={mobile} onChangeText={(t) => setMobile(t.replace(/\D/g, "").slice(0, 10))} keyboardType="number-pad" placeholder="Enter mobile" /></View>
                <Pressable onPress={() => setOtpSent(true)} className="px-3 bg-secondary border border-border rounded-xl justify-center">
                  <Text className="text-[10px] font-semibold text-foreground">{otpSent ? "OTP Sent" : "Send OTP"}</Text>
                </Pressable>
              </View>
            </Field>
            <Field label="Address *"><TInput value={address} onChangeText={setAddress} /></Field>
            <Field label="Highest Qualification *"><TInput value={qualification} onChangeText={setQualification} placeholder="e.g. MBA Finance" /></Field>
          </>
        )}

        {step === 2 && (
          <>
            <Text className="text-xs font-bold text-foreground mb-3">Professional Details</Text>
            <Field label="Experience in MF Domain (Years) *"><TInput value={exp} onChangeText={setExp} keyboardType="number-pad" /></Field>
            <Field label="Existing AUM (₹ Cr) *"><TInput value={aum} onChangeText={setAum} keyboardType="number-pad" /></Field>
            <Field label="ARN Code *"><TInput value={arn} onChangeText={setArn} placeholder="ARN-XXXXXX" /></Field>
            <Field label="Professional Bio *"><TInput value={bio} onChangeText={setBio} multiline numberOfLines={4} style={{ minHeight: 80, textAlignVertical: "top" }} /></Field>
            <FileField label="Upload Professional Photo *" value={photo} onChange={setPhoto} />
          </>
        )}

        {step === 3 && (
          <>
            <Text className="text-xs font-bold text-foreground mb-3">Certifications & Documents</Text>
            <FileField label="NISM-Series-5A Certificate *" value={nism} onChange={setNism} />
            <FileField label="PAN Card *" value={panCard} onChange={setPanCard} />
            <FileField label="Aadhaar Card *" value={aadhaar} onChange={setAadhaar} />
            <FileField label="ARN Card *" value={arnCard} onChange={setArnCard} />
            <Field label="ARN Valid From *"><TInput value={arnFrom} onChangeText={setArnFrom} placeholder="DD/MM/YYYY" /></Field>
            <Field label="ARN Valid To *"><TInput value={arnTo} onChangeText={setArnTo} placeholder="DD/MM/YYYY" /></Field>
          </>
        )}

        {step === 4 && (
          <>
            <Text className="text-xs font-bold text-foreground mb-3">Bank Details</Text>
            <Field label="Account Type *">
              <View className="flex-row" style={{ gap: 8 }}>
                {(["Savings", "Current"] as const).map((t) => (
                  <Pressable key={t} onPress={() => setAcctType(t)} className={`flex-1 py-2.5 rounded-xl border flex-row items-center justify-center ${acctType === t ? "bg-foreground border-foreground" : "bg-secondary border-border"}`} style={{ gap: 6 }}>
                    {acctType === t ? <Wallet size={12} color="#1F2330" /> : <Building2 size={12} color="#88794F" />}
                    <Text className={`text-[11px] font-semibold ${acctType === t ? "text-background" : "text-foreground"}`}>{t} Account</Text>
                  </Pressable>
                ))}
              </View>
            </Field>
            <Field label="Bank Account Number *"><TInput value={acctNo} onChangeText={setAcctNo} keyboardType="number-pad" /></Field>
            <Field label="Bank IFSC Code *"><TInput value={ifsc} onChangeText={(v) => setIfsc(v.toUpperCase().slice(0, 11))} placeholder="BKID0001303" tracking /></Field>
            {ifsc.length === 11 && (
              <View className="bg-secondary/50 border border-border rounded-xl p-3 mb-3">
                <Text className="text-[10px] text-muted-foreground"><Text className="font-semibold text-foreground">Bank:</Text> Bank of India</Text>
                <Text className="text-[10px] text-muted-foreground"><Text className="font-semibold text-foreground">Branch:</Text> KALEDHON</Text>
              </View>
            )}
            <FileField label="Upload Cancelled Cheque *" value={cheque} onChange={setCheque} />
          </>
        )}

        {step === 5 && (
          <>
            <Text className="text-xs font-bold text-foreground mb-3">Terms & Conditions</Text>
            <ScrollView className="bg-secondary/40 border border-border rounded-xl p-3" style={{ maxHeight: 240 }}>
              <Text className="text-[10px] text-center font-bold text-foreground mb-1">TERMS & CONDITIONS FOR CERTIFIED PARTNERS</Text>
              <Text className="text-[9px] text-center text-muted-foreground mb-2">(Independent MF Distributors & AMFI-Registered ARN Holders)</Text>
              <Text className="text-[10px] text-muted-foreground mb-2">These Terms govern the engagement, responsibilities, and conduct of individuals onboarded by RIPPLES™ as Certified Partners.</Text>
              <Text className="text-[10px] font-semibold text-foreground mt-2">1. Eligibility & Onboarding</Text>
              <Text className="text-[10px] text-muted-foreground">You must be AMFI-registered with a valid, active ARN number and comply with all SEBI/AMFI regulations.</Text>
              <Text className="text-[10px] font-semibold text-foreground mt-2">8. Confidentiality & Data Protection</Text>
              <Text className="text-[10px] text-muted-foreground">Maintain strict confidentiality of all investor information. Do not download or misuse data outside the Platform.</Text>
              <Text className="text-[10px] font-semibold text-foreground mt-2">9. Suspension & Termination</Text>
              <Text className="text-[10px] text-muted-foreground">RIPPLES™ may suspend or terminate your status for violations, ARN expiry, mis-selling, or any conduct harming investor trust.</Text>
            </ScrollView>
            <Pressable onPress={() => setAgree((a) => !a)} className="flex-row items-start mt-3" style={{ gap: 8 }}>
              <View className={`w-4 h-4 rounded border mt-0.5 ${agree ? "bg-gold border-gold" : "border-border bg-secondary"} items-center justify-center`}>
                {agree && <Check size={10} color="#1F2330" />}
              </View>
              <Text className="text-[10px] text-muted-foreground" style={{ flex: 1 }}>
                I have read, understood, and agree to be bound by the Terms & Conditions for Certified Partners of RIPPLES™.
              </Text>
            </Pressable>
            <Text className="text-[9px] text-muted-foreground mt-3 italic">Your profile will be reviewed within 1-2 working days</Text>
          </>
        )}

        <View className="flex-row justify-between mt-6">
          {step > 1 ? (
            <Pressable onPress={back} className="px-4 py-2.5 bg-secondary border border-border rounded-xl"><Text className="text-[11px] font-semibold text-foreground">Back</Text></Pressable>
          ) : <View />}
          {step < 5 ? (
            <Pressable onPress={next} className="ml-auto px-4 py-2.5 bg-foreground rounded-xl flex-row items-center" style={{ gap: 6 }}>
              <Text className="text-[11px] font-semibold text-background">Next</Text>
              <ArrowRight size={12} color="#F8F9FB" />
            </Pressable>
          ) : (
            <Pressable onPress={onDone} disabled={!agree} className="ml-auto px-4 py-2.5 bg-gold rounded-xl" style={{ opacity: agree ? 1 : 0.4 }}>
              <Text className="text-[11px] font-semibold text-accent-foreground">Submit Application</Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FileField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label}>
      <Pressable onPress={() => onChange(value ? "" : "uploaded-file.pdf")} className="flex-row items-center bg-secondary border border-border rounded-xl px-3 py-2.5" style={{ gap: 8 }}>
        <Upload size={12} color="#9CA3AF" />
        <Text className="text-[10px] text-muted-foreground" style={{ flex: 1 }}>{value || "Choose file"}</Text>
      </Pressable>
      <Text className="text-[9px] text-muted-foreground mt-1">Formats: .jpeg, .jpg, .png, .pdf · Max size: 500KB</Text>
      {!!value && <Text className="text-[9px] text-success mt-0.5">✓ Selected: {value}</Text>}
    </Field>
  );
}
