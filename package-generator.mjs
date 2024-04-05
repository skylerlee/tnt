import * as fs from 'node:fs';
import * as path from 'node:path';
import { Reporter } from '@parcel/plugin';

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
        const distDir = targets[0].distDir;
        const packageSrc = JSON.parse(packageFile);
        const packageOut = {};
        fs.writeFileSync(path.join(distDir, 'package.json'), JSON.stringify(packageOut, null, 2));
      }
    }
  },
});

export default packageGenerator;
