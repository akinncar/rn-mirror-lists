import * as React from 'react';

import { View, Text, Image, SafeAreaView } from 'react-native';
import { MirrorLists } from 'rn-mirror-lists';

import useSWR from 'swr';

function Avatar({ item }: { item: Character }) {
  return (
    <Image
      source={{ uri: item.image }}
      style={{
        width: 64,
        height: 64,
        marginHorizontal: 12,
        marginVertical: 8,
        borderRadius: 32,
      }}
    />
  );
}

function Information({ item }: { item: Character }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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

type Response = {
  results: Array<Character>;
};

type Character = {
  id: number;
  image: string;
};

export default function App() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error } = useSWR<Response>(
    'https://rickandmortyapi.com/api/character',
    fetcher
  );

  if (error) return <Text>Failed to load</Text>;
  if (!data) return <Text>loading...</Text>;

  return (
    <SafeAreaView style={{ flex: 1 }}>
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
