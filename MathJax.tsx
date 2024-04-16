import React, { useState } from "react";
import { View } from "react-native";
import WebView, { WebViewProps } from "react-native-webview";

type MathJaxProps = WebViewProps & {
  html: string;
  mathJaxOptions?: Record<string, any>;
  loader?: boolean;
  css?: {
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
    lineHeight?: string;
    fontWeight?: string;
    padding?: string;
    loaderSize?: string;
    loaderColor?: string;
    loaderBgColor?: string;
    loaderMargin?: string;
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
  css,
  loader = false,
  mathJaxOptions,
  ...filteredProps
}: MathJaxProps) => {
  const [height, setHeight] = useState<number>(1);

  const handleMessage = (message: { nativeEvent: { data: string } }) => {
    setHeight(Number(message.nativeEvent.data));
  };

  const wrapMathjax = (content: string): string => {
    const options = JSON.stringify(
      Object.assign({}, defaultOptions, mathJaxOptions)
    );
    return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
          <style>
            *{margin:0;padding:0;box-sizing:border-box}
            #loader{border:4px solid ${
              css?.loaderBgColor || "#f3f3f3"
            };border-top:4px solid ${
      css?.loaderColor || "#3498db"
    };border-radius:50%;width:${css?.loaderSize || "30px"};height:${
      css?.loaderSize || "30px"
    };animation:spin 1s linear infinite;margin:${css?.loaderMargin || "15px"}}
            @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
          </style>
        </head>
        <body style="display: contents;">
          <div id="loader" style="display:${loader ? "block" : ""}"></div>
          <div id="formula" style="visibility:hidden;color:${
            css?.color || "#000000"
          };background:${css?.backgroundColor || "#ffffff"};font-size:${
      css?.fontSize || 14 + "px"
    };padding:${css?.padding || 0};line-height:${
      css?.lineHeight || "20px"
    };font-weight:${
      css?.fontWeight || "bold"
    };max-height:fit-content;max-width:100%;overflow:auto;">${content}</div>
          <script type="text/x-mathjax-config">
          MathJax.Hub.Config(${options});
          MathJax.Hub.Queue(function(){let height = document.getElementById("formula").scrollHeight;document. getElementById("loader").style.display="none";document.getElementById("formula").style.visibility="";window.ReactNativeWebView.postMessage(String(height))});
          </script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>
        </body>
      </html>
    `;
  };

  html = wrapMathjax(html);

  return (
    <View style={{ height }}>
      <WebView
        scrollEnabled={false}
        javaScriptEnabled={true}
        originWhitelist={["*"]}
        onMessage={handleMessage}
        source={{ html }}
        {...filteredProps}
      />
    </View>
  );
};

export default MathJax;
