import micromatch from 'micromatch';

// dotenv-expand permit to use interpolated variables in .env file
import result from './expand';

export default function extract<T extends string = '**'>({
  name,
  patterns = ['**' as T] as const,
  exact,
  default: defaultValue,
  optional = false,
}: {
  name: string;
  patterns?: readonly T[];
  exact?: boolean;
  default?: T;
  optional?: boolean;
}): T {
  const value = result.parsed?.[name] || defaultValue || '';
  if (!value && !optional) {
    const message = `Missing environment variable: ${name}, check environment variables in .env files`;
    throw new Error(message);
  }
  if (micromatch(value, patterns)) {
    const message = `${
      exact ? 'Invalid' : 'Non standard'
    } environment variable: ${name}=${value} (accepted patterns: ${patterns.join(
      ', ',
    )})`;
    if (exact) {
      throw new Error(message);
    }
    console.warn(message);
  }
  return value as T;
}
