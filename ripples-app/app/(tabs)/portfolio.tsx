import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { theme } from '../../constants/theme';

const allocations = [
  { label: 'Equity', pct: 62, color: theme.gold },
  { label: 'Debt', pct: 25, color: '#6BA3C8' },
  { label: 'Hybrid', pct: 13, color: '#A78BFA' },
];
const txs = [
  { name: 'SIP - Wealth Builder', date: 'May 1, 2026', amount: '-₹5,000', type: 'debit' },
  { name: 'Dividend - HDFC Fund', date: 'Apr 28, 2026', amount: '+₹1,240', type: 'credit' },
  { name: 'SIP - Conservative', date: 'Apr 15, 2026', amount: '-₹2,000', type: 'debit' },
  { name: 'Redeemed - Axis Blue', date: 'Apr 10, 2026', amount: '+₹25,000', type: 'credit' },
];

export default function Portfolio() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Portfolio" subtitle="Track your investments" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <View style={styles.card}>
          {[
            ['Invested', '₹3,95,010', theme.text],
            ['Current', '₹4,47,350', theme.text],
            ['Total Returns', '+₹52,340', theme.success],
            ['XIRR', '15.8%', theme.success],
          ].map(([l, v, c], i) => (
            <View key={i} style={{ width: '50%', marginBottom: 12 }}>
              <Text style={styles.muted}>{l as string}</Text>
              <Text style={{ color: c as string, fontWeight: '800', fontSize: 16 }}>{v as string}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.section}>Asset Allocation</Text>
        <View style={{ flexDirection: 'row', height: 12, borderRadius: 6, overflow: 'hidden', marginBottom: 10, gap: 2 }}>
          {allocations.map((a) => (
            <View key={a.label} style={{ flex: a.pct, backgroundColor: a.color }} />
          ))}
        </View>
        <View style={{ flexDirection: 'row', gap: 14, marginBottom: 24 }}>
          {allocations.map((a) => (
            <View key={a.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: a.color }} />
              <Text style={styles.muted}>{a.label} {a.pct}%</Text>
            </View>
          ))}
        </View>

        <Text style={styles.section}>Recent Transactions</Text>
        {txs.map((t, i) => (
          <View key={i} style={styles.tx}>
            <View style={[styles.txIcon, { backgroundColor: t.type === 'credit' ? theme.success + '20' : theme.loss + '20' }]}>
              <Ionicons name={t.type === 'credit' ? 'arrow-down' : 'arrow-up'} size={16} color={t.type === 'credit' ? theme.success : theme.loss} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontWeight: '600' }}>{t.name}</Text>
              <Text style={styles.muted}>{t.date}</Text>
            </View>
            <Text style={{ color: t.type === 'credit' ? theme.success : theme.text, fontWeight: '700' }}>{t.amount}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  muted: { color: theme.muted, fontSize: 11 },
  section: { color: theme.text, fontSize: 16, fontWeight: '700', marginBottom: 12 },
  card: { flexDirection: 'row', flexWrap: 'wrap', backgroundColor: theme.surface, borderRadius: 18, padding: 16, borderWidth: 1, borderColor: theme.border, marginBottom: 20 },
  tx: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.surface, borderRadius: 14, padding: 12, marginBottom: 8, gap: 12 },
  txIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
});
