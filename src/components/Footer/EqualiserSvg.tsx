import { createStyles, keyframes } from "@mantine/core";

const bounce = keyframes({
  "from, 0%": {
    height: "3px",
  },
  "30%": {
    height: "16px",
  },
  "60%": {
    transform: "8px",
  },
  "80%": {
    transform: "12px",
  },
  "100%, to": {
    height: "9px",
  },
});

const useStyles = createStyles((theme) => ({
  bar: {
    transform: "scale(1, -1) translate(0, -24px)",
    animationDelay: "0s",
    animationDuration: "2.2s",
    animationIterationCount: "infinite",
  },
  bar__1: {
    animationName: `${bounce}`,
  },
  bar__2: {
    animationName: `${bounce}`,
    animationDelay: "0.726s",
  },
  bar__3: {
    animationName: `${bounce}`,
    animationDelay: "1.452s",
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
