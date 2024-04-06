const fs = require('node:fs');
const path = require('node:path');
const { Reporter } = require('@parcel/plugin');

const packageGenerator = new Reporter({
  async report({ event, options }) {
    if (event.type === 'buildSuccess') {
      const { projectRoot } = options;
      const packageFile = fs.readFileSync(path.join(projectRoot, 'package.json'));
      const targets = Array.from(
        new Set(
          event.bundleGraph
            .getBundles()
            .filter((b) => b.target?.distDir && b.target.env?.context === 'electron-main')
            .map((b) => b.target),
        ),
      );
      if (targets.length === 0) {
        console.error('Error: package-generator: cannot find "electron-main" target');
      } else {
        const distDir = path.dirname(targets[0].distDir);
        const packageSrc = JSON.parse(packageFile);
        const packageOut = {};
        copyProps(packageOut, packageSrc, ['name', 'version', 'repository', 'author', 'license']);
        Object.assign(packageOut, {
          main: 'main/index.js',
        });
        fs.writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(packageOut, null, 2));
      }
    }
  },
});

const copyProps = (tgt, src, propNames) => {
  for (const propName of propNames) {
    if (Object.hasOwn(src, propName)) {
      tgt[propName] = src[propName];
    }
  }
};

module.exports = packageGenerator;
