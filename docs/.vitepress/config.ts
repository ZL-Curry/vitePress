import { defineConfig } from 'vitepress';

export default defineConfig({
	lang: 'en-US',
	title: 'BaBalu',
	description: 'BaBalu Notes',
	lastUpdated: true,
	themeConfig: {
		nav: nav(),
		sidebar: {
			'/tool/': sidebarGuide(),
			'/node/': sidebarConfig(),
			'/vue/': sidebarVue(),
			'/js/': sideBarJs()
		},

		editLink: {
			pattern: 'https://github.com/ZL-Curry/vitePress/edit/main/docs/:path',
			text: 'Edit this page on GitHub',
		},

		socialLinks: [
			{ icon: 'github', link: 'https://github.com/ZL-Curry/vitePress' },
		],

		// footer: {
		// message: 'Released under the MIT License.',
		// copyright: 'Copyright © 2022-present BaBalu',
		// },
		// algolia: {
		//   appId: '8J64VVRP8K',
		//   apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
		//   indexName: 'vitepress'
		// },
		// carbonAds: {
		//   code: 'CEBDT27Y',
		//   placement: 'vuejsorg'
		// }
	},
});

function nav() {
	return [
		{ text: 'Tool', link: '/tool/markdown', activeMatch: '/tool/' },
		{ text: 'Javascript', link: '/js/get-start', activeMatch: '/js/' },
		{ text: 'Vue', link: '/vue/get-start', activeMatch: '/vue/' },
		{ text: 'React', link: '/react/get-start', activeMatch: '/react/' },
		{ text: 'Node.js', link: '/node/node-basis', activeMatch: '/node/' },
		{ text: '后盾人', link: 'https://www.houdunren.com/' }, // 直接跳转连接
	];
}

function sidebarGuide() {
	return [
		{
			text: '工具函数',
			collapsible: true,
			items: [{ text: '自定义脚本片段', link: '/tool/custom-script' }],
		},
		{
			text: '问题记录',
			collapsible: true,
			items: [
				{ text: '阻止google浏览器自动更新', link: '/tool/prevent-google-automatic-update' },
			],
		},
	];
}

function sidebarConfig() {
	return [
		{
			text: 'Node.js',
			items: [
				{ text: 'node-basis', link: '/node/node-basis' },
				{ text: 'nodeJS操作数据库', link: '/node/operating-db' },
			],
		},
	];
}

function sidebarVue() {
	return [
		{
			text: 'vue-router',
			items: [
				{ text: 'node-basis', link: '/node/node-basis' },
				{ text: 'nodeJS操作数据库', link: '/node/operating-db' },
			],
		},
	]
}

function sideBarJs() {
	return [
		{
			text: 'javascript',
			items: [
				{ text: 'js常用工具函数', link: '/js/js-tools' },
				{ text: '箭头函数和普通函数有什么区别', link: '/js/arrowfn-are-different-from-normal-fn' },
			],
		},
	]
}
