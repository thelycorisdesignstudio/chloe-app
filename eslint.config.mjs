import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = nextVitals.map((config) => {
  if (config.name === "next") {
    return {
      ...config,
      rules: {
        ...config.rules,
        "react/no-unescaped-entities": "warn",
        "@next/next/no-img-element": "warn",
        "react-hooks/exhaustive-deps": "warn",
      },
    };
  }

  if (config.name === "next/typescript") {
    return {
      ...config,
      rules: {
        ...config.rules,
        "@typescript-eslint/no-unused-vars": "warn",
        "@typescript-eslint/no-explicit-any": "warn",
      },
    };
  }

  return config;
});

export default eslintConfig;
