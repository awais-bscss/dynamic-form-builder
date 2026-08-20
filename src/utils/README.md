# Utils

Utility functions used across the application.

## Files

### validation.js

Pure validation functions with no side effects. Used by FormPreview for both real-time and submit-time validation.

#### `getFieldError(field, value)`

Validates a single field value against its configuration. Returns an error message string or `null` if valid.

**Parameters:**
- `field` - field configuration object
- `value` - current input value

**Validation checks (in order):**

| Check | Applies To | Error Message |
|-------|-----------|---------------|
| Required (empty) | All types | "This field is required" |
| Required (no file) | file | "Please select a file" |
| Email format | email | "Please enter a valid email address" |
| Min length | text, email, textarea | "Minimum X characters required" |
| Max length | text, email, textarea | "Maximum X characters allowed" |
| Not a number | number | "Please enter a valid number" |
| Min value | number | "Minimum value is X" |
| Max value | number | "Maximum value is X" |
| File too large | file | "File size must be under XMB" |
| Wrong file type | file | "Accepted file types: .jpg, .png" |

**Key Behavior:**
- Skips all non-required validations if the value is empty (allows optional blank fields)
- Required check handles each type differently:
  - checkbox: checks for falsy value
  - file: checks for null/undefined or empty array
  - others: checks for empty string or whitespace-only string
- File type validation checks both file extension and MIME type
- Email validation uses regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

---

#### `validateAllFields(fields, values)`

Runs `getFieldError` on every field and collects all errors.

**Parameters:**
- `fields` - array of field configuration objects
- `values` - object mapping field IDs to their current values

**Returns:**
```js
{
  isValid: true,       // true if no errors
  errors: {            // object mapping field IDs to error messages
    field_abc: 'This field is required',
    field_xyz: 'Please enter a valid email address'
  }
}
```
