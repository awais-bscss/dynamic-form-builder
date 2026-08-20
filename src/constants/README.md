# Constants

All static configuration, default data, and preset templates for the app.

## Files

### formConstants.js

#### `LOCAL_STORAGE_KEY`
- Key string used to save/load the form schema from browser localStorage
- Value: `'dynamic_form_builder_schema_v1'`

---

#### `FIELD_TYPES`
Array of available field types shown as selectable chips in FieldConfigurator.

| Value | Label |
|-------|-------|
| `text` | Text Input |
| `email` | Email |
| `number` | Number |
| `textarea` | Textarea |
| `select` | Dropdown Select |
| `checkbox` | Checkbox |
| `file` | File Upload |

---

#### `TYPE_BADGES`
Display labels used on FieldCard badges. Maps field type string to a label.

---

#### `getDefaultConfig(type)`
Returns a blank config object for the FieldConfigurator form.

```js
{
  type: 'text',
  label: '',
  placeholder: '',
  required: false,
  minLength: '',
  maxLength: '',
  min: '',
  max: '',
  options: '',
  maxFileSize: '',
  acceptedTypes: ''
}
```

Called when:
- Component mounts (initial state)
- User switches field type
- User finishes adding/editing a field (form reset)

---

#### `DEFAULT_INITIAL_FIELDS`
The default fields loaded on first visit (when localStorage is empty).

| Field | Type | Required |
|-------|------|----------|
| Full Name | text | Yes |
| Work Email Address | email | Yes |
| Department | select | Yes |
| Profile Photo | file | No |
| Certification checkbox | checkbox | Yes |

---

#### `PRESET_TEMPLATES`
Quick-load templates available from the "Quick Templates" bar.

**User Registration** (7 fields):
- Full Name, Work Email, Age, Preferred Role, Short Bio, Resume Document, Terms Agreement

**Feedback and Bug Report** (4 fields):
- Report Title, Feedback Category, Detailed Description, Attachment
