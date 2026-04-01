# @gravity-ui/markdown-editor – AngularJS Integration

This folder provides a ready-to-use **AngularJS 1.x** module that wraps
[`@gravity-ui/markdown-editor`](https://github.com/gravity-ui/markdown-editor) —
a rich WYSIWYG + Markdown editor built on ProseMirror and CodeMirror 6.

---

## Contents

```
angular-js/
├── src/
│   └── index.js                        Source of the AngularJS module/directive
├── dist/                               Pre-built bundles (ready to use)
│   ├── angular-markdown-editor.min.js  Production JS bundle (minified)
│   ├── angular-markdown-editor.js      Development JS bundle (readable)
│   └── angular-markdown-editor.min.css All required styles (minified)
├── examples/
│   ├── basic.html                      Minimal usage
│   ├── ngmodel.html                    Two-way binding with ng-model
│   └── advanced.html                   Provider config + programmatic API
├── package.json
├── webpack.config.js
└── babel.config.json
```

---

## Quick Start

### 1 — Load the original library

The pre-built bundle in `dist/` already includes everything you need
(React, ReactDOM, `@gravity-ui/uikit`, and `@gravity-ui/markdown-editor`).
You only need to load **AngularJS** separately:

```html
<!-- 1. AngularJS 1.4.6 (or any 1.x version) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.6/angular.min.js"></script>

<!-- 2. Editor styles (gravity-ui theme + markdown editor CSS) -->
<link rel="stylesheet" href="dist/angular-markdown-editor.min.css">

<!-- 3. Editor bundle — includes React, ReactDOM, gravity-ui, and the AngularJS module -->
<script src="dist/angular-markdown-editor.min.js"></script>
```

### 2 — Add the module to your app

```javascript
angular.module('myApp', ['markdownEditor']);
```

### 3 — Use the directive in your template

```html
<markdown-editor ng-model="content"></markdown-editor>
```

That's it. The editor is now embedded in your AngularJS application.

---

## Directive Reference

```html
<markdown-editor
  ng-model   = "content"
  options    = "editorOptions"
  on-change  = "onChanged($value)"
  on-submit  = "onSubmit($value)"
  on-cancel  = "onCancel()"
  on-ready   = "onReady($editor)"
  autofocus>
</markdown-editor>
```

### Attributes

| Attribute   | Type       | Description |
|-------------|------------|-------------|
| `ng-model`  | `string`   | **Two-way binding** for the markdown content. Changes inside the editor update the model; updating the model programmatically updates the editor. |
| `options`   | `object`   | Per-instance configuration object (see [Options](#options)). Merged over the global defaults. |
| `on-change` | expression | Evaluated every time the content changes. `$value` contains the new markdown string. |
| `on-submit` | expression | Evaluated when the user presses **Ctrl+Enter**. `$value` contains the current markdown. |
| `on-cancel` | expression | Evaluated when the user presses **Escape**. |
| `on-ready`  | expression | Evaluated once the editor has initialised. `$editor` is the raw editor instance (see [Editor API](#editor-api)). |
| `autofocus` | attribute  | Presence of this attribute focuses the editor on mount. |

### Options

Pass an object to the `options` attribute (or set global defaults via the provider):

| Key             | Type      | Default      | Description |
|-----------------|-----------|--------------|-------------|
| `preset`        | `string`  | `'default'`  | Feature set: `'zero'` · `'commonmark'` · `'default'` · `'yfm'` · `'full'` |
| `initialMode`   | `string`  | `'wysiwyg'`  | Starting mode: `'wysiwyg'` or `'markup'` |
| `toolbarVisible`| `boolean` | `true`       | Show the toolbar on load |
| `stickyToolbar` | `boolean` | `true`       | Keep the toolbar visible while scrolling |
| `theme`         | `string`  | `'light'`    | Color theme: `'light'` · `'dark'` · `'light-hc'` · `'dark-hc'` |
| `mdOptions`     | `object`  | `{}`         | Options forwarded to markdown-it: `{ html, breaks, linkify }` |

---

## Global Configuration

Use `markdownEditorConfigProvider` in your application's `.config()` block to set
default options that apply to every `<markdown-editor>` instance:

```javascript
angular.module('myApp', ['markdownEditor'])
  .config(function (markdownEditorConfigProvider) {
    markdownEditorConfigProvider.setDefaults({
      preset:        'full',
      theme:         'dark',
      initialMode:   'markup',
      toolbarVisible: true,
      stickyToolbar:  true,
      mdOptions: {
        html:    false,
        breaks:  true,
        linkify: true
      }
    });
  });
```

---

## Editor API

When the editor is ready the `on-ready` callback receives the raw editor instance.
Store it and call any of these methods:

```javascript
$scope.onReady = function (editor) {
  $scope.editor = editor;
};

// Get the current markdown
$scope.editor.getValue();             // → string

// Replace all content
$scope.editor.replace('# New content\n\nHello!');

// Append / prepend content
$scope.editor.append('\n\n## Footer\n\nAdded at the end.');
$scope.editor.prepend('> Important note\n\n');

// Clear all content
$scope.editor.clear();

// Check if empty
$scope.editor.isEmpty();              // → boolean

// Focus the editor
$scope.editor.focus();
$scope.editor.hasFocus();             // → boolean

// Switch editing mode
$scope.editor.setEditorMode('wysiwyg');   // or 'markup'

// Get current mode
$scope.editor.currentMode;            // → 'wysiwyg' | 'markup'
```

---

## Examples

Open any HTML file in the `examples/` folder in a browser (a local HTTP server is
recommended; see [Serving Examples](#serving-examples)).

| File | What it demonstrates |
|------|----------------------|
| [`examples/basic.html`](examples/basic.html) | Minimal usage — just the directive with an `options` object |
| [`examples/ngmodel.html`](examples/ngmodel.html) | Two-way binding with `ng-model`, external model updates, `on-change` and `on-submit` callbacks |
| [`examples/advanced.html`](examples/advanced.html) | Provider global config, live theme/preset switching, programmatic API via `on-ready`, event log |

### Serving examples

```bash
# Using Node.js http-server (install once: npm i -g http-server)
cd angular-js
http-server . -p 3000 -o

# Using Python
cd angular-js
python3 -m http.server 3000
```

Then open:
- `http://localhost:3000/examples/basic.html`
- `http://localhost:3000/examples/ngmodel.html`
- `http://localhost:3000/examples/advanced.html`

---

## Complete Application Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My AngularJS App with Markdown Editor</title>

  <!-- 1. Load AngularJS -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.4.6/angular.min.js"></script>

  <!-- 2. Load the editor bundle (styles + scripts) -->
  <link rel="stylesheet" href="dist/angular-markdown-editor.min.css">
  <script src="dist/angular-markdown-editor.min.js"></script>

  <style>
    .editor-container { height: 400px; }
  </style>
</head>
<body ng-app="myApp" ng-controller="EditorCtrl">

  <h1>My Markdown Editor</h1>

  <div class="editor-container">
    <markdown-editor
      ng-model  = "document.body"
      options   = "editorOptions"
      on-ready  = "onEditorReady($editor)"
      on-submit = "save($value)"
      autofocus>
    </markdown-editor>
  </div>

  <p>Words: {{ wordCount }}</p>
  <button ng-click="save()">Save</button>

  <script>
    angular.module('myApp', ['markdownEditor'])

      // Optional: set global defaults
      .config(function (markdownEditorConfigProvider) {
        markdownEditorConfigProvider.setDefaults({
          theme: 'light',
          preset: 'default'
        });
      })

      .controller('EditorCtrl', function ($scope) {
        var editor = null;

        $scope.document = { body: '# My Document\n\nStart writing here...' };
        $scope.editorOptions = { preset: 'default', theme: 'light' };
        $scope.wordCount = 0;

        $scope.onEditorReady = function ($editor) {
          editor = $editor;
        };

        $scope.$watch('document.body', function (value) {
          $scope.wordCount = (value || '').trim().split(/\s+/).filter(Boolean).length;
        });

        $scope.save = function (value) {
          var content = value || (editor && editor.getValue()) || $scope.document.body;
          console.log('Saving document:', content);
          // POST to your backend here...
        };
      });
  </script>
</body>
</html>
```

---

## Building from Source

The `dist/` files are pre-built and ready to use. If you want to rebuild them
(e.g. after modifying `src/index.js`):

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9 (or pnpm / yarn)

### Steps

```bash
# 1. Go to the angular-js folder
cd angular-js

# 2. Install build dependencies
npm install

# 3a. Build production bundle (minified, goes to dist/angular-markdown-editor.min.js)
npm run build

# 3b. Build development bundle (readable, goes to dist/angular-markdown-editor.js)
npm run build:dev
```

Build output:

| File | Description |
|------|-------------|
| `dist/angular-markdown-editor.min.js` | Production JS bundle (minified) |
| `dist/angular-markdown-editor.js` | Development JS bundle (readable) |
| `dist/angular-markdown-editor.min.css` | All required CSS (gravity-ui theme + editor styles) |

### What is bundled

The JS bundle includes:

- **React 18** + **ReactDOM 18**
- **@gravity-ui/uikit** (theme components, UI primitives)
- **@gravity-ui/markdown-editor** (WYSIWYG + CodeMirror Markup editor)
- The **AngularJS directive** and **provider** from `src/index.js`

The only dependency that must be loaded **separately** is **AngularJS itself**
(available from CDN or your own assets).

---

## Architecture

```
AngularJS template
  └── <markdown-editor> directive (src/index.js)
        ├── Creates a React root in the directive's DOM element
        ├── Renders MarkdownEditorComponent (React)
        │     ├── useMarkdownEditor() hook  →  editor instance
        │     ├── MarkdownEditorView        →  ProseMirror + CodeMirror UI
        │     └── ThemeProvider             →  gravity-ui theme variables
        └── Bridges events via scope.$applyAsync()
              onChange  → ngModel.$setViewValue()  +  scope.onChange()
              onSubmit  → scope.onSubmit()
              onCancel  → scope.onCancel()
              onReady   → scope.onReady()
```

### Key design decisions

1. **React is bundled** — The angular-js bundle ships its own copy of React so
   there are no external React dependencies. This avoids version conflicts and
   simplifies deployment in classic AngularJS projects.
2. **Callback refs pattern** — Event handlers from Angular are stored in
   `React.useRef` objects so the React component never needs to re-subscribe
   to editor events when Angular re-evaluates bindings.
3. **`scope.$applyAsync`** — Used to bridge React-land changes back into the
   Angular digest cycle without triggering `$digest already in progress` errors.
4. **One-time initialisation** — The editor options (`preset`, `initialMode`, etc.)
   are applied once on mount. The editor manages its own internal state after
   that point. Two-way binding for content works via `editor.replace()`.

---

## Browser Compatibility

The bundle targets all modern browsers and IE11+ (via Babel `@babel/preset-env`).
AngularJS 1.4.6 itself supports IE8+.

---

## License

This integration module is part of the
[`@gravity-ui/markdown-editor`](https://github.com/gravity-ui/markdown-editor)
project and is available under the same
[Apache 2.0 License](../LICENSE.txt).
