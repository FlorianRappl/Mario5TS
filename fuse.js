const { FuseBox, WebIndexPlugin, QuantumPlugin, CopyPlugin, CSSPlugin } = require('fuse-box');
const isProduction = process.env.NODE_ENV === 'production';
const target = 'dist';
const source = 'src';
const name = isProduction ? 'index' : 'app';

function CopyAllPlugin(options) {
  const copy = CopyPlugin(options);
  const original = copy.transform;

  copy.transform = file => {
    file.context.hash = true;
    return original.call(copy, file);
  };
  return copy;
}

const fuse = FuseBox.init({
  homeDir: source,
  target: 'browser@es5',
  output: `${target}/$name.js`,
  sourceMaps: !isProduction,
  plugins: [
    CSSPlugin({
      group: 'style.css',
      outFile: `${target}/style.css`,
      minify: isProduction,
    }),
    CopyAllPlugin({
      useDefault: true,
      files: ['*.png', '*.jpg', '*.ttf', '*.mp3', '*.ogg'],
    }),
    !isProduction && WebIndexPlugin({
      template: `${source}/index.html`,
    }),
    isProduction &&
      QuantumPlugin({
        css: true,
        uglify: true,
        treeshake: true,
        bakeApiIntoBundle: name,
      }),
  ],
});

if (!isProduction) {
  fuse.dev();
}

const bundle = fuse.bundle(name);

if (!isProduction) {
  bundle.instructions(' > app.ts').hmr().watch();
} else {
  bundle.instructions('index.ts');
}

fuse.run();
