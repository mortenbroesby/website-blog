import React from "react";
import { useMantineColorScheme, ActionIcon, Group } from "@mantine/core";
import { Sun, MoonStars } from "tabler-icons-react";

export function ColorToggle(properties) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const toggleColor = () => {
    toggleColorScheme();
  };

  return (
    <Group position="center" my="xl" {...properties}>
      <ActionIcon
        onClick={toggleColor}
        size="lg"
        sx={(theme) => ({
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[6]
              : theme.colors.gray[0],
          color:
            theme.colorScheme === "dark"
              ? theme.colors.yellow[4]
              : theme.colors.blue[6],
        })}
      >
        {colorScheme === "dark" ? <Sun size={18} /> : <MoonStars size={18} />}
      </ActionIcon>
    </Group>
  );
}
