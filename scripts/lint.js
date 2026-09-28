import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parse } from '@babel/parser';
import traversePkg from '@babel/traverse';

const traverse = traversePkg.default || traversePkg;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.resolve(__dirname, '../src');

const JS_GLOBALS = new Set([
  // ECMAScript standard globals
  'globalThis', 'window', 'document', 'console',
  'Math', 'Date', 'JSON', 'Object', 'Array', 'String', 'Number', 'Boolean', 'RegExp',
  'Map', 'Set', 'WeakMap', 'WeakSet', 'Promise', 'Symbol', 'BigInt', 'Intl',
  'Error', 'TypeError', 'RangeError', 'SyntaxError', 'ReferenceError', 'URIError',
  'isNaN', 'isFinite', 'parseInt', 'parseFloat', 'encodeURI', 'encodeURIComponent', 'decodeURI', 'decodeURIComponent',
  'Infinity', 'NaN', 'undefined', 'null',
  // Web APIs & DOM
  'setTimeout', 'clearTimeout', 'setInterval', 'clearInterval',
  'requestAnimationFrame', 'cancelAnimationFrame',
  'fetch', 'Headers', 'Request', 'Response', 'URL', 'URLSearchParams',
  'navigator', 'location', 'history', 'localStorage', 'sessionStorage', 'performance',
  'IntersectionObserver', 'ResizeObserver', 'MutationObserver',
  'AbortController', 'Event', 'CustomEvent', 'MouseEvent', 'KeyboardEvent',
  'Image', 'Audio', 'FormData', 'Blob', 'File', 'FileReader',
  'Node', 'Element', 'HTMLElement', 'HTMLDialogElement',
  'alert', 'prompt', 'confirm', 'process'
]);

const REACT_HOOKS = new Set([
  'useState', 'useEffect', 'useRef', 'useCallback', 'useMemo',
  'useContext', 'useReducer', 'useLayoutEffect', 'useId',
  'useTransition', 'useDeferredValue', 'useImperativeHandle'
]);

function getFiles(dir, extensions = ['.js', '.jsx']) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, extensions));
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        results.push(fullPath);
      }
    }
  });
  return results;
}

function lintFile(filePath) {
  const code = fs.readFileSync(filePath, 'utf-8');
  let ast;
  try {
    ast = parse(code, {
      sourceType: 'module',
      plugins: ['jsx']
    });
  } catch (err) {
    return [{
      file: filePath,
      line: err.loc ? err.loc.line : 1,
      column: err.loc ? err.loc.column : 1,
      message: `Syntax error: ${err.message}`
    }];
  }

  const errors = [];

  traverse(ast, {
    Identifier(pathNode) {
      if (!pathNode.isReferencedIdentifier()) return;

      const name = pathNode.node.name;
      // Skip if identifier is part of JSX or special syntax handled elsewhere
      if (pathNode.parent.type === 'JSXMemberExpression' && pathNode.parent.property === pathNode.node) {
        return;
      }

      if (!pathNode.scope.hasBinding(name)) {
        if (!JS_GLOBALS.has(name)) {
          const isHook = REACT_HOOKS.has(name);
          const message = isHook
            ? `React hook '${name}' is used but not imported from 'react'`
            : `'${name}' is not defined`;

          const loc = pathNode.node.loc?.start || { line: 1, column: 0 };
          errors.push({
            file: filePath,
            line: loc.line,
            column: loc.column,
            message
          });
        }
      }
    },

    JSXOpeningElement(pathNode) {
      const nameNode = pathNode.node.name;
      if (nameNode.type === 'JSXIdentifier') {
        const name = nameNode.name;
        // Upper-case indicates a custom component reference
        if (/^[A-Z]/.test(name)) {
          if (!pathNode.scope.hasBinding(name) && !JS_GLOBALS.has(name)) {
            const loc = nameNode.loc?.start || { line: 1, column: 0 };
            errors.push({
              file: filePath,
              line: loc.line,
              column: loc.column,
              message: `Component '<${name}>' is used in JSX but is not imported or defined`
            });
          }
        }
      }
    }
  });

  return errors;
}

console.log('Linting JavaScript/JSX files in src/ ...\n');
const files = getFiles(srcDir);
let totalErrors = 0;

files.forEach(file => {
  const relativePath = path.relative(path.resolve(__dirname, '..'), file);
  const errors = lintFile(file);
  if (errors.length > 0) {
    totalErrors += errors.length;
    console.error(`\x1b[31m[ERROR]\x1b[0m in ${relativePath}:`);
    errors.forEach(e => {
      console.error(`  Line ${e.line}:${e.column} - ${e.message}`);
    });
    console.error('');
  }
});

if (totalErrors > 0) {
  console.error(`\x1b[31mLint failed with ${totalErrors} error(s).\x1b[0m`);
  process.exit(1);
} else {
  console.log(`\x1b[32mAll ${files.length} files passed lint checks successfully (0 errors).\x1b[0m`);
  process.exit(0);
}
