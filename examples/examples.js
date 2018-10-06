export const EXAMPLES = {};

function getAll(r) {
  r.keys().forEach(key => {
    let file = key.replace(/^\.\//, '');
    const directories = file.split('/');
    const example = directories.length ? directories[0] : 'error';
    file = file.substring(example.length + 1);
    if (file && file.length && directories.length) {
      if (!EXAMPLES[example]) {
        EXAMPLES[example] = {};
      }
      EXAMPLES[example][file] = '';
    }
  });
}

getAll(require.context('./', true, /\.(html|ts|css|json)$/));
