import sql from 'better-sqlite3';
const db = sql('techpulse.db');

const dummyAmazonData = [
	{
		asin: 'B0FQFB8FMG',
		product_title:
			'Apple AirPods Pro 3 Wireless Earbuds, Active Noise Cancellation, Live Translation, Heart Rate Sensing, Hearing Aid Feature, Bluetooth Headphones, Spatial Audio, High-Fidelity Sound, USB-C Charging',
		product_price: '$183.99',
		product_original_price: null,
		currency: 'USD',
		product_star_rating: '4.4',
		product_num_ratings: 7223,
		product_url: 'https://www.amazon.com/dp/B0FQFB8FMG',
		product_photo:
			'https://m.media-amazon.com/images/I/61solmQSSlL._AC_UL960_QL65_.jpg',
		product_num_offers: 75,
		product_minimum_offer_price: '$183.99',
		is_best_seller: false,
		is_amazon_choice: true,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: null,
		has_variations: false,
		product_badge: "Amazon's",
	},
	{
		asin: 'B08TJRVWV1',
		product_title:
			'Amazon Basics microSDXC Memory Card with Full Size Adapter, A2, U3, Read Speed up to 100 MB/s, 128GB, Black',
		product_price: '$19.91',
		product_original_price: null,
		currency: 'USD',
		product_star_rating: '4.7',
		product_num_ratings: 146199,
		product_url: 'https://www.amazon.com/dp/B08TJRVWV1',
		product_photo:
			'https://m.media-amazon.com/images/I/81FMYuiSaEL._AC_UL960_QL65_.jpg',
		product_num_offers: 2,
		product_minimum_offer_price: '$18.72',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$6.64 delivery Apr 1 - 7Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B0D54JZTHY',
		product_title:
			'Apple AirTag (1st Generation) - 4 Pack. Keep Track of and find Your Keys, Wallet, Luggage, Backpack, and More. Simple one-tap Set up with iPhone or iPad, Bluetooth',
		product_price: '$90.49',
		product_original_price: null,
		currency: 'USD',
		product_star_rating: '4.8',
		product_num_ratings: 43170,
		product_url: 'https://www.amazon.com/dp/B0D54JZTHY',
		product_photo:
			'https://m.media-amazon.com/images/I/61bMNCeAUAL._AC_UL960_QL65_.jpg',
		product_num_offers: 3,
		product_minimum_offer_price: '$90.49',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: null,
		has_variations: false,
	},
	{
		asin: 'B09KR8P3L5',
		product_title:
			'iPhone 17 16 15 Charger Fast Charging Type C Chargers USB C Charger Block iPhone 17 16 15 Air Pro Max Chargers with 6FT Cable for iPhone 17/17 Plus/17 Pro Max/16/16 Plus/16 Pro Max/15 Pro Max/iPad Pro',
		product_price: '$8.46',
		unit_price: '$4.23',
		unit_count: 2,
		product_original_price: '$16.90',
		currency: 'USD',
		product_star_rating: '4.5',
		product_num_ratings: 33085,
		product_url: 'https://www.amazon.com/dp/B09KR8P3L5',
		product_photo:
			'https://m.media-amazon.com/images/I/61lzntb+BnL._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$8.46',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$7.34 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B08R6S1M1K',
		product_title:
			'Wall Charger, Surge Protector, QINLIANF 5 Outlet Extender with 4 USB Charging Ports, 3-Sided 1680J Power Strip Multi Plug Adapter Spaced for Home Travel Office ClimatePartner certified',
		product_price: '$9.98',
		product_original_price: '$12.96',
		currency: 'USD',
		product_star_rating: '2.7',
		product_num_ratings: 110699,
		product_url: 'https://www.amazon.com/dp/B08R6S1M1K',
		product_photo:
			'https://m.media-amazon.com/images/I/51lGPGOkjUL._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$9.98',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: true,
		sales_volume: '10K+ bought in past month',
		delivery: '$7.32 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B0CPSBD68W',
		product_title:
			'2 Pack USB C Charger Block, Dual Port Type C Wall Charger Fast Charging 20W Power Adapter Cube for iPhone 14/14 Pro/14 Pro Max/14 Plus/13/12/11, XS/XR/X, iPad, Samsung, More',
		product_price: '$14.09',
		product_original_price: null,
		currency: 'USD',
		product_star_rating: '3.6',
		product_num_ratings: 18197,
		product_url: 'https://www.amazon.com/dp/B0CPSBD68W',
		product_photo:
			'https://m.media-amazon.com/images/I/5134nknNJxL._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$14.09',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$6.77 delivery Apr 14 - May 14Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B0GJTXVN9Z',
		product_title:
			'Apple AirTag (2nd Generation) - 4 Pack: Tracker for Keychain, Wallet, and More; Locator with Sound; Simple One-Tap Setup with iPhone or iPad; Key Finder with up to 1.5X Precision Finding Range*',
		product_price: '$114.99',
		product_original_price: null,
		currency: 'USD',
		product_star_rating: '4.6',
		product_num_ratings: 1249,
		product_url: 'https://www.amazon.com/dp/B0GJTXVN9Z',
		product_photo:
			'https://m.media-amazon.com/images/I/611DjYhflAL._AC_UL960_QL65_.jpg',
		product_num_offers: 2,
		product_minimum_offer_price: '$114.99',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: null,
		has_variations: false,
	},
	{
		asin: 'B0BGSDTZVF',
		product_title:
			'iPhone Charger 3 Pack 10 ft Apple MFi Certified Lightning Nylon Braided Cable Fast Charging Cord Compatible with iPhone 13 12 11 Pro Max XR XS X 8 7 6 Plus SE iPad and More ClimatePartner certified',
		product_price: '$7.99',
		unit_price: '$2.66',
		unit_count: 3,
		product_original_price: '$9.99',
		currency: 'USD',
		product_star_rating: '4.4',
		product_num_ratings: 26275,
		product_url: 'https://www.amazon.com/dp/B0BGSDTZVF',
		product_photo:
			'https://m.media-amazon.com/images/I/71PxgcoTvYL._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$7.99',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: true,
		sales_volume: '10K+ bought in past month',
		delivery: '$7.04 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B0DZ254SSR',
		product_title:
			'10Ft Extension Cord with Multiple Outlets, Flat Plug Surge Protector Power Strip 10 Ft Long Cord, 8 Outlets &amp; 4 USB Ports (2 USB C), Desk Charging Station for Home Office, College Dorm Room Essentials',
		product_price: '$9.98',
		product_original_price: '$19.99',
		currency: 'USD',
		product_star_rating: '4.8',
		product_num_ratings: 4018,
		product_url: 'https://www.amazon.com/dp/B0DZ254SSR',
		product_photo:
			'https://m.media-amazon.com/images/I/612NrGLfOqL._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$9.98',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$7.76 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B0CL7J12YK',
		product_title:
			'Apple Pencil (USB-C): Device Compatibility Check Required - Pixel-Perfect Precision, Tilt Sensitivity, Perfect for Note-Taking, Drawing, and Signing Documents. Charges and Pairs with USB-C',
		product_price: '$53.69',
		product_original_price: null,
		currency: 'USD',
		product_star_rating: '4.6',
		product_num_ratings: 9833,
		product_url: 'https://www.amazon.com/dp/B0CL7J12YK',
		product_photo:
			'https://m.media-amazon.com/images/I/41s9DmRSgcL._AC_UL960_QL65_.jpg',
		product_num_offers: 2,
		product_minimum_offer_price: '$53.69',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: null,
		has_variations: false,
	},
	{
		asin: 'B0DN1S1YLV',
		product_title:
			'ANDERY Car Phone Holder for Magsafe [78+LBS Strongest Suction &amp; 2400gf Magnetic] 360° Adjustable Car Phone Mount, Phone Holders for Your Car for iPhone 17-12 Pro Max Plus Air, Carbon Fiber Global Recycled Standard',
		product_price: '$25.60',
		product_original_price: '$42.59',
		currency: 'USD',
		product_star_rating: '4.5',
		product_num_ratings: 18231,
		product_url: 'https://www.amazon.com/dp/B0DN1S1YLV',
		product_photo:
			'https://m.media-amazon.com/images/I/71GXSlQR9ML._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$25.60',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: true,
		sales_volume: null,
		delivery: '$7.26 delivery Mar 31 - Apr 7Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B0B2WLSY9D',
		product_title:
			'[4 Pack] USB C Charger Block Fast Charging Multiport Adpater [PD 20W USB-C &amp; QC 3.0 USB-A Port] for iPhone 17/16/15/14/13/12/11/X/8, iPad, Galaxy, Google &amp; More',
		product_price: '$12.59',
		product_original_price: null,
		currency: 'USD',
		product_star_rating: '4.6',
		product_num_ratings: 10198,
		product_url: 'https://www.amazon.com/dp/B0B2WLSY9D',
		product_photo:
			'https://m.media-amazon.com/images/I/51eAnSUfXSL._AC_UL960_QL65_.jpg',
		product_num_offers: 5,
		product_minimum_offer_price: '$12.59',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: null,
		has_variations: false,
	},
	{
		asin: 'B0D4215HCX',
		product_title:
			'LISEN Retractable Car Charger, Gifts for Him Her, Cars Adapter USB C Fast Charger, gifts for Mothers Day Travel Essentials Car Accessories for Men Women Gifts for iPhone 17 16 15 14 13 12, Samsung S26',
		product_price: '$16.13',
		product_original_price: '$24.99',
		currency: 'USD',
		product_star_rating: '4.6',
		product_num_ratings: 17366,
		product_url: 'https://www.amazon.com/dp/B0D4215HCX',
		product_photo:
			'https://m.media-amazon.com/images/I/71Ryl5xKbuL._AC_UL960_QL65_.jpg',
		product_num_offers: 7,
		product_minimum_offer_price: '$14.68',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$7.03 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B079KL4C91',
		product_title:
			'Amazon Basics Clear Thermal Laminating Plastic Paper Laminator Sheets, 9 x 11.5-Inch, 200-Pack, 2.8mil',
		product_price: '$16.50',
		unit_price: '$0.08',
		unit_count: 206,
		product_original_price: null,
		currency: 'USD',
		product_star_rating: '4.8',
		product_num_ratings: 92707,
		product_url: 'https://www.amazon.com/dp/B079KL4C91',
		product_photo:
			'https://m.media-amazon.com/images/I/61cefAp7H5L._AC_UL960_QL65_.jpg',
		product_num_offers: 2,
		product_minimum_offer_price: '$11.66',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '40K+ bought in past month',
		delivery: '$11.84 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B09XHZ8F7F',
		product_title:
			'EUCOS 62&quot; Phone Tripod, Tripod for iPhone &amp; Selfie Stick with Remote, Extendable Cell Phone Stand &amp; Ultimate Phone Holder, Solidest Phone Stand Compatible with iPhone/Android',
		product_price: '$22.99',
		product_original_price: '$29.99',
		currency: 'USD',
		product_star_rating: '4.6',
		product_num_ratings: 20124,
		product_url: 'https://www.amazon.com/dp/B09XHZ8F7F',
		product_photo:
			'https://m.media-amazon.com/images/I/61LnPbT7KML._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$22.99',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$7.90 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B0C69HB8PM',
		product_title:
			'iPhone 17 16 15 Charger Fast Charging,2Pack 20W Apple iPad USB C Wall Chrager Block with 6FT USB C to C Cable for iPhone 17/Pro/Pro Max/17 Air/ 16/16 Pro/16 Pro Max/15/Plus/Pro/Pro Max (White)',
		product_price: '$9.95',
		product_original_price: '$12.99',
		currency: 'USD',
		product_star_rating: '4.7',
		product_num_ratings: 9063,
		product_url: 'https://www.amazon.com/dp/B0C69HB8PM',
		product_photo:
			'https://m.media-amazon.com/images/I/71H6iiwZBbL._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$9.95',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$6.98 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B092J8LPWR',
		product_title:
			'Surge Protector Power Strip - HANYCONY 8 Outlets 4 USB (2 USB C) Charging Ports, Multi Plug Outlet Extender, 5Ft Braided Extension Cord, Flat Plug Wall Mount Desk Charging Station for Home Office ETL',
		product_price: '$9.99',
		product_original_price: '$12.99',
		currency: 'USD',
		product_star_rating: '4.8',
		product_num_ratings: 55349,
		product_url: 'https://www.amazon.com/dp/B092J8LPWR',
		product_photo:
			'https://m.media-amazon.com/images/I/61q9hmplGFL._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$9.99',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$7.76 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B0CG1LGWR6',
		product_title:
			'LISEN USB C to USB C Cable, 240W C to C Cable Fast Charging [6.6FT, 2 Pack] Type C Charger Fast Charging USBC to USBC Cable for iPhone 17 16 15 Pro Max iPad MacBook Neo Air Pro Samsung S26 S25 Ultra',
		product_price: '$8.99',
		unit_price: '$0.68',
		unit_count: 13,
		product_original_price: '$10.99',
		currency: 'USD',
		product_star_rating: '4.6',
		product_num_ratings: 7233,
		product_url: 'https://www.amazon.com/dp/B0CG1LGWR6',
		product_photo:
			'https://m.media-amazon.com/images/I/81afg0W0O8L._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$8.99',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$6.93 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B0CFQ5T5F6',
		product_title:
			'LISEN USB C to USB C Cable, 5-Pack [3.3/3.3/6.6/6.6/10FT] for iPhone 17 Charger Cord, 60W C to C Cable Fast Charging for iPad, iPhone 16 15 Pro Max, Galaxy S25/S24 USBC to USBC Cable Gifts for Men',
		product_price: '$8.99',
		product_original_price: '$14.99',
		currency: 'USD',
		product_star_rating: '4.6',
		product_num_ratings: 13731,
		product_url: 'https://www.amazon.com/dp/B0CFQ5T5F6',
		product_photo:
			'https://m.media-amazon.com/images/I/8136-BraWSL._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$8.99',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$7.24 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B0CHYBKQPM',
		product_title:
			'Miracase Phone Holders for Your Car with Metal Hook Clip, Air Vent Cell Phone Stand Car Mount, Universal Automobile Cradle for Garmin GPS Fit iPhone Android and All Smartphones, Dark Black Global Recycled Standard',
		product_price: '$12.99',
		product_original_price: '$19.99',
		currency: 'USD',
		product_star_rating: '4.4',
		product_num_ratings: 41432,
		product_url: 'https://www.amazon.com/dp/B0CHYBKQPM',
		product_photo:
			'https://m.media-amazon.com/images/I/81woLlSmlHL._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$12.99',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: true,
		sales_volume: '10K+ bought in past month',
		delivery: '$6.95 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B09X7CRKRZ',
		product_title:
			'SanDisk 256GB Extreme microSDXC UHS-I Memory Card with Adapter - Up to 190MB/s, C10, U3, V30, 4K, 5K, A2, Micro SD Card - SDSQXAV-256G-GN6MA',
		product_price: '$41.03',
		product_original_price: null,
		currency: 'USD',
		product_star_rating: '4.8',
		product_num_ratings: 106103,
		product_url: 'https://www.amazon.com/dp/B09X7CRKRZ',
		product_photo:
			'https://m.media-amazon.com/images/I/719ZXZP+5LL._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$41.03',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$6.22 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B0C2BMNHW2',
		product_title:
			'Wireless Charger iPhone Charging Station: 3 in 1 Charger Stand Multiple Devices for Apple - iPhone 17 16e 16 15 14 Pro Max 13 12 11 - Watch 11 10 9 8 7 6 5 4 3 2 SE and Ultra Series - Airpods 4 3 Pro',
		product_price: '$16.13',
		product_original_price: '$25.99',
		currency: 'USD',
		product_star_rating: '4.3',
		product_num_ratings: 35463,
		product_url: 'https://www.amazon.com/dp/B0C2BMNHW2',
		product_photo:
			'https://m.media-amazon.com/images/I/61HO7-q0JNL._AC_UL960_QL65_.jpg',
		product_num_offers: 1,
		product_minimum_offer_price: '$16.13',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$7.40 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B08M9HND4F',
		product_title:
			'Highwings 8K 10K 4K HDMI Cable 48Gbps 6.6FT/2M, Certified Ultra High Speed HDMI Cable Braided Cord-4K@120Hz 8K@60Hz, DTS:X, HDCP 2.2 &amp; 2.3, HDR 10 Compatible with Roku TV/PS5/HDTV/Blu-ray',
		product_price: '$7.99',
		product_original_price: null,
		currency: 'USD',
		product_star_rating: '4.7',
		product_num_ratings: 42358,
		product_url: 'https://www.amazon.com/dp/B08M9HND4F',
		product_photo:
			'https://m.media-amazon.com/images/I/81i+RJVMZpL._AC_UL960_QL65_.jpg',
		product_num_offers: 5,
		product_minimum_offer_price: '$7.83',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: false,
		sales_volume: '10K+ bought in past month',
		delivery: '$7.26 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
	{
		asin: 'B0BFCC18FS',
		product_title:
			'Anlmz 3 in 1 Charging Station for iPhone, Wireless Charger for iPhone 17 16e 16 15 14 13 12 11 X Pro Max &amp; Apple Watch - Wireless Charging Station for AirPods 4 3 Pro Global Recycled Standard',
		product_price: '$29.99',
		product_original_price: null,
		currency: 'USD',
		product_star_rating: '4.3',
		product_num_ratings: 39092,
		product_url: 'https://www.amazon.com/dp/B0BFCC18FS',
		product_photo:
			'https://m.media-amazon.com/images/I/71jeB93YWmL._AC_UL960_QL65_.jpg',
		product_num_offers: 5,
		product_minimum_offer_price: '$15.16',
		is_best_seller: false,
		is_amazon_choice: false,
		is_prime: false,
		climate_pledge_friendly: true,
		sales_volume: '10K+ bought in past month',
		delivery: '$7.44 delivery Wed, Apr 1Ships to United Kingdom',
		has_variations: false,
	},
];

//Delete when persistance is wanted
db.prepare('DROP TABLE IF EXISTS products').run();
// db.prepare('DROP TABLE IF EXISTS users').run();
db.prepare('DROP TABLE IF EXISTS sessions').run();
db.prepare('DROP TABLE IF EXISTS order_items').run();
db.prepare('DROP TABLE IF EXISTS orders').run();

//Creating Products Table
db.prepare(
	`
   CREATE TABLE IF NOT EXISTS products (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       asin TEXT NOT NULL UNIQUE,
       product_title TEXT NOT NULL,
       product_photo TEXT NOT NULL,
       product_price TEXT,
       product_original_price TEXT,
       product_url TEXT NOT NULL,
       delivery TEXT,
	   product_star_rating REAL NOT NULL,
       product_num_ratings INT NOT NULL
    )
`,
).run();

//Creating Users Table
db.prepare(
	`
   CREATE TABLE IF NOT EXISTS users (
       id INTEGER PRIMARY KEY AUTOINCREMENT,
       name TEXT NOT NULL,
       email TEXT NOT NULL,
       password TEXT NOT NULL,
       salt TEXT NOT NULL,
       role TEXT NOT NULL DEFAULT 'user',
       createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`,
).run();

//Creating Sessions Table
db.prepare(
	`
   CREATE TABLE IF NOT EXISTS sessions (
       sessionId TEXT PRIMARY KEY,
       userId INTEGER NOT NULL,
	   userRole TEXT NOT NULL,
	   expiresAt TEXT DEFAULT (datetime('now', '+7 day'))
    )
`,
).run();

//Creating Orders Table
db.prepare(
	`
   CREATE TABLE orders (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTEGER NOT NULL,
		total_amount REAL NOT NULL,
		status TEXT DEFAULT 'pending',
		payment_method TEXT NOT NULL,
		created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
		FOREIGN KEY (user_id) REFERENCES users(id)
	)
`,
).run();

//Creating Order Items Table
db.prepare(
	`
	CREATE TABLE order_items (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		order_id INTEGER NOT NULL,
		product_id TEXT,
		name TEXT NOT NULL,
		price REAL NOT NULL,
		quantity INTEGER NOT NULL,
		image TEXT,
		FOREIGN KEY (order_id) REFERENCES orders(id)
	)
`,
).run();

async function initData() {
	const stmt = db.prepare(`
      INSERT INTO products VALUES (
         null,
         @asin,
         @product_title,
         @product_photo,
         @product_price,
         @product_original_price,
         @product_url,
         @delivery,
		 @product_star_rating,
         @product_num_ratings
      )
   `);

	for (const product of dummyAmazonData) {
		stmt.run(product);
	}
}

initData();
