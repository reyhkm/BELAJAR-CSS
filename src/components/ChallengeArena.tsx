import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface ChallengeArenaProps {
  htmlContent: string;
  cssContent: string;
  onIframeLoad?: (iframeWindow: Window | null) => void;
}

const ChallengeArena: React.FC<ChallengeArenaProps> = ({ htmlContent, cssContent, onIframeLoad }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow) {
      const doc = iframe.contentWindow.document;
      doc.open();
      doc.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              display: flex;
              justify-content: center;
              align-items: center;
              width: 100%;
              height: 100%;
              overflow: auto;
              background-color: #2D3748; /* Dark background for arena */
              color: white;
              font-family: sans-serif;
            }
            /* Base styles for challenge elements */
            .challenge-arena-container * {
              box-sizing: border-box;
            }
            .challenge-arena-container div, .challenge-arena-container span, .challenge-arena-container p, .challenge-arena-container h1, .challenge-arena-container h2, .challenge-arena-container h3, .challenge-arena-container h4, .challenge-arena-container h5, .challenge-arena-container h6, .challenge-arena-container ul, .challenge-arena-container ol, .challenge-arena-container li, .challenge-arena-container a, .challenge-arena-container img, .challenge-arena-container button, .challenge-arena-container input, .challenge-arena-container select, .challenge-arena-container textarea, .challenge-arena-container table, .challenge-arena-container tr, .challenge-arena-container td, .challenge-arena-container th, .challenge-arena-container form, .challenge-arena-container fieldset, .challenge-arena-container legend, .challenge-arena-container label, .challenge-arena-container section, .challenge-arena-container article, .challenge-arena-container aside, .challenge-arena-container header, .challenge-arena-container footer, .challenge-arena-container nav, .challenge-arena-container main, .challenge-arena-container figure, .challenge-arena-container figcaption, .challenge-arena-container video, .challenge-arena-container audio, .challenge-arena-container source, .challenge-arena-container track, .challenge-arena-container canvas, .challenge-arena-container svg, .challenge-arena-container iframe, .challenge-arena-container object, .challenge-arena-container embed, .challenge-arena-container dialog, .challenge-arena-container details, .challenge-arena-container summary, .challenge-arena-container slot, .challenge-arena-container template, .challenge-arena-container picture, .challenge-arena-container source, .challenge-arena-container map, .challenge-arena-container area, .challenge-arena-container link, .challenge-arena-container style, .challenge-arena-container script, .challenge-arena-container noscript, .challenge-arena-container meta, .challenge-arena-container title, .challenge-arena-container base, .challenge-arena-container head, .challenge-arena-container body, .challenge-arena-container html {
              min-width: 10px;
              min-height: 10px;
              background-color: rgba(255, 255, 255, 0.1);
              border: 1px dashed rgba(255, 255, 255, 0.2);
              color: white;
              display: block;
              padding: 5px;
              margin: 5px;
              font-size: 14px;
              text-align: center;
              line-height: 1.2;
              overflow: hidden;
              position: static;
              z-index: auto;
              opacity: 1;
              transform: none;
              transition: none;
              animation: none;
            }
            .box {
              width: 100px;
              height: 100px;
              background-color: #3B82F6;
              border: 2px solid #2563EB;
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
              font-weight: bold;
            }
            .item {
              width: 50px;
              height: 50px;
              background-color: #EC4899;
              border: 1px solid #BE185D;
              display: flex;
              justify-content: center;
              align-items: center;
              color: white;
              font-weight: bold;
            }
            .target {
              background-color: #10B981;
              border: 2px solid #059669;
            }
            .red-box {
              background-color: #EF4444;
              border: 2px solid #DC2626;
            }
            .blue-box {
              background-color: #3B82F6;
              border: 2px solid #2563EB;
            }
            .green-box {
              background-color: #10B981;
              border: 2px solid #059669;
            }
            .orange-box {
              background-color: #F59E0B;
              border: 2px solid #D97706;
            }
            .apple {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #EF4444;
              border: 2px solid #DC2626;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              color: white;
              font-size: 12px;
            }
            .orange {
              width: 40px;
              height: 40px;
              border-radius: 50%;
              background-color: #F59E0B;
              border: 2px solid #D97706;
              display: inline-flex;
              justify-content: center;
              align-items: center;
              color: white;
              font-size: 12px;
            }
            plate {
              display: block;
              width: 80px;
              height: 20px;
              background-color: #D1D5DB;
              border: 1px solid #9CA3AF;
              margin: 5px;
              display: flex;
              justify-content: center;
              align-items: center;
              color: #374151;
              font-size: 12px;
            }
            .table {
              display: flex;
              flex-wrap: wrap;
              gap: 10px;
              padding: 10px;
              border: 2px dashed #6B7280;
              background-color: #374151;
              min-height: 150px;
              align-items: center;
              justify-content: center;
            }
            .notification {
              width: 120px;
              height: 40px;
              background-color: #F59E0B;
              color: white;
              display: flex;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              border-radius: 5px;
              padding: 5px;
            }
            .card {
              width: 100px;
              height: 150px;
              border: 2px solid;
              display: flex;
              justify-content: center;
              align-items: center;
              font-weight: bold;
              font-size: 18px;
            }
            .card.red {
              background-color: #EF4444;
              border-color: #DC2626;
              color: white;
            }
            .card.blue {
              background-color: #3B82F6;
              border-color: #2563EB;
              color: white;
            }
            .button-hover {
              padding: 10px 20px;
              background-color: #4F46E5;
              color: white;
              border: none;
              border-radius: 5px;
              cursor: pointer;
              font-size: 16px;
            }
            .star {
              width: 50px;
              height: 50px;
              background-color: gold;
              clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
            }
            .css-quest-validation-target {
              background-color: limegreen !important;
              outline: 2px solid darkgreen !important;
              box-shadow: 0 0 5px 2px limegreen !important;
            }
          </style>
          <style id="user-css-style"></style>
        </head>
        <body>
          <div class="challenge-arena-container">
            ${htmlContent}
          </div>
        </body>
        </html>
      `);
      doc.close();

      // Apply user CSS
      const userCssStyleTag = doc.getElementById('user-css-style');
      if (userCssStyleTag) {
        userCssStyleTag.textContent = cssContent;
      }

      // Notify parent that iframe is ready
      if (onIframeLoad) {
        onIframeLoad(iframe.contentWindow);
      }
      setIframeLoaded(true);
    }
  }, [htmlContent, cssContent, onIframeLoad]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full bg-gray-800 rounded-lg shadow-inner overflow-hidden"
    >
      {!iframeLoaded && (
        <div className="absolute inset-0 flex items-center justify-center text-text-light">
          Loading Challenge...
        </div>
      )}
      <iframe
        ref={iframeRef}
        title="Challenge Arena"
        className="w-full h-full border-none bg-transparent"
        sandbox="allow-scripts allow-same-origin"
      />
    </motion.div>
  );
};

export default ChallengeArena;
