export const LOCAL_STORAGE_KEY = 'dynamic_form_builder_schema_v1';

export const FIELD_TYPES = [
  { value: 'text', label: 'Text Input' },
  { value: 'email', label: 'Email' },
  { value: 'number', label: 'Number' },
  { value: 'textarea', label: 'Textarea' },
  { value: 'select', label: 'Dropdown Select' },
  { value: 'checkbox', label: 'Checkbox' },
  { value: 'file', label: 'File Upload' },
];

export const TYPE_BADGES = {
  text: { label: 'Text' },
  email: { label: 'Email' },
  number: { label: 'Number' },
  textarea: { label: 'Textarea' },
  select: { label: 'Select' },
  checkbox: { label: 'Checkbox' },
  file: { label: 'File' },
};

export const getDefaultConfig = (type) => ({
  type,
  label: '',
  placeholder: '',
  required: false,
  minLength: '',
  maxLength: '',
  min: '',
  max: '',
  options: '',
  maxFileSize: '',
  acceptedTypes: '',
});

export const DEFAULT_INITIAL_FIELDS = [
  {
    id: 'field_name_1',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Alex Morgan',
    required: true,
    minLength: 3,
  },
  {
    id: 'field_email_2',
    type: 'email',
    label: 'Work Email Address',
    placeholder: 'alex@company.com',
    required: true,
  },
  {
    id: 'field_department_3',
    type: 'select',
    label: 'Department',
    required: true,
    options: ['Engineering', 'Product & Design', 'Marketing', 'Customer Success'],
  },
  {
    id: 'field_avatar_4',
    type: 'file',
    label: 'Profile Photo',
    required: false,
    maxFileSize: 5,
    acceptedTypes: ['.jpg', '.jpeg', '.png', '.webp'],
  },
  {
    id: 'field_terms_5',
    type: 'checkbox',
    label: 'I certify that the information provided is accurate',
    required: true,
  }
];

export const PRESET_TEMPLATES = [
  {
    name: 'User Registration',
    fields: [
      { id: 'f_name', type: 'text', label: 'Full Name', placeholder: 'John Doe', required: true, minLength: 3 },
      { id: 'f_email', type: 'email', label: 'Work Email', placeholder: 'john@company.com', required: true },
      { id: 'f_age', type: 'number', label: 'Age', placeholder: '25', required: false, min: 18, max: 100 },
      { id: 'f_role', type: 'select', label: 'Preferred Role', required: true, options: ['Frontend Developer', 'Backend Developer', 'Full Stack Engineer', 'UI/UX Designer'] },
      { id: 'f_bio', type: 'textarea', label: 'Short Bio', placeholder: 'Tell us a bit about your experience...', required: false, maxLength: 300 },
      { id: 'f_resume', type: 'file', label: 'Resume Document', required: true, maxFileSize: 5, acceptedTypes: ['.pdf', '.png', '.jpg'] },
      { id: 'f_terms', type: 'checkbox', label: 'I agree to the Terms of Service and Privacy Policy', required: true }
    ]
  },
  {
    name: 'Feedback and Bug Report',
    fields: [
      { id: 'f_fb_title', type: 'text', label: 'Report Title', placeholder: 'Brief summary of issue', required: true },
      { id: 'f_fb_type', type: 'select', label: 'Feedback Category', required: true, options: ['Bug Report', 'Feature Request', 'UI Enhancement', 'Other'] },
      { id: 'f_fb_desc', type: 'textarea', label: 'Detailed Description', placeholder: 'Steps to reproduce or feature details...', required: true, minLength: 10 },
      { id: 'f_fb_screenshot', type: 'file', label: 'Attachment', required: false, maxFileSize: 10, acceptedTypes: ['.png', '.jpg', '.jpeg'] }
    ]
  }
];
