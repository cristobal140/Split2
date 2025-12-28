// babel.config.js
module.exports = function(api) {
  api.cache(true);
  return {
    // Este es el preset estándar que necesita Expo para funcionar
    presets: ['babel-preset-expo'], 
  };
};