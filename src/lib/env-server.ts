/**
 * Server-side environment validation
 * Validates required env vars at API route initialization
 */
import { validateEnvVars } from '@/lib/env';

// Validate on first request - prevent server crash with unclear errors
let validated = false;

export function serverEnvCheck() {
  if (validated) return true;
  
  const errors = validateEnvVars();
  
  if (errors.length > 0) {
    const logError = (message: string) => {
      console.error(message);
    };
    // Log errors but don't crash the server - let it fail gracefully
    logError('\n Environment Configuration Incomplete:\n');
    errors.forEach((error) => {
      logError('  ' + error);
    });
    logError('\n  Some features may not work correctly.\n');
  }
  
  validated = true;
  return errors.length === 0;
}

// Run validation when this module is imported
serverEnvCheck();