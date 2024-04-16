import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import MathJax from "./MathJax";

const App = () => {
  const messages = [
    {
      id: 1,
      role: "system",
      content: "$sum_{i=0}^n i^2 = \\frac{(n^2+n)(2n+1)}{6}$",
    },
    {
      id: 2,
      role: "system",
      content: "This is a LaTeX expression: $\\int_{0}^{\\infty} e^{-x^2} dx$",
    },
    {
      id: 3,
      role: "system",
      content:
        "Another LaTeX expression: $\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}$",
    },
    {
      id: 4,
      role: "system",
      content: "$\\lim_{x \\to \\infty} \\left(1 + \\frac{1}{x}\\right)^x = e$",
    },
    {
      id: 5,
      role: "system",
      content: "$\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}$",
    },
    {
      id: 6,
      role: "system",
      content: "Complex chemical equation: $2H_2 + O_2 \\rightarrow 2H_2O$",
    },
    {
      id: 7,
      role: "system",
      content:
        "Another complex equation: $C_{6}H_{12}O_{6} + 6O_{2} \\rightarrow 6CO_{2} + 6H_{2}O$",
    },
    {
      id: 8,
      role: "system",
      content:
        "Yet another one: $CH_{4} + 2O_{2} \\rightarrow CO_{2} + 2H_{2}O$",
    },
    {
      id: 9,
      role: "system",
      content:
        "A complicated reaction: $2Fe_{2}O_{3} + 3C \\rightarrow 4Fe + 3CO_{2}$",
    },
    {
      id: 10,
      role: "system",
      content:
        "Long chemical equation: $2H_{2}O_{2} \\rightarrow 2H_{2}O + O_{2}$",
    },
  ];

  const options = {
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

  return (
    <>
      <StatusBar style="auto" />
      <View style={styles.view}>
        <Text style={styles.text}>React Native Mathjax</Text>
      </View>
      <ScrollView>
        {messages.map((message) => (
          <MathJax
            key={message.id}
            html={message.content}
            mathJaxOptions={options}
            css={{
              padding: "26px",
              lineHeight: "28px",
            }}
          />
        ))}
      </ScrollView>
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
    textAlign: "center",
  },
});
