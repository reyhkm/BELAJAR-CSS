import { Solution } from "@/types/challenges";

const checkStyleProperties = (element: Element, properties: { [key: string]: string }): boolean => {
  const computedStyle = window.getComputedStyle(element);
  return Object.entries(properties).every(([prop, value]) => {
    const cssProp = prop as any;
    // Simple normalization for colors and values
    const computedValue = computedStyle[cssProp].toString().replace(/\s/g, '');
    const expectedValue = value.replace(/\s/g, '');
    return computedValue === expectedValue;
  });
};

export const validateCss = (
  iframe: HTMLIFrameElement,
  solution: Solution
): boolean => {
  const iframeDoc = iframe.contentDocument;
  if (!iframeDoc) return false;

  try {
    switch (solution.type) {
      case 'selector': {
        // This is a simplified check. A more robust check would be more complex.
        // We check if the selector finds at least one element.
        const elements = iframeDoc.querySelectorAll(solution.selector);
        return elements.length > 0;
      }

      case 'style': {
        const elements = iframeDoc.querySelectorAll(solution.selector);
        if (elements.length === 0) return false;
        // Check if all elements matching the selector have the correct styles
        return Array.from(elements).every(el => checkStyleProperties(el, solution.properties));
      }

      default:
        return false;
    }
  } catch (error) {
    console.error("Validation error:", error);
    return false;
  }
};
