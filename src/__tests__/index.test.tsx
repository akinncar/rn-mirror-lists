import React from 'react';
import { Image, Text } from 'react-native';
import { render } from '@testing-library/react-native';

import { MirrorLists } from '../index';

describe('<MirrorLists />', () => {
  test('should renders correctly', () => {
    const mockedData = [
      {
        id: Math.random(),
        image: 'https://avatars.githubusercontent.com/u/42688281?v=4',
        description: 'This guy is really amazing',
      },
    ];

    const container = render(
      <MirrorLists
        data={mockedData}
        keyExtractor={({ item }) => item.id.toString()}
        horizontalRenderItem={({ item }) => (
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
        )}
        verticalRenderItem={({ item }) => <Text>{item.description}</Text>}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test('should renders correctly with image and description', () => {
    const mockedData = [
      {
        id: 1,
        image: 'https://avatars.githubusercontent.com/u/42688281?v=4',
        description: 'This guy is really amazing',
      },
    ];

    const container = render(
      <MirrorLists
        data={mockedData}
        keyExtractor={({ item }) => item.id.toString()}
        horizontalRenderItem={({ item }) => (
          <Image
            testID="avatar"
            source={{ uri: item.image }}
            style={{
              width: 64,
              height: 64,
              marginHorizontal: 12,
              marginVertical: 8,
              borderRadius: 32,
            }}
          />
        )}
        verticalRenderItem={({ item }) => <Text>{item.description}</Text>}
      />
    );

    expect(container.getByTestId('avatar')).toBeTruthy();
    expect(container.getByText('This guy is really amazing')).toBeTruthy();
  });
});
