const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Add support for CSS
config.transformer.unstable_allowRequireContext = true;

// Resolve .css files
config.resolver.sourceExts.push('css');

module.exports = config;