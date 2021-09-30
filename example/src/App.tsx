import * as React from 'react';

import { View, Text, FlatList, Image, SafeAreaView, Dimensions } from 'react-native';
import RnMirrorLists from 'rn-mirror-lists';

const AVATAR_SIZE = 64
const AVATAR_PADDING_VERTICAL_SIZE = 8
const AVATAR_SEPARATOR_SIZE = 24

function Avatar({ item }) {
  return <Image 
    source={{ uri: item.image }}
    style={{ width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: 32, paddingVertical: AVATAR_PADDING_VERTICAL_SIZE }}
  />
}

function Information({ item, height }) {
  return <View style={{
      flex: 1, 
      height: height,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Image 
      source={{ uri: item.image }}
      style={{ width: 64, height: 64, borderRadius: 32 }}
    />
    <Text style={{ padding: 16 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</Text>
  </View>
}

function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default function App() {
  const horizontalFlatListRef = React.useRef(null)
  const verticalFlatListRef = React.useRef(null)

  const [characters, setCharacters] = React.useState([])
  const [verticalListHeight, setVerticalListHeight] = React.useState(0)

  function onMomentumScrollEndHorizontal({ nativeEvent }) {
    const index = Math.round(nativeEvent.contentOffset.x / (AVATAR_SIZE + AVATAR_SEPARATOR_SIZE));

    verticalFlatListRef.current.scrollToIndex({ 
      animated: true, 
      index: index,
    })
  }

  function onMomentumScrollEndVertical({ nativeEvent }) {
    const index = Math.round(nativeEvent.contentOffset.y / verticalListHeight);

    horizontalFlatListRef.current.scrollToIndex({ 
      animated: true, 
      index: index,
      viewOffset: Dimensions.get('window').width * 0.5 - (AVATAR_SIZE / 2)
    })
  }
  
  async function getCharacters() {
    const response = await fetch('https://rickandmortyapi.com/api/character')
    const data = await response.json()
    setCharacters(data.results)
  }

  React.useEffect(() => {
    getCharacters()
  }, [])

  return (
    <SafeAreaView style={{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <FlatList
        ref={horizontalFlatListRef}
        style={{ minHeight: AVATAR_SIZE + AVATAR_PADDING_VERTICAL_SIZE }}
        onMomentumScrollEnd={onMomentumScrollEndHorizontal}
        horizontal
        data={characters}
        showsHorizontalScrollIndicator={false}
        decelerationRate={"fast"}
        snapToInterval={AVATAR_SIZE + AVATAR_SEPARATOR_SIZE}
        ListHeaderComponent={
          <View style={{ width: Dimensions.get('window').width * 0.5 - (AVATAR_SIZE / 2) }} /> 
          // half windows size - half avatar size
        }
        ListFooterComponent={
          <View style={{ width: Dimensions.get('window').width * 0.5 - (AVATAR_SIZE / 2) }} />
          // half windows size - half avatar size
        }
        ItemSeparatorComponent={() => <View style={{ width: AVATAR_SEPARATOR_SIZE }} />}
        renderItem={({ item }) => <Avatar item={item} />}
        keyExtractor={item => item.id.toString()}
      />
      <FlatList
        ref={verticalFlatListRef}
        onLayout={({ nativeEvent }) => setVerticalListHeight(nativeEvent.layout.height)}
        onMomentumScrollEnd={onMomentumScrollEndVertical} 
        data={characters}
        snapToInterval={verticalListHeight}
        decelerationRate={"fast"}
        renderItem={({ item }) => <Information item={item} height={verticalListHeight}/>}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}