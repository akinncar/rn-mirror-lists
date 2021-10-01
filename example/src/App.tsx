import * as React from 'react';

import { View, Text, Image, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import RnMirrorLists from 'rn-mirror-lists';

function Avatar({ item }) {
  return <Image 
    source={{ uri: item.image }}
    style={{ 
      width: 64, 
      height: 64, 
      marginHorizontal: 12,
      marginVertical: 8,
      borderRadius: 32, 
    }}
  />
}

function Information({ item }) {
  return <View style={{
      flex: 1, 
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

  const [horizontalItemWidth, setHorizontalItemWidth] = React.useState(0)
  const [horizontalItemHeight, setHorizontalItemHeight] = React.useState(0)
  
  const [verticalListHeight, setVerticalListHeight] = React.useState(0)

  const [horizontalScrollActive, setHorizontalScrollActive] = React.useState(false)
  const [verticalScrollActive, setVerticalScrollActive] = React.useState(false)


  function onScrollHorizontal({ nativeEvent }) {
    if (verticalScrollActive) return

    const offset = (nativeEvent.contentOffset.x / horizontalItemWidth) * verticalListHeight;

    verticalListRef.current.scrollTo({ 
      animated: false, 
      y: offset,
    })
  }

  function onScrollVertical({ nativeEvent }) {
    if (horizontalScrollActive) return

    const offset = ((nativeEvent.contentOffset.y / verticalListHeight) * horizontalItemWidth);

    horizontalListRef.current.scrollTo({ 
      animated: false, 
      x: offset,
    })
  }

  function onHorizontalItemLayout({ nativeEvent }) {
    if(!horizontalItemWidth && !horizontalItemHeight) {
      setHorizontalItemWidth(nativeEvent.layout.width)
      setHorizontalItemHeight(nativeEvent.layout.height)
    }
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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        ref={horizontalListRef}
        style={{ flexGrow: 0.05 }}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHorizontal}
        onScrollBeginDrag={() => setHorizontalScrollActive(true)}
        onMomentumScrollEnd={() => setHorizontalScrollActive(false)}
        scrollEventThrottle={1}
        decelerationRate={"fast"}
        snapToInterval={horizontalItemWidth}
      >
          <View style={{ width: Dimensions.get('window').width * 0.5 - (horizontalItemWidth / 2) }} /> 
            {characters.map(item => {
              return (
                <View key={item.id.toString()} onLayout={onHorizontalItemLayout}>
                  <Avatar item={item} />
                </View>
              )
            })}
          <View style={{ width: Dimensions.get('window').width * 0.5 - (horizontalItemWidth / 2) }} />
      </ScrollView>
      <ScrollView
        ref={verticalListRef}
        style={{ flex: 0.95 }}
        onLayout={({ nativeEvent }) => setVerticalListHeight(nativeEvent.layout.height)}
        onScroll={onScrollVertical}
        onScrollBeginDrag={() => setVerticalScrollActive(true)}
        onMomentumScrollEnd={() => setVerticalScrollActive(false)} 
        scrollEventThrottle={1}
        snapToInterval={verticalListHeight}
        decelerationRate={"fast"}
      >
        {characters.map(item => {
          return (
            <View style={{ height: verticalListHeight }} key={item.id.toString()}>
              <Information item={item} />
            </View>
          )
        })}  
      </ScrollView>
    </SafeAreaView>
  );
}