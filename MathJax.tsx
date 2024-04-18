import React, { useState } from "react";
import { View } from "react-native";
import WebView, { WebViewProps } from "react-native-webview";

type MathJaxProps = WebViewProps & {
  html: string;
  mathJaxOptions?: Record<string, any>;
  contentLoader?: () => React.JSX.Element;
  css?: {
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    lineHeight?: string;
    fontWeight?: string;
    padding?: string;
  };
};

const defaultOptions = {
  messageStyle: "none",
  extensions: ["tex2jax.js"],
  jax: ["input/TeX", "output/HTML-CSS"],
  tex2jax: {
    inlineMath: [
      ["$", "$"],
      ["\\(", "\\)"],
    ],
    displayMath: [
      ["$$", "$$"],
      ["\\[", "\\]"],
    ],
    processEscapes: true,
  },
  TeX: {
    extensions: [
      "AMSmath.js",
      "AMSsymbols.js",
      "noErrors.js",
      "noUndefined.js",
    ],
  },
};

const MathJax: React.FC<MathJaxProps> = ({
  html,
  mathJaxOptions,
  contentLoader,
  css,
  ...filteredProps
}: MathJaxProps) => {
  const [height, setHeight] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);

  const RenderLoading: React.JSX.Element | null = contentLoader
    ? contentLoader()
    : null;

  const handleMessage = (message: { nativeEvent: { data: string } }) => {
    const newHeight = Number(message.nativeEvent.data);
    setHeight(newHeight);
    setLoading(false);
  };

  const wrapMathjax = (content: string): string => {
    const options = JSON.stringify(
      Object.assign({}, defaultOptions, mathJaxOptions)
    );
    return `
      <html style="border: none; background:${
        css?.backgroundColor || "#ffffff"
      };">
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
          <style>*{margin:0;padding:0;box-sizing:border-box}</style>
        </head>
        <body style="display:contents;border:none;padding-bottom:100px;background:${
          css?.backgroundColor || "#ffffff"
        };">
          <div id="formula" style="visibility:hidden;color:${
            css?.color || "#000000"
          };background:${css?.backgroundColor || "#ffffff"};font-size:${
      css?.fontSize || 14 + "px"
    };padding:${css?.padding || 0};line-height:${
      css?.lineHeight || "20px"
    };font-weight:${
      css?.fontWeight || "bold"
    };max-height:fit-content;max-width:fit-content;overflow:auto;border:none;display:flex;flex-direction:column;justify-content:start;align-items:start;row-gap:4px;">
              ${content}
          </div>
          <script type="text/x-mathjax-config">
          MathJax.Hub.Config(${options});
          MathJax.Hub.Queue(function(){let height=document.getElementById("formula").scrollHeight;document.getElementById("formula").style.visibility="";window.ReactNativeWebView.postMessage(String(height))});
          </script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>
        </body>
      </html>
    `;
  };

  html = wrapMathjax(html);

  return (
    <>
      {loading && RenderLoading && RenderLoading}
      <View style={{ height, borderWidth: 0, borderColor: "transparent" }}>
        <WebView
          scrollEnabled={false}
          bounce={false}
          javaScriptEnabled={true}
          originWhitelist={["*"]}
          onMessage={handleMessage}
          source={{ html }}
          {...filteredProps}
        />
      </View>
    </>
  );
};

export default MathJax;
