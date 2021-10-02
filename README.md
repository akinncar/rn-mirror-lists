# rn-mirror-lists

Mirror scroll lists for React Native

## Installation

```sh
yarn add rn-mirror-lists'
```

## Usage

```js
import { MirrorLists } from 'rn-mirror-lists';

// ...

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
```

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
