module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?|cjx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx','cjs', 'json', 'node'],
    // Add any other Jest configuration you need
  };
  