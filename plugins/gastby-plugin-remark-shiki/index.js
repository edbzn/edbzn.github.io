// @ts-check

import { getSingletonHighlighter } from 'shiki';
import { visit } from 'unist-util-visit';

export default async function (
  { markdownAST },
  {
    theme = 'github-dark-default',
    langs = [
      'text',
      'vue',
      'angular-ts',
      'javascript',
      'typescript',
      'bash',
      'html',
      'json',
      'docker',
      'tsx',
      'yaml',
      'yml',
      'css',
      'scss',
      'shellscript',
      'bash',
    ],
  }
) {
  if (!markdownAST) {
    return markdownAST;
  }

  const highlighter = await getSingletonHighlighter({ themes: [theme], langs });

  visit(markdownAST, 'code', (node) => {
    node.type = 'html';
    node.children = [];

    if (!node.lang) {
      node.value = `<pre class="shiki-unknown"><code>${node.value}</code></pre>`;
      return;
    }

    node.value = highlighter.codeToHtml(node.value, {
      lang: node.lang,
      theme,
    });
  });

  return markdownAST;
}
