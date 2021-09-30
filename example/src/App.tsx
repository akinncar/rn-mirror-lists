import * as React from 'react';

import { View, Text, Image, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import RnMirrorLists from 'rn-mirror-lists';

const AVATAR_SIZE = 64
const AVATAR_MARGIN_HORIZONTAL_SIZE = 12
const AVATAR_PADDING_VERTICAL_SIZE = 8
const AVATAR_SEPARATOR_SIZE = 24

function Avatar({ item }) {
  return <Image 
    source={{ uri: item.image }}
    style={{ 
      width: AVATAR_SIZE, 
      height: AVATAR_SIZE, borderRadius: 32, 
      marginHorizontal: AVATAR_MARGIN_HORIZONTAL_SIZE,
      paddingVertical: AVATAR_PADDING_VERTICAL_SIZE,
    }}
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

export default function App() {
  const horizontalListRef = React.useRef(null)
  const verticalListRef = React.useRef(null)

  const [characters, setCharacters] = React.useState([])
  const [verticalListHeight, setVerticalListHeight] = React.useState(0)

  const [horizontalScrollActive, setHorizontalScrollActive] = React.useState(false)
  const [verticalScrollActive, setVerticalScrollActive] = React.useState(false)


  function onScrollHorizontal({ nativeEvent }) {
    if (verticalScrollActive) return

    const offset = (nativeEvent.contentOffset.x / (AVATAR_SIZE + AVATAR_MARGIN_HORIZONTAL_SIZE * 2)) * verticalListHeight;

    verticalListRef.current.scrollTo({ 
      animated: false, 
      y: offset,
    })
  }

  function onScrollVertical({ nativeEvent }) {
    if (horizontalScrollActive) return

    const offset = ((nativeEvent.contentOffset.y / verticalListHeight) * (AVATAR_SIZE + AVATAR_MARGIN_HORIZONTAL_SIZE * 2));

    horizontalListRef.current.scrollTo({ 
      animated: false, 
      x: offset,
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
      <ScrollView
        ref={horizontalListRef}
        style={{ minHeight: AVATAR_SIZE + AVATAR_PADDING_VERTICAL_SIZE }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHorizontal}
        onScrollBeginDrag={() => setHorizontalScrollActive(true)}
        onMomentumScrollEnd={() => setHorizontalScrollActive(false)}
        scrollEventThrottle={1}
        decelerationRate={"fast"}
        snapToInterval={AVATAR_SIZE + AVATAR_SEPARATOR_SIZE}
      >
         <View style={{ width: Dimensions.get('window').width * 0.5 - (AVATAR_SIZE / 2) - AVATAR_MARGIN_HORIZONTAL_SIZE }} /> 
          {characters.map(item => {
            return <Avatar item={item} key={item.id.toString()} />
          })}
         <View style={{ width: Dimensions.get('window').width * 0.5 - (AVATAR_SIZE / 2) - AVATAR_MARGIN_HORIZONTAL_SIZE }} />
      </ScrollView>
      <ScrollView
        ref={verticalListRef}
        onLayout={({ nativeEvent }) => setVerticalListHeight(nativeEvent.layout.height)}
        onScroll={onScrollVertical}
        onScrollBeginDrag={() => setVerticalScrollActive(true)}
        onMomentumScrollEnd={() => setVerticalScrollActive(false)} 
        scrollEventThrottle={1}
        snapToInterval={verticalListHeight}
        decelerationRate={"fast"}
      >
        {characters.map(item => {
          return <Information item={item} height={verticalListHeight} key={item.id.toString()} />
        })}  
      </ScrollView>
    </SafeAreaView>
  );
}