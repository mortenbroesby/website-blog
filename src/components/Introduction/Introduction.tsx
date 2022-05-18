/* eslint-disable react/no-unescaped-entities */
import { Avatar, Box, Group, createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => ({
  alignRight: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));

export const Introduction = () => {
  const { classes } = useStyles();
  const largeScreen = useMediaQuery("(min-width: 576px)");

  return (
    <Box>
      <Group>
        <Box>
          <h2>Hey there 👋</h2>

          <p>I'm Morten Broesby-Olsen.</p>

          <p>
            <i>"A Danish guy with an international mindset."</i>
          </p>

          <p>I'm a software engineer with a passion for web technologies 🚀.</p>

          <p>I love teaching and helping people, and learning new things.</p>

          <p>I'm also a father and husband 👨‍👩‍👦.</p>

          <h3>What do I like?</h3>
          <ul>
            <li>Programming 💻</li>
            <li>Skateboarding and longboarding 🛹</li>
            <li>Traveling &amp; discovering new places and cultures 🧳</li>
            <li>Playing computer games 🎮</li>
            <li>Reading 📖</li>
          </ul>
        </Box>

        <Box className={classes.alignRight}>
          <Avatar
            src="/images/profile.jpeg"
            alt="Me"
            size={largeScreen ? 200 : 160}
            radius={largeScreen ? 200 : 160}
          />
        </Box>
      </Group>
    </Box>
  );
};
