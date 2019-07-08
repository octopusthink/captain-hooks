# `@octopusthink/react-use-generated-id`

A React hook that generates a random, consistent ID for a component. Takes a single argument: `id`. This allows your component to always have a unique ID available; either the user-supplied ID or a generated one.

The ID we generate is consistent across renders, as it is stored in the component's state.

## Usage

```jsx
import useGeneratedId from '@octopusthink/react-use-generated-id';
import React from 'react';

const MyComponent = (props) => {
  const { children, id, ...otherProps } = props;

  // Will use an `id` prop if supplied but will generate an ID to use if
  // `props.id` is `undefined`.
  const generatedId = useGeneratedId(id);

  return (
    <div id={generatedId} {...otherProps}>
      {children}
    </div>
  );
};
```

<small>Part of Octopus Think's [`captain-hooks`](https://github.com/octopusthink/captain-hooks/) project. Yaarrrrr! 🏴‍☠️</small>
