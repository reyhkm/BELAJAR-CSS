# CSS Quest

CSS Quest is a gamified platform designed to help users master CSS visually through interactive challenges. It breaks down complex CSS concepts into fun, bite-sized quests, providing instant visual feedback.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the Application](#running-the-application)
- [Architecture Overview](#architecture-overview)
  - [Modular Learning Worlds](#modular-learning-worlds)
  - [State Management (Zustand)](#state-management-zustand)
  - [Flexible Validation Engine](#flexible-validation-engine)
- [Adding New Modules and Challenges](#adding-new-modules-and-challenges)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Gamified Learning:** Progress through "Worlds" (modules) with visual challenges.
- **Instant Visual Feedback:** See the effects of your CSS code immediately.
- **Interactive Code Editor:** Integrated CodeMirror for writing CSS.
- **Comprehensive Modules:** Covers selectors, box model, flexbox, grid, positioning, transitions, and more.
- **Progress Tracking:** Zustand-powered state management to save your progress.

## Technology Stack

- **Frontend Framework:** ReactJS (with Vite)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (for UI) & Plain CSS (for challenge arena)
- **State Management:** Zustand
- **Routing:** React Router DOM
- **Code Editor:** CodeMirror (`@uiw/react-codemirror`)
- **Animations:** Framer Motion

## Project Structure

```
css-quest/
├── public/
├── src/
│   ├── assets/             # Static assets like images
│   ├── components/         # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── ChallengeArena.tsx
│   │   ├── CodeEditor.tsx
│   │   ├── LevelListItem.tsx
│   │   ├── ModuleCard.tsx
│   │   └── ProgressBar.tsx
│   ├── data/               # Challenge data
│   │   └── challenges/     # JSON files for each module
│   │       ├── box-model.json
│   │       ├── color-text.json
│   │       ├── flexbox.json
│   │       ├── grid.json
│   │       ├── positioning.json
│   │       ├── selectors.json
│   │       └── transitions-animations.json
│   ├── pages/              # Main application pages
│   │   ├── MapPage.tsx
│   │   ├── ModulePage.tsx
│   │   └── NotFoundPage.tsx
│   ├── store/              # Zustand store definitions
│   │   └── progressStore.ts
│   ├── types/              # TypeScript type definitions
│   │   └── challenge.d.ts
│   ├── utils/              # Utility functions
│   │   ├── challengeValidator.ts
│   │   └── cssUtils.ts
│   ├── App.tsx             # Main application component, defines routes
│   ├── index.css           # Global styles and Tailwind directives
│   └── main.tsx            # React entry point
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- Node.js (v18 or higher)
- npm or Yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/css-quest.git
    cd css-quest
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application

To start the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Architecture Overview

### Modular Learning Worlds

The application is structured around "Worlds" or "Modules," each focusing on a specific set of CSS properties. Each module contains a series of challenges (levels) that progressively teach concepts.

-   **`src/data/challenges/`**: This directory holds separate JSON files for each module (e.g., `selectors.json`, `flexbox.json`). Each JSON file is an array of challenge objects, defining the `id`, `title`, `instruction`, `html` structure, `cssStarter`, and the `solution` for validation.

### State Management (Zustand)

User progress, active module, and current level are managed using Zustand, a lightweight state management library.

-   **`src/store/progressStore.ts`**: Defines the `useProgressStore` hook. It stores:
    -   `modules`: All loaded challenge data, nested by module name.
    -   `activeModule`: The currently selected module.
    -   `activeLevelIndex`: The index of the current challenge within the active module.
    -   `userProgress`: A complex object tracking completion status and user-submitted code for each level across all modules.

### Flexible Validation Engine

The core of the interactive learning is the validation engine, located in `src/utils/challengeValidator.ts`. It's designed to be flexible enough to validate various types of CSS challenges.

-   **How it works:**
    1.  The user's HTML and CSS are rendered within an isolated `iframe` in the `ChallengeArena.tsx` component.
    2.  The `validateChallenge` function (from `challengeValidator.ts`) is called with the `iframe`'s content window, the user's CSS, and the expected `solution` from the challenge data.
    3.  Based on the `solution.type` (`'selector'` or `'style'`):
        -   **`'selector'` validation:** Checks if the user's CSS successfully applies a specific, unique validation style (e.g., `background-color: limegreen`) to *only* the elements targeted by the `solution.selector`. This ensures the user has correctly identified and styled the intended elements.
        -   **`'style'` validation:** Iterates through the `solution.properties` and uses `window.getComputedStyle()` on the specified `selector` within the `iframe` to compare the actual computed styles against the expected values. It ensures all required properties match.

## Adding New Modules and Challenges

Extending CSS Quest with new content is straightforward:

1.  **Create a new JSON file:** In `src/data/challenges/`, create a new JSON file (e.g., `new-concept.json`). The filename will be used as the module ID.

2.  **Define challenges:** Populate the JSON file with an array of challenge objects, following the `Challenge` interface defined in `src/types/challenge.d.ts`. Each challenge object must include:
    -   `id`: Unique identifier for the challenge.
    -   `title`: Display title.
    -   `instruction`: Detailed instructions for the user.
    -   `html`: The base HTML structure for the challenge arena.
    -   `cssStarter`: Initial CSS code provided to the user.
    -   `solution`: An object defining the expected outcome.
        -   `type`: `'selector'` or `'style'`
        -   If `type: 'selector'`: `selector: string` (the CSS selector that should target the correct elements).
        -   If `type: 'style'`: `selector: string` (the CSS selector for the element to check) and `properties: Record<string, string>` (key-value pairs of CSS properties and their expected computed values).

    **Example `solution` structures:**

    ```json
    // For a selector challenge:
    {
      "id": "selector-example",
      "title": "Select all circles",
      "instruction": "Make all elements with class 'circle' green.",
      "html": "<div><div class=\"circle\"></div><div class=\"square\"></div><div class=\"circle\"></div></div>",
      "cssStarter": "/* Your code here */",
      "solution": {
        "type": "selector",
        "selector": ".circle"
      }
    }

    // For a style property challenge:
    {
      "id": "box-model-example",
      "title": "Add padding",
      "instruction": "Add 20px padding to the box.",
      "html": "<div class=\"box\">Content</div>",
      "cssStarter": ".box { border: 1px solid black; }\n/* Your code here */",
      "solution": {
        "type": "style",
        "selector": ".box",
        "properties": {
          "padding-top": "20px",
          "padding-right": "20px",
          "padding-bottom": "20px",
          "padding-left": "20px"
        }
      }
    }
    ```

3.  **Update `src/store/progressStore.ts` (if necessary):** The `progressStore` automatically imports all JSON files from `src/data/challenges/`. As long as your new JSON file is in that directory, it will be loaded. You might want to update the `moduleOrder` array in `progressStore.ts` to control the display order on the map page.

4.  **Add a module image (optional):** If you want a custom image for your new module on the map page, add it to `public/assets/modules/` and reference it in `MapPage.tsx` or `ModuleCard.tsx`.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is open-source and available under the MIT License.
