export { residentialTemplate } from './residential';
export { commercialTemplate } from './commercial';
export { emergencyTemplate } from './emergency';

export const templates = {
  residential: 'residentialTemplate',
  commercial: 'commercialTemplate',
  emergency: 'emergencyTemplate'
} as const;

export type TemplateType = keyof typeof templates; 