# Markdown Editor — Integración con AngularJS

Esta guía explica cómo agregar el **Markdown Editor** (basado en
[@gravity-ui/markdown-editor](https://github.com/gravity-ui/markdown-editor)) a
una aplicación **AngularJS 1.x** usando los archivos publicados en la CDN.

---

## Archivos disponibles en la CDN

> Los archivos están publicados en `https://r2.pagegear.co/js/markdown-editor/`
> (CDN de producción del proyecto).

| Archivo | Descripción |
|---------|-------------|
| `angular-markdown-editor.min.js` | Bundle principal (React + editor + directiva AngularJS) |
| `angular-markdown-editor.min.css` | Estilos requeridos (gravity-ui theme + editor CSS) |
| `vendors-node_modules_highlight_js_es_core_js.chunk.min.js` | Chunk cargado automáticamente para resaltado de código |
| `vendors-node_modules_lowlight_index_js.chunk.min.js` | Chunk cargado automáticamente para el parser de lowlight |

> **Nota sobre los chunks:** Los archivos `*.chunk.min.js` son cargados
> **automáticamente** por el bundle principal cuando se necesita resaltado de
> código (sintaxis). No es necesario incluirlos manualmente en tu HTML; sólo
> deben estar accesibles en la misma ruta de la CDN.

---

## Instalación rápida

### 1 — Incluir los archivos en tu HTML

```html
<!DOCTYPE html>
<html lang="es" ng-app="miApp">
<head>
  <meta charset="UTF-8">
  <title>Mi App con Markdown Editor</title>

  <!-- 1. AngularJS 1.x -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.3/angular.min.js"></script>

  <!-- 2. Estilos del editor -->
  <link rel="stylesheet"
        href="https://r2.pagegear.co/js/markdown-editor/angular-markdown-editor.min.css">

  <!-- 3. Bundle del editor (incluye React, gravity-ui y la directiva AngularJS) -->
  <script src="https://r2.pagegear.co/js/markdown-editor/angular-markdown-editor.min.js"></script>
</head>
<body>
  <!-- ... -->
</body>
</html>
```

### 2 — Registrar el módulo en tu aplicación

```javascript
angular.module('miApp', ['markdownEditor']);
```

### 3 — Usar la directiva en tus templates

```html
<markdown-editor ng-model="contenido"></markdown-editor>
```

---

## Ejemplo completo

```html
<!DOCTYPE html>
<html lang="es" ng-app="miApp">
<head>
  <meta charset="UTF-8">
  <title>Mi App con Markdown Editor</title>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.8.3/angular.min.js"></script>

  <link rel="stylesheet"
        href="https://r2.pagegear.co/js/markdown-editor/angular-markdown-editor.min.css">
  <script src="https://r2.pagegear.co/js/markdown-editor/angular-markdown-editor.min.js"></script>

  <style>
    .editor-wrapper { height: 400px; }
  </style>
</head>
<body ng-controller="EditorCtrl">

  <h1>Editor de Markdown</h1>

  <div class="editor-wrapper">
    <markdown-editor
      ng-model  = "documento"
      options   = "opciones"
      on-ready  = "alCargar($editor)"
      on-submit = "guardar($value)"
      autofocus>
    </markdown-editor>
  </div>

  <p>Palabras: {{ contarPalabras() }}</p>
  <button ng-click="guardar()">Guardar</button>

  <script>
    angular.module('miApp', ['markdownEditor'])

      // Configuración global (opcional)
      .config(function (markdownEditorConfigProvider) {
        markdownEditorConfigProvider.setDefaults({
          preset:         'full',
          theme:          'light',
          initialMode:    'wysiwyg',
          toolbarVisible: true,
          stickyToolbar:  true,
          lang:           'en'
        });
      })

      .controller('EditorCtrl', function ($scope) {
        var editor = null;

        $scope.documento = '# Hola mundo\n\nEmpieza a escribir aquí...';
        $scope.opciones  = { preset: 'full', theme: 'light' };

        $scope.alCargar = function ($editor) {
          editor = $editor;
        };

        $scope.contarPalabras = function () {
          return ($scope.documento || '').trim().split(/\s+/).filter(Boolean).length;
        };

        $scope.guardar = function (valor) {
          var contenido = valor || (editor && editor.getValue()) || $scope.documento;
          console.log('Guardando:', contenido);
          // aquí va tu lógica de guardado (ej. $http.post(...))
        };
      });
  </script>
</body>
</html>
```

---

## Referencia de la directiva

```html
<markdown-editor
  ng-model   = "contenido"
  options    = "opcionesEditor"
  on-change  = "alCambiar($value)"
  on-submit  = "alEnviar($value)"
  on-cancel  = "alCancelar()"
  on-ready   = "alCargar($editor)"
  autofocus>
</markdown-editor>
```

### Atributos

| Atributo    | Tipo        | Descripción |
|-------------|-------------|-------------|
| `ng-model`  | `string`    | **Binding bidireccional** del contenido markdown. |
| `options`   | `object`    | Opciones por instancia (ver tabla siguiente). |
| `on-change` | expresión   | Se evalúa cada vez que cambia el contenido; `$value` tiene el nuevo markdown. |
| `on-submit` | expresión   | Se evalúa al presionar **Ctrl+Enter**; `$value` tiene el contenido actual. |
| `on-cancel` | expresión   | Se evalúa al presionar **Escape**. |
| `on-ready`  | expresión   | Se evalúa al inicializar; `$editor` es la instancia del editor. |
| `autofocus` | atributo    | Enfoca el editor al montar. |

### Opciones disponibles

| Clave                | Tipo       | Valor por defecto | Descripción |
|----------------------|------------|-------------------|-------------|
| `preset`             | `string`   | `'full'`          | Conjunto de funciones: `'zero'` · `'commonmark'` · `'default'` · `'yfm'` · `'full'` |
| `initialMode`        | `string`   | `'wysiwyg'`       | Modo inicial: `'wysiwyg'` o `'markup'` |
| `toolbarVisible`     | `boolean`  | `true`            | Mostrar barra de herramientas al cargar |
| `stickyToolbar`      | `boolean`  | `true`            | Barra de herramientas fija al hacer scroll |
| `theme`              | `string`   | `'light'`         | Tema de color: `'light'` · `'dark'` · `'light-hc'` · `'dark-hc'` |
| `mdOptions`          | `object`   | `{}`              | Opciones para markdown-it: `{ html, breaks, linkify }` |
| `lang`               | `string`   | `'en'`            | Idioma de la interfaz: `'en'` (inglés) o `'ru'` (ruso) |
| `fileUploadHandler`  | `function` | `null`            | `function(File) → Promise<{url, name?, type?}>` — habilita subida de imágenes/archivos |
| `extensionOptions`   | `object`   | `{}`              | Opciones por extensión, pasadas a `wysiwygConfig.extensionOptions` |
| `mathEnabled`        | `boolean`  | `true`            | Registrar extensión de matemáticas LaTeX (chunk lazy) |
| `mermaidEnabled`     | `boolean`  | `true`            | Registrar extensión de diagramas Mermaid (chunk lazy) |
| `htmlBlockEnabled`   | `boolean`  | `true`            | Registrar extensión de bloques HTML (renderiza en iframes) |

---

## API del editor (instancia)

Obtén la instancia del editor via `on-ready` y usa cualquiera de estos métodos:

```javascript
$scope.alCargar = function ($editor) {
  $scope.editor = $editor;
};

// Leer / escribir contenido
$scope.editor.getValue();                      // → string
$scope.editor.replace('# Nuevo contenido');
$scope.editor.append('\n\n## Pie de página');
$scope.editor.prepend('> Nota importante\n\n');
$scope.editor.clear();
$scope.editor.isEmpty();                       // → boolean

// Foco
$scope.editor.focus();
$scope.editor.hasFocus();                      // → boolean

// Modo de edición
$scope.editor.setEditorMode('wysiwyg');        // o 'markup'
$scope.editor.currentMode;                     // → 'wysiwyg' | 'markup'
```

---

## Subida de archivos / imágenes

Habilita la carga de imágenes desde el dispositivo proporcionando `fileUploadHandler`:

```javascript
$scope.opciones = {
  preset: 'full',
  fileUploadHandler: function (file) {
    var formData = new FormData();
    formData.append('file', file);
    return $http.post('/api/upload', formData, {
      headers: { 'Content-Type': undefined }
    }).then(function (resp) {
      return { url: resp.data.url, name: file.name, type: file.type };
    });
  }
};
```

---

## Cambio de tema en runtime

Cambia `options.theme` en cualquier momento para alternar entre modo claro y oscuro sin recargar la página:

```javascript
$scope.toggleTheme = function () {
  $scope.opciones = angular.extend({}, $scope.opciones, {
    theme: $scope.opciones.theme === 'dark' ? 'light' : 'dark'
  });
};
```

---

## HTML embebido en Markdown

Para contenido legacy con HTML, habilita el parsing de HTML en markdown-it:

```javascript
$scope.opciones = {
  preset: 'full',
  mdOptions: { html: true, breaks: true, linkify: true }
};
```

> ⚠️ **Advertencia de seguridad:** Habilitar `html: true` permite que HTML sin procesar se
> renderice en el contenido Markdown. Si el contenido proviene de fuentes no confiables (por
> ejemplo, entrada directa del usuario final), esto puede introducir vulnerabilidades XSS.
> Usa esta opción únicamente con contenido de confianza (contenido interno del sistema o
> previamente saneado) o aplica un proceso de sanitización antes de mostrarlo.

---

## Extensiones adicionales: LaTeX, Mermaid, HTML Block

Con `preset: 'full'`, las extensiones LaTeX, Mermaid y HTML Block se registran
automáticamente. Sus runtimes se cargan de forma lazy (chunks separados de webpack).

Para deshabilitar una extensión específica:

```javascript
$scope.opciones = {
  preset: 'full',
  mathEnabled:      false,  // deshabilitar LaTeX
  mermaidEnabled:   false,  // deshabilitar Mermaid
  htmlBlockEnabled: false,  // deshabilitar HTML Block
};
```

> ⚠️ **Seguridad:** El HTML Block renderiza contenido en iframes aislados. No lo habilites
> con contenido de fuentes no confiables sin sanitización previa.

---

## Popups sobre modales Bootstrap 3

Cuando el editor se encuentra dentro de un modal Bootstrap 3 (z-index `1050`), todos los
popups de la barra de herramientas (tooltips, desplegables, selectores de color) aparecen
automáticamente **sobre** el modal. El wrapper crea un `<div data-md-editor-portals>` en
`document.body` con `z-index: 1070` y redirige todos los portales de gravity-ui hacia él.

No se requiere configuración adicional. Si tus modales usan un z-index mayor a `1050`,
agrega un override CSS:

```css
[data-md-editor-portals] { z-index: 1200 !important; }
```
