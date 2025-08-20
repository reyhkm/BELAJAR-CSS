// This file is currently not used by the validator, but can be extended for future CSS parsing/manipulation needs.

export const parseCssString = (cssString: string): Record<string, Record<string, string>> => {
  const rules: Record<string, Record<string, string>> = {};
  const ruleRegex = /([^{]+){([^}]+)}/g;
  let match;

  while ((match = ruleRegex.exec(cssString)) !== null) {
    const selector = match[1].trim();
    const declarations = match[2].trim();
    const properties: Record<string, string> = {};

    declarations.split(';').forEach(declaration => {
      const parts = declaration.split(':');
      if (parts.length === 2) {
        const propName = parts[0].trim();
        const propValue = parts[1].trim();
        if (propName && propValue) {
          properties[propName] = propValue;
        }
      }
    });
    rules[selector] = properties;
  }
  return rules;
};

export const getComputedStyleValue = (element: HTMLElement, property: string): string => {
  if (!element || !property) return '';
  const computedStyle = window.getComputedStyle(element);
  return computedStyle.getPropertyValue(property);
};
