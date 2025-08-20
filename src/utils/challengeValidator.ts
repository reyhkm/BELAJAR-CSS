import { Solution, SelectorSolution, StyleSolution } from '../types/challenge';

/**
 * Validates the user's CSS against the expected solution within an iframe.
 * @param iframeWindow The contentWindow of the iframe where the HTML and CSS are rendered.
 * @param userCss The CSS code provided by the user.
 * @param solution The expected solution object for the current challenge.
 * @returns True if the user's CSS matches the solution, false otherwise.
 */
export const validateChallenge = (
  iframeWindow: Window,
  userCss: string,
  solution: Solution
): boolean => {
  const doc = iframeWindow.document;

  // Apply user CSS to the iframe's style tag
  const userCssStyleTag = doc.getElementById('user-css-style');
  if (userCssStyleTag) {
    userCssStyleTag.textContent = userCss;
  }

  if (solution.type === 'selector') {
    return validateSelectorChallenge(doc, solution as SelectorSolution);
  } else if (solution.type === 'style') {
    return validateStyleChallenge(doc, solution as StyleSolution);
  }
  return false;
};

/**
 * Validates a selector-based challenge.
 * For selector challenges, we apply a unique validation style to the target elements
 * and check if the user's CSS successfully applies this style to *only* the correct elements.
 * This requires the user's CSS to include a specific rule for the target elements.
 * 
 * A more robust approach would be to dynamically inject a validation style and check computed styles.
 * For simplicity, we assume the user's CSS should make the target elements green.
 * The `index.css` and `ChallengeArena.tsx` iframe styles include a `.css-quest-validation-target` class.
 * The validation logic will temporarily apply this class to the expected elements and check if the user's
 * CSS correctly targets them (e.g., by checking if the user's CSS applies a specific background color).
 * 
 * A better way for selector validation: The user's CSS should apply a specific, unique style (e.g., `background-color: limegreen`) to the target elements.
 * The validator checks if the target elements have this style and if *no other* elements have it.
 * 
 * Let's refine this: The challenge instruction should guide the user to apply a specific style (e.g., `background-color: limegreen;`).
 * The validator then checks if the elements matching `solution.selector` have this style, AND if no other elements have it.
 */
const validateSelectorChallenge = (doc: Document, solution: SelectorSolution): boolean => {
  const expectedColor = 'rgb(173, 255, 47)'; // limegreen
  const validationProperty = 'background-color';

  const allElements = Array.from(doc.querySelectorAll('*'));
  const targetElements = Array.from(doc.querySelectorAll(solution.selector));

  if (targetElements.length === 0) {
    console.warn(`Selector '${solution.selector}' found no elements.`);
    return false; // No elements found by the solution selector
  }

  let allTargetsCorrectlyStyled = true;
  for (const el of targetElements) {
    const computedStyle = doc.defaultView?.getComputedStyle(el);
    if (!computedStyle || computedStyle.getPropertyValue(validationProperty) !== expectedColor) {
      allTargetsCorrectlyStyled = false;
      break;
    }
  }

  if (!allTargetsCorrectlyStyled) {
    return false; // Not all target elements have the expected style
  }

  // Check if any *other* elements also have the expected style (undesired selection)
  let noOtherElementsStyled = true;
  for (const el of allElements) {
    if (!targetElements.includes(el)) {
      const computedStyle = doc.defaultView?.getComputedStyle(el);
      if (computedStyle && computedStyle.getPropertyValue(validationProperty) === expectedColor) {
        noOtherElementsStyled = false;
        break;
      }
    }
  }

  return allTargetsCorrectlyStyled && noOtherElementsStyled;
};

/**
 * Validates a style-based challenge.
 * Checks if the computed styles of the element(s) matching the selector
 * match the expected properties and values.
 */
const validateStyleChallenge = (doc: Document, solution: StyleSolution): boolean => {
  const elements = Array.from(doc.querySelectorAll(solution.selector));

  if (elements.length === 0) {
    console.warn(`Selector '${solution.selector}' found no elements.`);
    return false; // No elements found by the solution selector
  }

  for (const el of elements) {
    const computedStyle = doc.defaultView?.getComputedStyle(el);
    if (!computedStyle) return false;

    for (const prop in solution.properties) {
      const expectedValue = solution.properties[prop];
      const actualValue = computedStyle.getPropertyValue(prop);

      // Normalize values for comparison (e.g., '0px' vs '0')
      const normalizedActual = actualValue.replace(/px$/, '').replace(/rem$/, '').replace(/em$/, '');
      const normalizedExpected = expectedValue.replace(/px$/, '').replace(/rem$/, '').replace(/em$/, '');

      if (normalizedActual !== normalizedExpected) {
        console.log(`Mismatch for ${solution.selector} property ${prop}: Expected '${expectedValue}', Got '${actualValue}'`);
        return false;
      }
    }
  }
  return true;
};
