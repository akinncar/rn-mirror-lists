# rn-mirror-lists

Mirror scroll lists for React Native

<p align="center">
  <img src="assets/example1.gif" width="240"/>
  <img src="assets/example2.gif" width="240"/>
  <img src="assets/example3.gif" width="240"/>
</p>

## Installation

```sh
yarn add rn-mirror-lists
```

## Usage

```js
import { MirrorLists } from 'rn-mirror-lists';

// ...

const data = [
  {
    id: 1,
    image: 'https://avatars.githubusercontent.com/u/42688281?v=4',
    description: 'This guy is really amazing',
  },
];

// ...

<MirrorLists
  data={data}
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

## Contact

Akinn Rosa - [Github](https://github.com/akinncar) - **[akinncar@hotmail.com](mailto:akinncar@hotmail.com)**
