import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { useLocalStorage } from "@mantine/hooks";

import Layout from "./components/layout/Layout";
import theme from "./utils/mantine/theme";
import store from "./store";
import themeColors from "./utils/mantine/themeColors";

const App = () => {
  const [colorScheme, setColorScheme] = useLocalStorage({
    key: "mantine-color-scheme",
    defaultValue: "light",
    getInitialValueInEffect: true,
  });
  const [colorShade, setColorShade] = useLocalStorage({
    key: "mantine-color-shade",
    defaultValue: "color1",
  });

  const toggleColorScheme = (value) => {
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  };

  const toggleColorShade = (value) => {
    setColorShade(value);
  };

  theme.colors.primary = themeColors[colorShade];
  theme.colors.secondary = themeColors[colorShade];

  return (
    <Provider store={store}>
      <BrowserRouter>
        <ColorSchemeProvider
          toggleColorScheme={{
            colorScheme: { colorScheme },
            toggleColorScheme: { toggleColorScheme },
            colorShade: { colorShade },
            toggleColorShade: { toggleColorShade },
          }}
        >
          <MantineProvider theme={{ ...theme, colorScheme }} withGlobalStyles withNormalizeCSS>
            <NotificationsProvider>
              <Layout />
            </NotificationsProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
