# Integrating with NextJS

This page explains how to integrate BuckeyeUI with a NextJS app.

?> This is a community-maintained document. Please [ask the community](/resources/community) if you have questions about this integration. You can also [suggest improvements](https://github.com/bfdeloitte/buckeye-ui/blob/main/docs/tutorials/integrating-with-nextjs.md) to make it better.

## Requirements

This integration has been tested with the following:

- Node: 16.13.1
- NextJS: 12.1.6
- BuckeyeUI: 2.0.0-beta.74

## Instructions

To get started using BuckeyeUI with NextJS, the following packages must be installed.

```bash
yarn add buckeye-ui copy-webpack-plugin next-compose-plugins next-transpile-modules
```

### Enabling ESM

Because BuckeyeUI utilizes ESM, we need to modify our `package.json` to support ESM packages. Simply add the following to
your root of `package.json`:

```
"type": "module"
```

There's one more step to enable ESM in NextJS, but we'll tackle that in our Next configuration modification.

### Importing the Default Theme

The next step is to import BuckeyeUI's default theme (stylesheet) in your `_app.js` file:

```css
import 'buckeye-ui/dist/themes/light.css';
```

### Defining Custom Elements

After importing the theme, you'll need to import the JavaScript files for BuckeyeUI. However, this is a bit tricky to do in NextJS thanks to the SSR environment not having any of the required browser APIs to define endpoints.

We'll want to create a component that uses [React's `useLayoutEffect`](https://reactjs.org/docs/hooks-reference.html#uselayouteffect) to add in the custom components before the first render:

```javascript
function CustomEls({ URL }) {
  // useRef to avoid re-renders
  const customEls = useRef(false);

  useLayoutEffect(() => {
    if (customEls.current) {
      return;
    }

    import('buckeye-ui/dist/utilities/base-path').then(({ setBasePath }) => {
      setBasePath(`${URL}/static/static`);

      // This imports all components
      import('buckeye-ui/dist/buckeye');
      // If you're wanting to selectively import components, replace this line with your own definitions

      // import("buckeye-ui/dist/components/button/button");
      customEls.current = true;
    });
  }, [URL, customEls]);

  return null;
}
```

?> If we use `useEffect` instead of `useLayoutEffect`, the initial render will occur with the expected `bui-` props applied, but the subsequent render (caused by the `useEffect`) will remove those props as the custom components initialize. We _must_ use `useLayoutEffect` to have expected behavior

?> This will import all BuckeyeUI components for convenience. To selectively import components, refer to the [Using webpack](/getting-started/installation?id=using-webpack) section of the docs.

You may be wondering where the `URL` property is coming from. We'll address that in the next few sections.

### Using Our New Component In Code

While we need to use `useLayoutEffect` for the initial render, NextJS will throw a warning at us for trying to use `useLayoutEffect` in SSR, which is disallowed. To fix this problem, we'll conditionally render the `CustomEls` component to only render in the browser

```javascript
function MyApp({ Component, pageProps, URL }) {
  const isBrowser = typeof window !== 'undefined';
  return (
    <>
      {isBrowser && <CustomEls URL={URL} />}
      <Component {...pageProps} />
    </>
  );
}
```

### Environmental Variable

However, to make `setBasePath()` work as-expected, we need to know where the file is hosted. To do this, we need to set [environmental variables](https://nextjs.org/docs/basic-features/environment-variables). Create a `.local.env` file and put the following inside:

```
BASE_URL="localhost:3000"
```

Then, modify your `MyApp` class in `_app.js` to pass this process environment into your render:

```javascript
MyApp.getInitialProps = async context => {
  const URL = process.env.BASE_URL;

  return {
    URL
  };
};
```

?> You'll need to set this `BASE_URL` variable inside the build process of whatever local build or CI/CD you have. This will need to be an absolute URL, as a relative URL will cause BuckeyeUI to throw a warning

### webpack Config

Next we need to add BuckeyeUI's assets to the final build output. To do this, modify `next.config.js` to look like this.

```javascript
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import CopyPlugin from 'copy-webpack-plugin';
import withPlugins from 'next-compose-plugins';
import withTM from 'next-transpile-modules';

const withTMCompiled = withTM(['buckeye-ui']);

const __dirname = dirname(fileURLToPath(import.meta.url));

export default withPlugins([withTMCompiled], {
  // This is required for ESM to work properly with BuckeyeUI
  experimental: { esmExternals: 'loose' },
  webpack: config => {
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: resolve(__dirname, 'node_modules/buckeye-ui/dist/assets/icons'),
            to: resolve(__dirname, 'static/icons')
          }
        ]
      })
    );
    return config;
  }
});
```

?> This will copy the files from `node_modules` into your `static` folder on every development serve or build. You may want to avoid committing these into your repo. To do so, simply add `static/assets` into your `.gitignore` folder

## Additional Resources

- There is a third-party [example repo](https://github.com/crutchcorn/nextjs-shoelace-example), courtesy of [crutchcorn](https://github.com/crutchcorn), available to help you get started.
