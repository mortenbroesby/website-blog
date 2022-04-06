import { Box, Code, createStyles } from "@mantine/core";
import { Prism } from "@mantine/prism";

const useStyles = createStyles((theme) => ({
  box: {
    position: "relative",
    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: 8,
    borderColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.gray[0], 0.4)
        : theme.fn.rgba(theme.colors.dark[0], 0.4),
  },

  label: {
    position: "absolute",
    top: -32,
    right: 0,
  },
}));

type Language =
  | "markup"
  | "bash"
  | "clike"
  | "c"
  | "cpp"
  | "css"
  | "javascript"
  | "jsx"
  | "coffeescript"
  | "actionscript"
  | "css-extr"
  | "diff"
  | "git"
  | "go"
  | "graphql"
  | "handlebars"
  | "json"
  | "less"
  | "makefile"
  | "markdown"
  | "objectivec"
  | "ocaml"
  | "python"
  | "reason"
  | "sass"
  | "scss"
  | "sql"
  | "stylus"
  | "tsx"
  | "typescript"
  | "wasm"
  | "yaml";

const CodeComponent = ({ code, language = "typescript" }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.box}>
      <Box className={classes.label}>
        <Code>{language}</Code>
      </Box>

      <Prism language={language as Language}>{code}</Prism>
    </Box>
  );
};

export { CodeComponent as Code };
