// Quiz question data
const javascriptQuestions = [
  {
    title: "Which of these is NOT a way to declare a variable in Javascript?",
    choices: ["const", "set", "let", "var"],
    answer: "set",
  },

  {
    title: "JavaScript variables are usually written in which type of case?",
    choices: ["lowercase", "UPPERCASE", "camelCase", "CapitalCase"],
    answer: "camelCase",
  },

  {
    title: "Object properties are made up of pairs of keys and _____?",
    choices: ["values", "properties", "variables", "arrays"],
    answer: "values",
  },

  {
    title:
      "What do we call the values received by a function when it is invoked?",
    choices: ["variables", "arguments", "parameters", "inputs"],
    answer: "arguments",
  },
  {
    title: "Which of the following is NOT a Javascript array method?",
    choices: [".join()", ".pop()", ".unshift()", ".combine()"],
    answer: ".combine()",
  },
];

const htmlQuestions = [
  {
    title: "What does HTML stand for?",
    choices: [
      "Hypertrophic Management Language",
      "Hyperberic Tertiary Logrithm",
      "Hypertext Markup Language",
      "Hyperresonant Marginal Logrithm",
    ],
    answer: "Hypertext Markup Language",
  },

  {
    title:
      "In which section of the HTML document would your stylesheet be linked?",
    choices: ["body", "head", "footer", "main"],
    answer: "head",
  },

  {
    title: "Which tag denotes a numbered list?",
    choices: ["ul", "ol", "li", "nu"],
    answer: "ol",
  },

  {
    title:
      "Which attribute is used to provides alternative information for an image?",
    choices: ["href", "src", "alt", "img"],
    answer: "alt",
  },
  {
    title: "Which of these tags displays the smallest text size?",
    choices: ["h1", "h3", "h5", "h6"],
    answer: "h6",
  },
];

const cssQuestions = [
  {
    title: "What does CSS stand for?",
    choices: [
      "Computer Style Sheets",
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Control Style Sheets",
    ],
    answer: "Cascading Style Sheets",
  },

  {
    title: "Which property is used to change font color?",
    choices: ["color", "font-color", "text-color", "background-color"],
    answer: "color",
  },

  {
    title: "Which of these is NOT the name of a CSS framework?",
    choices: ["Bootstrap", "Semantic UI", "Maximiser", "StyleMe"],
    answer: "StyleMe",
  },

  {
    title: "What can we use to make our apps responsive?",
    choices: ["Animations", "Media Queries", "Scaling", "Grids"],
    answer: "Media Queries",
  },
  {
    title: 'How would you select an element with an ID = "demo" ?',
    choices: [".demo", "demo", "#demo", "*demo"],
    answer: "#demo",
  },
];

export { javascriptQuestions, htmlQuestions, cssQuestions };
