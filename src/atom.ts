import { atom } from "recoil";

export const selectedIdState = atom<number | null>({
  key: "selectedIdState",
  default: null,
});

export const televisionClickedState = atom<boolean>({
  key: "televisionClickedState",
  default: false,
});

export const televisionZoomState = atom<boolean>({
  key: "televisionZoomState",
  default: false,
});
