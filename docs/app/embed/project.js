const files = {};

const requireAll = require.context('../../examples/directive', true);
requireAll.keys().forEach((file) => {
  file = file.replace(/^\.\//, '');
  if (file && file.length) {
    files[file] = '';
  }
});

export const project = {
  files: files,
  title: 'Directive Example',
  description: 'angular-infinite-scroll directive example',
  template: 'angular-cli',
  tags: ['angular', 'infinite', 'scroll', 'directive'],
  dependencies: {
    'angular-infinite-scroll': '*',
    'chance': '*',
    '@types/chance': '*'
  }
};