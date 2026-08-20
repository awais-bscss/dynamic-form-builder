# FormBuilder

The left panel of the app lets users create, configure, edit, reorder, and delete form fields.

## Files

### FormBuilder.jsx

The main container component for the builder panel.

| Prop | Type | Description |
|------|------|-------------|
| `fields` | `Array` | Current list of field objects |
| `onAddField` | `Function` | Callback to add a new field |
| `onUpdateField` | `Function` | Callback to update an existing field |
| `onRemoveField` | `Function` | Callback to remove a field by ID |
| `onMoveField` | `Function` | Callback to reorder fields (fromIndex, toIndex) |
| `onClearAll` | `Function` | Callback to clear all fields |
| `onLoadPreset` | `Function` | Callback to load a preset template |

**State:**
- `editingField` - tracks which field is currently being edited (null when adding new)

**Key Behavior:**
- Renders the panel header, preset templates bar, FieldConfigurator, and FieldCard list
- Preset templates ("User Registration", "Feedback and Bug Report") load predefined field schemas
- "Clear All" button appears only when fields exist
- Passes `editingField` down to FieldConfigurator and FieldCard for coordinated edit state

---

### FieldConfigurator.jsx

The expandable "Add New Field" / "Edit Field" configuration form.

| Prop | Type | Description |
|------|------|-------------|
| `onAddField` | `Function` | Callback when a new field is created |
| `editingField` | `Object/null` | The field being edited, or null for new field mode |
| `onUpdateField` | `Function` | Callback when an existing field is saved |
| `onCancelEdit` | `Function` | Callback to exit edit mode |

**State:**
- `selectedType` - currently selected field type (text, email, number, etc.)
- `config` - object holding all form input values (label, placeholder, required, min/max, options, etc.)
- `isExpanded` - whether the configurator panel is open or closed

**Hooks:**
- `useEffect([editingField])` - fills the form with existing field data when user clicks Edit on a FieldCard

**Key Behavior:**
- Type selection chips switch between field types; config resets on type change via the onClick handler
- Shows/hides relevant config options based on selected type:
  - text, email, textarea: minLength, maxLength
  - number: min, max value
  - select: comma-separated options
  - file: max file size, accepted types
  - checkbox: no extra options
- "Add Field" button is disabled when label is empty
- Builds a field object with a unique `crypto.randomUUID()` ID on submit

---

### FieldCard.jsx

Displays a single field as a card in the builder's field list.

| Prop | Type | Description |
|------|------|-------------|
| `field` | `Object` | The field data to display |
| `index` | `Number` | Position index in the fields array |
| `total` | `Number` | Total number of fields |
| `isEditing` | `Boolean` | Whether this field is currently being edited |
| `onRemove` | `Function` | Callback to delete the field |
| `onEdit` | `Function` | Callback to enter edit mode for this field |
| `onMoveUp` | `Function` | Callback to move field up |
| `onMoveDown` | `Function` | Callback to move field down |

**Key Behavior:**
- Shows type badge, "Required" tag, label, placeholder text, and validation rules
- Move Up is disabled for the first field, Move Down is disabled for the last
- Highlights with a different style when `isEditing` is true
- Each card has a staggered entrance animation (`animationDelay` based on index)
