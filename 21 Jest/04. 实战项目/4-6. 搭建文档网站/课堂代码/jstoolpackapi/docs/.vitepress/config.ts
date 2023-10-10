import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "jstoolpack",
  description: "this is jstoolpack api website",
  lang: "zh-CN",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 上面的导航
    nav: [
      { text: "Guide", link: "/guide/introduction/what-is-vitepress" },
      { text: "Reference", link: "/reference/api/configuration-api" },
    ],

    // 侧边栏
    // 根据不同的 nav 来配置专属的侧边栏
    sidebar: {
      // 为 "/guide/" 路径配置专属的侧边栏
      "/guide/": [
        {
          text: "Introduction",
          collapsed: true,
          items: [
            {
              text: "What is VitePress?",
              link: "/guide/introduction/what-is-vitepress",
            },
            {
              text: "Getting Started",
              link: "/guide/introduction/getting-started",
            },
          ],
        },
        {
          text: "Writing",
          collapsed: true,
          items: [
            {
              text: "Markdown Features",
              link: "/guide/writing/markdown-features",
            },
            {
              text: "Using Vue in Markdown",
              link: "/guide/writing/using-vue-in-markdown",
            },
          ],
        },
        {
          text: "Customization",
          collapsed: true,
          items: [
            {
              text: "Config Reference",
              link: "/guide/customization/config-reference",
            },
            {
              text: "Theme Development",
              link: "/guide/customization/theme-development",
            },
          ],
        },
      ],
      // 为 "/reference/" 路径配置专属的侧边栏
      "/reference/": [
        {
          text: "API Reference",
          collapsed: true,
          items: [
            { text: "Runtime API", link: "/reference/api/runtime-api" },
            {
              text: "Configuration API",
              link: "/reference/api/configuration-api",
            },
          ],
        },
        {
          text: "Plugin Reference",
          collapsed: true,
          items: [
            {
              text: "Creating Plugins",
              link: "/reference/plugins/creating-plugins",
            },
            { text: "Using Plugins", link: "/reference/plugins/using-plugins" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],
  },
});
