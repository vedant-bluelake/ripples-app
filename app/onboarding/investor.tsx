import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { ArrowLeft, Check, Plus, X, ShieldCheck } from "lucide-react-native";
import { Field, TInput, Segmented, Select } from "@/components/forms/Field";

type StepKey = "kyc" | "profile" | "financial";
type ProfileSub = "personal" | "holding" | "nominee";
type FinancialSub = "bank" | "fatca";

const STEPS: { key: StepKey; label: string; sub: string }[] = [
  { key: "kyc", label: "KYC Check", sub: "Check your current KYC status" },
  { key: "profile", label: "Profile Details", sub: "Personal, Holding, Nominee" },
  { key: "financial", label: "Financial Details", sub: "Bank info, FATCA" },
];

type Holder = { pan: string; dob: string; mobile: string; email: string };
type Nominee = { name: string; minor: boolean; relation: string; idType: string; idNo: string; email: string; mobile: string; pincode: string; address: string };
const blankNom = (): Nominee => ({ name: "", minor: false, relation: "", idType: "PAN", idNo: "", email: "", mobile: "", pincode: "", address: "" });

export default function InvestorOnboarding() {
  const router = useRouter();
  const [step, setStep] = useState<StepKey>("kyc");
  const [profileSub, setProfileSub] = useState<ProfileSub>("personal");
  const [financialSub, setFinancialSub] = useState<FinancialSub>("bank");
  const [completed, setCompleted] = useState<Record<StepKey, boolean>>({ kyc: false, profile: false, financial: false });

  const [pan, setPan] = useState(""); const [kycChecked, setKycChecked] = useState(false);
  const [gender, setGender] = useState<"Male" | "Female" | "Other">("Male");
  const [mobile, setMobile] = useState(""); const [email, setEmail] = useState("");
  const [pincode, setPincode] = useState(""); const [occupation, setOccupation] = useState("Student");
  const [mobileBelong, setMobileBelong] = useState("Self"); const [emailBelong, setEmailBelong] = useState("Self");
  const [address, setAddress] = useState("");

  const [holdingType, setHoldingType] = useState<"Single" | "Joint" | "Anyone or Survivor">("Single");
  const [holders, setHolders] = useState<Holder[]>([]);

  const [skipNominee, setSkipNominee] = useState(false);
  const [nominees, setNominees] = useState<Nominee[]>([blankNom()]);

  const [acctType, setAcctType] = useState<"Savings" | "Current">("Savings");
  const [acctNo, setAcctNo] = useState(""); const [ifsc, setIfsc] = useState("");
  const [bankName, setBankName] = useState(""); const [bankBranch, setBankBranch] = useState("");

  const [bornCountry, setBornCountry] = useState("India"); const [bornCity, setBornCity] = useState("");
  const [residence, setResidence] = useState("India"); const [income, setIncome] = useState("₹1 Lakh to ₹5 Lakh");
  const [pep, setPep] = useState<"Politically Exposed" | "Not Politically Exposed" | "Relative of Politically Exposed">("Not Politically Exposed");

  const stepIndex = STEPS.findIndex((s) => s.key === step);
  const onClose = () => router.replace("/");
  const onDone = () => router.replace("/(investor)/home");

  const goNext = () => {
    if (step === "kyc") { setCompleted((c) => ({ ...c, kyc: true })); setStep("profile"); return; }
    if (step === "profile") {
      if (profileSub === "personal") return setProfileSub("holding");
      if (profileSub === "holding") return setProfileSub("nominee");
      setCompleted((c) => ({ ...c, profile: true })); setStep("financial"); return;
    }
    if (financialSub === "bank") return setFinancialSub("fatca");
    setCompleted((c) => ({ ...c, financial: true })); onDone();
  };

  const goPrev = () => {
    if (step === "kyc") return onClose();
    if (step === "profile") {
      if (profileSub === "nominee") return setProfileSub("holding");
      if (profileSub === "holding") return setProfileSub("personal");
      return setStep("kyc");
    }
    if (financialSub === "fatca") return setFinancialSub("bank");
    setStep("profile"); setProfileSub("nominee");
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="bg-navy px-4 pt-3 pb-3 border-b border-border/40">
        <Pressable onPress={onClose} className="p-1 -ml-1 self-start">
          <ArrowLeft size={16} color="#9CA3AF" />
        </Pressable>
        <Image source={require("../../assets/ripples-logo.png")} style={{ width: 90, height: 22, marginTop: 6 }} contentFit="contain" />
        <Text className="text-sm font-bold text-foreground mt-2">Let's get you onboarded!</Text>
        <Text className="text-[9px] text-muted-foreground">in just 3 simple steps...</Text>

        <View className="mt-3" style={{ gap: 8 }}>
          {STEPS.map((s, i) => {
            const active = s.key === step; const done = completed[s.key];
            return (
              <View key={s.key} className="flex-row items-start" style={{ gap: 10 }}>
                <View className={`w-5 h-5 rounded-full items-center justify-center border ${
                  done ? "bg-gold border-gold" : active ? "border-gold" : "bg-secondary border-border"
                }`}>
                  {done ? <Check size={10} color="#1F2330" /> : <Text className={`text-[9px] font-bold ${active ? "text-gold" : "text-muted-foreground"}`}>{i + 1}</Text>}
                </View>
                <View style={{ flex: 1 }}>
                  <Text className={`text-[10px] font-semibold ${active ? "text-gold" : done ? "text-foreground" : "text-muted-foreground"}`}>{s.label}</Text>
                  <Text className="text-[8px] text-muted-foreground">{s.sub}</Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>

      <View className="px-4 pt-3 pb-2 border-b border-border/40">
        <Text className="text-sm font-bold text-foreground">
          {STEPS[stepIndex].label}
          {step === "profile" && <Text className="text-muted-foreground font-normal"> · {profileSub === "personal" ? "Personal info" : profileSub === "holding" ? "Holding pattern" : "Nominee"}</Text>}
          {step === "financial" && <Text className="text-muted-foreground font-normal"> · {financialSub === "bank" ? "Bank info" : "FATCA"}</Text>}
        </Text>
        <Text className="text-[9px] tracking-wider text-muted-foreground mt-0.5">STEP {stepIndex + 1} OF 3</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        {step === "kyc" && (
          <>
            <Field label="PAN Number">
              <TInput value={pan} onChangeText={(t) => setPan(t.toUpperCase().slice(0, 10))} placeholder="ABCDE1234F" tracking />
            </Field>
            <Field label="Date of Birth"><TInput placeholder="DD/MM/YYYY" /></Field>
            {!kycChecked ? (
              <Pressable
                onPress={() => setKycChecked(true)}
                disabled={pan.length < 10}
                className="bg-gold rounded-xl py-3 items-center"
                style={{ opacity: pan.length < 10 ? 0.4 : 1 }}
              ><Text className="text-accent-foreground text-xs font-semibold">Check KYC Status</Text></Pressable>
            ) : (
              <View className="bg-success/15 border border-success/30 rounded-xl p-3 flex-row" style={{ gap: 8 }}>
                <ShieldCheck size={16} color="#10b981" />
                <View style={{ flex: 1 }}>
                  <Text className="text-[11px] font-semibold text-success">KYC Validated</Text>
                  <Text className="text-[9px] text-muted-foreground">Your KYC is verified with CVL KRA. You may proceed.</Text>
                </View>
              </View>
            )}
          </>
        )}

        {step === "profile" && profileSub === "personal" && (
          <>
            <Field label="Gender"><Segmented value={gender} options={["Male", "Female", "Other"] as const} onChange={setGender} /></Field>
            <Field label="Mobile number"><TInput value={mobile} onChangeText={(t) => setMobile(t.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit number" keyboardType="number-pad" /></Field>
            <Select label="Mobile belongs to" value={mobileBelong} onChange={setMobileBelong} options={["Self", "Parent", "Spouse", "Sibling"]} />
            <Field label="Email ID"><TInput value={email} onChangeText={setEmail} placeholder="you@email.com" autoCapitalize="none" keyboardType="email-address" /></Field>
            <Select label="Email belongs to" value={emailBelong} onChange={setEmailBelong} options={["Self", "Parent", "Spouse", "Sibling"]} />
            <Field label="Pincode"><TInput value={pincode} onChangeText={(t) => setPincode(t.replace(/\D/g, "").slice(0, 6))} placeholder="6-digit" keyboardType="number-pad" /></Field>
            <Select label="Occupation" value={occupation} onChange={setOccupation} options={["Student", "Salaried", "Self Employed", "Business", "Retired"]} />
            <Field label="Address"><TInput value={address} onChangeText={setAddress} /></Field>
          </>
        )}

        {step === "profile" && profileSub === "holding" && (
          <>
            <Segmented
              value={holdingType}
              options={["Single", "Joint", "Anyone or Survivor"] as const}
              onChange={(t) => {
                setHoldingType(t);
                if (t === "Single") setHolders([]);
                else if (holders.length === 0) setHolders([{ pan: "", dob: "", mobile: "", email: "" }]);
              }}
            />
            {holdingType !== "Single" && (
              <>
                {holders.map((h, idx) => (
                  <View key={idx} className="bg-secondary border border-border/50 rounded-xl p-3 mt-3 relative">
                    <Pressable onPress={() => setHolders((hs) => hs.filter((_, i) => i !== idx))} style={{ position: "absolute", top: 8, right: 8 }}>
                      <X size={12} color="#ef4444" />
                    </Pressable>
                    <Text className="text-[10px] font-bold text-gold mb-2">{idx === 0 ? "Second" : "Third"} Holder</Text>
                    <Field label="PAN Number"><TInput value={h.pan} onChangeText={(v) => setHolders((hs) => hs.map((x, i) => i === idx ? { ...x, pan: v.toUpperCase().slice(0, 10) } : x))} tracking /></Field>
                    <Field label="Date of Birth"><TInput value={h.dob} onChangeText={(v) => setHolders((hs) => hs.map((x, i) => i === idx ? { ...x, dob: v } : x))} placeholder="DD/MM/YYYY" /></Field>
                    <Field label="Mobile"><TInput value={h.mobile} onChangeText={(v) => setHolders((hs) => hs.map((x, i) => i === idx ? { ...x, mobile: v.replace(/\D/g, "").slice(0, 10) } : x))} keyboardType="number-pad" /></Field>
                    <Field label="Email"><TInput value={h.email} onChangeText={(v) => setHolders((hs) => hs.map((x, i) => i === idx ? { ...x, email: v } : x))} autoCapitalize="none" /></Field>
                  </View>
                ))}
                {holders.length < 2 && (
                  <Pressable
                    onPress={() => setHolders((hs) => [...hs, { pan: "", dob: "", mobile: "", email: "" }])}
                    className="mt-3 flex-row items-center justify-center border border-dashed border-gold/50 rounded-xl py-2"
                    style={{ gap: 6 }}
                  >
                    <Plus size={12} color="#88794F" />
                    <Text className="text-[10px] font-semibold text-gold">Add another holder (up to 2)</Text>
                  </Pressable>
                )}
              </>
            )}
          </>
        )}

        {step === "profile" && profileSub === "nominee" && (
          <>
            {!skipNominee && nominees.map((n, idx) => (
              <View key={idx} className="bg-secondary border border-border/50 rounded-xl p-3 mb-3 relative">
                {nominees.length > 1 && (
                  <Pressable onPress={() => setNominees((ns) => ns.filter((_, i) => i !== idx))} style={{ position: "absolute", top: 8, right: 8 }}>
                    <X size={12} color="#ef4444" />
                  </Pressable>
                )}
                <Text className="text-[10px] font-bold text-gold mb-2">Nominee {idx + 1}</Text>
                <Field label="Nominee Name"><TInput value={n.name} onChangeText={(v) => setNominees((ns) => ns.map((x, i) => i === idx ? { ...x, name: v } : x))} /></Field>
                <Field label="Is nominee a minor?">
                  <View className="flex-row" style={{ gap: 6 }}>
                    {[true, false].map((v) => (
                      <Pressable key={String(v)} onPress={() => setNominees((ns) => ns.map((x, i) => i === idx ? { ...x, minor: v } : x))} className={`px-4 py-2 rounded-lg border ${n.minor === v ? "bg-foreground border-foreground" : "bg-background border-border"}`}>
                        <Text className={`text-[10px] ${n.minor === v ? "text-background" : "text-foreground"}`}>{v ? "Yes" : "No"}</Text>
                      </Pressable>
                    ))}
                  </View>
                </Field>
                <Select label="Relationship" value={n.relation || "Select"} onChange={(v) => setNominees((ns) => ns.map((x, i) => i === idx ? { ...x, relation: v } : x))} options={["Spouse", "Parent", "Child", "Sibling", "Other"]} />
                <Select label="ID Type" value={n.idType} onChange={(v) => setNominees((ns) => ns.map((x, i) => i === idx ? { ...x, idType: v } : x))} options={["PAN", "Aadhaar", "Passport"]} />
                <Field label="ID Number"><TInput value={n.idNo} onChangeText={(v) => setNominees((ns) => ns.map((x, i) => i === idx ? { ...x, idNo: v } : x))} /></Field>
                <Field label="Email"><TInput value={n.email} onChangeText={(v) => setNominees((ns) => ns.map((x, i) => i === idx ? { ...x, email: v } : x))} autoCapitalize="none" /></Field>
                <Field label="Mobile"><TInput value={n.mobile} onChangeText={(v) => setNominees((ns) => ns.map((x, i) => i === idx ? { ...x, mobile: v.replace(/\D/g, "").slice(0, 10) } : x))} keyboardType="number-pad" /></Field>
                <Field label="Pincode"><TInput value={n.pincode} onChangeText={(v) => setNominees((ns) => ns.map((x, i) => i === idx ? { ...x, pincode: v.replace(/\D/g, "").slice(0, 6) } : x))} keyboardType="number-pad" /></Field>
                <Field label="Address"><TInput value={n.address} onChangeText={(v) => setNominees((ns) => ns.map((x, i) => i === idx ? { ...x, address: v } : x))} /></Field>
              </View>
            ))}
            {!skipNominee && nominees.length < 3 && (
              <Pressable onPress={() => setNominees((ns) => [...ns, blankNom()])} className="flex-row items-center justify-center border border-dashed border-gold/50 rounded-xl py-2 mb-2" style={{ gap: 6 }}>
                <Plus size={12} color="#88794F" /><Text className="text-[10px] font-semibold text-gold">Add Nominee</Text>
              </Pressable>
            )}
            <Pressable onPress={() => setSkipNominee((s) => !s)} className="flex-row items-center mt-2" style={{ gap: 8 }}>
              <View className={`w-4 h-4 rounded border ${skipNominee ? "bg-gold border-gold" : "border-border bg-secondary"} items-center justify-center`}>
                {skipNominee && <Check size={10} color="#1F2330" />}
              </View>
              <Text className="text-[10px] text-foreground">I do not wish to nominate anyone</Text>
            </Pressable>
          </>
        )}

        {step === "financial" && financialSub === "bank" && (
          <>
            <Field label="Account type"><Segmented value={acctType} options={["Savings", "Current"] as const} onChange={setAcctType} cols={2} /></Field>
            <Field label="Bank Account Number"><TInput value={acctNo} onChangeText={(v) => setAcctNo(v.replace(/\D/g, ""))} keyboardType="number-pad" /></Field>
            <Field label="Bank IFSC Code"><TInput value={ifsc} onChangeText={(v) => setIfsc(v.toUpperCase().slice(0, 11))} tracking /></Field>
            <Field label="Bank Name"><TInput value={bankName} onChangeText={setBankName} /></Field>
            <Field label="Bank Branch"><TInput value={bankBranch} onChangeText={setBankBranch} /></Field>
            <View className="bg-gold/10 border border-gold/30 rounded-xl p-3 flex-row" style={{ gap: 8 }}>
              <ShieldCheck size={14} color="#88794F" />
              <Text className="text-[9px] text-muted-foreground" style={{ flex: 1 }}>Your bank details are encrypted & used only for verification. No amount will be deducted while setting up.</Text>
            </View>
          </>
        )}

        {step === "financial" && financialSub === "fatca" && (
          <>
            <Select label="Country of birth" value={bornCountry} onChange={setBornCountry} options={["India", "United States", "United Kingdom", "Other"]} />
            <Field label="City of birth"><TInput value={bornCity} onChangeText={setBornCity} /></Field>
            <Select label="Country of residence" value={residence} onChange={setResidence} options={["India", "United States", "United Kingdom", "Other"]} />
            <Select label="Gross annual income" value={income} onChange={setIncome} options={["Below ₹1 Lakh", "₹1 Lakh to ₹5 Lakh", "₹5 Lakh to ₹10 Lakh", "₹10 Lakh to ₹25 Lakh", "Above ₹25 Lakh"]} />
            <Field label="Politically exposed person?">
              <Segmented value={pep} options={["Politically Exposed", "Not Politically Exposed", "Relative of Politically Exposed"] as const} onChange={setPep} />
            </Field>
          </>
        )}

        <View className="flex-row justify-between mt-6" style={{ gap: 12 }}>
          <Pressable onPress={goPrev} className="px-4 py-2.5 bg-secondary border border-border rounded-xl">
            <Text className="text-[11px] font-semibold text-foreground">Back</Text>
          </Pressable>
          <Pressable onPress={goNext} className="ml-auto px-5 py-2.5 bg-gold rounded-xl">
            <Text className="text-[11px] font-semibold text-accent-foreground">{step === "financial" && financialSub === "fatca" ? "Finish" : "Next"}</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
