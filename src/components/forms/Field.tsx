import { View, Text, TextInput, Pressable } from "react-native";
import { useState } from "react";
import { ChevronDown, Check } from "lucide-react-native";

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text className="text-[10px] font-semibold text-foreground mb-1">{label}</Text>
      {children}
    </View>
  );
}

export const inputBase = "bg-secondary border border-border rounded-xl px-3 py-2.5 text-xs text-foreground";

export function TInput(props: React.ComponentProps<typeof TextInput> & { tracking?: boolean }) {
  const { tracking, style, ...rest } = props;
  return (
    <TextInput
      placeholderTextColor="#9CA3AF"
      className={inputBase}
      style={[{ letterSpacing: tracking ? 2 : 0 }, style as any]}
      {...rest}
    />
  );
}

export function Segmented<T extends string>({ value, options, onChange, cols = 3 }: { value: T; options: readonly T[]; onChange: (v: T) => void; cols?: number }) {
  return (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6 }}>
      {options.map((o) => {
        const active = value === o;
        return (
          <Pressable
            key={o}
            onPress={() => onChange(o)}
            style={{ flexBasis: `${100 / cols - 2}%` }}
            className={`py-2 rounded-lg border ${active ? "bg-foreground border-foreground" : "bg-secondary border-border"}`}
          >
            <Text className={`text-center text-[10px] font-medium ${active ? "text-background" : "text-foreground"}`}>{o}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export function Select({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <Field label={label}>
      <Pressable onPress={() => setOpen((o) => !o)} className="flex-row items-center justify-between bg-secondary border border-border rounded-xl px-3 py-2.5">
        <Text className="text-xs text-foreground">{value}</Text>
        <ChevronDown size={14} color="#9CA3AF" />
      </Pressable>
      {open && (
        <View className="mt-1 bg-secondary border border-border rounded-xl overflow-hidden">
          {options.map((o) => (
            <Pressable key={o} onPress={() => { onChange(o); setOpen(false); }} className="px-3 py-2 flex-row items-center justify-between">
              <Text className="text-xs text-foreground">{o}</Text>
              {value === o && <Check size={12} color="#88794F" />}
            </Pressable>
          ))}
        </View>
      )}
    </Field>
  );
}
