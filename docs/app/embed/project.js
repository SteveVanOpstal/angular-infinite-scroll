const files = {};
const ACCEPTED_EXTENTIONS = ['html', 'js', 'ts', 'json']

    const requireAll = require.context('../../examples/directive', true);
requireAll.keys().forEach((file) => {
  file = file.replace(/^\.\//, '');
  const ext = file.split('.').pop();
  if (file && file.length && ACCEPTED_EXTENTIONS.indexOf(ext) > -1) {
    files[file] = '';
  }
});

export const project = {
  files: files,
  title: 'Directive Example',
  description: 'angular-infinite-scroll directive example',
  template: 'angular-cli',
  tags: ['angular', 'infinite', 'scroll', 'directive'],
  dependencies: {'angular-infinite-scroll': '*', 'chance': '*', '@types/chance': '*'}
};