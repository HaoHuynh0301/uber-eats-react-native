# bower-auto-release

This **node module** will publish your package to a bower registry.
Ideally you would **only publish to npm**, but as many older projects still use bower, this is sometime an unfortunate necessity.

## How to enable bower publishing for your existing npm module

Assuming you already defined an npm module in CI and already use the incredible [wnpm-release](https://github.com/wix/wnpm-ci) script to automatically bump your module's version, all you have to do to publish your package to bower is follow these simple steps:

### Add bower.json to your project

Just run the command `bower init`, and answer truthfully to all questions :P

### When using a PRIVATE bower registry: Add .bowerrc to your project

**Notice: This is critical so that you work against your private bower registry.**

### Run bower-auto-release in your release script

```json
{
  "name": "my-package",
  "version": "1.0.0",
  "scripts": {
    "build": ":", 
    "test": ":",
    "release": "wnpm-release; bower-auto-release",
    "postpublish": "rm -f npm-shrinkwrap.json"
  },
  "devDependencies": {
    "wnpm-ci": "*",
    "bower-auto-release": "*"
  }
}
```

### The `--dist` option

By default the contents of your post-build dist folder are copied to the bower component's root folder. You can change this using the `--dist` option. 

For example to copy the contents of the `build` output folder you would use: `bower-auto-release --dist build`

Or, to copy everything simply use `--dist .` (note that in this case `dist` will be removed from `.gitignore` on the bower-component branch).

### The `--git-repo` option

By default the output of your project is pushed to a branch on its own repository (designated by the `GIT_REMOTE_URL` environment variable). You can change this by pointing to a different repository using the `--git-repo` option.
 
For example: `bower-auto-release --git-repo git@github.com:wix/my-library-bower-component`

This option is typically used on monorepos that have multiple bower components to release. Since bower's design dictates one-to-one relationship between published component and git repository, you should create a separate repository for publishing and pass it using this option.

### The `--branch` option

By default your project is published to a branch named `${package-name}-bower-component`. You can change this using the `--branch` option.

For example: `bower-auto-release --branch kuku`

In case you use a separate repository for publishing to bower from a monorepo as described above, it would make sense to do something like this: 
`bower-auto-release --git-repo git@github.com:wix/my-library-bower-component --branch master`

### Your package is automatically registered to bower

Once you're build is complete in CI, your package can be installed with - 
```sh
bower install package-name
```
where `package-name` is the name you gave your package in `bower init` above
