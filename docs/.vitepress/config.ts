import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'BaBalu',
  description: 'BaBalu Notes',
  lastUpdated: true,
  themeConfig: {
    nav: nav(),
    sidebar: {
      '/guide/': sidebarGuide(),
      '/node/': sidebarConfig()
    },

    editLink: {
      pattern: 'https://github.com/ZL-Curry/vitePress/edit/main/docs/:path',
      text: 'Edit this page on GitHub'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ZL-Curry/vitePress' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present BaBalu'
    },
    // algolia: {
    //   appId: '8J64VVRP8K',
    //   apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
    //   indexName: 'vitepress'
    // },
    // carbonAds: {
    //   code: 'CEBDT27Y',
    //   placement: 'vuejsorg'
    // }
  }
})

function nav() {
  return [
    { text: '起步', link: '/guide/markdown', activeMatch: '/guide/' },
    { text: 'Javascript', link: '/js/get-start', activeMatch: '/js/' },
    { text: 'Vue', link: '/vue/get-start', activeMatch: '/vue/' },
    { text: 'React', link: '/react/get-start', activeMatch: '/react/' },
    { text: 'Node.js', link: '/node/node-basis', activeMatch: '/node/' },
    {  text: '后盾人', link: 'https://www.houdunren.com/' } // 直接跳转连接
  ]
}

function sidebarGuide() {
  return [
    {
      text: '工具函数',
      collapsible: true,
      items: [
        { text: 'Introduction', link: '/guide/theme-introduction' },
      ]
    },
    {
      text: 'js面试题',
      collapsible: true,
      items: [
        {
          text: 'Migration from VuePress',
          link: '/guide/migration-from-vuepress'
        },
        {
          text: '箭头函数和普通函数有什么区别',
          link: '/guide/arrowfn-are-different-from-normal-fn'
        }
      ]
    }
  ]
}

function sidebarConfig() {
  return [
    {
      text: 'Node.js',
      items: [
        { text: 'node-basis', link: '/node/node-basis' },
        { text: 'node操作数据库', link: '/node/operating-db' },
      ]
    }
  ]
}