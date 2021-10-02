import * as React from 'react';

import { View, Image } from 'react-native';

import type { Character } from './CharacterTypes';

export function Avatar({ item }: { item: Character }) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: 64,
          height: 64,
          margin: 12,
          borderRadius: 32,
        }}
      />
    </View>
  );
}
