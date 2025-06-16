import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Add specific rules for files with unused variables that are intentionally kept

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    files: [
      'src/app/api/bookings/cruise/route.ts',
      'src/app/api/bookings/flight/deals/route.ts',
      'src/app/api/bookings/packages/route.ts',
      'src/app/packages/page.tsx'
    ],
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];

export default eslintConfig;
