# FileInput

A file upload component with drag-and-drop support and image preview.

## Files

### FileInput.jsx

Custom file input with a visual dropzone UI.

| Prop | Type | Description |
|------|------|-------------|
| `field` | `Object` | Field configuration (acceptedTypes, maxFileSize) |
| `value` | `File/null` | Currently selected file object |
| `onChange` | `Function` | Callback with the selected File or null on remove |
| `error` | `String/null` | Validation error message |

**State:**
- `isDragging` - tracks whether a file is being dragged over the dropzone
- `preview` - object URL string for image preview (null for non-image files)

**Hooks:**
- `useEffect([value])` - creates `URL.createObjectURL` for image files and revokes it on cleanup to prevent memory leaks

**Key Behavior:**
- Two visual states:
  - **No file selected**: shows a dropzone with "Click to upload or drag and drop" text, accepted file types, and max size hint
  - **File selected**: shows file name, size in KB, image preview (if image), and a remove button
- Supports both click-to-select and drag-and-drop file selection
- Hidden `<input type="file">` is triggered programmatically on dropzone click
- `accept` attribute is set from `field.acceptedTypes` to filter the file picker
- Drag events (`dragover`, `dragleave`, `drop`) toggle the `isDragging` style
- Remove button clears the file and resets the hidden input's value
