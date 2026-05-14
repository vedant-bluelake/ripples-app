import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { theme } from '../../constants/theme';

const actions = [
  { icon: 'wallet', label: 'Invest' },
  { icon: 'grid', label: 'Baskets' },
  { icon: 'pie-chart', label: 'D.I.Y.' },
  { icon: 'people', label: 'Partners' },
] as const;

const holdings = [
  { name: 'Ripples Growth Basket', value: '₹2,45,800', returns: '+18.4%' },
  { name: 'HDFC Mid Cap Fund', value: '₹1,12,350', returns: '+12.7%' },
  { name: 'Axis Bluechip Fund', value: '₹89,200', returns: '+8.2%' },
];

export default function Home() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Good Morning" subtitle="Rahul Sharma" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <View style={styles.portfolioCard}>
          <Text style={styles.muted}>Total Portfolio Value</Text>
          <Text style={styles.bigValue}>₹4,47,350</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
            <Ionicons name="trending-up" size={14} color={theme.success} />
            <Text style={{ color: theme.success, fontWeight: '700' }}>+₹52,340 (13.2%)</Text>
          </View>
        </View>

        <View style={styles.actions}>
          {actions.map((a) => (
            <View key={a.label} style={styles.actionItem}>
              <View style={styles.actionIcon}>
                <Ionicons name={a.icon as any} size={22} color={theme.gold} />
              </View>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </View>
          ))}
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <Text style={styles.section}>Your Holdings</Text>
          <Text style={{ color: theme.gold, fontSize: 12, fontWeight: '600' }}>View All</Text>
        </View>
        {holdings.map((h) => (
          <TouchableOpacity key={h.name} style={styles.holding}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontWeight: '600' }}>{h.name}</Text>
              <Text style={styles.muted}>{h.value}</Text>
            </View>
            <Text style={{ color: theme.success, fontWeight: '700' }}>{h.returns}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  muted: { color: theme.muted, fontSize: 12 },
  portfolioCard: { backgroundColor: theme.surface, borderRadius: 20, padding: 18, borderWidth: 1, borderColor: theme.gold + '40', marginBottom: 20 },
  bigValue: { color: theme.text, fontSize: 28, fontWeight: '800', marginTop: 6 },
  actions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  actionItem: { alignItems: 'center', gap: 6 },
  actionIcon: { width: 56, height: 56, borderRadius: 16, backgroundColor: theme.gold + '20', alignItems: 'center', justifyContent: 'center' },
  actionLabel: { color: theme.muted, fontSize: 11, fontWeight: '600' },
  section: { color: theme.text, fontSize: 16, fontWeight: '700' },
  holding: { backgroundColor: theme.surface, borderRadius: 14, padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
});
