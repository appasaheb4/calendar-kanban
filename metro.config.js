// const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

// /**
//  * Metro configuration
//  * https://reactnative.dev/docs/metro
//  *
//  * @type {import('@react-native/metro-config').MetroConfig}
//  */
// const config = {};

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);

const {getDefaultConfig} = require('metro-config');

module.exports = (async () => {
  const {
    resolver: {sourceExts, assetExts},
  } = await getDefaultConfig();

  return {
    resolver: {
      sourceExts: [...sourceExts, 'web.js', 'web.ts', 'web.tsx'],
      extraNodeModules: {
        'react-native-linear-gradient': require.resolve(
          'react-native-web-linear-gradient',
        ),
      },
    },
  };
})();
