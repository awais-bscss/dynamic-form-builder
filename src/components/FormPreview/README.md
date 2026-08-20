# FormPreview

The right panel of the app - renders a live, interactive preview of the form with validation and submission.

## Files

### FormPreview.jsx

The main container for the live preview panel.

| Prop | Type | Description |
|------|------|-------------|
| `fields` | `Array` | Current list of field objects from the builder |

**State:**
- `formValues` - object mapping field IDs to their current input values
- `errors` - object mapping field IDs to their validation error messages
- `submittedData` - formatted submission payload (null until form is submitted)
- `submitCount` - tracks how many times the user has attempted to submit
- `prevFields` - used for render-time state adjustment when `fields` prop changes

**Hooks:**
- `useEffect([fields.length])` - auto-focuses the first input field when the form renders. Uses a 50ms timeout to ensure DOM elements are mounted. Cleanup clears the timeout.

**Key Behavior:**
- Syncs `formValues` with `fields` during render (not useEffect) - preserves existing values, initializes new fields with defaults
- Shows EmptyState when no fields exist
- Live validation runs on every field change after the first submit attempt (`submitCount > 0`)
- On submit, validates all fields via `validateAllFields()`, then formats data into a display-friendly payload
- Handles file fields separately - extracts file metadata (name, size, type) and creates image preview URLs
- Reset clears all values, errors, and submit count
- Revokes object URLs on modal close to prevent memory leaks

---

### DynamicField.jsx

Renders a single form input based on the field type.

| Prop | Type | Description |
|------|------|-------------|
| `field` | `Object` | Field configuration (type, label, placeholder, options, etc.) |
| `value` | `any` | Current value of the field |
| `onChange` | `Function` | Callback when value changes |
| `error` | `String/null` | Validation error message |
| `inputRef` | `Ref/null` | React ref for auto-focus (only passed to first field) |

**Supported Field Types:**

| Type | Renders | Special Behavior |
|------|---------|-----------------|
| `text` | `<input type="text">` | Default fallback type |
| `email` | `<input type="email">` | Same as text |
| `number` | `<input type="number">` | Passes min/max from field config |
| `textarea` | `<textarea>` | 4 rows default |
| `select` | `<select>` | Custom arrow icon, "Choose an option" placeholder |
| `checkbox` | `<input type="checkbox">` | Inline label, no separate label above |
| `file` | `<FileInput>` | Delegates to FileInput component |

**Key Behavior:**
- Checkbox fields skip the top label (label is rendered inline next to the checkbox)
- All other fields render with a label above and error message below
- Error state adds `hasError` CSS class for red border styling

---

### SubmissionModal.jsx

Overlay modal shown after successful form submission.

| Prop | Type | Description |
|------|------|-------------|
| `data` | `Array/null` | Formatted submission data, or null to hide modal |
| `onClose` | `Function` | Callback to close the modal |

**Data Item Shape:**
```js
{
  id: 'field_abc123',
  label: 'Full Name',
  type: 'text',
  value: 'John Doe',
  isFile: false,
  fileMeta: null
}
```

**Key Behavior:**
- Returns `null` (renders nothing) when `data` is null
- Displays a success header with a checkmark icon
- Lists each field as a label-value pair
- For image files, shows an inline preview thumbnail
- Closes on overlay click, close icon, or "Done" button
- `e.stopPropagation()` on the modal body prevents closing when clicking inside
