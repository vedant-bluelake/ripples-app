import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { theme } from '../../constants/theme';

const cats = ['All', 'Equity', 'Debt', 'Hybrid', 'Tax Saver'];
const baskets = [
  { name: 'Wealth Builder', risk: 'Moderate', returns: '18.4%', rating: 4.8, funds: 5, minSip: '₹5,000', tag: 'Popular' },
  { name: 'Conservative Growth', risk: 'Low', returns: '11.2%', rating: 4.6, funds: 4, minSip: '₹2,000', tag: 'Safe' },
  { name: 'Aggressive Alpha', risk: 'High', returns: '24.7%', rating: 4.5, funds: 6, minSip: '₹10,000', tag: 'High Return' },
  { name: 'Tax Shield Pro', risk: 'Moderate', returns: '15.8%', rating: 4.7, funds: 3, minSip: '₹1,500', tag: 'Tax Saver' },
];

export default function Baskets() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="MF Baskets" subtitle="300+ expertly curated baskets" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
          {cats.map((c, i) => (
            <View key={c} style={[styles.chip, i === 0 && styles.chipActive]}>
              <Text style={[styles.chipText, i === 0 && { color: '#0B1437' }]}>{c}</Text>
            </View>
          ))}
        </ScrollView>
        {baskets.map((b) => (
          <View key={b.name} style={styles.card}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <Text style={styles.title}>{b.name}</Text>
                  <View style={styles.tag}><Text style={styles.tagText}>{b.tag}</Text></View>
                </View>
                <Text style={styles.muted}>{b.funds} funds · Risk: {b.risk}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                <Ionicons name="star" size={14} color={theme.gold} />
                <Text style={{ color: theme.text, fontWeight: '600' }}>{b.rating}</Text>
              </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <View>
                <Text style={styles.muted}>3Y Returns</Text>
                <Text style={{ color: theme.success, fontWeight: '800', fontSize: 16 }}>{b.returns}</Text>
              </View>
              <View>
                <Text style={styles.muted}>Min SIP</Text>
                <Text style={{ color: theme.text, fontWeight: '700' }}>{b.minSip}</Text>
              </View>
              <TouchableOpacity style={styles.btn}><Text style={styles.btnText}>Invest</Text></TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  muted: { color: theme.muted, fontSize: 11, marginTop: 2 },
  title: { color: theme.text, fontWeight: '700', fontSize: 15 },
  chip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 999, backgroundColor: theme.surface, marginRight: 8 },
  chipActive: { backgroundColor: theme.gold },
  chipText: { color: theme.muted, fontSize: 12, fontWeight: '600' },
  card: { backgroundColor: theme.surface, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: theme.border, marginBottom: 12 },
  tag: { backgroundColor: theme.gold + '30', paddingHorizontal: 8, paddingVertical: 2, borderRadius: 999 },
  tagText: { color: theme.goldLight, fontSize: 10, fontWeight: '700' },
  btn: { backgroundColor: theme.gold, paddingHorizontal: 18, paddingVertical: 8, borderRadius: 10 },
  btnText: { color: '#0B1437', fontWeight: '700', fontSize: 12 },
});
