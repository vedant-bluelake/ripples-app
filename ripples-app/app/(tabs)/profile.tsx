import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from '../../components/Header';
import { theme } from '../../constants/theme';

const items = [
  { icon: 'person-circle', label: 'Personal Details', desc: 'KYC, PAN, Aadhaar' },
  { icon: 'card', label: 'Bank Accounts', desc: 'Linked bank accounts' },
  { icon: 'document-text', label: 'Reports & Statements', desc: 'Capital gains, holdings' },
  { icon: 'shield-checkmark', label: 'Security', desc: 'PIN, biometrics, 2FA' },
  { icon: 'settings', label: 'Preferences', desc: 'Notifications, language' },
  { icon: 'help-circle', label: 'Help & Support', desc: 'FAQs, contact us' },
] as const;

export default function Profile() {
  return (
    <View style={{ flex: 1, backgroundColor: theme.bg }}>
      <Header title="Profile" />
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 32 }}>
        <View style={styles.userCard}>
          <View style={styles.avatar}><Text style={{ color: '#0B1437', fontWeight: '800', fontSize: 18 }}>RS</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.text, fontWeight: '700', fontSize: 15 }}>Rahul Sharma</Text>
            <Text style={styles.muted}>rahul.sharma@email.com</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 }}>
              <Ionicons name="shield-checkmark" size={12} color={theme.success} />
              <Text style={{ color: theme.success, fontSize: 11, fontWeight: '600' }}>KYC Verified</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color={theme.muted} />
        </View>

        <View style={styles.premium}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: theme.goldLight, fontWeight: '800' }}>RIPPLES™ Premium</Text>
            <Text style={styles.muted}>Unlock advanced tools & baskets</Text>
          </View>
          <TouchableOpacity style={styles.upBtn}><Text style={styles.upBtnText}>Upgrade</Text></TouchableOpacity>
        </View>

        {items.map((it) => (
          <TouchableOpacity key={it.label} style={styles.row}>
            <View style={styles.iconBox}><Ionicons name={it.icon as any} size={18} color={theme.muted} /></View>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.text, fontWeight: '600' }}>{it.label}</Text>
              <Text style={styles.muted}>{it.desc}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={theme.muted} />
          </TouchableOpacity>
        ))}

        <TouchableOpacity style={[styles.row, { marginTop: 8 }]}>
          <View style={[styles.iconBox, { backgroundColor: theme.loss + '20' }]}><Ionicons name="log-out" size={18} color={theme.loss} /></View>
          <Text style={{ color: theme.loss, fontWeight: '600' }}>Log Out</Text>
        </TouchableOpacity>

        <Text style={[styles.muted, { textAlign: 'center', marginTop: 16 }]}>RIPPLES™ v2.1.0 · Blue Lake Capital™</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  muted: { color: theme.muted, fontSize: 11 },
  userCard: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: theme.surface, borderRadius: 18, padding: 14, borderWidth: 1, borderColor: theme.border, marginBottom: 16 },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: theme.gold, alignItems: 'center', justifyContent: 'center' },
  premium: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.gold + '25', borderWidth: 1, borderColor: theme.gold + '50', borderRadius: 16, padding: 14, marginBottom: 16 },
  upBtn: { backgroundColor: theme.gold, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  upBtnText: { color: '#0B1437', fontWeight: '700', fontSize: 12 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  iconBox: { width: 38, height: 38, borderRadius: 12, backgroundColor: theme.surface, alignItems: 'center', justifyContent: 'center' },
});
