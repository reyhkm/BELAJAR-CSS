import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { dracula } from '@uiw/codemirror-theme-dracula';

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
        extensions={[css()]}
        onChange={onChange}
        theme={dracula}
        readOnly={readOnly}
        options={{
          lineWrapping: true,
          indentWithTabs: false,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default CodeEditor;
