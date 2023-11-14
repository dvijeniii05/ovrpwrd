/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

// const {getDefaultConfig} = require('metro-config');
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**

* Metro configuration
* https://facebook.github.io/metro/docs/configuration
*
* @type {import('metro-config').MetroConfig}
*/

const defaultConfig = getDefaultConfig(__dirname);
const { assetExts, sourceExts } = defaultConfig.resolver;

const config = {
  transformer: {
    unstable_allowRequireContext: true,
    inlineRequires: true,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...sourceExts, 'svg'],
    unstable_allowRequireContext: true,
  },
};
module.exports = mergeConfig(defaultConfig, config);
