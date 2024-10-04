module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};

module.exports = {
  presets: ['@babel/preset-env'],
  plugins: [
    // Outros plugins
    'transform-inline-environment-variables'
  ]
};

