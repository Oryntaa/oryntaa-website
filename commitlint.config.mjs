// Conventional Commits (DEVELOPMENT_WORKFLOW §3). Adds the `content` type used for
// founder/content edits (e.g. `content(insights): publish mvp-scoping article`).
const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'content',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
};

export default config;
