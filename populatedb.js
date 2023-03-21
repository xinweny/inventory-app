require('dotenv').config();
const mongoose = require('mongoose');

const Model = require('./models/model');
const Instrument = require('./models/instrument');
const Brand = require('./models/brand');

mongoose.set('strictQuery', false);

const brands = [];
const instruments = [];

// Test data
const brandData = [
	'Yamaha',
	'Steinway & Sons',
	'Gibson',
	'Camac',
	'Dunhuang Yun',
	'Muramatsu',
];

const instrumentData = [
	{ name: 'Upright Piano', category: 'Pianos' },
	{ name: 'Grand Piano', category: 'Pianos' },
	{ name: 'Violin', category: 'Strings' },
	{ name: 'Cello', category: 'Strings' },
	{ name: 'Flute', category: 'Woodwinds' },
	{ name: 'Oboe', category: 'Woodwinds' },
	{ name: 'Alto Saxophone', category: 'Brass' },
	{ name: 'Tenor Trombone', category: 'Brass' },
	{ name: 'Timpani', category: 'Percussion' },
	{ name: 'Marimba', category: 'Percussion' },
	{ name: 'Drum Set', category: 'Drums' },
	{ name: 'Acoustic Guitar', category: 'Guitars' },
	{ name: 'Electric Bass', category: 'Guitars' },
	{ name: 'Guzheng', category: 'Traditional' },
	{ name: 'Pedal Harp', category: 'Harps' },
];

async function brandCreate(name) {
	try {
		const brand = new Brand({ name });
		brands.push(brand);
		await brand.save();
	} catch (err) { return err; }
}

async function instrumentCreate(name, category) {
  try {
		const instrument = new Instrument({ name, category });
		instruments.push(instrument);
		await instrument.save();
	} catch (err) { return err; }
}

async function modelCreate(name, instrument, brand, description, quantity, price, specs) {
	try {
		const model = new Model({
			name,
			instrument,
			brand,
			description,
			specs: specs || {},
			quantity,
			price,
		});
		await model.save();
		return model;
	} catch (err) { return err; }
}

async function createBrands() {
	for (const brandName of brandData) {
		await brandCreate(brandName);
	}
}

async function createInstruments() {
	for (const instrument of instrumentData) {
		await instrumentCreate(instrument.name, instrument.category);
	}
}

async function createModels() {
	const modelData = [
		{ 
			name: 'YUS1', instrument: instruments[0], brand: brands[0],
			description: 'Gorgeous tone and luxurious sonic resonance, uniquely characteristic of the YUS series. Built with unwavering commitment to the best sound, yet in a compact, 121 cm height cabinet.',
			quantity: 3, price: 16999,
			specs: {
				cabinet: 'Polished Ebony',
				dimensions: '152 x 121 x 62 cm',
				weight: '229kg',
				keys: '88',
				pedal: 'Soft, Muffler, Damper',
				caster: 'Double caster',
			},
		},
		{
			name: 'CFX', instrument: instruments[1], brand: brands[0],
			description: "Crafted for the world's biggest stages. Pure sound flows effortlessly from artist to piano to audience, filling the world's most prestigious concert halls.",
			quantity: 1, price: 185799,
			specs: {
				cabinet: 'Polished Ebony',
				keys: '88',
				white_keys:  'Ivorite',
				black_keys: 'Natural Ebony',
				dimensions: '160 x 103 x 275 cm',
				weight: '485kg',
				pedal_type: 'Sostenuto',
			},
		},
		{
			name: 'Model D Concert Grand', instrument: instruments[1], brand: brands[1],
			description: 'At 8\' 11¾" (274 cm) in length, this majestic musical instrument — the pinnacle of concert grands — is the overwhelming choice of the world\'s greatest pianists and for anyone who demands the highest level of musical expression.',
			quantity: 1, price: 198499,
			specs: {
				rim: 'Hard rock maple',
				soundboard: 'Sitka spruce',
				keys: 'European spruce, individually weighed-off',
				strings: 'Swedish steel (Treble), Swedish steel core wire wound with pure copper (Bass)',
				pedals: 'Solid brass',
				tuning_pins: 'Premium blued steel',
				finish: 'Satin Ebony',
			},
		},
		{
			name: 'V20G', instrument: instruments[2], brand: brands[0],
			description: 'The V20G is another Guarneri inspired violin which produces a rich and sweet, yet powerful sound. Each instrument is painstakingly finished with a specially formulated shading oil varnish which gives a beautiful appearance and warmer tone. The wood material has been carefully selected and like the YVN Series violins, the V20G offers excellent sound and playability, with consistent quality in every instrument.',
			quantity: 6, price: 2099,
			specs: {
				type: 'Guarneri del Gesu',
				size: '4/4',
				top: 'Spruce',
				back: 'Maple',
				side: 'Maple',
				neck: 'Maple',
				finger_board: 'Ebony',
				varnish: 'Oil Varnish, Shading, Fully Hand-Brushed',
				peg: 'Boxwood',
				tailpiece: 'Boxwood',
				fine_tuner: 'Wittner (on E String)',
				bridge: 'Aubert "luxe" with Parchment',
				chin_rest: 'Boxwood',
				strings: 'Dominant (GDA), Helicore (E)',
			},
		},
		{
			name: 'VC7SG', instrument: instruments[3], brand: brands[0],
			description: 'The VC7SG cello features the same select, high quality wood and hand craftsmanship as the V7SG violin. It is finished and adjusted by the most experienced artisans, and is capable of beautiful rich tonal colors. The VC7SG is a perfect step-up instrument for advancing students. It comes with a soft case, bow, and rosin.',
			quantity: 4, price: 2239,
			specs: {
				type: 'Stradivarious',
				size: '4/4',
				top: 'Spruce',
				back: 'Maple',
				side: 'Maple',
				neck: 'Maple',
				finger_board: 'Ebony',
				varnish: 'Oil Varnish, Shading, Fully Hand-Brushed',
				peg: 'Ebony',
				tailpiece: 'Wittner "Ultra" (4 Fine Tuners)',
				fine_tuner: 'Wittner "Ultra" (4 Fine Tuners)',
				bridge: 'Aubert',
				strings: 'Helicore',
				case: 'Soft Case',
				bow: 'Brazilian Wood',
				rosin: 'Schwarz',
			},
		},
		{
			name: 'YFL-777HCT', instrument: instruments[4], brand: brands[0],
			description: 'Inheriting the many merits of top-of-the-line Yamaha handmade flutes, these models offer rich, nuanced tonality over a wide dynamic range. The 700 series delivers warmth and expressive color that only the finest silver flutes can provide. All models come with Type Am head joints based on the Type A head joints supplied with handmade flutes 900 and 800 series. The keys feature traditional pointed key arms, reflecting the highest level of craftsmanship and adding visual elegance to these outstanding instruments.',
			quantity: 2, price: 7399,
			specs: {
				headjoint: 'Sterling Silver',
				body: 'Sterling Silver',
				keys: 'Sterling Silver, Ring Keys',
				footjoint: 'Sterling Silver, B Footjoint',
			},
		},
		{
			name: '14K Gold', instrument: instruments[4], brand: brands[5],
			description: 'Muramatsu flutes of gold and platinum stand in a class all their own. These are the most revered and sought-after flutes in the world. Muramatsu flutes made of 9k, 14k, 18k, 24k and those ever-rarer instruments made of platinum represent the ultimate instruments. Each one receives many, many hours of hand work.',
			quantity: 1, price: 29499,
			specs: {
				headjoint: 'Solid 14K Gold',
				body: 'Solid 14K Gold',
				keys: 'Solid Silver Keys, Ring Keys',
				footjoint: 'Solid 14K Gold, B Footjoint',
			},
		},
		{
			name: 'YOB-841LT', instrument: instruments[5], brand: brands[0],
			description: 'Played by some of the top American oboists, this custom oboe combines a dark silky tone with a focused center.',
			quantity: 3, price: 10099,
			specs: {
				key_of: 'C',
				key_system: 'Full Conservatoire',
				bore_style: 'American',
				octave_keys: 'Semi-automatic',
				mechanical_features: 'Left-hand F key; Fork F resonance key; Philadelphia D key; 3rd octave key;',
				upper_joint: 'Grenadilla with Ebonite Inner-pipe',
				lower_joint: 'Grenadilla',
				bell: 'Grenadilla',
				keys: 'Nickel Silver',
				plating: 'Silver',
				tone_holes: 'POM Resin (except metal octave vents)',
				trill_keys: 'Low B - C#; low C - Db; C# - D#; D# - E; F# - G#; G# - A; Ab - Bb; A# - B; B - C#; left C - D; right C - D;',
				spring_type: 'Blue Steel',
			},
		},
		{
			name: 'YAS-875EX', instrument: instruments[6], brand: brands[0],
			description: 'The new Yamaha YAS-875EX Custom EX alto saxophone marks a huge step forward for saxophone design. Offering players a wealth of new musical possibilities, the new Custom EX has been designed in collaboration with some of the world\'s most talented saxophonists, including Nobuya Sugawa, Jean-Yves Fourmeau and Otis Murphy. Their invaluable input has meant that Yamaha have been able to create an instrument that sounds great, is comfortable to play, and that constantly evolves with the player.',
			quantity: 4, price: 4099,
			specs: {
				key: 'Eb',
				bell: 'One-piece, Hand engraved',
				key_buttons: 'Mother of pearl',
				auxiliary_keys: 'High F#, Front F',
				thumb_hook: 'Adjustable',
				finish: 'Gold lacquer',
				neck: 'AV1',
				mouthpiece: '4CM',
				case: 'Included',
			},
		},
		{
			name: 'YSL-881', instrument: instruments[7], brand: brands[0],
			description: 'The Xeno features heavier gauge brass and a thick-walled, one-piece brazed bell which has been hand-hammered thousands of times for the ultimate in a big orchestral sound. The entire instrument has an evenness and balance you have to experience to believe. The tone is flexible with myriad tonal colors, and gives you both powerful projection at fortissimo and subtle control in the most delicate passages. This may well be the most expressive orchestral style trombone ever created.',
			quantity: 3, price: 2199,
			specs: {
				key: 'Bb',
				bell: 'Yellow brass',
				bell_diameter: '220mm (8 2/3")',
				bore_length: '13.89mm (0.547")',
				outer_slide: 'Yellow brass',
				inner_slide: 'Nickel silver',
				finish: 'Clear lacquer',
				mouthpiece: 'SL-51C4L',
				case: 'Included',
			},
		},
		{
			name: 'TP-8300R', instrument: instruments[8], brand: brands[0],
			description: 'The top-of-the-line timpani series features cambered hammered copper bowls and the pedal balance spring system. The cambered bowls deliver ample volume as well as optimum resonance and decay. The lineup includes 24-inch and 27-inch models for expanded musical potential.',
			quantity: 2, price: 19509,
			specs: {
				head: 'Yamaha Remo Renaissance',
				kettle: 'Cambered Hammered Copper',
				tuning_mechanism: 'Pedal Balance Spring System',
				included_accessories: 'Tuning Key, Allen Wrench, Head Protector',
			},
		},
		{
			name: 'YM-6100', instrument: instruments[9], brand: brands[0],
			description: 'Legendary marimbist Keiko Abe has been collaborating with Yamaha for over 40 years. The culmination of this alliance is embodied in the YM-6100 Concert Grand Marimba, a five-octave instrument that represents the ultimate in design, construction, and materials. This impressive marimba features carefully aged and specially selected Rosewood bars cut and tuned by hand, a beautifully crafted, sturdy frame, and exclusive pneumatic height adjustment system.',
			quantity: 1, price: 18919,
			specs: {
				range: 'C-c4, 5 octaves',
				bar_material: 'Rosewood',
				bar_width: '41-80mm',
				bar_thickness: '20-25mm',
				resonator: 'Round, adjustable from C16 to F33',
				pitch: 'A=442Hz',
				dimensions: '272 x 116 x 88-103 cm',
				weight: '107kg',
			},
		},
		{
			name: 'Live Custom Hybrid Oak', instrument: instruments[10], brand: brands[0],
			description: 'Yamaha has enhanced the dynamic range of the new Live Custom kits by accentuating their attack and projection. The new 7 ply Oak/Phenolic sheet hybrid shell and the Bass Enhancement Weight delivers massive power and articulation especially for playing in live situations. Also the new finishing technique based on traditional Japanese "UZUKURI" process emphasizes the natural beauty of the Oak grain.',
			quantity: 4, price: 3299,
			specs: {
				shell: 'Oak/Phenolic Sheet Hybrid 7ply 7.3mm (TT, FT), 7ply 8.8mm (BD)',
				'tt/ft_hoop': '2.3mm Dyna Hoop (dark silver finished)',
				bd_hoop: 'Wood Hoop',
				lug: 'Absolute Log (Dark Silver Finished)',
				bearing_edge: '45 degree/R1.5',
				'tt/ft_head': 'Top: Remo Clear Emperor, Bottom: Remo Clear Ambassador',
				bd_head: 'Front: Remo P3 Ebony, Batter: Remo P3 Clear (20"-24"BD), Remo Coated Ambassador (18"BD)',
				tom_mount: 'YESS III System',
			},
		},
		{
			name: 'LL36 ARE', instrument: instruments[11], brand: brands[0],
			description: 'L36 demonstrates what the premier class of L series is. Collected craftsman\'s skill and experience previously used only in the custom shop, L36 offers uncomparable tone dynamics and balance. With its cosmetic specs from Hand-laid inlays to ultra-thin nitrocellulose lacquer finish, L36 truly stands for its series concept, "Luxury".',
			quantity: 3, price: 2999,
			specs: {
				body_shape: 'Concert',
				top: 'Solid Engelmann Spruce A.R.E.',
				back: 'Solid Indian Rosewood',
				side: 'Solid Indian Rosewood',
				neck: 'Mahogany + Rosewood 5ply',
				fingerboard: 'Ebony',
				nut: 'Bone',
				saddle: 'Bone',
				bridge_pins: 'Black ABS with White Dot',
				tuners: 'Die-cast Gold (TM67G-Y22)',
				body_binding: 'Abalone + Maple + Stained wood',
				soundhole_inlay: 'Abalone + Wood',
				pickguard: 'Tortoise Pattern',
				body_finish: 'Gloss (Nitrocellulose Lacquer)',
				neck_finish: 'Matt',
				strings: 'Yamaha FS50BT',
				accessories: 'Hex wrench',
				case: 'Hardshell case',
			},
		},
		{
			name: 'Thunderbird Bass', instrument: instruments[12], brand: brands[2],
			description: 'The Gibson Thunderbird has the classic reverse body and headstock design as originally introduced in 1963 as Gibson\'s first neck-through-body bass design. The traditional 9-ply mahogany/walnut neck through body construction provides a thundering low end response and a piano like sustain. The narrow nut width and rounded neck profile neck feels both fast and intuitive. The Thunderbird high output, ceramic magnet loaded humbucking pickups (neck and bridge) deliver the sonic and iconic low end voice for which the Thunderbird is known.',
			quantity: 2, price: 2299,
			specs: {
				finish: 'Tobacco Burst',
				body_shape: 'Bass',
				body_finish: 'Gloss (Nitrocellulose Lacquer)',
				body: 'Mahogany',
				fingerboard: 'Rosewood',
				frets: 'Medium Jumbo',
				nut: 'Graph Tech',
				inlay: 'Acrylic Dots',
				pickguard: 'White 3-ply',
				bridge: '3-point adjustable',
				tuning_machines: 'Grover Bass Keys',
				neck_pickup: 'Rhythm T-Bird',
				bridge_pickup: 'Lead T-Bird',
				controls: '2 Volumes & 1 Master Tone',
				strings_gauge: '.045, .065, .085, .105',
			},
		},
		{
			name: '698J-GF', instrument: instruments[13], brand: brands[4],
			description: 'The absolute top of the line of Dunhuang Regular Production, and rightly so. Indian Sandalwood has a fine purplish hue, and darkens as it ages, giving it an exquisite glow. It has a scent of sandalwood. The resin in the wood has a high mineral content, and results in high treble resonance of the wood when vibrated. Deep Bass, deepest in the whole Dunhuang line, and very clear treble. Mid tones are very crisps as well. This is the soloist instrument. Used by top musicians all over the world and many conservatory students live by this model.',
			quantity: 1, price: 3599,
			specs: {
				materials: 'Class 1 Paulownia and Sandalwood',
				decorations: 'Silver Motif Inlay',
				accessories: '2 sets of Plectrums, 1 Chromatic Tuner, 1 Stand, 5 spare strings, 1 Velvet dust cover, 1 Carrying Case',
			},
		},
		{
			name: 'Oriane 47 Gold', instrument: instruments[14], brand: brands[3],
			description: 'The Oriane Concert Grand harp is entirely dedicated to musical perfection, offering concert artists an incomparably full, powerful sound. A seamless extension of the artist themselves, fully to voice their talent and love of music, the Oriane 47 is a rare pearl for the finest soloists. It is also a veritable work of art, carved and gilded by hand, and made of woods rigorously chosen for their extraordinary acoustic performance.',
			quantity: 1, price: 43899,
			specs: {
				height: '191cm',
				weight: '40kg',
				range: '47 strings, G00 - C45',
				woods: 'Maple (body), Spruce (soundboard), Beech (neck and base)',
				finishes: 'Natural Maple, 24-carat Water Gilding. Specialty finishes to order.',
			},
		},
	];

	await Promise.all(modelData.map(model => modelCreate(
		model.name,
		model.instrument,
		model.brand,
		model.description,
		model.quantity,
		model.price,
		model.specs,
	)));
}

async function populateDB() {
	mongoose.connect(process.env.MONGODB_URI);

	const cbOrder = [createBrands, createInstruments, createModels];

	for (const fn of cbOrder) {
		await fn();
	}

	mongoose.connection.close();
}

populateDB();