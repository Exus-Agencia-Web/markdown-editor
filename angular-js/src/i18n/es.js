/**
 * Spanish translations for @gravity-ui/markdown-editor
 *
 * Registered at runtime via i18n.registerKeyset() — no upstream changes needed.
 * Keys match the corresponding en.json files in packages/editor/src/i18n/.
 */

export const esTranslations = {
  // -------------------------------------------------------------------------
  // Keyset: action-previews
  // -------------------------------------------------------------------------
  'action-previews': {
    'text':
      'Este es un texto sin título. \nTanto el título como el texto \nque aparece debajo pueden resaltarse en negrita, cursiva, color, \ntachado y subrayado. También puedes agregar listas, \ntablas, enlaces, fórmulas, anclas \ny bloques de código.',
    'text-with-head':
      'Este es el texto con título. \nTanto el título como el texto \nque aparece debajo pueden resaltarse en negrita, cursiva, color, \ntachado y subrayado. También puedes agregar listas, \ntablas, enlaces, fórmulas, anclas \ny bloques de código.',
    'heading': 'Texto',
  },

  // -------------------------------------------------------------------------
  // Keyset: bundle
  // -------------------------------------------------------------------------
  'bundle': {
    'error-title': 'Error en el editor',
    'settings_wysiwyg': 'Editor visual (WYSIWYG)',
    'settings_markup': 'Marcado Markdown',
    'settings_menubar': 'Barra de herramientas',
    'settings_hint':
      "Puedes ocultar el menú superior e invocar todos los comandos con '/' o el botón «+».",
    'settings_split-mode': 'Modo dividido',
    'split-mode-text': 'Vista previa',
    'settings_split-mode-hint':
      'Divide el editor en dos ventanas: vista previa y edición',
    'markup_placeholder': 'Escribe tu marcado aquí',
    'preview_label': 'Vista previa',
    'settings_label': 'Configuración',
  },

  // -------------------------------------------------------------------------
  // Keyset: codeblock
  // -------------------------------------------------------------------------
  'codeblock': {
    'remove': 'Eliminar',
    'empty_option': 'No se encontraron coincidencias',
    'code_wrapping': 'Ajuste de texto',
    'show_line_numbers': 'Números de línea',
  },

  // -------------------------------------------------------------------------
  // Keyset: common
  // -------------------------------------------------------------------------
  'common': {
    'cancel': 'Cancelar',
    'close': 'Cerrar',
    'delete': 'Eliminar',
    'edit': 'Editar',
    'preview': 'Vista previa',
    'remove': 'Quitar',
    'save': 'Guardar',
    'actions': 'Acciones',
    'toolbar_action_disabled': 'Elemento de marcado incompatible',
  },

  // -------------------------------------------------------------------------
  // Keyset: empty-row
  // -------------------------------------------------------------------------
  'empty-row': {
    'snippet.text': 'Fila vacía',
  },

  // -------------------------------------------------------------------------
  // Keyset: forms
  // -------------------------------------------------------------------------
  'forms': {
    'common_action_cancel': 'Cancelar',
    'common_action_submit': 'Enviar',
    'common_action_upload': 'Subir',
    'common_tab_attach': 'Subir desde el dispositivo',
    'common_tab_link': 'Agregar por enlace',
    'common_link': 'Enlace',
    'common_sizes': 'Tamaño, px',
    'image_name': 'Título',
    'image_link_href': 'Enlace de la imagen',
    'image_link_href_help': 'Dirección a la que lleva el enlace de la imagen.',
    'image_alt': 'Texto alternativo',
    'image_alt_help':
      'El texto alternativo se muestra si la imagen no puede cargarse.',
    'image_upload_help': 'Imagen JPEG, GIF o PNG de no más de 1 MB.',
    'image_upload_failed': 'Error al subir la imagen',
    'image_size_width': 'Ancho',
    'image_size_height': 'Alto',
    'link_url_help': 'Dirección a la que lleva el enlace.',
    'link_text': 'Texto del enlace',
    'link_text_help': 'Texto que se muestra como enlace.',
    'link_open_help': 'Abrir el enlace en una nueva pestaña',
    'file_link_help': 'Enlace para descargar el archivo',
    'file_name': 'Nombre del archivo',
    'file_upload_help': 'Sube varios archivos a la vez desde tu dispositivo.',
    'file_upload_failed': 'Error al subir los archivos',
    'anchor_href': 'Identificador del ancla',
    'anchor_href_help':
      'Compuesto por números, símbolos y letras latinas. Los anclas se usan para la navegación dentro de la página.',
    'anchor_title': 'Descripción',
    'anchor_title_help':
      'El texto del mensaje emergente al pasar el cursor sobre el nodo del ancla',
    'form_id': 'Enlace o ID del formulario',
  },

  // -------------------------------------------------------------------------
  // Keyset: gallery
  // -------------------------------------------------------------------------
  'gallery': {
    'link_copied': 'Enlace copiado',
    'link_copy': 'Copiar enlace',
    'file_download': 'Descargar',
  },

  // -------------------------------------------------------------------------
  // Keyset: gpt/dialog
  // -------------------------------------------------------------------------
  'gpt/dialog': {
    'answer-title': '¿Qué quieres hacer con la respuesta?',
    'close-button': 'Cerrar',
    'dislike': 'Mala respuesta',
    'error': 'Ocurrió un error',
    'feedback-message': '¡Gracias por tu opinión!',
    'fresh-start-button': 'Empezar de nuevo',
    'like': 'Buena respuesta',
    'more': 'Más',
    'only-presets-title': 'Ayuda con el texto',
    'refetch': 'Intentar de nuevo',
    'replace': 'Reemplazar el texto seleccionado',
    'replace-disabled': 'Insertar texto',
    'try-again': 'Intentar de nuevo',
    'alert-gpt-presets-info': 'Selecciona texto para ver los preajustes de GPT',
  },

  // -------------------------------------------------------------------------
  // Keyset: gpt/errors
  // -------------------------------------------------------------------------
  'gpt/errors': {
    'error-text':
      'Ocurrió un error al generar la respuesta, por favor reintenta la solicitud',
    'retry-button': 'Intentar de nuevo',
    'start-again-button': 'Al inicio',
  },

  // -------------------------------------------------------------------------
  // Keyset: gpt/extension
  // -------------------------------------------------------------------------
  'gpt/extension': {
    'confirm-cancel': 'Cancelar',
    'confirm-ok': 'Cerrar',
    'confirm-title': '¿Quieres cerrar el editor GPT?',
    'help-with-text': 'Ayuda con el texto',
  },

  // -------------------------------------------------------------------------
  // Keyset: gpt/loading
  // -------------------------------------------------------------------------
  'gpt/loading': {
    'loading-text': 'GPT está generando una respuesta...',
  },

  // -------------------------------------------------------------------------
  // Keyset: hints
  // -------------------------------------------------------------------------
  'hints': {
    'math_hint': 'Las fórmulas usan',
    'math_hint_katex': 'sintaxis KaTeX',
  },

  // -------------------------------------------------------------------------
  // Keyset: math-hint
  // -------------------------------------------------------------------------
  'math-hint': {
    'math_hint': 'Las fórmulas usan',
    'math_hint_katex': 'sintaxis KaTeX',
  },

  // -------------------------------------------------------------------------
  // Keyset: md-hints
  // -------------------------------------------------------------------------
  'md-hints': {
    'header_title': 'Encabezado',
    'header_hint': '# Tu texto',
    'italic_title': 'Cursiva',
    'italic_hint': '_Tu texto_',
    'bold_title': 'Negrita',
    'bold_hint': '**Tu texto**',
    'strikethrough_title': 'Tachado',
    'strikethrough_hint': '~~Tu texto~~',
    'blockquote_title': 'Cita',
    'blockquote_hint': '> Tu texto',
    'code_title': 'Código',
    'code_hint': '```Tu texto```',
    'link_title': 'Enlace',
    'link_hint': '[Tu texto](url)',
    'image_title': 'Imagen',
    'image_hint': '![Tu texto](url)',
    'list_title': 'Elemento de lista',
    'list_hint': '- Tu texto',
    'numbered-list_title': 'Lista numerada',
    'numbered-list_hint': '1. Tu texto',
    'documentation': 'Documentación',
    'documentation_link': ' https://diplodoc.com/docs/en/syntax/', // no Spanish docs available yet
  },

  // -------------------------------------------------------------------------
  // Keyset: menubar
  // -------------------------------------------------------------------------
  'menubar': {
    'bold': 'Negrita',
    'checkbox': 'Casilla',
    'code': 'Código',
    'code_inline': 'Código en línea',
    'codeblock': 'Bloque de código',
    'colorify': 'Color de texto',
    'colorify__color_blue': 'Azul',
    'colorify__color_default': 'Predeterminado',
    'colorify__color_gray': 'Gris',
    'colorify__color_green': 'Verde',
    'colorify__color_orange': 'Naranja',
    'colorify__color_red': 'Rojo',
    'colorify__color_violet': 'Violeta',
    'colorify__color_yellow': 'Amarillo',
    'colorify__group_text': 'Texto',
    'cut': 'Cortar',
    'emoji': 'Emoji',
    'emoji__hint':
      'Los emojis pueden agregarse en WYSIWYG o manualmente con marcado',
    'file': 'Archivo',
    'folding-heading': 'Sección contraíble',
    'folding-heading__hint':
      'El texto bajo el encabezado puede contraerse o expandirse',
    'gpt': 'Widget GPT',
    'heading': 'Encabezado',
    'heading1': 'Encabezado 1',
    'heading2': 'Encabezado 2',
    'heading3': 'Encabezado 3',
    'heading4': 'Encabezado 4',
    'heading5': 'Encabezado 5',
    'heading6': 'Encabezado 6',
    'hrule': 'Separador',
    'html': 'HTML',
    'image': 'Imagen',
    'italic': 'Cursiva',
    'link': 'Enlace',
    'list': 'Lista',
    'list__action_lift': 'Reducir sangría',
    'list__action_sink': 'Aumentar sangría',
    'list_action_disabled': 'Contradice la lógica de la lista',
    'mark': 'Resaltado',
    'math': 'Fórmula',
    'math_block': 'Bloque de fórmula',
    'math_inline': 'Fórmula en línea',
    'mermaid': 'Mermaid',
    'mono': 'Monoespaciado',
    'more_action': 'Más acciones',
    'move_list': 'Mover elemento de lista',
    'note': 'Nota',
    'olist': 'Lista numerada',
    'quote': 'Cita',
    'quotelink': 'Enlace de cita',
    'redo': 'Rehacer',
    'strike': 'Tachado',
    'table': 'Tabla',
    'tabs': 'Pestañas',
    'text': 'Texto',
    'ulist': 'Lista con viñetas',
    'underline': 'Subrayado',
    'undo': 'Deshacer',
  },

  // -------------------------------------------------------------------------
  // Keyset: placeholder
  // -------------------------------------------------------------------------
  'placeholder': {
    'doc_empty': "Escribe tu texto o '/' para abrir la lista de comandos",
    'doc_empty_mobile': 'Escribe tu texto',
    'checkbox': 'Agrega una descripción de la tarea o punto de control',
    'codeblock': 'Agrega código o texto al bloque',
    'deflist_term': 'Término de definición',
    'deflist_desc': 'Descripción de la definición',
    'heading': 'Encabezado',
    'cut_title': 'Título del corte',
    'cut_content': 'Agrega el texto que se mostrará al hacer clic',
    'note_title': 'Título de la nota',
    'note_content': 'Agrega contenido para la nota',
    'block': 'Bloque con decoración',
    'layout_cell': 'Texto',
    'table_cell': 'Contenido de la celda',
    'select_filter': 'Buscar',
  },

  // -------------------------------------------------------------------------
  // Keyset: search
  // -------------------------------------------------------------------------
  'search': {
    'label_case-sensitive': 'Distinguir mayúsculas',
    'label_whole-word': 'Palabra completa',
    'title': 'Buscar y reemplazar',
    'action_close': 'Cerrar',
    'action_replace': 'Reemplazar',
    'action_replace_all': 'Reemplazar todo',
    'action_next': 'Buscar siguiente',
    'action_prev': 'Buscar anterior',
    'action_expand': 'Expandir el formulario de reemplazo',
    'title_search': 'Buscar',
    'title_replace': 'Reemplazar con',
    'search_counter': '{{current}} de {{total}}',
    'search_placeholder': 'Buscar texto',
  },

  // -------------------------------------------------------------------------
  // Keyset: suggest
  // -------------------------------------------------------------------------
  'suggest': {
    'error-title': 'Error',
    'error-desc': 'Error al cargar',
    'empty-msg': 'No encontrado',
  },

  // -------------------------------------------------------------------------
  // Keyset: viewer
  // -------------------------------------------------------------------------
  'viewer': {
    'code_wrapping': 'Ajuste de texto',
  },

  // -------------------------------------------------------------------------
  // Keyset: widgets
  // -------------------------------------------------------------------------
  'widgets': {
    'iframe': 'Agregar un marco',
    'image': 'Agregar una imagen',
    'link': 'Agregar un enlace',
    'file': 'Agregar un archivo',
  },

  // -------------------------------------------------------------------------
  // Keyset: yfm-block
  // -------------------------------------------------------------------------
  'yfm-block': {
    'align': 'Alineación',
    'width': 'Ancho (px)',
    'padding': 'Relleno',
    'border': 'Tipo de borde',
    'border-size': 'Tamaño del borde',
    'border-color': 'Color del borde',
    'remove': 'Eliminar bloque',
  },

  // -------------------------------------------------------------------------
  // Keyset: yfm-layout
  // -------------------------------------------------------------------------
  'yfm-layout': {
    'action.template.1': 'Dos celdas',
    'action.template.2': 'Celda grande a la derecha',
    'action.template.3': 'Celda grande a la izquierda',
    'action.template.4': 'Tres celdas',
    'action.align.left': 'Alineación a la izquierda',
    'action.align.center': 'Alineación al centro',
    'action.align.right': 'Alineación a la derecha',
    'action.align.stretch': 'Extender al ancho completo',
    'action.remove': 'Eliminar',
    'cell.preview': 'Vista previa',
    'cell.width': 'Ancho',
    'cell.width.auto': 'Automático',
    'cell.remove': 'Eliminar celda',
  },

  // -------------------------------------------------------------------------
  // Keyset: yfm-note
  // -------------------------------------------------------------------------
  'yfm-note': {
    'info': 'Nota',
    'tip': 'Consejo',
    'warning': 'Advertencia',
    'alert': 'Alerta',
    'remove': 'Eliminar',
  },

  // -------------------------------------------------------------------------
  // Keyset: yfm-table
  // -------------------------------------------------------------------------
  'yfm-table': {
    'column.add.before': 'Agregar columna antes',
    'column.add.after': 'Agregar columna después',
    'column.remove': 'Eliminar columna',
    'column.remove.multiple': 'Eliminar columnas',
    'row.add.before': 'Agregar fila antes',
    'row.add.after': 'Agregar fila después',
    'row.remove': 'Eliminar fila',
    'row.remove.multiple': 'Eliminar filas',
    'cells.clear': 'Limpiar celdas',
    'table.remove': 'Eliminar tabla',
    'table.menu.cell.align.left': 'Alinear contenido de la celda a la izquierda',
    'table.menu.cell.align.right': 'Alinear contenido de la celda a la derecha',
    'table.menu.cell.align.center': 'Alinear contenido de la celda al centro',
    'table.menu.row.add': 'Agregar fila después',
    'table.menu.row.remove': 'Eliminar fila',
    'table.menu.column.add': 'Agregar columna después',
    'table.menu.column.remove': 'Eliminar columna',
    'table.menu.convert.yfm': 'Convertir a tabla YFM',
    'table.menu.table.remove': 'Eliminar tabla',
  },
};
