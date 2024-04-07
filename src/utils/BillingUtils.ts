export function validatePediod(period: string): boolean {
  return /^(\d{4}(0[1-9]|1[012]))$/.test(period);
}

export function validateServiceType(serviceType: string): boolean {
  return /^(water|electricity|sewer)$/.test(serviceType);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumSignificantDigits: 2 
  }).format(amount);
}