// prisma/seed.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const dummyAmazonData = [
		{
			asin: 'B0FQFB8FMG',
			title:
				'Apple AirPods Pro 3 Wireless Earbuds, Active Noise Cancellation, Live Translation, Heart Rate Sensing, Hearing Aid Feature, Bluetooth Headphones, Spatial Audio, High-Fidelity Sound, USB-C Charging',
			price: 183.99,
			original_price: null,
			rating: 4.4,
			num_ratings: 7223,
			thumbnail:
				'https://m.media-amazon.com/images/I/61solmQSSlL._AC_UL960_QL65_.jpg',
			delivery: null,
		},
		{
			asin: 'B08TJRVWV1',
			title:
				'Amazon Basics microSDXC Memory Card with Full Size Adapter, A2, U3, Read Speed up to 100 MB/s, 128GB, Black',
			price: 19.91,
			original_price: null,
			rating: 4.7,
			num_ratings: 146199,
			thumbnail:
				'https://m.media-amazon.com/images/I/81FMYuiSaEL._AC_UL960_QL65_.jpg',
			delivery: '$6.64 delivery Apr 1 - 7Ships to United Kingdom',
		},
		{
			asin: 'B0D54JZTHY',
			title:
				'Apple AirTag (1st Generation) - 4 Pack. Keep Track of and find Your Keys, Wallet, Luggage, Backpack, and More. Simple one-tap Set up with iPhone or iPad, Bluetooth',
			price: 90.49,
			original_price: null,
			rating: 4.8,
			num_ratings: 43170,
			thumbnail:
				'https://m.media-amazon.com/images/I/61bMNCeAUAL._AC_UL960_QL65_.jpg',
			delivery: null,
		},
		{
			asin: 'B09KR8P3L5',
			title:
				'iPhone 17 16 15 Charger Fast Charging Type C Chargers USB C Charger Block iPhone 17 16 15 Air Pro Max Chargers with 6FT Cable for iPhone 17/17 Plus/17 Pro Max/16/16 Plus/16 Pro Max/15 Pro Max/iPad Pro',
			price: 8.46,
			original_price: 16.9,
			rating: 4.5,
			num_ratings: 33085,
			thumbnail:
				'https://m.media-amazon.com/images/I/61lzntb+BnL._AC_UL960_QL65_.jpg',
			delivery: '$7.34 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B08R6S1M1K',
			title:
				'Wall Charger, Surge Protector, QINLIANF 5 Outlet Extender with 4 USB Charging Ports, 3-Sided 1680J Power Strip Multi Plug Adapter Spaced for Home Travel Office ClimatePartner certified',
			price: 9.98,
			original_price: 12.96,
			rating: 2.7,
			num_ratings: 110699,
			thumbnail:
				'https://m.media-amazon.com/images/I/51lGPGOkjUL._AC_UL960_QL65_.jpg',
			delivery: '$7.32 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B0CPSBD68W',
			title:
				'2 Pack USB C Charger Block, Dual Port Type C Wall Charger Fast Charging 20W Power Adapter Cube for iPhone 14/14 Pro/14 Pro Max/14 Plus/13/12/11, XS/XR/X, iPad, Samsung, More',
			price: 14.09,
			original_price: null,
			rating: 3.6,
			num_ratings: 18197,
			thumbnail:
				'https://m.media-amazon.com/images/I/5134nknNJxL._AC_UL960_QL65_.jpg',
			delivery: '$6.77 delivery Apr 14 - May 14Ships to United Kingdom',
		},
		{
			asin: 'B0GJTXVN9Z',
			title:
				'Apple AirTag (2nd Generation) - 4 Pack: Tracker for Keychain, Wallet, and More; Locator with Sound; Simple One-Tap Setup with iPhone or iPad; Key Finder with up to 1.5X Precision Finding Range*',
			price: 114.99,
			original_price: null,
			rating: 4.6,
			num_ratings: 1249,
			thumbnail:
				'https://m.media-amazon.com/images/I/611DjYhflAL._AC_UL960_QL65_.jpg',
			delivery: null,
		},
		{
			asin: 'B0BGSDTZVF',
			title:
				'iPhone Charger 3 Pack 10 ft Apple MFi Certified Lightning Nylon Braided Cable Fast Charging Cord Compatible with iPhone 13 12 11 Pro Max XR XS X 8 7 6 Plus SE iPad and More ClimatePartner certified',
			price: 7.99,
			original_price: 9.99,
			rating: 4.4,
			num_ratings: 26275,
			thumbnail:
				'https://m.media-amazon.com/images/I/71PxgcoTvYL._AC_UL960_QL65_.jpg',
			delivery: '$7.04 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B0DZ254SSR',
			title:
				'10Ft Extension Cord with Multiple Outlets, Flat Plug Surge Protector Power Strip 10 Ft Long Cord, 8 Outlets &amp; 4 USB Ports (2 USB C), Desk Charging Station for Home Office, College Dorm Room Essentials',
			price: 9.98,
			original_price: 19.99,
			rating: 4.8,
			num_ratings: 4018,
			thumbnail:
				'https://m.media-amazon.com/images/I/612NrGLfOqL._AC_UL960_QL65_.jpg',
			delivery: '$7.76 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B0CL7J12YK',
			title:
				'Apple Pencil (USB-C): Device Compatibility Check Required - Pixel-Perfect Precision, Tilt Sensitivity, Perfect for Note-Taking, Drawing, and Signing Documents. Charges and Pairs with USB-C',
			price: 53.69,
			original_price: null,
			rating: 4.6,
			num_ratings: 9833,
			thumbnail:
				'https://m.media-amazon.com/images/I/41s9DmRSgcL._AC_UL960_QL65_.jpg',
			delivery: null,
		},
		{
			asin: 'B0DN1S1YLV',
			title:
				'ANDERY Car Phone Holder for Magsafe [78+LBS Strongest Suction &amp; 2400gf Magnetic] 360° Adjustable Car Phone Mount, Phone Holders for Your Car for iPhone 17-12 Pro Max Plus Air, Carbon Fiber Global Recycled Standard',
			price: 25.6,
			original_price: 42.59,
			rating: 4.5,
			num_ratings: 18231,
			thumbnail:
				'https://m.media-amazon.com/images/I/71GXSlQR9ML._AC_UL960_QL65_.jpg',
			delivery: '$7.26 delivery Mar 31 - Apr 7Ships to United Kingdom',
		},
		{
			asin: 'B0B2WLSY9D',
			title:
				'[4 Pack] USB C Charger Block Fast Charging Multiport Adpater [PD 20W USB-C &amp; QC 3.0 USB-A Port] for iPhone 17/16/15/14/13/12/11/X/8, iPad, Galaxy, Google &amp; More',
			price: 12.59,
			original_price: null,
			rating: 4.6,
			num_ratings: 10198,
			thumbnail:
				'https://m.media-amazon.com/images/I/51eAnSUfXSL._AC_UL960_QL65_.jpg',
			delivery: null,
		},
		{
			asin: 'B0D4215HCX',
			title:
				'LISEN Retractable Car Charger, Gifts for Him Her, Cars Adapter USB C Fast Charger, gifts for Mothers Day Travel Essentials Car Accessories for Men Women Gifts for iPhone 17 16 15 14 13 12, Samsung S26',
			price: 16.13,
			original_price: 24.99,
			rating: 4.6,
			num_ratings: 17366,
			thumbnail:
				'https://m.media-amazon.com/images/I/71Ryl5xKbuL._AC_UL960_QL65_.jpg',
			delivery: '$7.03 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B079KL4C91',
			title:
				'Amazon Basics Clear Thermal Laminating Plastic Paper Laminator Sheets, 9 x 11.5-Inch, 200-Pack, 2.8mil',
			price: 16.5,
			original_price: null,
			rating: 4.8,
			num_ratings: 92707,
			thumbnail:
				'https://m.media-amazon.com/images/I/61cefAp7H5L._AC_UL960_QL65_.jpg',
			delivery: '$11.84 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B09XHZ8F7F',
			title:
				'EUCOS 62&quot; Phone Tripod, Tripod for iPhone &amp; Selfie Stick with Remote, Extendable Cell Phone Stand &amp; Ultimate Phone Holder, Solidest Phone Stand Compatible with iPhone/Android',
			price: 22.99,
			original_price: 29.99,
			rating: 4.6,
			num_ratings: 20124,
			thumbnail:
				'https://m.media-amazon.com/images/I/61LnPbT7KML._AC_UL960_QL65_.jpg',
			delivery: '$7.90 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B0C69HB8PM',
			title:
				'iPhone 17 16 15 Charger Fast Charging,2Pack 20W Apple iPad USB C Wall Chrager Block with 6FT USB C to C Cable for iPhone 17/Pro/Pro Max/17 Air/ 16/16 Pro/16 Pro Max/15/Plus/Pro/Pro Max (White)',
			price: 9.95,
			original_price: 12.99,
			rating: 4.7,
			num_ratings: 9063,
			thumbnail:
				'https://m.media-amazon.com/images/I/71H6iiwZBbL._AC_UL960_QL65_.jpg',
			delivery: '$6.98 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B092J8LPWR',
			title:
				'Surge Protector Power Strip - HANYCONY 8 Outlets 4 USB (2 USB C) Charging Ports, Multi Plug Outlet Extender, 5Ft Braided Extension Cord, Flat Plug Wall Mount Desk Charging Station for Home Office ETL',
			price: 9.99,
			original_price: 12.99,
			rating: 4.8,
			num_ratings: 55349,
			thumbnail:
				'https://m.media-amazon.com/images/I/61q9hmplGFL._AC_UL960_QL65_.jpg',
			delivery: '$7.76 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B0CG1LGWR6',
			title:
				'LISEN USB C to USB C Cable, 240W C to C Cable Fast Charging [6.6FT, 2 Pack] Type C Charger Fast Charging USBC to USBC Cable for iPhone 17 16 15 Pro Max iPad MacBook Neo Air Pro Samsung S26 S25 Ultra',
			price: 8.99,
			original_price: 10.99,
			rating: 4.6,
			num_ratings: 7233,
			thumbnail:
				'https://m.media-amazon.com/images/I/81afg0W0O8L._AC_UL960_QL65_.jpg',
			delivery: '$6.93 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B0CFQ5T5F6',
			title:
				'LISEN USB C to USB C Cable, 5-Pack [3.3/3.3/6.6/6.6/10FT] for iPhone 17 Charger Cord, 60W C to C Cable Fast Charging for iPad, iPhone 16 15 Pro Max, Galaxy S25/S24 USBC to USBC Cable Gifts for Men',
			price: 8.99,
			original_price: 14.99,
			rating: 4.6,
			num_ratings: 13731,
			thumbnail:
				'https://m.media-amazon.com/images/I/8136-BraWSL._AC_UL960_QL65_.jpg',
			delivery: '$7.24 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B0CHYBKQPM',
			title:
				'Miracase Phone Holders for Your Car with Metal Hook Clip, Air Vent Cell Phone Stand Car Mount, Universal Automobile Cradle for Garmin GPS Fit iPhone Android and All Smartphones, Dark Black Global Recycled Standard',
			price: 12.99,
			original_price: 19.99,
			rating: 4.4,
			num_ratings: 41432,
			thumbnail:
				'https://m.media-amazon.com/images/I/81woLlSmlHL._AC_UL960_QL65_.jpg',
			delivery: '$6.95 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B09X7CRKRZ',
			title:
				'SanDisk 256GB Extreme microSDXC UHS-I Memory Card with Adapter - Up to 190MB/s, C10, U3, V30, 4K, 5K, A2, Micro SD Card - SDSQXAV-256G-GN6MA',
			price: 41.03,
			original_price: null,
			rating: 4.8,
			num_ratings: 106103,
			thumbnail:
				'https://m.media-amazon.com/images/I/719ZXZP+5LL._AC_UL960_QL65_.jpg',
			delivery: '$6.22 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B0C2BMNHW2',
			title:
				'Wireless Charger iPhone Charging Station: 3 in 1 Charger Stand Multiple Devices for Apple - iPhone 17 16e 16 15 14 Pro Max 13 12 11 - Watch 11 10 9 8 7 6 5 4 3 2 SE and Ultra Series - Airpods 4 3 Pro',
			price: 16.13,
			original_price: 25.99,
			rating: 4.3,
			num_ratings: 35463,
			thumbnail:
				'https://m.media-amazon.com/images/I/61HO7-q0JNL._AC_UL960_QL65_.jpg',
			delivery: '$7.40 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B08M9HND4F',
			title:
				'Highwings 8K 10K 4K HDMI Cable 48Gbps 6.6FT/2M, Certified Ultra High Speed HDMI Cable Braided Cord-4K@120Hz 8K@60Hz, DTS:X, HDCP 2.2 &amp; 2.3, HDR 10 Compatible with Roku TV/PS5/HDTV/Blu-ray',
			price: 7.99,
			original_price: null,
			rating: 4.7,
			num_ratings: 42358,
			thumbnail:
				'https://m.media-amazon.com/images/I/81i+RJVMZpL._AC_UL960_QL65_.jpg',
			delivery: '$7.26 delivery Wed, Apr 1Ships to United Kingdom',
		},
		{
			asin: 'B0BFCC18FS',
			title:
				'Anlmz 3 in 1 Charging Station for iPhone, Wireless Charger for iPhone 17 16e 16 15 14 13 12 11 X Pro Max &amp; Apple Watch - Wireless Charging Station for AirPods 4 3 Pro Global Recycled Standard',
			price: 29.99,
			original_price: null,
			rating: 4.3,
			num_ratings: 39092,
			thumbnail:
				'https://m.media-amazon.com/images/I/71jeB93YWmL._AC_UL960_QL65_.jpg',
			delivery: '$7.44 delivery Wed, Apr 1Ships to United Kingdom',
		},
	];
	// Example: Insert initial data
	await prisma.product.createMany({
		data: dummyAmazonData,
		skipDuplicates: true,
	});
	console.log('Database seeded successfully.');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
