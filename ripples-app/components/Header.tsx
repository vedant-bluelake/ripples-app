import { View, Image, Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../constants/theme';

export function Header({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <SafeAreaView edges={['top']} style={{ backgroundColor: theme.bg }}>
      <View style={styles.row}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{title}</Text>
          {subtitle ? <Text style={styles.sub}>{subtitle}</Text> : null}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 12, gap: 12 },
  logo: { width: 40, height: 40 },
  title: { color: theme.text, fontSize: 18, fontWeight: '700' },
  sub: { color: theme.muted, fontSize: 12, marginTop: 2 },
});
