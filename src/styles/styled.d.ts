import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary: string;
    primaryLight: string;
    gray: {
      g900: string;
      g800: string;
    };
  }
}
