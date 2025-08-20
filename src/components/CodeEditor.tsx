import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { EditorView } from '@codemirror/view';
import { EditorState } from '@codemirror/state';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, readOnly = false }) => {
  return (
    <div className="w-full h-full overflow-hidden rounded-lg shadow-lg">
      <CodeMirror
        value={value}
        height="100%"
        extensions={[
          css(),
          EditorView.lineWrapping, // Enable line wrapping
          EditorState.tabSize.of(2), // Set tab size to 2
          EditorState.indentUnit.of("  ") // Use 2 spaces for indentation
        ]}
        onChange={onChange}
        theme={dracula}
        readOnly={readOnly}
      />
    </div>
  );
};

export default CodeEditor;
