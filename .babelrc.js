// 'modules:false' enables webpack's tree shaking, but breaks jest, so should be defaulted for tests
const envPresetOptions = { "modules": false };

if (process.env.NODE_ENV === 'test') {
  envPresetOptions["modules"] = 'commonjs';
  envPresetOptions["targets"] = { "node": "current" };
}

module.exports = {
  "presets": [
    ["env", envPresetOptions],
    "react"
  ],
  "plugins": [
    "transform-class-properties",
    "transform-object-rest-spread",
    "transform-react-jsx-source",
    "syntax-dynamic-import"
  ]
};
