import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  ViewStyle,
} from 'react-native';
import { useSnapshot } from 'valtio';

import { ModalCtrl } from '../controllers/ModalCtrl';
import { DarkTheme, LightTheme } from '../constants/Colors';
import { AccountCtrl } from '../controllers/AccountCtrl';
import { ClientCtrl } from '../controllers/ClientCtrl';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export function Web3Button({ style }: Props) {
  const Theme = useColorScheme() === 'dark' ? DarkTheme : LightTheme;
  const { isConnected } = useSnapshot(AccountCtrl.state);
  const { initialized } = useSnapshot(ClientCtrl.state);

  return (
    <TouchableOpacity
      onPress={() => ModalCtrl.open()}
      style={[
        styles.container,
        { backgroundColor: Theme.accent, borderColor: Theme.overlayThin },
        style,
      ]}
      disabled={!initialized}
    >
      {initialized ? (
        isConnected ? (
          <Text style={styles.text}>View Account</Text>
        ) : (
          <Text style={styles.text}>Connect</Text>
        )
      ) : (
        <ActivityIndicator color="white" />
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    width: 150,
    height: 50,
    borderWidth: 1,
  },
  text: {
    color: 'white',
    fontWeight: '700',
  },
});
