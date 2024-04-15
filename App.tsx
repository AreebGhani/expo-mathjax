import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import MathJax from "./MathJax";

const App = () => {
  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.view}>
        <Text style={styles.text}>React Native Mathjax</Text>
      </View>
      <MathJax
        // HTML content with MathJax support
        html={
          "<pz>This is a latex expression</pz>$sum_{n=1}^{infty} \frac{1}{n^2} = \frac{pi^2}{6}$<br /><p>This is an equation</p>"
        }
        // MathJax config option
        mathJaxOptions={{
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
        }}
        // Custom styling
        css={{
          color: "#ffffff",
          backgroundColor: "#20AD96",
          fontSize: "18px",
          padding: "30px 15px",
        }}
        // WebView Props
        bounces={false}
        overScrollMode="never"
        scalesPageToFit={true}
        scrollEnabled={false}
        setBuiltInZoomControls={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        keyboardDisplayRequiresUserAction={false}
        hideKeyboardAccessoryView={true}
        textInteractionEnabled={false}
      />
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  view: {
    marginTop: 50,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  text: {
    fontSize: 24,
    textAlign: `center`,
  },
});
