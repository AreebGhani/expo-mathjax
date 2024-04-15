import React, { useState } from "react";
import { View, ViewStyle } from "react-native";
import WebView, { WebViewProps } from "react-native-webview";

type MathJaxProps = WebViewProps & {
  html: string;
  mathJaxOptions?: Record<string, any>;
  css?: {
    color?: string;
    backgroundColor?: string;
    fontSize?: number;
    padding?: number;
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

const MathJax: React.FC<MathJaxProps> = ({ props }: MathJaxProps) => {
  const [height, setHeight] = useState < number > 1;

  const handleMessage = (message: { nativeEvent: { data: string } }) => {
    setHeight(Number(message.nativeEvent.data));
  };

  const wrapMathjax = (content: string): string => {
    const options = JSON.stringify(
      Object.assign({}, defaultOptions, props.mathJaxOptions)
    );
    return `
      <html>
        <head>
          <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
          <style>
            *{margin:0;padding:0;box-sizing:border-box}
            #loader{border:4px solid #f3f3f3;border-top:4px solid #3498db;border-radius:50%;width:30px;height:30px;animation:spin 1s linear infinite;margin:20px}
            @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
          </style>
        </head>
        <body style="display: contents;">
          <div id="loader"></div>
          <div id="formula" style="visibility:hidden;color:${
            props.css?.color || "#ffffff"
          };background:${props.css?.backgroundColor || "#20ad96"};font-size:${
      props.css?.fontSize || 18
    }px;padding:${
      props.css?.padding || 0
    }px;max-height:fit-content;max-width:fit-content;overflow:auto;">${content}</div>
          <script type="text/x-mathjax-config">
          MathJax.Hub.Config(${options});
          MathJax.Hub.Queue(function(){let height = document.getElementById("formula").scrollHeight;document. getElementById("loader").style.display="none";document.getElementById("formula").style.visibility="";window.ReactNativeWebView.postMessage(String(height))});
          </script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>
        </body>
      </html>
    `;
  };

  const html = wrapMathjax(props.html);

  const filteredProps = { ...props };
  delete filteredProps.html;
  delete filteredProps.css;
  delete filteredProps.mathJaxOptions;

  return (
    <View style={{ height }}>
      <WebView
        scrollEnabled={false}
        javaScriptEnabled={true}
        originWhitelist={["*"]}
        onMessage={handleMessage}
        onError={(e) => console.error(e)}
        source={{ html }}
        {...filteredProps}
      />
    </View>
  );
};

export default MathJax;
