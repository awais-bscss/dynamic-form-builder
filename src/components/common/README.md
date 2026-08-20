# Common

Shared, reusable components used across both the FormBuilder and FormPreview panels.

## Files

### Button.jsx

A styled button component with variant support.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | - | Button label/content |
| `type` | `String` | `'button'` | HTML button type (`button`, `submit`, `reset`) |
| `variant` | `String` | `'primary'` | Visual style (`primary`, `secondary`) |
| `onClick` | `Function` | - | Click handler |
| `disabled` | `Boolean` | `false` | Disables the button |
| `className` | `String` | `''` | Additional CSS class |
| `title` | `String` | - | HTML title attribute (tooltip) |

**Usage:**
```jsx
<Button variant="primary" onClick={handleSubmit}>Submit Form</Button>
<Button variant="secondary" onClick={handleReset}>Reset</Button>
```

---

### PanelHeader.jsx

Header component used at the top of both panels.

| Prop | Type | Description |
|------|------|-------------|
| `icon` | `ReactNode` | SVG icon element |
| `title` | `String` | Panel title (e.g. "Form Architect", "Live Preview") |
| `subtitle` | `String` | Description text below the title |
| `count` | `Number` | Number of fields - displays as "X Fields" badge |
| `styles` | `Object` | CSS module styles from the parent component |

**Key Behavior:**
- Automatically shows "Field" (singular) when count is 1, "Fields" (plural) otherwise
- Receives `styles` from parent so it adapts to the parent panel's CSS module

---

### EmptyState.jsx

Placeholder component shown when a panel has no content to display.

| Prop | Type | Description |
|------|------|-------------|
| `title` | `String` | Heading text (e.g. "Empty Form Canvas") |
| `children` | `ReactNode` | Description/instruction text |
| `styles` | `Object` | CSS module styles from the parent component |

**Used in:**
- FormBuilder - "No Fields Configured" when no fields exist
- FormPreview - "Empty Form Canvas" when no fields are added

**Key Behavior:**
- Receives `styles` from parent so the same component can look different in each panel
- Uses `children` instead of a text prop so it can accept JSX content (e.g. `<strong>` tags)
