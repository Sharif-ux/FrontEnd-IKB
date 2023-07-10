import {
	SidebarEmailIcon,
	SidebarChatIcon,
	SidebarEcommerceIcon,
	SidebarMapsIcon,
	SidebarProfileIcon,
	SidebarScrumBoardIcon,
	SidebarInvoiceIcon,
	SidebarCalendarIcon,
	SidebarNotesIcon,
	SidebarToDosIcon,
	SidebarFireStoreIcon,
	SidebarContactsIcon,
	SidebarShuffleIcon,
	SidebarChartsIcon,
	SidebarFormsIcon,
	SidebarUIIcon,
	SidebarAdvancedIcon,
	SidebarFeedbackIcon,
	SidebarTablesIcon,
	SidebarPagesIcon,
	SidebarGithubIcon,
	SidebarBlankIcon,
	SidebarLaporanDokumenBC,
	SidebarLaporanMutasi,
	SidebarMaterialMasuk,
	SidebarDeliveryOrder,
	SidebarDashboard,
	SidebarSystemLog
} from '@iso/config/icon.config';

export default [
	// {
	// 	key: 'mailbox',
	// 	path: '/mailbox',
	// 	label: 'sidebar.email',
	// 	leftIcon: <SidebarEmailIcon size={19} />,
	// },
	// {
	// 	key: 'chat',
	// 	label: 'sidebar.chat',
	// 	leftIcon: <SidebarChatIcon size={19} />,
	// },
	{
		key: 'dashboardikb',
		label: 'sidebar.dashboard',
		leftIcon: <SidebarDashboard size={19} />,
	},
	{
		key: 'dokumenbc',
		label: 'sidebar.laporanDokumenBC',
		leftIcon: <SidebarLaporanDokumenBC size={19} />,
		children: [
			{
				key: 'penerimaanbarang',
				label: 'sidebar.penerimaanBarang',
			},
			{
				key: 'pengeluaranbarang',
				label: 'sidebar.pengeluaranBarang',
			},
		],
	},
	{
		key: 'mutasi',
		label: 'sidebar.mesin',
		leftIcon: <SidebarLaporanMutasi size={19} />,
		children: [
			{
				key: 'bahanbaku',
				label: 'sidebar.bahanbaku',
			},
			{
				key: 'mesin',
				label: 'sidebar.mesin',
			},			{
				key: 'barangjadi',
				label: 'sidebar.barangJadi',
			},
			{
				key: 'barangsisa',
				label: 'sidebar.bahansisa',
			},			
			{
				key: 'wip',
				label: 'sidebar.wip',
			},
		],
	},
	{
		key: 'materialmasuk',
		label: 'Material Masuk',
		leftIcon: <SidebarMaterialMasuk size={19} />,
	},
	{
		key: 'deliveryorder',
		label: 'Delivery Order',
		leftIcon: <SidebarDeliveryOrder size={19} />,
	},
	{
		key: 'systemlog',
		label: 'System Log',
		leftIcon: <SidebarSystemLog size={19} />,
	},
	// {
	// 	key: 'ecommerce',
	// 	label: 'sidebar.ecommerce',
	// 	leftIcon: <SidebarEcommerceIcon size={19} />,
	// 	children: [
	// 		{
	// 			key: 'shop',
	// 			label: 'sidebar.shop',
	// 		},
	// 		{
	// 			key: 'cart',
	// 			label: 'sidebar.cart',
	// 		},
	// 		{
	// 			key: 'checkout',
	// 			label: 'sidebar.checkout',
	// 		},
	// 		{
	// 			key: 'card',
	// 			label: 'sidebar.cards',
	// 		},
	// 	],
	// },
	// {
	// 	key: 'maps',
	// 	label: 'sidebar.maps',
	// 	leftIcon: <SidebarMapsIcon size={19} />,
	// 	children: [
	// 		{
	// 			key: 'googlemap',
	// 			label: 'sidebar.googleMap',
	// 		},
	// 		{
	// 			key: 'leafletmap',
	// 			label: 'sidebar.leafletMap',
	// 		},
	// 	],
	// },
	// {
	// 	key: 'my_profile',
	// 	label: 'sidebar.profile',
	// 	leftIcon: <SidebarProfileIcon size={19} />,
	// },
	// {
	// 	key: 'invoice',
	// 	label: 'sidebar.invoice',
	// 	leftIcon: <SidebarScrumBoardIcon size={19} />,
	// },
	// {
	// 	key: 'calendar',
	// 	label: 'sidebar.calendar',
	// 	leftIcon: <SidebarCalendarIcon size={19} />,
	// },
	// {
	// 	key: 'notes',
	// 	label: 'sidebar.notes',
	// 	leftIcon: <SidebarNotesIcon size={19} />,
	// },
	// {
	// 	key: 'todo',
	// 	label: 'sidebar.todos',
	// 	leftIcon: <SidebarToDosIcon size={19} />,
	// },

	// {
	// 	key: 'contacts',
	// 	label: 'sidebar.contacts',
	// 	leftIcon: <SidebarContactsIcon size={19} />,
	// },
	// {
	// 	key: 'shuffle',
	// 	label: 'sidebar.shuffle',
	// 	leftIcon: <SidebarShuffleIcon size={19} />,
	// },
	// {
	// 	key: 'charts',
	// 	label: 'sidebar.charts',
	// 	leftIcon: <SidebarChartsIcon size={19} />,
	// 	children: [
	// 		{
	// 			key: 'googleChart',
	// 			label: 'sidebar.googleCharts',
	// 		},
	// 		{
	// 			key: 'reecharts',
	// 			label: 'sidebar.recharts',
	// 		},
	// 		{
	// 			key: 'reactChart2',
	// 			label: 'sidebar.reactChart2',
	// 		},
	// 		{
	// 			key: 'reactTrend',
	// 			label: 'sidebar.reactTrend',
	// 		},
	// 	],
	// },
	// {
	// 	key: 'Forms',
	// 	label: 'sidebar.forms',
	// 	leftIcon: <SidebarFormsIcon size={19} />,
	// 	children: [
	// 		{
	// 			key: 'inputField',
	// 			label: 'sidebar.input',
	// 		},
	// 		{
	// 			key: 'editor',
	// 			label: 'sidebar.editor',
	// 		},
	// 		{
	// 			key: 'FormsWithValidation',
	// 			label: 'sidebar.formsWithValidation',
	// 		},
	// 		{
	// 			key: 'progress',
	// 			label: 'sidebar.progress',
	// 		},
	// 		{
	// 			key: 'button',
	// 			label: 'sidebar.button',
	// 		},
	// 		{
	// 			key: 'tab',
	// 			label: 'sidebar.tab',
	// 		},
	// 		{
	// 			key: 'checkbox',
	// 			label: 'sidebar.checkbox',
	// 		},
	// 		{
	// 			key: 'radiobox',
	// 			label: 'sidebar.radiobox',
	// 		},
	// 		{
	// 			key: 'selectbox',
	// 			label: 'sidebar.selectbox',
	// 		},
	// 		{
	// 			key: 'transfer',
	// 			label: 'sidebar.transfer',
	// 		},
	// 		{
	// 			key: 'autocomplete',
	// 			label: 'sidebar.autocomplete',
	// 		},
	// 	],
	// },
	// // {
	// //   key: 'gridLayout',
	// //   label: 'sidebar.boxOptions',
	// //   leftIcon: 'ion-cube'
	// // },
	// {
	// 	key: 'uielements',
	// 	label: 'sidebar.uiElements',
	// 	leftIcon: <SidebarUIIcon size={19} />,
	// 	children: [
	// 		{
	// 			key: 'op_badge',
	// 			label: 'sidebar.badge',
	// 		},
	// 		{
	// 			key: 'op_card',
	// 			label: 'sidebar.card2',
	// 		},
	// 		{
	// 			key: 'op_carousel',
	// 			label: 'sidebar.corusel',
	// 		},
	// 		{
	// 			key: 'op_collapse',
	// 			label: 'sidebar.collapse',
	// 		},
	// 		{
	// 			key: 'op_popover',
	// 			label: 'sidebar.popover',
	// 		},
	// 		{
	// 			key: 'op_tooltip',
	// 			label: 'sidebar.tooltip',
	// 		},
	// 		{
	// 			key: 'op_tag',
	// 			label: 'sidebar.tag',
	// 		},
	// 		{
	// 			key: 'op_timeline',
	// 			label: 'sidebar.timeline',
	// 		},
	// 		{
	// 			key: 'dropdown',
	// 			label: 'sidebar.dropdown',
	// 		},
	// 		{
	// 			key: 'pagination',
	// 			label: 'sidebar.pagination',
	// 		},
	// 		{
	// 			key: 'rating',
	// 			label: 'sidebar.rating',
	// 		},
	// 		{
	// 			key: 'tree',
	// 			label: 'sidebar.tree',
	// 		},
	// 		{
	// 			key: 'swiper_slider',
	// 			label: 'sidebar.swiperslider',
	// 		},
	// 	],
	// },
	// {
	// 	key: 'advancedUielements',
	// 	label: 'sidebar.advancedElements',
	// 	leftIcon: <SidebarAdvancedIcon size={19} />,
	// 	children: [
	// 		{
	// 			key: 'reactDates',
	// 			label: 'sidebar.reactDates',
	// 		},
	// 		{
	// 			key: 'codeMirror',
	// 			label: 'sidebar.codeMirror',
	// 		},
	// 		{
	// 			key: 'uppy',
	// 			label: 'sidebar.uppy',
	// 		},
	// 		{
	// 			key: 'dropzone',
	// 			label: 'sidebar.dropzone',
	// 		},
	// 	],
	// },
	// {
	// 	key: 'feedback',
	// 	label: 'sidebar.feedback',
	// 	leftIcon: <SidebarFeedbackIcon size={19} />,
	// 	children: [
	// 		{
	// 			key: 'alert',
	// 			label: 'sidebar.alert',
	// 		},
	// 		{
	// 			key: 'modal',
	// 			label: 'sidebar.modal',
	// 		},
	// 		{
	// 			key: 'message',
	// 			label: 'sidebar.message',
	// 		},
	// 		{
	// 			key: 'notification',
	// 			label: 'sidebar.notification',
	// 		},
	// 		{
	// 			key: 'popconfirm',
	// 			label: 'sidebar.popConfirm',
	// 		},
	// 		{
	// 			key: 'spin',
	// 			label: 'sidebar.spin',
	// 		},
	// 	],
	// },
	// {
	// 	key: 'table',
	// 	label: 'sidebar.tables',
	// 	leftIcon: <SidebarTablesIcon size={19} />,
	// 	children: [
	// 		{
	// 			key: 'table_ant',
	// 			label: 'sidebar.antTables',
	// 		},
	// 	],
	// },
	// {
	// 	key: 'pages',
	// 	label: 'sidebar.pages',
	// 	leftIcon: <SidebarPagesIcon size={19} />,
	// 	children: [
	// 		{
	// 			key: '404',
	// 			label: 'sidebar.404',
	// 			withoutDashboard: true,
	// 		},
	// 		{
	// 			key: '500',
	// 			label: 'sidebar.500',
	// 			withoutDashboard: true,
	// 		},
	// 		{
	// 			key: 'signin',
	// 			label: 'sidebar.signIn',
	// 			withoutDashboard: true,
	// 		},
	// 		{
	// 			key: 'signup',
	// 			label: 'sidebar.signUp',
	// 			withoutDashboard: true,
	// 		},
	// 		{
	// 			key: 'forgotpassword',
	// 			label: 'sidebar.forgotPw',
	// 			withoutDashboard: true,
	// 		},
	// 		{
	// 			key: 'resetpassword',
	// 			label: 'sidebar.resetPw',
	// 			withoutDashboard: true,
	// 		},
	// 	],
	// },
	// {
	// 	key: 'githubSearch',
	// 	label: 'sidebar.githubSearch',
	// 	leftIcon: <SidebarGithubIcon size={19} />,
	// },
	// {
	// 	key: 'blank_page',
	// 	label: 'sidebar.blankPage',
	// 	leftIcon: <SidebarBlankIcon size={19} />,
	// },
];
