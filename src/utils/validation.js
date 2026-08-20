const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function getFieldError(field, value) {
  if (field.required) {
    const isEmpty =
      (field.type === 'checkbox' && !value) ||
      (field.type === 'file' && (!value || (Array.isArray(value) && value.length === 0))) ||
      (field.type !== 'checkbox' && field.type !== 'file' && (!value || (typeof value === 'string' && value.trim() === '')));

    if (isEmpty) {
      return field.type === 'file' ? 'Please select a file' : 'This field is required';
    }
  }

  if (!value || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }

  if (field.type === 'email' && !EMAIL_REGEX.test(value)) {
    return 'Please enter a valid email address';
  }

  if (field.minLength && typeof value === 'string' && value.length < field.minLength) {
    return `Minimum ${field.minLength} characters required`;
  }

  if (field.maxLength && typeof value === 'string' && value.length > field.maxLength) {
    return `Maximum ${field.maxLength} characters allowed`;
  }

  if (field.type === 'number' && value !== '') {
    const num = Number(value);
    if (isNaN(num)) return 'Please enter a valid number';
    if (field.min !== undefined && field.min !== '' && num < Number(field.min)) {
      return `Minimum value is ${field.min}`;
    }
    if (field.max !== undefined && field.max !== '' && num > Number(field.max)) {
      return `Maximum value is ${field.max}`;
    }
  }

  if (field.type === 'file' && value) {
    const file = Array.isArray(value) ? value[0] : value;
    if (file) {
      if (field.maxFileSize) {
        const maxBytes = field.maxFileSize * 1024 * 1024;
        if (file.size > maxBytes) {
          return `File size must be under ${field.maxFileSize}MB`;
        }
      }
      if (field.acceptedTypes && field.acceptedTypes.length > 0) {
        const fileExt = '.' + file.name.split('.').pop().toLowerCase();
        const allowed = field.acceptedTypes.map((t) => t.toLowerCase());
        if (!allowed.some((type) => fileExt === type || file.type.includes(type.replace('.', '')))) {
          return `Accepted file types: ${field.acceptedTypes.join(', ')}`;
        }
      }
    }
  }

  return null;
}

export function validateAllFields(fields, values) {
  const newErrors = {};
  let isValid = true;

  fields.forEach((field) => {
    const error = getFieldError(field, values[field.id]);
    if (error) {
      newErrors[field.id] = error;
      isValid = false;
    }
  });

  return { isValid, errors: newErrors };
}
