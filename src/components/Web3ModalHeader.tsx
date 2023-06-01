import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';

import WCLogo from '../assets/LogoLockup.png';
import Close from '../assets/Close.png';
import { DarkTheme, LightTheme } from '../constants/Colors';

interface Web3ModalHeaderProps {
  onClose: () => void;
}

export function Web3ModalHeader({ onClose }: Web3ModalHeaderProps) {
  const Theme = useColorScheme() === 'dark' ? DarkTheme : LightTheme;

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.wcLogo} source={WCLogo} />
      <TouchableOpacity
        style={[styles.closeContainer, { backgroundColor: Theme.background1 }]}
        onPress={onClose}
        hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
      >
        <Image
          style={[styles.closeImage, { tintColor: Theme.foreground1 }]}
          source={Close}
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 46,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  wcLogo: {
    width: 181,
    height: 28,
  },
  closeImage: {
    width: 12,
    height: 12,
    tintColor: 'black',
  },

  closeContainer: {
    height: 28,
    width: 28,
    borderRadius: 14,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Web3ModalHeader;
