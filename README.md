# Dynamic Form Builder

A dynamic form builder and live preview application built with React and Vite. Users can create custom form schemas with multiple field types, configure validation rules, preview the form in real-time, and submit with full validation.

---

## Features

### Form Builder (Left Panel)
- Add new fields with configurable type, label, placeholder, and validation rules
- Edit existing fields inline
- Delete individual fields or clear all at once
- Load preset templates with one click

### Live Preview (Right Panel)
- Real-time interactive form rendering
- Live validation after first submit attempt
- Form submission with formatted data display in a modal
- Reset form to clear all values

### Supported Field Types

| Type | Validation Options |
|------|-------------------|
| Text | Required, Min/Max length |
| Email | Required, Min/Max length, Email format |
| Number | Required, Min/Max value |
| Textarea | Required, Min/Max length |
| Select | Required, Comma-separated options |
| Checkbox | Required |
| File | Required, Max file size (MB), Accepted file types |

### Other
- Drag and drop file upload with image preview
- Ready-to-use form templates (User Registration & Feedback/Bug Report)
- Auto-saves form schema to localStorage
- Responsive layout for desktop, tablet, and mobile

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| React | UI framework |
| Vite | Build tool and dev server |
| CSS Modules | Scoped component styling |

---

## Project Structure

```
src/
|-- App.jsx                          # Root component, manages fields state and localStorage
|-- App.module.css
|-- index.css                        # Global styles and CSS variables
|-- main.jsx                         # Entry point
|
|-- constants/
|   |-- formConstants.js             # Field types, defaults, preset templates
|
|-- utils/
|   |-- validation.js                # getFieldError, validateAllFields
|
|-- components/
    |-- common/                      # Shared reusable components
    |   |-- Button.jsx               # Styled button (primary/secondary variants)
    |   |-- Button.module.css
    |   |-- EmptyState.jsx           # Empty placeholder with title and message
    |   |-- PanelHeader.jsx          # Panel header with icon, title, field count
    |
    |-- FormBuilder/                 # Left panel - form schema builder
    |   |-- FormBuilder.jsx          # Main builder container
    |   |-- FormBuilder.module.css
    |   |-- FieldConfigurator.jsx    # Add/Edit field configuration form
    |   |-- FieldConfigurator.module.css
    |   |-- FieldCard.jsx            # Individual field display card
    |   |-- FieldCard.module.css
    |
    |-- FormPreview/                 # Right panel - live form preview
    |   |-- FormPreview.jsx          # Main preview container with validation
    |   |-- FormPreview.module.css
    |   |-- DynamicField.jsx         # Renders input based on field type
    |   |-- DynamicField.module.css
    |   |-- SubmissionModal.jsx      # Success modal with submitted data
    |   |-- SubmissionModal.module.css
    |
    |-- FileInput/                   # File upload component
        |-- FileInput.jsx            # Dropzone with drag-and-drop and preview
        |-- FileInput.module.css
```

Each folder contains its own `README.md` with detailed component documentation.

---

## Data Flow

```
App.jsx (fields state + localStorage sync)
  |
  |-- FormBuilder (left panel)
  |     |-- FieldConfigurator (add/edit fields)
  |     |-- FieldCard[] (display + edit + delete)
  |
  |-- FormPreview (right panel)
        |-- DynamicField[] (render inputs by type)
        |     |-- FileInput (file type only)
        |-- SubmissionModal (on successful submit)
```

- `App.jsx` owns the `fields` array and passes it down to both panels
- FormBuilder modifies fields via callbacks (`onAddField`, `onUpdateField`, `onRemoveField`)
- FormPreview reads fields and manages its own `formValues`, `errors`, and `submittedData` state

---

## useEffect Usage

This project uses only 3 `useEffect` hooks, each for a genuine side effect:

| Location | Purpose | Dependencies | Cleanup |
|----------|---------|-------------|---------|
| `App.jsx` | Sync fields to localStorage | `[fields]` | - |
| `FormPreview.jsx` | Auto-focus first input | `[fields.length]` | Clears timeout |
| `FileInput.jsx` | Create/revoke object URL for image preview | `[value]` | `URL.revokeObjectURL()` |

State synchronization (e.g. syncing form values when fields change) is handled using React's render-time state adjustment pattern instead of `useEffect`.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies |
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run oxlint |
