// @ts-check

import { createHighlighter } from 'shiki';
import { visit } from 'unist-util-visit';

export default async function (
  { markdownAST },
  {
    themes = ['aurora-x'],
    langs = [
      'angular-ts',
      'vue',
      'javascript',
      'typescript',
      'bash',
      'html',
      'json',
      'docker',
      'tsx',
    ],
  }
) {
  let highlighter;
  try {
    highlighter = await createHighlighter({
      themes,
      langs,
    });
  } catch (_) {
    throw new Error('Unable to load theme');
  }

  visit(markdownAST, 'code', (node) => {
    node.type = 'html';
    node.children = undefined;

    if (!node.lang) {
      node.value = `<pre class="shiki-unknown"><code>${node.value}</code></pre>`;
      return;
    }

    node.value = highlighter.codeToHtml(node.value, {
      lang: node.lang,
      theme: 'aurora-x',
    });
  });

  return markdownAST;
}
