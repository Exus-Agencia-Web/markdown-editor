/**
 * AngularJS 1.x integration for @gravity-ui/markdown-editor
 *
 * This module provides the `markdownEditor` AngularJS module containing:
 *   - `<markdown-editor>` directive with ng-model support
 *   - `markdownEditorConfigProvider` for global configuration
 *
 * Usage:
 *   angular.module('myApp', ['markdownEditor']);
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { PortalProvider, ThemeProvider, ToasterProvider } from '@gravity-ui/uikit';
import { toaster } from '@gravity-ui/uikit/toaster-singleton';
import {
  configure,
  useMarkdownEditor,
  MarkdownEditorView,
  wysiwygToolbarConfigs,
} from '@gravity-ui/markdown-editor';
import { Math as MathExtension } from '@gravity-ui/markdown-editor/extensions/additional/Math/index.js';
import { Mermaid } from '@gravity-ui/markdown-editor/extensions/additional/Mermaid/index.js';
import { YfmHtmlBlock } from '@gravity-ui/markdown-editor/extensions/additional/YfmHtmlBlock/index.js';

// Required styles
import '@gravity-ui/uikit/styles/fonts.css';
import '@gravity-ui/uikit/styles/styles.css';
import '@gravity-ui/markdown-editor/styles/styles.css';

/* global angular */

// ---------------------------------------------------------------------------
// React wrapper component
// ---------------------------------------------------------------------------

/**
 * Internal React component rendered inside the AngularJS directive element.
 * Bridges React hooks and the AngularJS world.
 *
 * @param {object}   props
 * @param {string}   props.initialValue        - Initial markdown content
 * @param {string}   props.preset              - Editor preset ('zero'|'commonmark'|'default'|'yfm'|'full')
 * @param {string}   props.initialMode         - 'wysiwyg' | 'markup'
 * @param {boolean}  props.toolbarVisible      - Whether to show the toolbar
 * @param {boolean}  props.stickyToolbar       - Whether toolbar is sticky
 * @param {string}   props.theme               - 'light' | 'dark' | 'light-hc' | 'dark-hc'
 * @param {boolean}  props.autofocus           - Autofocus on mount
 * @param {object}   props.mdOptions           - markdown-it options
 * @param {function} props.fileUploadHandler   - function(File) → Promise<{url, name?, type?}>
 * @param {object}   props.extensionOptions    - Options passed to wysiwygConfig.extensionOptions
 * @param {boolean}  props.mathEnabled         - Register the LaTeX Math extension (default: true)
 * @param {boolean}  props.mermaidEnabled      - Register the Mermaid diagram extension (default: true)
 * @param {boolean}  props.htmlBlockEnabled    - Register the HTML Block extension (default: true)
 * @param {function} props.onChange            - Called with (value) on content change
 * @param {function} props.onSubmit            - Called with (value) on submit shortcut
 * @param {function} props.onCancel            - Called when cancel shortcut is pressed
 * @param {function} props.onEditorReady       - Called with (editorInstance) when ready
 */
function MarkdownEditorComponent(props) {
  // Store callbacks in refs so event listeners don't need to re-subscribe
  // every time Angular passes new function references.
  var onChangeRef = React.useRef(props.onChange);
  var onSubmitRef = React.useRef(props.onSubmit);
  var onCancelRef = React.useRef(props.onCancel);

  React.useEffect(function () {
    onChangeRef.current = props.onChange;
    onSubmitRef.current = props.onSubmit;
    onCancelRef.current = props.onCancel;
  });

  // ------------------------------------------------------------------
  // Portal container — appended to document.body with z-index:1070 so
  // all gravity-ui floating popups (tooltips, dropdowns, color pickers)
  // render above Bootstrap 3 modals (z-index:1050) and their backdrops.
  // ------------------------------------------------------------------
  var [portalContainer, setPortalContainer] = React.useState(null);

  React.useEffect(function () {
    var container = document.createElement('div');
    // Theme class is intentionally set to 'light' here; the theme-sync
    // effect below will immediately correct it to the actual initial theme.
    container.className = 'g-root g-root_theme_light';
    container.style.cssText = 'position:absolute;top:0;left:0;z-index:1070;';
    container.setAttribute('data-md-editor-portals', '');
    document.body.appendChild(container);
    setPortalContainer(container);

    return function () {
      if (container.parentNode) {
        container.parentNode.removeChild(container);
      }
    };
  }, []); // mount/unmount only — theme updates are handled by the effect below

  // Keep portal container theme class in sync with props.theme at runtime.
  React.useEffect(
    function () {
      if (portalContainer) {
        portalContainer.className = 'g-root g-root_theme_' + (props.theme || 'light');
      }
    },
    [props.theme, portalContainer],
  );

  // Build editor options only once on mount (initial* props are intentionally
  // one-time — the editor manages its own state after creation).
  // eslint-disable-next-line react-hooks/exhaustive-deps
  var editorOptions = React.useMemo(function () {
    // ----------------------------------------------------------------
    // Extra extensions: Math (LaTeX), Mermaid, YfmHtmlBlock.
    // These are not included in preset 'full' and must be registered
    // explicitly. Runtime scripts are loaded via webpack lazy chunks.
    // ----------------------------------------------------------------
    var extensions = (props.mathEnabled !== false || props.mermaidEnabled !== false || props.htmlBlockEnabled !== false)
      ? function (builder) {
          if (props.mathEnabled !== false) {
            builder.use(MathExtension, {
              loadRuntimeScript: function () {
                import(/* webpackChunkName: "latex-runtime" */ '@diplodoc/latex-extension/runtime');
                import(/* webpackChunkName: "latex-styles" */ '@diplodoc/latex-extension/runtime/styles');
              },
            });
          }
          if (props.mermaidEnabled !== false) {
            builder.use(Mermaid, {
              loadRuntimeScript: function () {
                import(/* webpackChunkName: "mermaid-runtime" */ '@diplodoc/mermaid-extension/runtime');
              },
              autoSave: { enabled: true, delay: 1000 },
              theme: { dark: 'dark', light: 'default' },
            });
          }
          if (props.htmlBlockEnabled !== false) {
            builder.use(YfmHtmlBlock, {
              autoSave: { enabled: true, delay: 1000 },
            });
          }
        }
      : undefined;

    // ----------------------------------------------------------------
    // Command-menu actions: extend the built-in full-preset menu with
    // items for the extra extensions that are enabled. The user can
    // override this via extensionOptions.commandMenu.actions.
    // ----------------------------------------------------------------
    var commandMenuActions = (wysiwygToolbarConfigs.wCommandMenuConfig || []).slice();
    if (props.mathEnabled !== false) {
      commandMenuActions = commandMenuActions.concat([
        wysiwygToolbarConfigs.wMathInlineItemData,
        wysiwygToolbarConfigs.wMathBlockItemData,
      ]);
    }
    if (props.mermaidEnabled !== false) {
      commandMenuActions = commandMenuActions.concat([wysiwygToolbarConfigs.wMermaidItemData]);
    }
    if (props.htmlBlockEnabled !== false) {
      commandMenuActions = commandMenuActions.concat([wysiwygToolbarConfigs.wYfmHtmlBlockItemData]);
    }

    // Merge user-supplied extensionOptions; user's commandMenu.actions
    // takes precedence over our default if explicitly provided.
    var userExtOpts = props.extensionOptions || {};
    var mergedExtOpts = Object.assign({}, userExtOpts, {
      commandMenu: Object.assign({ actions: commandMenuActions }, userExtOpts.commandMenu),
    });

    return {
      preset: props.preset || 'full',
      initial: {
        markup: props.initialValue || '',
        mode: props.initialMode || 'wysiwyg',
        toolbarVisible: props.toolbarVisible !== false,
      },
      md: props.mdOptions || {},
      handlers: props.fileUploadHandler
        ? { uploadFile: props.fileUploadHandler }
        : undefined,
      wysiwygConfig: {
        extensions: extensions,
        extensionOptions: mergedExtOpts,
      },
    };
  }, []); // empty deps — intentional one-time initialisation

  var editor = useMarkdownEditor(editorOptions);

  // Notify the Angular directive that the editor instance is ready
  React.useEffect(
    function () {
      if (props.onEditorReady) {
        props.onEditorReady(editor);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editor],
  );

  // Subscribe to editor events once (per editor instance)
  React.useEffect(
    function () {
      function handleChange() {
        if (onChangeRef.current) {
          onChangeRef.current(editor.getValue());
        }
      }

      function handleSubmit() {
        if (onSubmitRef.current) {
          onSubmitRef.current(editor.getValue());
        }
      }

      function handleCancel() {
        if (onCancelRef.current) {
          onCancelRef.current();
        }
      }

      editor.on('change', handleChange);
      editor.on('submit', handleSubmit);
      editor.on('cancel', handleCancel);

      return function () {
        editor.off('change', handleChange);
        editor.off('submit', handleSubmit);
        editor.off('cancel', handleCancel);
      };
    },
    [editor],
  );

  return React.createElement(
    ThemeProvider,
    { theme: props.theme || 'light' },
    React.createElement(
      // PortalProvider redirects all floating-ui portals (tooltips,
      // dropdowns, pickers) into our dedicated body container that
      // carries z-index:1070, keeping them above BS3 modals (1050).
      PortalProvider,
      { container: portalContainer || undefined },
      React.createElement(
        ToasterProvider,
        { toaster: toaster },
        React.createElement(MarkdownEditorView, {
          editor: editor,
          autofocus: props.autofocus || false,
          stickyToolbar: props.stickyToolbar !== false,
        }),
      ),
    ),
  );
}

// ---------------------------------------------------------------------------
// AngularJS module
// ---------------------------------------------------------------------------

angular
  .module('markdownEditor', [])

  // -------------------------------------------------------------------------
  // markdownEditorConfig provider
  // -------------------------------------------------------------------------
  /**
   * Provider that holds global defaults for every `<markdown-editor>` instance.
   *
   * Configure in your app's `.config()` block:
   *
   *   app.config(function(markdownEditorConfigProvider) {
   *     markdownEditorConfigProvider.setDefaults({
   *       preset: 'full',
   *       theme: 'dark',
   *       initialMode: 'markup',
   *     });
   *   });
   */
  .provider('markdownEditorConfig', function MarkdownEditorConfigProvider() {
    var defaults = {
      preset: 'full',
      initialMode: 'wysiwyg',
      toolbarVisible: true,
      stickyToolbar: true,
      theme: 'light',
      mdOptions: {},
      lang: 'en',               // 'en' | 'ru' — see upstream i18n for future language additions
      fileUploadHandler: null,  // function(File) → Promise<{url, name?, type?}>
      extensionOptions: {},     // options forwarded to wysiwygConfig.extensionOptions
      mathEnabled: true,        // register LaTeX Math extension (requires @diplodoc/latex-extension)
      mermaidEnabled: true,     // register Mermaid diagram extension (requires @diplodoc/mermaid-extension)
      htmlBlockEnabled: true,   // register HTML Block extension (requires @diplodoc/html-extension)
    };

    /**
     * Merge custom options into the global defaults.
     * @param {object} config
     */
    this.setDefaults = function (config) {
      angular.extend(defaults, config);
    };

    this.$get = function () {
      return defaults;
    };
  })

  // -------------------------------------------------------------------------
  // markdownEditor directive
  // -------------------------------------------------------------------------
  /**
   * `<markdown-editor>` element directive.
   *
   * Renders the @gravity-ui/markdown-editor inside an AngularJS application
   * using React under the hood.
   *
   * Attributes
   * ----------
   * ng-model        {string}   Two-way binding for the markdown content string.
   * options         {object=}  Per-instance configuration (see below).
   * on-change       {expr=}    Evaluated when content changes.    $value = new markdown.
   * on-submit       {expr=}    Evaluated on Ctrl+Enter.           $value = current markdown.
   * on-cancel       {expr=}    Evaluated on Escape keypress.
   * on-ready        {expr=}    Evaluated when editor initialises.  $editor = editor instance.
   * autofocus       {attr}     Presence of this attribute enables autofocus.
   *
   * Options object
   * --------------
   * preset              {string}    'zero'|'commonmark'|'default'|'yfm'|'full'  (default: 'full')
   * initialMode         {string}    'wysiwyg'|'markup'                           (default: 'wysiwyg')
   * toolbarVisible      {boolean}   Show toolbar on load.                        (default: true)
   * stickyToolbar       {boolean}   Sticky toolbar behaviour.                    (default: true)
   * theme               {string}    'light'|'dark'|'light-hc'|'dark-hc'         (default: 'light')
   * mdOptions           {object}    markdown-it options: { html, breaks, linkify }
   * lang                {string}    UI language: 'en'|'ru'                       (default: 'en')
   * fileUploadHandler   {function}  function(File) → Promise<{url, name?, type?}>
   * extensionOptions    {object}    Options forwarded to wysiwygConfig.extensionOptions
   * mathEnabled         {boolean}   Register LaTeX Math extension.               (default: true)
   * mermaidEnabled      {boolean}   Register Mermaid diagram extension.          (default: true)
   * htmlBlockEnabled    {boolean}   Register HTML Block extension.               (default: true)
   *
   * Example
   * -------
   * <markdown-editor
   *   ng-model        = "vm.content"
   *   options         = "vm.editorOptions"
   *   on-change       = "vm.onChanged($value)"
   *   on-submit       = "vm.onSubmit($value)"
   *   on-cancel       = "vm.onCancel()"
   *   on-ready        = "vm.onReady($editor)"
   *   autofocus>
   * </markdown-editor>
   */
  .directive('markdownEditor', [
    'markdownEditorConfig',
    function markdownEditorDirective(markdownEditorConfig) {
      return {
        restrict: 'E',
        require: '?ngModel',
        scope: {
          options: '=?',
          onReady: '&?',
          onSubmit: '&?',
          onCancel: '&?',
          onChange: '&?',
        },

        link: function (scope, element, attrs, ngModel) {
          var container = element[0];
          var reactRoot = null;
          var editorInstance = null;
          // Value requested by ngModel.$render before the editor was ready.
          var pendingValue = null;

          // Merge global defaults with per-instance options
          var opts = angular.extend({}, markdownEditorConfig, scope.options || {});

          // ------------------------------------------------------------------
          // Callbacks called from inside React, bridging into AngularJS digest
          // ------------------------------------------------------------------

          function handleChange(value) {
            scope.$applyAsync(function () {
              if (ngModel && ngModel.$viewValue !== value) {
                // Only update Angular's model when the value truly changed so
                // that programmatic editor.replace() calls don't create loops.
                ngModel.$setViewValue(value);
              }
              if (scope.onChange) {
                scope.onChange({ $value: value });
              }
            });
          }

          function handleSubmit(value) {
            scope.$applyAsync(function () {
              if (scope.onSubmit) {
                scope.onSubmit({ $value: value });
              }
            });
          }

          function handleCancel() {
            scope.$applyAsync(function () {
              if (scope.onCancel) {
                scope.onCancel();
              }
            });
          }

          function handleEditorReady(editor) {
            editorInstance = editor;
            // React 18's createRoot renders asynchronously, so ngModel.$render
            // may have been called before the editor was ready. Apply the value
            // that was stored as pendingValue.
            if (pendingValue !== null) {
              editor.replace(pendingValue);
              pendingValue = null;
            }
            scope.$applyAsync(function () {
              if (scope.onReady) {
                scope.onReady({ $editor: editor });
              }
            });
          }

          // ------------------------------------------------------------------
          // Render (or re-render) the React component with current opts.
          // Re-calling render() updates props on the existing React tree via
          // reconciliation — the editor instance and its state are preserved.
          // Only ThemeProvider (theme) and MarkdownEditorView (stickyToolbar)
          // respond to prop updates; editor options are one-time on mount.
          // ------------------------------------------------------------------
          var attrInitialValue = attrs.value || '';

          function renderEditor() {
            reactRoot.render(
              React.createElement(MarkdownEditorComponent, {
                initialValue: attrInitialValue,
                preset: opts.preset,
                initialMode: opts.initialMode,
                toolbarVisible: opts.toolbarVisible,
                stickyToolbar: opts.stickyToolbar,
                theme: opts.theme,
                autofocus: attrs.autofocus !== undefined,
                mdOptions: opts.mdOptions,
                fileUploadHandler: opts.fileUploadHandler || null,
                extensionOptions: opts.extensionOptions || {},
                mathEnabled: opts.mathEnabled !== false,
                mermaidEnabled: opts.mermaidEnabled !== false,
                htmlBlockEnabled: opts.htmlBlockEnabled !== false,
                onChange: handleChange,
                onSubmit: handleSubmit,
                onCancel: handleCancel,
                onEditorReady: handleEditorReady,
              }),
            );
          }

          // ------------------------------------------------------------------
          // Mount React component.
          // The editor always starts with an empty document (or attrs.value for
          // non-ng-model usage). The actual initial content for ng-model is
          // applied via ngModel.$render once AngularJS runs its first digest.
          // ------------------------------------------------------------------
          reactRoot = createRoot(container);

          // Apply the locale before the first render so the editor UI uses the
          // requested language from the very first mount.
          configure({ lang: opts.lang || 'en' });

          renderEditor();

          // ------------------------------------------------------------------
          // Sync external ng-model changes into the editor.
          // AngularJS calls $render on the first digest and whenever the bound
          // scope variable changes externally.
          // ------------------------------------------------------------------
          if (ngModel) {
            ngModel.$render = function () {
              var newValue = ngModel.$viewValue || '';
              if (editorInstance) {
                if (editorInstance.getValue() !== newValue) {
                  editorInstance.replace(newValue);
                }
              } else {
                // Editor not ready yet (React 18 async rendering) – store the
                // value and apply it once the editor reports ready.
                pendingValue = newValue;
              }
            };
          }

          // React to options changes (e.g. theme switch at runtime).
          // Re-rendering the React root propagates updated props to
          // ThemeProvider and MarkdownEditorView via reconciliation.
          scope.$watch(
            'options',
            function (newOpts) {
              if (newOpts) {
                opts = angular.extend({}, markdownEditorConfig, newOpts);
                configure({ lang: opts.lang || 'en' });
                renderEditor();
              }
            },
            true,
          );

          // ------------------------------------------------------------------
          // Cleanup
          // ------------------------------------------------------------------
          scope.$on('$destroy', function () {
            if (reactRoot) {
              reactRoot.unmount();
              reactRoot = null;
            }
          });
        },
      };
    },
  ]);
