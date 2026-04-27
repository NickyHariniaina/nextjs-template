/**
 * Environment variables validation for the hackathon template
 * Run validation at server startup to provide clear error messages
 */

// Required environment variables for the application
export const requiredEnvVars = {
  // Database
  DATABASE_URL: {
    description: 'PostgreSQL database connection string',
    example: 'postgresql://user:password@localhost:5432/hackaton',
    required: true,
  },
  // Auth
  BETTER_AUTH_SECRET: {
    description: 'Secret key for authentication (generate with openssl rand -base64 32)',
    example: 'your-secret-key-here',
    required: true,
  },
  BETTER_AUTH_URL: {
    description: 'Application URL for auth (e.g., http://localhost:3000)',
    example: 'http://localhost:3000',
    required: true,
  },
  // Social providers (optional - only required if using social login)
  GITHUB_CLIENT_ID: {
    description: 'GitHub OAuth app client ID',
    example: 'Ivxxxxxxxxxxxxx',
    required: false,
  },
  GITHUB_CLIENT_SECRET: {
    description: 'GitHub OAuth app client secret',
    example: 'ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    required: false,
  },
  GOOGLE_CLIENT_ID: {
    description: 'Google OAuth app client ID',
    example: 'xxx.apps.googleusercontent.com',
    required: false,
  },
  GOOGLE_CLIENT_SECRET: {
    description: 'Google OAuth app client secret',
    example: 'GOCSPX-xxxxxxxxxxxx',
    required: false,
  },
  // App config
  NEXT_PUBLIC_APP_URL: {
    description: 'Public application URL',
    example: 'http://localhost:3000',
    required: false,
  },
} as const;

export type EnvVarKey = keyof typeof requiredEnvVars;

/**
 * Validate required environment variables
 * @returns Array of validation errors (empty if all valid)
 */
export function validateEnvVars(): string[] {
  const errors: string[] = [];

  for (const [key, config] of Object.entries(requiredEnvVars)) {
    const value = process.env[key];

    if (!value && config.required) {
      errors.push(
        `❌ ${key} is required: ${config.description}\n   Example: ${config.example}`
      );
    }
  }

  return errors;
}

/**
 * Check if social providers are configured
 */
export function hasSocialProviders(): boolean {
  return !!(
    (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) ||
    (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)
  );
}

/**
 * Get list of configured social providers
 */
export function getConfiguredProviders(): string[] {
  const providers: string[] = [];

  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    providers.push('GitHub');
  }
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.push('Google');
  }

  return providers;
}

/**
 * Log validation results to console
 * Call this in your API routes or server initialization
 */
export function logEnvValidation(): boolean {
  const errors = validateEnvVars();

  if (errors.length > 0) {
    console.error('\n🔴 Environment Variables Missing:\n');
    errors.forEach((error) => console.error(error + '\n'));
    console.error('📝 Add these to your .env file and restart the server.\n');
    return false;
  }

  const providers = getConfiguredProviders();
  console.log('\n✅ Environment variables validated');
  if (providers.length > 0) {
    console.log(`🔐 Social providers configured: ${providers.join(', ')}`);
  }

  return true;
}

/**
 * Create a .env.example file content
 */
export function generateEnvExample(): string {
  let content = `# Hackathon Template - Environment Variables\n`;
  content += `# Copy this file to .env and fill in the values\n\n`;

  for (const [key, config] of Object.entries(requiredEnvVars)) {
    content += `# ${key}\n`;
    content += `# ${config.description}\n`;
    content += `${key}=${config.example}\n\n`;
  }

  return content;
}