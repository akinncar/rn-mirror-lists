# rn-mirror-lists

Mirror scroll lists for React Native

<center>
  <img src="assets/example1.gif" width="250"/>
  <img src="assets/example2.gif" width="250"/>
  <img src="assets/example3.gif" width="250"/>
</center>

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

## Example App

You can run the exmaple app on `/example` folder.

```sh
cd example && yarn start
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
