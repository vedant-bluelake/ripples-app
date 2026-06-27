import { View, Text } from "react-native";

const map: Record<string, string> = {
  Active: "bg-success/20 text-success",
  Live: "bg-success/20 text-success",
  Pending: "bg-gold/20 text-gold",
  "Under Review": "bg-gold/20 text-gold",
  Expired: "bg-muted text-muted-foreground",
  Failed: "bg-loss/20 text-loss",
  Saved: "bg-gold/20 text-gold",
};

export function StatusPill({ status }: { status: string }) {
  const cls = map[status] ?? "bg-secondary text-muted-foreground";
  return (
    <View className={`px-2 py-0.5 rounded-full ${cls.split(" ")[0]}`}>
      <Text className={`text-[9px] font-semibold ${cls.split(" ")[1]}`}>{status}</Text>
    </View>
  );
}
