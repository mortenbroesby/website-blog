import useSoundHook from "use-sound";

type Sound = "SwitchOn" | "SwitchOff";

const lookupMP3 = (sound: Sound) => {
  const soundMap = {
    SwitchOn: () => "/mp3/switch-on.mp3",
    SwitchOff: () => "/mp3/switch-off.mp3",
  };

  return soundMap[sound];
};

export const useSound = (sound: Sound, volume = 0.25) => {
  const targetSound = lookupMP3(sound);
  if (!targetSound) {
    throw new Error(`Sound ${sound} not found`);
  }

  const soundLocation: string = targetSound();
  return useSoundHook(soundLocation, { volume: volume });
};

export const useSwitchSound = () => {
  const [switchOn] = useSound("SwitchOn");
  const [switchOff] = useSound("SwitchOff");

  return [switchOn, switchOff];
};
