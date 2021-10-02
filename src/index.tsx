import * as React from 'react';

import {
  View,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  LayoutChangeEvent,
} from 'react-native';

interface ItemProps<Type> {
  item: Type;
}

export interface MirrorListsProps<Type> {
  data: Array<Type>;
  horizontalRenderItem(item: ItemProps<Type>): JSX.Element;
  verticalRenderItem(item: ItemProps<Type>): JSX.Element;
  keyExtractor(item: ItemProps<Type>): React.Key;
  reverse?: boolean;
}

export function MirrorLists<Type>({
  data,
  horizontalRenderItem,
  verticalRenderItem,
  keyExtractor,
  reverse = false,
}: MirrorListsProps<Type>) {
  const horizontalListRef = React.useRef<ScrollView>(null);
  const verticalListRef = React.useRef<ScrollView>(null);

  const [horizontalItemWidth, setHorizontalItemWidth] = React.useState(0);
  const [horizontalItemHeight, setHorizontalItemHeight] = React.useState(0);

  const [verticalListHeight, setVerticalListHeight] = React.useState(0);

  const [horizontalScrollActive, setHorizontalScrollActive] =
    React.useState(false);
  const [verticalScrollActive, setVerticalScrollActive] = React.useState(false);

  function onScrollHorizontal({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) {
    if (verticalScrollActive) return;

    const offset =
      (nativeEvent.contentOffset.x / horizontalItemWidth) * verticalListHeight;

    verticalListRef?.current?.scrollTo({
      animated: false,
      y: offset,
    });
  }

  function onScrollVertical({
    nativeEvent,
  }: NativeSyntheticEvent<NativeScrollEvent>) {
    if (horizontalScrollActive) return;

    const offset =
      (nativeEvent.contentOffset.y / verticalListHeight) * horizontalItemWidth;

    horizontalListRef?.current?.scrollTo({
      animated: false,
      x: offset,
    });
  }

  function onHorizontalItemLayout({ nativeEvent }: LayoutChangeEvent) {
    if (!horizontalItemWidth && !horizontalItemHeight) {
      setHorizontalItemWidth(nativeEvent.layout.width);
      setHorizontalItemHeight(nativeEvent.layout.height);
    }
  }

  return (
    <View
      style={[
        { flex: 1, flexDirection: reverse ? 'column-reverse' : 'column' },
      ]}
    >
      <ScrollView
        ref={horizontalListRef}
        style={{ flexGrow: 0 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHorizontal}
        onScrollBeginDrag={() => setHorizontalScrollActive(true)}
        onMomentumScrollEnd={() => setHorizontalScrollActive(false)}
        scrollEventThrottle={1}
        decelerationRate={'fast'}
        snapToInterval={horizontalItemWidth}
      >
        <View
          style={{
            width:
              Dimensions.get('window').width * 0.5 - horizontalItemWidth / 2,
          }}
        />
        {data.map((item) => {
          return (
            <View
              key={keyExtractor({ item })}
              onLayout={onHorizontalItemLayout}
            >
              {horizontalRenderItem({ item })}
            </View>
          );
        })}
        <View
          style={{
            width:
              Dimensions.get('window').width * 0.5 - horizontalItemWidth / 2,
          }}
        />
      </ScrollView>
      <ScrollView
        ref={verticalListRef}
        style={{ flex: 1 }}
        onLayout={({ nativeEvent }: LayoutChangeEvent) =>
          setVerticalListHeight(nativeEvent.layout.height)
        }
        onScroll={onScrollVertical}
        onScrollBeginDrag={() => setVerticalScrollActive(true)}
        onMomentumScrollEnd={() => setVerticalScrollActive(false)}
        scrollEventThrottle={1}
        snapToInterval={verticalListHeight}
        decelerationRate={'fast'}
      >
        {data.map((item) => {
          return (
            <View
              key={keyExtractor({ item })}
              style={{ height: verticalListHeight }}
            >
              {verticalRenderItem({ item })}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
