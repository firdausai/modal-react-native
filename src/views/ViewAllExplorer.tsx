import { useEffect, useRef, useState } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useSnapshot } from 'valtio';

import WalletItem, { ITEM_HEIGHT } from '../components/WalletItem';
import NavHeader from '../components/NavHeader';
import { RouterCtrl } from '../controllers/RouterCtrl';
import { ExplorerCtrl } from '../controllers/ExplorerCtrl';
import { OptionsCtrl } from '../controllers/OptionsCtrl';
import { WcConnectionCtrl } from '../controllers/WcConnectionCtrl';
import type { RouterProps } from '../types/routerTypes';
import useTheme from '../hooks/useTheme';
import { ThemeCtrl } from '../controllers/ThemeCtrl';
import { UiUtil } from '../utils/UiUtil';
import SearchBar from '../components/SearchBar';
import DataUtil from '../utils/DataUtil';

function ViewAllExplorer({
  isPortrait,
  windowHeight,
  windowWidth,
}: RouterProps) {
  const Theme = useTheme();
  const { isDataLoaded } = useSnapshot(OptionsCtrl.state);
  const { pairingUri } = useSnapshot(WcConnectionCtrl.state);
  const { themeMode } = useSnapshot(ThemeCtrl.state);
  const { wallets } = useSnapshot(ExplorerCtrl.state);
  const shouldLoadWallets = wallets.listings.length === 0;
  const [walletsLoading, setWalletsLoading] = useState(false);
  const loading = !isDataLoaded || !pairingUri || walletsLoading;
  const [search, setSearch] = useState('');
  const timer = useRef<NodeJS.Timeout | null>(null);

  const onChangeText = (value: string) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      setSearch(value);
    }, 200);
  };

  useEffect(() => {
    if (!loading) {
      UiUtil.layoutAnimation();
    }
  }, [loading]);

  useEffect(() => {
    async function getWallets() {
      if (shouldLoadWallets) {
        setWalletsLoading(true);
        await ExplorerCtrl.getWallets();
        setWalletsLoading(false);
      }
    }
    getWallets();
  }, [shouldLoadWallets]);

  return (
    <>
      <NavHeader onBackPress={RouterCtrl.goBack} shadow>
        <SearchBar onChangeText={onChangeText} style={styles.searchbar} />
      </NavHeader>
      {loading ? (
        <ActivityIndicator
          style={{ height: Math.round(windowHeight * 0.6) }}
          color={Theme.accent}
        />
      ) : (
        <FlatList
          data={DataUtil.getAllWallets({ search })}
          style={{
            height: Math.round(windowHeight * 0.6),
          }}
          contentContainerStyle={styles.listContentContainer}
          indicatorStyle={themeMode === 'dark' ? 'white' : 'black'}
          showsVerticalScrollIndicator
          numColumns={isPortrait ? 4 : 7}
          fadingEdgeLength={20}
          key={isPortrait ? 'portrait' : 'landscape'}
          getItemLayout={(_data, index) => ({
            length: ITEM_HEIGHT,
            offset: ITEM_HEIGHT * index,
            index,
          })}
          renderItem={({ item }) => (
            <WalletItem
              currentWCURI={pairingUri}
              walletInfo={item}
              style={{
                width: isPortrait
                  ? Math.round(windowWidth / 4)
                  : Math.round(windowWidth / 7),
              }}
            />
          )}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  listContentContainer: { paddingBottom: 12 },
  searchbar: { marginLeft: 16 },
});

export default ViewAllExplorer;
