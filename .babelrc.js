// in tests - jest sets NODE_ENV to 'test'
const isTest = String(process.env.NODE_ENV) === 'test';
const envPreset = ["env"];
if (!isTest) {
  // if not test - enable tree shaking by webpack
  envPreset.push({"modules": false});
}

module.exports = {
  "presets": [
    envPreset,
    "react"
  ],
  "plugins": [
    "transform-class-properties",
    "transform-object-rest-spread",
    "transform-react-jsx-source",
    "syntax-dynamic-import"
  ]
};
