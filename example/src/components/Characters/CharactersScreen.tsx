import * as React from 'react';

import { Text, SafeAreaView } from 'react-native';
import { MirrorLists } from 'rn-mirror-lists';

import useSWR from 'swr';

import { Avatar } from './Avatar';
import { Information } from './Information';
import type { Character } from './CharacterTypes';

type Response = {
  results: Array<Character>;
};

export function CharactersScreen() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR<Response>(
    'https://rickandmortyapi.com/api/character',
    fetcher
  );

  if (error) return <Text>Failed to load</Text>;
  if (!data) return <Text>loading...</Text>;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <MirrorLists
        data={data.results}
        keyExtractor={({ item }: { item: Character }) => item.id.toString()}
        horizontalRenderItem={({ item }: { item: Character }) => (
          <Avatar item={item} />
        )}
        verticalRenderItem={({ item }: { item: Character }) => (
          <Information item={item} />
        )}
      />
    </SafeAreaView>
  );
}
