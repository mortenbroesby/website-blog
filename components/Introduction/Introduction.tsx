import { Avatar, Box, Group, createStyles, Divider } from "@mantine/core";
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
          <h2>Hey there! - I'm Morten 👋</h2>

          <p>"Danish guy with an international mindset."</p>
          <p>
            I was born in Denmark - and I currently live in the Netherlands.
          </p>
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
            radius="xl"
          />
        </Box>
      </Group>
    </Box>
  );
};
