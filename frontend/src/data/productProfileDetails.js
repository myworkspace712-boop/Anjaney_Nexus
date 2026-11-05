// Comprehensive Product Details extracted verbatim and formatted directly from
// the official Anjaney Nexus Company Profile PDF (anjaney nexus profile - spices.pdf)

export const PRODUCT_PROFILE_DETAILS = {
  'P-01': {
    categoryHeader: 'AGRICULTURE',
    subHeader: 'Grading by Quality / Dimensions',
    overview: 'Basmati rice grades are primarily determined by grain length, purity (lack of broken/adulterated grains), aroma, and aging. Premium grades feature extra-long grains (8.2 mm or longer) that grow up to twice their size when cooked, remain non-sticky, and are naturally aged.',
    marketInfo: 'Categorized into specific grades for domestic use and international market:',
    grades: [
      {
        grade: 'Premium Grade',
        description: 'The highest quality, with a grain length of 8.2 mm to 8.4 mm (XXXL extra long grain basmati). They are 100% pure, contain practically zero broken grains, and command premium pricing.'
      },
      {
        grade: 'Grade A',
        description: 'Features a raw grain length between 7.5 mm and 8.1 mm. These must be at least 98% pure and are ideal for standard premium cooking.'
      },
      {
        grade: 'Standard / Economy Grade',
        description: 'Grain length typically falls between 6.5 mm and 7.4 mm. These bags often contain a mixture of smaller grains or non-basmati varieties.'
      }
    ],
    technicalSpecs: [
      { key: 'Grain Length (Premium)', value: '8.2 mm - 8.4 mm (XXXL extra long)' },
      { key: 'Grain Length (Grade A)', value: '7.5 mm - 8.1 mm (min 98% purity)' },
      { key: 'Grain Length (Standard)', value: '6.5 mm - 7.4 mm' },
      { key: 'Purity Level', value: 'Up to 100% pure' },
      { key: 'Moisture Level', value: 'Export compliant standard' }
    ]
  },
  'P-02': {
    categoryHeader: 'AGRICULTURE',
    subHeader: 'Grading by Quality / Dimensions',
    overview: 'Non-basmati rice is graded primarily by its grain length, percentage of broken kernels, and overall purity. Common classifications include Premium Grade (6–6.5mm, max 2% broken), Grade A (5.5–6mm, max 5% broken), and Standard Grade (less than 5.5mm, max 10% broken).',
    marketInfo: 'These grades are also processed and categorized into specific types based on milling and cooking styles:',
    grades: [
      {
        grade: 'Premium Grade',
        description: '6–6.5mm grain length, max 2% broken kernels. Usually exported or used for high-end retail.'
      },
      {
        grade: 'Grade A',
        description: '5.5–6mm grain length, max 5% broken kernels. Well suited for standard catering and retail consumption.'
      },
      {
        grade: 'Standard Grade',
        description: 'Less than 5.5mm grain length, max 10% broken kernels. Popular for bulk catering and everyday consumption.'
      }
    ],
    highlights: [
      { title: 'Raw vs. Parboiled', desc: 'Raw rice retains its natural starch, while Parboiled (or Sella) rice is steamed before milling for firmer grains and better nutrient retention.' },
      { title: 'Popular Varieties', desc: 'In India, famous non-basmati types include Sona Masoori (light and aromatic) and IR64 (high yield, non-sticky).' },
      { title: 'Applications', desc: 'Premium grades are usually exported or used for retail, whereas standard and Grade A options suit bulk catering and everyday consumption.' }
    ],
    technicalSpecs: [
      { key: 'Premium Grade Broken Ratio', value: 'Max 2% broken' },
      { key: 'Grade A Broken Ratio', value: 'Max 5% broken' },
      { key: 'Standard Grade Broken Ratio', value: 'Max 10% broken' },
      { key: 'Processing Types', value: 'Raw / Parboiled (Sella)' }
    ]
  },
  'P-03': {
    categoryHeader: 'SPICES',
    subHeader: 'Active Compounds & Chemical Composition',
    overview: 'Raw turmeric root and its powdered form consist primarily of carbohydrates (60–70%), water (10–13%), dietary fiber (20–22%), proteins, fats, and minerals. Its defining active compound—curcumin—accounts for an average of 2% to 9% by weight, alongside other active curcumin and essential oils.',
    breakdownTitle: 'Active Composition',
    breakdownItems: [
      { label: 'Curcumin Content', value: '2% to 9% (with curcumin making up the vast majority)' },
      { label: 'Essential Oils', value: '3% to 7% (e.g., turmerone, zingiberene)' },
      { label: 'Carbohydrates', value: '60% – 70%' },
      { label: 'Water / Moisture', value: '10% – 13%' },
      { label: 'Dietary Fiber', value: '20% – 22%' }
    ],
    technicalSpecs: [
      { key: 'Form Available', value: 'Raw Dried Root / Polished Fingers / Fine Powder' },
      { key: 'Key Curcuminoids', value: 'Curcumin, Demethoxycurcumin, Bisdemethoxycurcumin' },
      { key: 'Key Essential Oils', value: 'Turmerone, Zingiberene, Curlone' }
    ]
  },
  'P-04': {
    categoryHeader: 'SPICES',
    subHeader: 'Active & Bioactive Compounds',
    overview: 'Chilli are packed with the active compound that provides their signature spicy heat (SHU) and are rich in water, vitamin C, vitamin A, vitamin B6, and potassium.',
    highlights: [
      {
        title: 'Active & Bioactive Compounds',
        desc: 'The most famous of these is capsaicin, which gives chillies their intensity and is concentrated in the white placental tissue that holds the seeds.'
      },
      {
        title: 'Antioxidants & Health Benefits',
        desc: 'Chillies contain beneficial plant compounds like violaxanthin, lutein, and sinapic acid, which help reduce oxidative stress.'
      }
    ],
    technicalSpecs: [
      { key: 'Form Available', value: 'Whole Dried Chillies (with/without stem) / Flakes / Powder' },
      { key: 'Active Alkaloid', value: 'Capsaicin (High Scoville Heat Units - SHU)' },
      { key: 'Vitamins & Minerals', value: 'Vitamin C, Vitamin A, Vitamin B6, Potassium' },
      { key: 'Natural Antioxidants', value: 'Violaxanthin, Lutein, Sinapic Acid' }
    ]
  },
  'P-05': {
    categoryHeader: 'SPICES',
    subHeader: 'Macro-nutrients & Flavor Profile',
    overview: 'Cumin is a dried, boat-shaped seed from the Cuminum cyminum plant. It is composed of 44% carbohydrates, 22% fat, 18% protein, and 8% water. Its distinct warm, earthy, and slightly citrusy flavor comes from volatile essential oils, primarily cuminaldehyde.',
    breakdownTitle: 'Nutritional Breakdown',
    breakdownItems: [
      { label: 'Carbohydrates', value: '44%' },
      { label: 'Healthy Fats', value: '22%' },
      { label: 'Plant Protein', value: '18%' },
      { label: 'Moisture / Water', value: '8%' },
      { label: 'Primary Volatile Oil', value: 'Cuminaldehyde' }
    ],
    highlights: [
      {
        title: 'Spice Blends',
        desc: 'Chili powder, garam masala, curry powder, taco seasonings, Adobo seasoning, and Ethiopian berbere.'
      },
      {
        title: 'Dishes & Culinary Uses',
        desc: 'Frequently used in Tex-Mex dishes, Indian zeera (cumin) rice and curries, and Middle Eastern stews.'
      }
    ],
    technicalSpecs: [
      { key: 'Botanical Name', value: 'Cuminum cyminum' },
      { key: 'Physical Form', value: 'Dried Boat-Shaped Seeds / Fresh Ground Powder' },
      { key: 'Purity', value: '99% / 99.5% Machine Cleaned / Sortex Cleaned' }
    ]
  },
  'P-06': {
    categoryHeader: 'SPICES',
    subHeader: 'Nutritional Breakdown & Essential Oils',
    overview: 'Cardamom is a highly aromatic spice containing essential oils (3–8%) rich in 1, 8-cineole and a-terpinyl acetate. Per tablespoon, ground cardamom provides 18 calories, 1.6 grams of fiber, and is a rich source of manganese. It also acts as a traditional aid for digestion and high blood pressure.',
    breakdownTitle: 'Nutritional Breakdown (per 1 tbsp / 6g ground)',
    breakdownItems: [
      { label: 'Calories', value: '18 kcal' },
      { label: 'Carbohydrates', value: '4.0 g' },
      { label: 'Dietary Fiber', value: '1.6 g' },
      { label: 'Protein', value: '0.6 g' },
      { label: 'Total Fat', value: '0.4 g' }
    ],
    technicalSpecs: [
      { key: 'Essential Oil Range', value: '3% – 8%' },
      { key: 'Key Chemical Constituents', value: '1,8-cineole & a-terpinyl acetate' },
      { key: 'Rich Micronutrients', value: 'High manganese content, dietary fiber' },
      { key: 'Pod Sizes Available', value: '6mm, 7mm, 8mm+ Extra Bold Green' }
    ]
  },
  'P-07': {
    categoryHeader: 'SPICES',
    subHeader: 'Active Compounds & Piperine Profile',
    overview: 'King of Spices, Black Pepper is a single-ingredient spice made from the dried, unripe berries of the Piper nigrum vine. Its signature heat and health benefits come from the active alkaloid compound piperine. It also contains natural essential oils and volatile compounds that provide citrus and floral notes.',
    highlights: [
      {
        title: 'Piperine',
        desc: 'The main alkaloid that gives black pepper its characteristic pungency. It has potent antioxidant properties and is known to enhance the absorption of other nutrients and medications.'
      },
      {
        title: 'Essential Oils',
        desc: 'Includes compounds like limonene (citrusy), pinene (pine/woody), and linalool (floral) which make up its unique aroma profile.'
      }
    ],
    technicalSpecs: [
      { key: 'Botanical Name', value: 'Piper nigrum' },
      { key: 'Active Constituent', value: 'Piperine (High Bioavailability Enhancer)' },
      { key: 'Aroma Compounds', value: 'Limonene, Pinene, Linalool' },
      { key: 'Bulk Density', value: '500 g/l to 550+ g/l (Tellicherry / Malabar standard)' }
    ]
  },
  'P-08': {
    categoryHeader: 'SPICES',
    subHeader: 'Harvesting & Eugenol Content',
    overview: 'Cloves are the aromatic, dried unopened flower buds of the Syzygium aromaticum evergreen tree. These nail-shaped buds get their characteristic pungent flavor and warm, sweet aroma primarily from a powerful essential oil compound called eugenol.',
    highlights: [
      {
        title: 'Harvest & Processing',
        desc: 'The buds are hand-picked while still immature (when they turn bright pinkish-red) and dried under the sun until they turn dark brown.'
      },
      {
        title: 'Eugenol Compound',
        desc: 'Accounting for 70% to 90% of the spice\'s essential oil, this compound is responsible for the intense flavor, numbing sensation (often used in dental care), and anti-inflammatory benefits.'
      }
    ],
    technicalSpecs: [
      { key: 'Botanical Name', value: 'Syzygium aromaticum' },
      { key: 'Active Essential Oil', value: 'Eugenol (70% - 90% of volatile oil)' },
      { key: 'Head / Bud Quality', value: 'Intact floral heads, deep reddish-brown color' },
      { key: 'Primary Use', value: 'Culinary seasoning, pharmaceutical, oral and dental care' }
    ]
  },
  'P-09': {
    categoryHeader: 'SPICES',
    subHeader: 'Terpenes & Flavor Profile',
    overview: 'Coriander is a dual-purpose herb where both the leaves and seeds are consumed. The fresh leaves (cilantro) and dried seeds (dhaniya) provide distinct flavor profiles to international cuisines.',
    highlights: [
      {
        title: 'Primary Compound',
        desc: '100% dried fruit (seeds) of the Coriander sativum plant.'
      },
      {
        title: 'Flavor Profile',
        desc: 'Earthy, slightly sweet, with a lemony-citrus note. The aroma is driven by naturally occurring terpenes like linalool and pinene.'
      },
      {
        title: 'Applications',
        desc: 'Essential for spice blends like Garam Masala and Curry Powder. Ground coriander loses its flavor quickly and is best prepared from fresh Whole Dried Seeds.'
      }
    ],
    technicalSpecs: [
      { key: 'Botanical Source', value: 'Coriander sativum' },
      { key: 'Key Terpenes', value: 'Linalool, Pinene' },
      { key: 'Grades Available', value: 'Eagle, Scooter, Badami, Single/Double Parrot' }
    ]
  },
  'P-10': {
    categoryHeader: 'SPICES',
    subHeader: 'Ceylon vs. Cassia Comparison',
    overview: 'Cinnamon is a versatile inner bark known for its signature active compound, cinnamaldehyde (which gives it its distinct aroma and flavor). A 1-teaspoon (2.6g) serving contains about 6 calories, 2g of carbohydrates, and 1.3g of fiber. It also contains trace minerals like calcium and potassium.',
    grades: [
      {
        grade: 'Ceylon Cinnamon (True Cinnamon)',
        description: 'Known for its milder, sweeter, and more complex flavor profile. It is highly prized because it contains negligible amounts of coumarin, making it the safer choice if you consume cinnamon regularly in higher doses.'
      },
      {
        grade: 'Cassia Cinnamon',
        description: 'This is the more common variety found in most grocery stores. It has a stronger, spicier flavor, but contains higher levels of coumarin, which can cause liver damage in excessive quantities.'
      }
    ],
    technicalSpecs: [
      { key: 'Active Essential Oil', value: 'Cinnamaldehyde' },
      { key: 'Serving Composition (2.6g)', value: '6 kcal, 2g Carbohydrates, 1.3g Fiber' },
      { key: 'Essential Minerals', value: 'Calcium, Potassium, Manganese' }
    ]
  },
  'P-11': {
    categoryHeader: 'SPICES',
    subHeader: 'Bold Flavor & Export Quality',
    overview: 'Mustard seeds (rai) are a staple in Indian kitchens and international cuisine, highly valued for their bold flavor, pungent kick, and traditional health benefits.',
    highlights: [
      {
        title: 'Culinary & Processing Role',
        desc: 'Widely used in tempering, pickling, condiment preparation, and high-yield oil crushing.'
      },
      {
        title: 'Quality & Cleanness',
        desc: 'Machine cleaned and sortex sorted for high purity, uniform dark seed coats, and minimal moisture.'
      }
    ],
    technicalSpecs: [
      { key: 'Form Available', value: 'Whole Seeds (Black / Brown / Yellow Mustard)' },
      { key: 'Purity Level', value: '99% to 99.5% Machine / Sortex Cleaned' },
      { key: 'Moisture Content', value: 'Max 8%' }
    ]
  },
  'P-12': {
    categoryHeader: 'OIL SEEDS',
    subHeader: 'Composition, Antioxidants & Healthy Fats',
    overview: 'Sesame seeds are entirely plant-based and consist of 100% whole sesame seeds. They are composed of 45% - 65% natural oils, 19% - 35% protein, and 14% - 20% carbohydrates. They are highly nutritious, providing fiber, B vitamins, antioxidants, and essential minerals like calcium, iron, and magnesium.',
    breakdownTitle: 'Key Components',
    breakdownItems: [
      { label: 'Natural Oils', value: '45% – 65%' },
      { label: 'Protein Content', value: '19% – 35%' },
      { label: 'Carbohydrates', value: '14% – 20%' }
    ],
    highlights: [
      { title: 'Healthy Fats', desc: 'Composed of unsaturated fatty acids, primarily oleic and linoleic acids, which benefit heart health.' },
      { title: 'Protein & Amino Acids', desc: 'Rich sources of essential methionine and cysteine.' },
      { title: 'Specialized Antioxidants', desc: 'Contain unique phytochemicals called lignans (such as sesamin and sesamolin) and phytosterols, which help lower cholesterol.' },
      { title: 'Trace Minerals', desc: 'High in calcium, copper, zinc, and manganese.' }
    ],
    technicalSpecs: [
      { key: 'Varieties Available', value: 'Natural White, Hulled Auto-Sortex, Black Sesame' },
      { key: 'Purity Levels', value: '99.9% / 99.95% / 99.99% Hulled' },
      { key: 'Oil Content', value: 'Min 48% - 50%' }
    ]
  },
  'P-13': {
    categoryHeader: 'OIL SEEDS',
    subHeader: 'Nutrient-Dense Legume Profile',
    overview: 'Soybeans are a nutrient-dense legume commonly used to create plant-based proteins, dairy alternatives, and cooking oils. Primary ingredients include whole soybeans, defatted soy flour (for textured protein), and water. They are rich in isoflavones, protein, and essential micronutrients like folate and Vitamin K.',
    highlights: [
      {
        title: 'Nutrient Matrix',
        desc: 'Whole soybeans naturally deliver around 36% to 40% protein and 18% to 24% healthy unsaturated oils by weight.'
      },
      {
        title: 'Isoflavones & Micronutrients',
        desc: 'Rich in protective isoflavones, plant sterols, folate, vitamin K, and magnesium.'
      }
    ],
    technicalSpecs: [
      { key: 'Protein Content', value: '36% – 40%' },
      { key: 'Natural Oil Content', value: '18% – 24%' },
      { key: 'Carbohydrates', value: '~26%' },
      { key: 'Applications', value: 'Crushing / Edible Oil / Soy Protein Meal / Food Processing' }
    ]
  },
  'P-14': {
    categoryHeader: 'OIL SEEDS',
    subHeader: 'Macronutrients & Vitamin Matrix',
    overview: 'Groundnuts (peanuts) are highly nutritious, boasting approximately 25g of plant-based protein per 100g, along with 49g of heart-healthy monounsaturated and polyunsaturated fats, and 16g of carbohydrates. They also provide 8.5g of dietary fiber and are naturally cholesterol-free. Beyond macro-nutrients, groundnuts are packed with essential vitamins, minerals, and bioactive compounds.',
    breakdownTitle: 'Nutritional Profile (per 100g)',
    breakdownItems: [
      { label: 'Plant-Based Protein', value: 'Approx. 25 g' },
      { label: 'Healthy Fats (MUFA/PUFA)', value: '49 g' },
      { label: 'Carbohydrates', value: '16 g' },
      { label: 'Dietary Fiber', value: '8.5 g' },
      { label: 'Cholesterol', value: '0 mg (Naturally Free)' }
    ],
    highlights: [
      { title: 'B-Vitamins', desc: 'Rich in Niacin (Vitamin B3) for energy, Folate (Vitamin B9) for cell health, and Biotin (Vitamin B7) for hair and nails.' },
      { title: 'Vitamin E', desc: 'A powerful antioxidant that helps protect cells from oxidative damage.' }
    ],
    technicalSpecs: [
      { key: 'Kernel Counts', value: 'Bold (38/42, 40/50, 50/60) & Java (50/60, 60/70, 70/80)' },
      { key: 'Aflatoxin Control', value: 'Strictly monitored EU / US / Middle East export limits' }
    ]
  },
  'P-15': {
    categoryHeader: 'EDIBLE OILS',
    subHeader: 'Fatty Acid Profile & Extraction Variants',
    overview: 'Sunflower oil is 100% fat, providing about 120 calories and 14 grams of fat per tablespoon. It is completely free of protein, carbs, cholesterol, and sodium. Its primary components include high levels of vitamin E, polyunsaturated omega-6 fatty acids (linoleic acid), and varying amounts of monounsaturated fats (oleic acid).',
    breakdownTitle: 'Serving Breakdown (per 1 tbsp)',
    breakdownItems: [
      { label: 'Calories', value: '120 kcal' },
      { label: 'Total Fat', value: '14 g (100% fat)' },
      { label: 'Protein / Carbohydrates / Sodium', value: '0 g' },
      { label: 'Cholesterol', value: '0 mg' }
    ],
    highlights: [
      { title: 'Polyunsaturated Fats (PUFA)', desc: 'Standard sunflower oil is very rich in linoleic acid (Omega-6), making up about 48% to 74% of its fat content.' },
      { title: 'Monounsaturated Fats (MUFA)', desc: 'Also known as oleic acid. Traditional oil contains about 14% to 40%. High-Oleic Sunflower Oil is specially cultivated to contain up to 80% monounsaturated fats, making it exceptionally heat-stable for cooking.' },
      { title: 'Saturated Fats', desc: 'Relatively low in saturated fats, typically containing between 10% and 15% (comprising palmitic and stearic acids).' }
    ],
    technicalSpecs: [
      { key: 'Grade Types', value: 'Crude Sunflower Oil / Refined Deodorized Bleached (RBD)' },
      { key: 'Smoke Point (Refined)', value: '~232°C (450°F)' },
      { key: 'Free Fatty Acids (FFA)', value: 'Max 0.1% (Refined grade)' }
    ]
  },
  'P-16': {
    categoryHeader: 'EDIBLE OILS',
    subHeader: 'Fatty Acid Composition & Refining',
    overview: 'Soybean seeds naturally contain about 18% to 24% oil by weight, along with 36% to 40% protein and 26% carbohydrates. Extracted and refined, the oil is entirely composed of fats (100 g per 100 g) and is valued for its high concentration of heart-healthy unsaturated fatty acids.',
    breakdownTitle: 'Fatty Acid Breakdown',
    breakdownItems: [
      { label: 'Linoleic Acid (Omega-6 PUFA)', value: '51% to 58%' },
      { label: 'Oleic Acid (Omega-9 MUFA)', value: '17% to 30%' },
      { label: 'Palmitic Acid (Saturated Fat)', value: '9% to 13%' },
      { label: 'a-Linolenic Acid (Omega-3 PUFA)', value: '4% to 11%' },
      { label: 'Stearic Acid (Saturated Fat)', value: '2.5% to 5%' }
    ],
    technicalSpecs: [
      { key: 'Total Fat Content', value: '100 g per 100 g' },
      { key: 'Origin Seed Composition', value: '18%–24% oil, 36%–40% protein' },
      { key: 'Packaging Formats', value: 'Flexitanks / ISO Tanks / Drums / 15L Tins / Pet Bottles' }
    ]
  },
  'P-17': {
    categoryHeader: 'EDIBLE OILS',
    subHeader: 'Kernel Oil Yield & Variety Variations',
    overview: 'Groundnuts (peanuts) typically contain between 45% and 55% oil by weight, depending on the specific variety, moisture levels, and growing conditions. In terms of yield, 1 kg of raw groundnut kernels will generally produce about 0.4 to 0.45 liters (or roughly 400 to 450 grams) of oil.',
    highlights: [
      {
        title: 'Kernel Composition',
        desc: 'The kernels themselves consist of about 46% to 51% oil and are also rich in proteins (about 26%) and healthy unsaturated fatty acids.'
      },
      {
        title: 'Varietal Differences in Yield',
        desc: 'Different species naturally vary in their yields. For instance, the Valencia variety yields around 37.8% oil, while Virginia and Runner varieties vary in their extraction yields.'
      }
    ],
    technicalSpecs: [
      { key: 'Average Oil Yield', value: '0.4 – 0.45 liters per 1 kg raw kernels' },
      { key: 'Raw Kernel Oil Content', value: '45% to 55% by weight' },
      { key: 'Raw Kernel Protein', value: '~26% by weight' },
      { key: 'Types Supplied', value: 'Cold Pressed Virgin / Filtered / Refined' }
    ]
  },
  'P-18': {
    categoryHeader: 'DRY FRUITS',
    subHeader: 'Nutrient Matrix & Mineral Density',
    overview: 'Cashews are nutrient-dense nuts packed with heart-healthy unsaturated fats, plant-based protein, and dietary fiber. They are particularly rich in essential minerals like copper, magnesium, zinc, and iron, along with beneficial antioxidants such as polyphenols.',
    breakdownTitle: 'Standard 1-ounce (28-gram) Serving',
    breakdownItems: [
      { label: 'Calories', value: '163 kcal' },
      { label: 'Protein', value: '4.3 grams' },
      { label: 'Total Fat', value: '13.2 grams' },
      { label: 'Carbohydrates', value: '9.3 grams' },
      { label: 'Dietary Fiber', value: '0.9 grams' }
    ],
    highlights: [
      {
        title: 'Essential Minerals',
        desc: 'Abundant in copper (supporting iron absorption and immune function), magnesium (bone & nerve health), zinc, and iron.'
      },
      {
        title: 'Antioxidants',
        desc: 'Contains polyphenols and carotenoids that combat free-radical oxidative damage.'
      }
    ],
    technicalSpecs: [
      { key: 'Export Grades', value: 'W180 (King of Cashews), W210 (Jumbo), W240, W320, W450, Splits (FS), Butts, Pieces (LWP)' },
      { key: 'Processing Method', value: 'Boiled / Steam Roasted & Vacuum Packed with CO2/N2' }
    ]
  },
  'P-19': {
    categoryHeader: 'DRY FRUITS',
    subHeader: 'Vital Active Phytochemicals',
    overview: 'Saffron is chemically composed of over 150 volatile and aroma-yielding compounds, but its three most vital active phytochemicals are crocin (responsible for color), picrocrocin (for bitter taste), and safranal (for aroma). Dried threads contain roughly 65% carbohydrates, 11% protein, 6% fat, and trace minerals like manganese.',
    breakdownTitle: 'Core Chemical Breakdown',
    breakdownItems: [
      { label: 'Carbohydrates', value: '~65%' },
      { label: 'Protein', value: '11%' },
      { label: 'Healthy Fats', value: '6%' },
      { label: 'Trace Minerals', value: 'Manganese, Potassium, Iron' }
    ],
    highlights: [
      {
        title: 'Crocin',
        desc: 'A carotenoid that gives foods a rich golden-yellow color. It acts as a powerful antioxidant and is linked to potential neuroprotective and antidepressant properties.'
      },
      {
        title: 'Safranal',
        desc: 'A volatile terpene aldehyde that gives saffron its distinct honey-metallic scent. It is under preliminary research for its anti-inflammatory and anti-depressant benefits.'
      },
      {
        title: 'Picrocrocin',
        desc: 'The key compound responsible for the signature subtle, earthy-bitter flavor profile.'
      }
    ],
    technicalSpecs: [
      { key: 'ISO 3632 Classification', value: 'Category I (Highest Color & Aroma Strength)' },
      { key: 'Origin Standard', value: 'Kashmiri Mongra / Super Negin Grade' },
      { key: 'Packaging', value: 'Sealed luxury glass vials / metal tins / food-grade pouches' }
    ]
  },
  'P-20': {
    categoryHeader: 'DRY FRUITS',
    subHeader: 'Nutrient Matrix & Vitamin E Content',
    overview: 'Almonds are highly nutrient-dense edible seeds packed with plant-based protein, dietary fiber, and healthy monounsaturated fats. They are exceptionally rich in vitamin E, magnesium, and riboflavin (vitamin B2).',
    breakdownTitle: 'Standard 1-ounce (28-gram) Serving',
    breakdownItems: [
      { label: 'Calories', value: '164 kcal' },
      { label: 'Protein', value: '6.0 grams' },
      { label: 'Total Fat', value: '14.2 grams' },
      { label: 'Carbohydrates', value: '6.1 grams' },
      { label: 'Dietary Fiber', value: '3.5 grams' },
      { label: 'Vitamin E', value: '7.3 milligrams (approx. 48% Daily Value)' },
      { label: 'Magnesium', value: '76.7 milligrams (approx. 18% Daily Value)' }
    ],
    technicalSpecs: [
      { key: 'Varieties Available', value: 'Nonpareil, Carmel, Butte/Padre, California, Mamra, Gurbandi' },
      { key: 'Size Calibration', value: '18/20, 20/22, 23/25, 27/30 kernels per ounce' },
      { key: 'Moisture Level', value: 'Max 6%' }
    ]
  },
  'P-21': {
    categoryHeader: 'TEA & COFFEE',
    subHeader: 'Camellia Sinensis & Herbal Infusions',
    overview: 'Real tea comes from the Camellia sinensis plant, but "tea" usually includes herbal blends. The exact makeup depends on the variety.',
    highlights: [
      {
        title: 'True Teas (Black, Green)',
        desc: 'Leaves from Camellia sinensis, containing caffeine, amino acids (like theanine) and flavonoids (catechins).'
      },
      {
        title: 'Indian Masala Chai',
        desc: 'A traditional blend of robust black tea leaves, milk, water, and aromatic whole spices like ginger, green cardamom, cloves, and cinnamon.'
      },
      {
        title: 'Herbal Teas',
        desc: 'Caffeine-free infusions made from botanicals, dried fruits, or herbs like chamomile, peppermint, or rooibos.'
      }
    ],
    technicalSpecs: [
      { key: 'Leaf Grades (Black Tea)', value: 'FTGFOP, TGFOP, BOP, CTC (Pekoe Dust)' },
      { key: 'Origins Sourced', value: 'Assam, Darjeeling, Nilgiri' },
      { key: 'Bioactives', value: 'Theanine, Catechins, Polyphenols' }
    ]
  },
  'P-22': {
    categoryHeader: 'TEA & COFFEE',
    subHeader: 'Caffeine Content & Brewing Metrics',
    overview: 'Coffee is a brewed beverage from roasted beans, widely consumed for its stimulating effects. Its primary components include caffeine, tannins, carbohydrates, and proteins. A standard 8-oz brewed cup contains about 95–100 mg of caffeine, while espresso delivers about 63 mg per shot.',
    breakdownTitle: 'Caffeine Metrics by Brewing Style',
    breakdownItems: [
      { label: 'Brewed Coffee (8-oz)', value: '~80 – 100 mg caffeine' },
      { label: 'Espresso (1-oz shot)', value: '~63 mg caffeine' },
      { label: 'Cold Brew (12-oz)', value: '~153 – 238 mg caffeine' },
      { label: 'Instant Coffee (8-oz)', value: '~62 mg caffeine' }
    ],
    highlights: [
      {
        title: 'Safety Guidelines',
        desc: 'According to health experts, up to 400 mg of caffeine per day (roughly 4–5 cups of filter coffee) is generally considered safe for healthy adults. Pregnant or nursing individuals and those sensitive to stimulants should significantly lower their daily intake.'
      }
    ],
    technicalSpecs: [
      { key: 'Species Available', value: 'Coffea Arabica & Coffea Robusta' },
      { key: 'Roast Options', value: 'Green Raw Beans / Light / Medium / Dark Roast' },
      { key: 'Key Chemical Matrix', value: 'Caffeine, Chlorogenic Acids, Tannins, Trigonelline' }
    ]
  },
  'P-23': {
    categoryHeader: 'TEA & COFFEE',
    subHeader: 'Cocoa vs. Cacao & Nutrient Density',
    overview: 'Unsweetened cocoa powder is a nutrient-dense ingredient. A standard 1-tablespoon (5g) serving contains approximately 10 calories, 3g of carbohydrates (including 2g of dietary fiber), 0g of sugar, and 0.5g of fat. It is also a rich source of antioxidants, iron, and magnesium.',
    breakdownTitle: 'Nutritional Breakdown (per 1 tbsp / 5g)',
    breakdownItems: [
      { label: 'Calories', value: '10 kcal' },
      { label: 'Carbohydrates', value: '3 g' },
      { label: 'Dietary Fiber', value: '2 g' },
      { label: 'Sugar', value: '0 g' },
      { label: 'Total Fat', value: '0.5 g' },
      { label: 'Key Micronutrients', value: 'Iron, Magnesium, Flavonols' }
    ],
    highlights: [
      {
        title: 'Natural Unsweetened Cocoa Powder',
        desc: 'Retains the bean\'s natural, acidic pH, is light brown, and carries a very intense, fruity chocolate flavor.'
      },
      {
        title: 'Cacao Powder',
        desc: 'Made from cold-pressed, unroasted beans. It retains the maximum possible nutrient and antioxidant content.'
      }
    ],
    technicalSpecs: [
      { key: 'Alkalization Types', value: 'Natural (Acidic pH 5-6) / Dutch-Processed (Neutralized pH 7-8)' },
      { key: 'Fat Content in Powder', value: '10–12% Standard / 20–22% High Fat Cocoa' }
    ]
  },
  'P-24': {
    categoryHeader: 'FOOD INGREDIENTS',
    subHeader: 'Concentration, Moisture & Volatile Oils',
    overview: 'Dehydrated onion powder contains highly concentrated flavor without fresh water weight. Per 100g, it provides about 342 kcal, 10g of protein, 79g of carbohydrates (including 15g of dietary fiber), and only 1g of fat. It naturally retains essential minerals like iron and calcium and typically maintains a low moisture content of 4% to 6%.',
    breakdownTitle: 'Chemical & Nutritional Makeup',
    breakdownItems: [
      { label: 'Basic Moisture', value: '4% – 6% (must be kept within this limit to prevent caking)' },
      { label: 'Volatile Oils', value: '≥ 0.25% (responsible for the pungent flavor and natural aroma)' },
      { label: 'Ash Content', value: '≤ 4% – 7% (reflects the mineral residue after burning off organics)' },
      { label: 'Calories (per 100g)', value: '342 kcal' },
      { label: 'Protein (per 100g)', value: '10 g' },
      { label: 'Carbohydrates (per 100g)', value: '79 g (15g dietary fiber)' },
      { label: 'Fat (per 100g)', value: '1 g' }
    ],
    highlights: [
      {
        title: 'Concentrated Shelf-Stable Seasoning',
        desc: 'Because the vegetable is completely dried and pulverized, the powder serves as a concentrated, shelf-stable seasoning with complete retention of iron and calcium.'
      }
    ],
    technicalSpecs: [
      { key: 'Form Cuts', value: 'Minced, Chopped, Granules, Powder (White & Red Onion)' },
      { key: 'Shelf Life', value: 'Up to 24 Months in cool, dry storage' }
    ]
  },
  'P-25': {
    categoryHeader: 'FOOD INGREDIENTS',
    subHeader: 'Commercial Limits & Nutritional Makeup',
    overview: 'Dehydrated garlic powder is made by drying and grinding fresh garlic cloves. It contains zero fat, highly concentrated carbohydrates, and contains less than 5% moisture. It delivers essential nutrients like calcium, iron, and potassium while remaining shelf-stable for up to 12 months.',
    breakdownTitle: 'Nutritional Values (per 100g)',
    breakdownItems: [
      { label: 'Calories', value: '331 kcal' },
      { label: 'Protein', value: '16.6 g' },
      { label: 'Carbohydrates', value: '72.7 g (with 9g dietary fiber and 2.4g natural sugar)' },
      { label: 'Fat', value: '0 g' }
    ],
    highlights: [
      {
        title: 'International Commercial Limits',
        desc: 'For standard international commercial limits, dehydrated garlic powder generally requires: Moisture Content: ≤ 5% to 6%, Volatile Oil Content: ≥ 0.3%, Ash Content: ≤ 4%.'
      }
    ],
    technicalSpecs: [
      { key: 'Moisture Limit', value: '≤ 5% to 6%' },
      { key: 'Volatile Oil Content', value: '≥ 0.3%' },
      { key: 'Ash Content', value: '≤ 4%' },
      { key: 'Available Cuts', value: 'Flakes / Cloves, Minced, Granules, Fine Powder' }
    ]
  },
  'P-26': {
    categoryHeader: 'FOOD INGREDIENTS',
    subHeader: 'Gingerol Concentration & Volatiles',
    overview: 'Dehydrated ginger powder is a highly concentrated spice. Its core composition relies on low moisture content (6% to 10%). It typically yields 1.5% to 7% of gingerol (the active compound responsible for its pungent kick) and 1% to 3% volatile oils, retaining a strong aroma and flavor.',
    breakdownTitle: 'Standard Commercial Breakdown (per 100g)',
    breakdownItems: [
      { label: 'Carbohydrates', value: '~70% to 72%' },
      { label: 'Dietary Fiber', value: '~12% to 14%' },
      { label: 'Protein', value: '~6% to 9%' },
      { label: 'Moisture Content', value: '6% to 10%' },
      { label: 'Gingerol (Active)', value: '1.5% to 7%' },
      { label: 'Volatile Oils', value: '1% to 3%' }
    ],
    technicalSpecs: [
      { key: 'Active Pungent Principle', value: 'Gingerol (1.5% to 7%)' },
      { key: 'Volatile Oil Content', value: '1% to 3%' },
      { key: 'Available Forms', value: 'Whole Dried Ginger (Sun-dried / Bleached), Flakes, Micro-pulverized Powder' }
    ]
  }
};
