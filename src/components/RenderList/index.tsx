import React, {
    useEffect,
    useCallback,
    useRef
} from 'react';

import {
    View,
    FlatList,
    Text
} from 'react-native';

import { useContexState } from '../../hooks/context';
import { useLoadPage } from '../../hooks/loadPage';

import { ListFooter } from '../../components/ListFooter';
import { ListHeader } from '../../components/ListHeader';
import { ListItem } from '../../components/ListItem';

import { styles } from './styles';

export function RenderList() {
    const { LoadPage } = useLoadPage();

    const {
        listData,
        getList,
        responceArray,
        sortNumber
    } = useContexState();

    const refContainer = useRef<FlatList>(null);
    const responceNumber = responceArray[0]

    useEffect(() => {
        if (responceNumber) {
            refContainer.current?.scrollToIndex({
                index: 0,
                animated: false,
            });
        } else {
            LoadPage();
        }
    }, [responceNumber]);

    const RenderItem = useCallback(
        ({ item }) =>
            <ListItem data={item} list={getList} />,
        [getList]
    );

    const KeyExtractor = useCallback(
        (item) => item.id.toString(), []
    );

    function SortNumberSelect() {
        if (sortNumber === 'default') { return listData };

        return listData.map((i, index) => {
            return {
                firstCard: responceArray
                    .sort((x, y) => x.number - y.number)[index]?.number,
                id: String(index)
            };
        });
    };

    return (
        <View style={styles.listContainer}>
            <FlatList
                contentContainerStyle={{ alignItems: 'center' }}
                removeClippedSubviews={false}
                viewabilityConfig={{
                    viewAreaCoveragePercentThreshold: 10,
                }}
                ref={refContainer}
                numColumns={6}
                initialNumToRender={10}
                key="list"
                data={SortNumberSelect()}
                windowSize={80}
                showsVerticalScrollIndicator={false}
                renderItem={RenderItem}
                keyExtractor={KeyExtractor}
                updateCellsBatchingPeriod={50}
                ListHeaderComponent={ListHeader}
                ListFooterComponent={ListFooter}
            />
        </View>
    );
};
