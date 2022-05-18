import { useState } from "react";
import {
  Box,
  createStyles,
  useMantineColorScheme,
  useMantineTheme,
  Code,
  ActionIcon,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { LiveEditor } from "react-live";

import { getPrismTheme } from "./theme";
import { CopyIcon } from "./CopyIcon";

const useStyles = createStyles((theme) => ({
  box: {
    position: "relative",
    fontFamily: "monospace",
    lineHeight: "1.55",
    fontSize: "14px",
    zIndex: 1,

    borderStyle: "solid",
    borderWidth: "1px",
    borderRadius: 8,
    borderColor:
      theme.colorScheme === "dark"
        ? theme.fn.rgba(theme.colors.gray[0], 0.4)
        : theme.fn.rgba(theme.colors.dark[0], 0.4),

    marginTop: 0,
    [theme.fn.smallerThan("md")]: {
      marginTop: 32,
    },
  },

  label: {
    position: "absolute",
    top: -30,
    right: 0,
  },

  copy: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 2,
    cursor: "pointer",
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

const EditableCode = ({ code, language = "typescript" }) => {
  const copyLabel = "Copy code";
  const copiedLabel = "Copied";

  const trimmedCode = typeof code === "string" ? code.trim() : code;
  const [activeCode, setActiveCode] = useState(trimmedCode);

  const theme = useMantineTheme();
  const { classes } = useStyles();
  const { colorScheme } = useMantineColorScheme();
  const prismTheme = getPrismTheme(theme, colorScheme);
  const clipboard = useClipboard();

  const handleChange = (value: string) => {
    setActiveCode(value);
  };

  return (
    <Box className={classes.box}>
      <Box className={classes.label}>
        <Code>{language}</Code>
      </Box>

      <Box className={classes.copy}>
        <ActionIcon
          aria-label={clipboard.copied ? copiedLabel : copyLabel}
          onClick={() => clipboard.copy(activeCode)}
        >
          <CopyIcon copied={clipboard.copied} />
        </ActionIcon>
      </Box>

      <LiveEditor
        style={{
          fontFamily: "Monaco,Courier,monospace",
          margin: "16px",
        }}
        theme={prismTheme}
        code={activeCode}
        language={language as Language}
        onChange={(value) => handleChange(value)}
      />
    </Box>
  );
};

export { EditableCode };
