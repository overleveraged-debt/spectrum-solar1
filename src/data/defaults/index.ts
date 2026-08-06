import { productDefaults } from './productDefaults';
import { companyDefaults } from './companyDefaults';
import { legalDefaults } from './legalDefaults';

export const defaultPagesData: Record<string, any> = {
  ...companyDefaults,
  ...productDefaults,
  ...legalDefaults
};
