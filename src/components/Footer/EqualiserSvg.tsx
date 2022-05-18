import { createStyles, keyframes } from "@mantine/core";

const shortEqualiser = keyframes({
  "from, 0%, to": {
    height: "8px",
  },
  "50%": {
    height: "4px",
  },
});

const tallEqualiser = keyframes({
  "from, 0%, to": {
    height: "16px",
  },
  "50%": {
    height: "6px",
  },
});

const useStyles = createStyles((theme) => ({
  bar: {
    transform: "scale(1, -1) translate(0, -24px)",
    animationDelay: "0s",
    animationDuration: "1s",
    animationIterationCount: "infinite",
  },
  bar__1: {
    animationName: `${shortEqualiser}`,
  },
  bar__2: {
    animationName: `${tallEqualiser}`,
    animationDelay: "0.33s",
  },
  bar__3: {
    animationName: `${shortEqualiser}`,
    animationDelay: "0.66s",
  },
}));

export const EqualiserSvg = (properties) => {
  const { classes, cx } = useStyles();

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      {...properties}
    >
      <rect
        className={cx(classes.bar, classes.bar__1)}
        x="4"
        y="4"
        width="3.7"
        height="8"
      />
      <rect
        className={cx(classes.bar, classes.bar__2)}
        x="10.2"
        y="4"
        width="3.7"
        height="16"
      />
      <rect
        className={cx(classes.bar, classes.bar__3)}
        x="16.3"
        y="4"
        width="3.7"
        height="11"
      />
    </svg>
  );
};
