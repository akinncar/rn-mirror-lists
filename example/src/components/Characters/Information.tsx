import * as React from 'react';

import { View, Text, Image } from 'react-native';

import type { Character } from './CharacterTypes';

export function Information({ item }: { item: Character }) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{ width: 64, height: 64, borderRadius: 32 }}
      />
      <Text style={{ padding: 16 }}>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum
      </Text>
    </View>
  );
}
