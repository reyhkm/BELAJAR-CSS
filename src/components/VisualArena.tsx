import React, { useEffect, useRef } from 'react';

interface VisualArenaProps {
  htmlContent: string;
  cssContent: string;
  iframeRef: React.RefObject<HTMLIFrameElement>;
}

const VisualArena: React.FC<VisualArenaProps> = ({ htmlContent, cssContent, iframeRef }) => {
  const createContent = () => {
    return `
      <html>
        <head>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100%;
              margin: 0;
              background-color: #f0f0f0;
              font-family: sans-serif;
            }
            /* User's CSS will be injected here */
            ${cssContent}
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
      </html>
    `;
  };

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe) {
      const document = iframe.contentDocument;
      if (document) {
        document.open();
        document.write(createContent());
        document.close();
      }
    }
  }, [htmlContent, cssContent]);

  return (
    <iframe
      ref={iframeRef}
      title="Visual Arena"
      className="w-full h-full bg-white border-none rounded-md"
      sandbox="allow-scripts"
    />
  );
};

export default VisualArena;
