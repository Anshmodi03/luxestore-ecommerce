import crypto from 'crypto';

/**
 * Generate a unique order number in the format LX-XXXXX
 * Uses crypto for randomness to avoid collisions
 */
export function generateOrderNumber(): string {
  const random = crypto.randomInt(10000, 99999);
  return `LX-${random}`;
}
