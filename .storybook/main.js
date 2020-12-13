module.exports = {
  "stories": [
    // "../src/**/*.stories.mdx",
    // "../src/**/*.stories.@(js|jsx|ts|tsx)"
    "../src/welcome/*.stories.tsx",
    "../src/components/**/*.stories.tsx"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/preset-create-react-app"
  ]
}