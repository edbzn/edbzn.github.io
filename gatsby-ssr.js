import * as React from 'react';

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(
    [
      'FiraCode-Regular',
      'FiraCode-Bold',
      'FiraCode-Medium',
      'FiraCode-Light',
    ].map((font) => (
      <link
        rel="preload"
        href={`/fonts/FiraCode/woff2/${font}.woff2`}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        key={font}
      />
    ))
  );
};
