# rn-mirror-lists

Mirror scroll lists for React Native

## Installation

```sh
yarn add rn-mirror-lists
```

## Usage

```js
import { MirrorLists } from 'rn-mirror-lists';

// ...

<MirrorLists
  data={data.results}
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
  verticalRenderItem={({ item }) => (
    <Text>{item.description}</Text>
  )}
  reverse={false} // optional
/>
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
