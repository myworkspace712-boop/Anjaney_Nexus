import React, { useState, useEffect } from 'react';
import { useCart } from '../App';
import { useTheme } from '../context/ThemeContext';
import { PRODUCT_PROFILE_DETAILS } from '../data/productProfileDetails';

// Official Product Images from the Anjaney Nexus Profile PDF (frontend/public/Certi_Img/Products)
export const PROFILE_PDF_PAGES = [
  { page: 1, title: 'Company Overview & Introduction', image: '/Certi_Img/Products/anjaney nexus profile - spices_page-0001.jpg' },
  { page: 2, title: 'About Us, Mission & Vision', image: '/Certi_Img/Products/anjaney nexus profile - spices_page-0002.jpg' },
  { page: 3, title: 'Basmati & Non-Basmati Rice Specifications', image: '/Certi_Img/Products/anjaney nexus profile - spices_page-0003.jpg' },
  { page: 4, title: 'Turmeric, Chilli & Cumin Seeds Analysis', image: '/Certi_Img/Products/anjaney nexus profile - spices_page-0004.jpg' },
  { page: 5, title: 'Cardamom, Black Pepper & Cloves Profiles', image: '/Certi_Img/Products/anjaney nexus profile - spices_page-0005.jpg' },
  { page: 6, title: 'Coriander, Cinnamon & Mustard Seeds', image: '/Certi_Img/Products/anjaney nexus profile - spices_page-0006.jpg' },
  { page: 7, title: 'Sesame, Soybean & Groundnut Oil Seeds', image: '/Certi_Img/Products/anjaney nexus profile - spices_page-0007.jpg' },
  { page: 8, title: 'Sunflower, Soybean & Groundnut Edible Oils', image: '/Certi_Img/Products/anjaney nexus profile - spices_page-0008.jpg' },
  { page: 9, title: 'Cashew Nuts, Saffron & Almonds Breakdown', image: '/Certi_Img/Products/anjaney nexus profile - spices_page-0009.jpg' },
  { page: 10, title: 'Tea, Coffee & Cocoa Beverage Profiles', image: '/Certi_Img/Products/anjaney nexus profile - spices_page-0010.jpg' },
  { page: 11, title: 'Dehydrated Onion, Garlic & Ginger Ingredients', image: '/Certi_Img/Products/anjaney nexus profile - spices_page-0011.jpg' },
  { page: 12, title: 'Global Contact & Commercial Procurement', image: '/Certi_Img/Products/anjaney nexus profile - spices_page-0012.jpg' },
];

// B2B Export Catalog with verified descriptions from the Official Anjaney Nexus Company Profile PDF
// ALL 26 PRODUCTS EXACTLY AS ORDERED IN THE PDF PROFILE
export const EXPORT_CATALOG = [
{
    "id": "P-01",
    "numId": 1,
    "name": "Basmati Rice",
    "title": "Basmati Rice",
    "category": "Rice",
    "badgeCategory": "AGRICULTURE",
    "bullets": [
      "Premium grades feature extra-long grains (8.2 mm or longer).",
      "Grow up to twice their size when cooked, remain non-sticky, and are naturally aged."
    ],
    "description": "• Premium grades feature extra-long grains (8.2 mm or longer).\n• Grow up to twice their size when cooked, remain non-sticky, and are naturally aged.",
    "specs": [
      {
        "label": "Length",
        "value": "8.35mm Avg"
      },
      {
        "label": "Moisture",
        "value": "12.5% Max"
      },
      {
        "label": "Broken",
        "value": "1% Max"
      },
      {
        "label": "Purity",
        "value": "95% Min"
      },
      {
        "label": "Damage",
        "value": "1% Max"
      },
      {
        "label": "Discolor",
        "value": "1% Max"
      },
      {
        "label": "Foreign Matter",
        "value": "0.1% Max"
      },
      {
        "label": "Paddy",
        "value": "Nil"
      },
      {
        "label": "Sortex",
        "value": "100%"
      },
      {
        "label": "HS Code",
        "value": "10063020"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "25-26 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "10, 20, 40kg PP/Non-Woven"
      }
    ],
    "importers": "Middle East, USA, Europe, UK",
    "moq": "1 FCL (20ft)",
    "load": "25-26 MT in 20ft",
    "packing": "10, 20, 40kg PP/Non-Woven",
    "hsCode": "10063020",
    "image": "/images/BasmatiRice.png",
    "fallbackImage": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
    "profilePage": 3
  },
  {
    "id": "P-02",
    "numId": 2,
    "name": "Non Basmati Rice",
    "title": "Non Basmati Rice",
    "category": "Rice",
    "badgeCategory": "AGRICULTURE",
    "bullets": [
      "Graded primarily by grain length, percentage of broken kernels, and overall purity.",
      "Popular varieties include sona masoori (light and aromatic) and IR64 (high yield)."
    ],
    "description": "• Graded primarily by grain length, percentage of broken kernels, and overall purity.\n• Popular varieties include sona masoori (light and aromatic) and IR64 (high yield).",
    "specs": [
      {
        "label": "Length",
        "value": "6.0 - 6.5mm"
      },
      {
        "label": "Moisture",
        "value": ""
      },
      {
        "label": "Broken",
        "value": "Max 2%"
      },
      {
        "label": "Purity",
        "value": ""
      },
      {
        "label": "Sortex",
        "value": "100%"
      },
      {
        "label": "HS Code",
        "value": "10063090"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "25 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "10, 20, 40kg PP/Non-Woven"
      }
    ],
    "importers": "Africa, Southeast Asia, Middle East",
    "moq": "1 FCL (20ft)",
    "load": "25 MT in 20ft",
    "packing": "10, 20, 40kg PP/Non-Woven",
    "hsCode": "10063090",
    "image": "/images/NonBasmatiRice.png",
    "fallbackImage": "https://images.unsplash.com/photo-1536304929831-ee1ca9d44906?auto=format&fit=crop&q=80&w=800",
    "profilePage": 3
  },
  {
    "id": "P-03",
    "numId": 3,
    "name": "Turmeric",
    "title": "Turmeric",
    "category": "Spices",
    "badgeCategory": "SPICES",
    "bullets": [
      "Composition: Carbohydrates (60-70%), dietary fiber (20-22%), moisture (10-13%), and essential minerals.",
      "Active Curcumin: Accounts for an average of 2% to 9% by weight, alongside essential oils."
    ],
    "description": "• Composition: Carbohydrates (60-70%), dietary fiber (20-22%), moisture (10-13%), and essential minerals.\n• Active Curcumin: Accounts for an average of 2% to 9% by weight, alongside essential oils.",
    "specs": [
      {
        "label": "Curcumin",
        "value": "2% to 9%"
      },
      {
        "label": "Essential Oils",
        "value": "3% to 7%"
      },
      {
        "label": "Carbohydrates",
        "value": "60% - 70%"
      },
      {
        "label": "Moisture",
        "value": "10% - 13%"
      },
      {
        "label": "HS Code",
        "value": "09103020"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "18 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "25, 50kg Jute/PP Bags"
      }
    ],
    "importers": "Europe, Middle East, USA, Japan",
    "moq": "1 FCL (20ft)",
    "load": "18 MT in 20ft",
    "packing": "25, 50kg Jute/PP Bags",
    "hsCode": "09103020",
    "image": "/images/Turmeric.png",
    "fallbackImage": "https://images.unsplash.com/photo-1615486171448-4fd1313661eb?auto=format&fit=crop&q=80&w=800",
    "profilePage": 4
  },
  {
    "id": "P-04",
    "numId": 4,
    "name": "Chilly",
    "title": "Chilly",
    "category": "Spices",
    "badgeCategory": "SPICES",
    "bullets": [
      "Packed with the active compound capsaicin that provides signature spicy heat (SHU).",
      "Rich in water, vitamin C, vitamin A, vitamin B6, potassium, and antioxidants."
    ],
    "description": "• Packed with the active compound capsaicin that provides signature spicy heat (SHU).\n• Rich in water, vitamin C, vitamin A, vitamin B6, potassium, and antioxidants.",
    "specs": [
      {
        "label": "Active Compound",
        "value": "Capsaicin"
      },
      {
        "label": "Antioxidants",
        "value": "Violaxanthin, Lutein"
      },
      {
        "label": "Heat Level (SHU)",
        "value": ""
      },
      {
        "label": "Moisture",
        "value": ""
      },
      {
        "label": "HS Code",
        "value": "09042110"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "14 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "10, 25kg Gunny Bags"
      }
    ],
    "importers": "USA, UK, China, Middle East",
    "moq": "1 FCL (20ft)",
    "load": "14 MT in 20ft",
    "packing": "10, 25kg Gunny Bags",
    "hsCode": "09042110",
    "image": "/images/Chilly.png",
    "fallbackImage": "https://images.unsplash.com/photo-1596472624479-7a544df12a52?auto=format&fit=crop&q=80&w=800",
    "profilePage": 4
  },
  {
    "id": "P-05",
    "numId": 5,
    "name": "Cumin Seeds",
    "title": "Cumin Seeds",
    "category": "Spices",
    "badgeCategory": "SPICES",
    "bullets": [
      "A dried, boat-shaped seed from the Cuminum cyminum plant with a warm, earthy flavor.",
      "Composed of 44% carbohydrates, 22% fat, 18% protein, and 8% water."
    ],
    "description": "• A dried, boat-shaped seed from the Cuminum cyminum plant with a warm, earthy flavor.\n• Composed of 44% carbohydrates, 22% fat, 18% protein, and 8% water.",
    "specs": [
      {
        "label": "Carbohydrates",
        "value": "44%"
      },
      {
        "label": "Fat",
        "value": "22%"
      },
      {
        "label": "Protein",
        "value": "18%"
      },
      {
        "label": "Moisture",
        "value": "9% Max"
      },
      {
        "label": "HS Code",
        "value": "09093129"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "14 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "25, 50kg PP/Paper Bags"
      }
    ],
    "importers": "Middle East, USA, UK, Mexico",
    "moq": "1 FCL (20ft)",
    "load": "14 MT in 20ft",
    "packing": "25, 50kg PP/Paper Bags",
    "hsCode": "09093129",
    "image": "/images/CuminSeeds.png",
    "fallbackImage": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    "profilePage": 4
  },
  {
    "id": "P-06",
    "numId": 6,
    "name": "Cardamom",
    "title": "Cardamom",
    "category": "Spices",
    "badgeCategory": "SPICES",
    "bullets": [
      "Highly aromatic spice containing essential oils (3-8%) rich in 1, 8-cineole and a-terpinyl acetate.",
      "Provides 18 calories and 1.6 grams of fiber per tablespoon."
    ],
    "description": "• Highly aromatic spice containing essential oils (3-8%) rich in 1, 8-cineole and a-terpinyl acetate.\n• Provides 18 calories and 1.6 grams of fiber per tablespoon.",
    "specs": [
      {
        "label": "Calories",
        "value": "18 / tbsp"
      },
      {
        "label": "Carbohydrates",
        "value": "4.0g"
      },
      {
        "label": "Dietary Fiber",
        "value": "1.6g"
      },
      {
        "label": "Essential Oils",
        "value": "3% - 8%"
      },
      {
        "label": "HS Code",
        "value": "09083120"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "10 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "5, 10kg Carton Boxes"
      }
    ],
    "importers": "Saudi Arabia, UAE, Europe",
    "moq": "1 FCL (20ft)",
    "load": "10 MT in 20ft",
    "packing": "5, 10kg Carton Boxes",
    "hsCode": "09083120",
    "image": "/images/Cardamom.png",
    "fallbackImage": "https://images.unsplash.com/photo-1599909618055-6d0f62b212f4?auto=format&fit=crop&q=80&w=800",
    "profilePage": 5
  },
  {
    "id": "P-07",
    "numId": 7,
    "name": "Black Pepper",
    "title": "Black Pepper",
    "category": "Spices",
    "badgeCategory": "SPICES",
    "bullets": [
      "Single-ingredient spice made from the dried, unripe berries of the Piper nigrum vine.",
      "Signature heat comes from the active alkaloid compound piperine."
    ],
    "description": "• Single-ingredient spice made from the dried, unripe berries of the Piper nigrum vine.\n• Signature heat comes from the active alkaloid compound piperine.",
    "specs": [
      {
        "label": "Active Compound",
        "value": "Piperine"
      },
      {
        "label": "Essential Oils",
        "value": "Limonene, Pinene"
      },
      {
        "label": "Moisture",
        "value": ""
      },
      {
        "label": "HS Code",
        "value": "09041130"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "15 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "25, 50kg PP Bags"
      }
    ],
    "importers": "USA, Europe, Japan",
    "moq": "1 FCL (20ft)",
    "load": "15 MT in 20ft",
    "packing": "25, 50kg PP Bags",
    "hsCode": "09041130",
    "image": "/images/BlackPepper.png",
    "fallbackImage": "https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?auto=format&fit=crop&q=80&w=800",
    "profilePage": 5
  },
  {
    "id": "P-08",
    "numId": 8,
    "name": "Cloves",
    "title": "Cloves",
    "category": "Spices",
    "badgeCategory": "SPICES",
    "bullets": [
      "Aromatic, dried unopened flower buds of the Syzygium aromaticum evergreen tree.",
      "Pungent flavor driven by eugenol, accounting for 70% to 90% of the essential oil."
    ],
    "description": "• Aromatic, dried unopened flower buds of the Syzygium aromaticum evergreen tree.\n• Pungent flavor driven by eugenol, accounting for 70% to 90% of the essential oil.",
    "specs": [
      {
        "label": "Eugenol",
        "value": "70% - 90%"
      },
      {
        "label": "Harvest",
        "value": "Immature Buds"
      },
      {
        "label": "Moisture",
        "value": ""
      },
      {
        "label": "HS Code",
        "value": "09071010"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "12 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "10, 25kg Gunny/Carton"
      }
    ],
    "importers": "Middle East, USA, Europe",
    "moq": "1 FCL (20ft)",
    "load": "12 MT in 20ft",
    "packing": "10, 25kg Gunny/Carton",
    "hsCode": "09071010",
    "image": "/images/Cloves.png",
    "fallbackImage": "https://images.unsplash.com/photo-1611077544837-775677840133?auto=format&fit=crop&q=80&w=800",
    "profilePage": 5
  },
  {
    "id": "P-09",
    "numId": 9,
    "name": "Coriander",
    "title": "Coriander",
    "category": "Spices",
    "badgeCategory": "SPICES",
    "bullets": [
      "Dual-purpose herb where both the fresh leaves (cilantro) and dried seeds (dhaniya) are consumed.",
      "Earthy, slightly sweet flavor driven by naturally occurring terpenes like linalool and pinene."
    ],
    "description": "• Dual-purpose herb where both the fresh leaves (cilantro) and dried seeds (dhaniya) are consumed.\n• Earthy, slightly sweet flavor driven by naturally occurring terpenes like linalool and pinene.",
    "specs": [
      {
        "label": "Primary Compound",
        "value": "100% Dried Fruit"
      },
      {
        "label": "Terpenes",
        "value": "Linalool, Pinene"
      },
      {
        "label": "Purity",
        "value": "99% Min"
      },
      {
        "label": "Moisture",
        "value": "9% Max"
      },
      {
        "label": "HS Code",
        "value": "09092190"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "15 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "25, 50kg PP Bags"
      }
    ],
    "importers": "Malaysia, UAE, Saudi Arabia, UK",
    "moq": "1 FCL (20ft)",
    "load": "15 MT in 20ft",
    "packing": "25, 50kg PP Bags",
    "hsCode": "09092190",
    "image": "/images/Coriander.png",
    "fallbackImage": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    "profilePage": 6
  },
  {
    "id": "P-10",
    "numId": 10,
    "name": "Cinnamon",
    "title": "Cinnamon",
    "category": "Spices",
    "badgeCategory": "SPICES",
    "bullets": [
      "Versatile inner bark known for its signature active compound, cinnamaldehyde.",
      "True Ceylon Cinnamon is milder and sweeter, while Cassia is stronger and spicier."
    ],
    "description": "• Versatile inner bark known for its signature active compound, cinnamaldehyde.\n• True Ceylon Cinnamon is milder and sweeter, while Cassia is stronger and spicier.",
    "specs": [
      {
        "label": "Calories",
        "value": "6 / tsp"
      },
      {
        "label": "Carbohydrates",
        "value": "2.0g"
      },
      {
        "label": "Dietary Fiber",
        "value": "1.3g"
      },
      {
        "label": "Variety",
        "value": ""
      },
      {
        "label": "HS Code",
        "value": "09061120"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "12 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "10, 25kg Cartons"
      }
    ],
    "importers": "USA, Mexico, Europe",
    "moq": "1 FCL (20ft)",
    "load": "12 MT in 20ft",
    "packing": "10, 25kg Cartons",
    "hsCode": "09061120",
    "image": "/images/Cinnamon.png",
    "fallbackImage": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    "profilePage": 6
  },
  {
    "id": "P-11",
    "numId": 11,
    "name": "Mustard Seeds",
    "title": "Mustard Seeds",
    "category": "Spices",
    "badgeCategory": "SPICES",
    "bullets": [
      "Mustard seeds (rai) are a staple in Indian kitchens.",
      "Highly valued for their bold flavor and inherent health benefits."
    ],
    "description": "• Mustard seeds (rai) are a staple in Indian kitchens.\n• Highly valued for their bold flavor and inherent health benefits.",
    "specs": [
      {
        "label": "Application",
        "value": "Culinary Spice"
      },
      {
        "label": "Flavor",
        "value": "Bold & Pungent"
      },
      {
        "label": "Purity",
        "value": ""
      },
      {
        "label": "Moisture",
        "value": ""
      },
      {
        "label": "HS Code",
        "value": "12075010"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "18 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "25, 50kg PP Bags"
      }
    ],
    "importers": "Europe, USA, Middle East",
    "moq": "1 FCL (20ft)",
    "load": "18 MT in 20ft",
    "packing": "25, 50kg PP Bags",
    "hsCode": "12075010",
    "image": "/images/MustardSeeds.png",
    "fallbackImage": "https://images.unsplash.com/photo-1599909618055-6d0f62b212f4?auto=format&fit=crop&q=80&w=800",
    "profilePage": 6
  },
  {
    "id": "P-12",
    "numId": 12,
    "name": "Sesame Seeds",
    "title": "Sesame Seeds",
    "category": "Oil Seeds",
    "badgeCategory": "OIL SEEDS",
    "bullets": [
      "Entirely plant-based, composed of 45%-65% natural oils, 19%-35% protein.",
      "Contain unique phytochemicals called lignans (sesamin and sesamolin) to help lower cholesterol."
    ],
    "description": "• Entirely plant-based, composed of 45%-65% natural oils, 19%-35% protein.\n• Contain unique phytochemicals called lignans (sesamin and sesamolin) to help lower cholesterol.",
    "specs": [
      {
        "label": "Natural Oils",
        "value": "45% - 65%"
      },
      {
        "label": "Protein",
        "value": "19% - 35%"
      },
      {
        "label": "Carbohydrates",
        "value": "14% - 20%"
      },
      {
        "label": "Moisture",
        "value": ""
      },
      {
        "label": "HS Code",
        "value": "12074090"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "19 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "10, 25kg Multi-wall Paper"
      }
    ],
    "importers": "Japan, South Korea, Middle East",
    "moq": "1 FCL (20ft)",
    "load": "19 MT in 20ft",
    "packing": "10, 25kg Multi-wall Paper",
    "hsCode": "12074090",
    "image": "/images/SesameSeeds.png",
    "fallbackImage": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
    "profilePage": 7
  },
  {
    "id": "P-13",
    "numId": 13,
    "name": "Soyabean",
    "title": "Soyabean",
    "category": "Oil Seeds",
    "badgeCategory": "OIL SEEDS",
    "bullets": [
      "Nutrient-dense legume commonly used for plant-based proteins, dairy alternatives, and oils.",
      "Rich in isoflavones, protein, and essential micronutrients like folate and Vitamin K."
    ],
    "description": "• Nutrient-dense legume commonly used for plant-based proteins, dairy alternatives, and oils.\n• Rich in isoflavones, protein, and essential micronutrients like folate and Vitamin K.",
    "specs": [
      {
        "label": "Main Use",
        "value": "Proteins & Oils"
      },
      {
        "label": "Key Nutrients",
        "value": "Isoflavones, Folate"
      },
      {
        "label": "Protein Profile",
        "value": "High Plant Protein"
      },
      {
        "label": "HS Code",
        "value": "12019000"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "24 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "50kg PP Bags / Bulk"
      }
    ],
    "importers": "China, Europe, Southeast Asia",
    "moq": "1 FCL (20ft)",
    "load": "24 MT in 20ft",
    "packing": "50kg PP Bags / Bulk",
    "hsCode": "12019000",
    "image": "/images/Soyabean.png",
    "fallbackImage": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    "profilePage": 7
  },
  {
    "id": "P-14",
    "numId": 14,
    "name": "Ground Nut",
    "title": "Ground Nut",
    "category": "Oil Seeds",
    "badgeCategory": "OIL SEEDS",
    "bullets": [
      "Highly nutritious, boasting ~25g of plant-based protein and 49g of healthy fats per 100g.",
      "Rich in B-Vitamins (Niacin, Folate, Biotin) and Vitamin E."
    ],
    "description": "• Highly nutritious, boasting ~25g of plant-based protein and 49g of healthy fats per 100g.\n• Rich in B-Vitamins (Niacin, Folate, Biotin) and Vitamin E.",
    "specs": [
      {
        "label": "Protein",
        "value": "~25g / 100g"
      },
      {
        "label": "Fats",
        "value": "49g / 100g"
      },
      {
        "label": "Carbohydrates",
        "value": "16g / 100g"
      },
      {
        "label": "Moisture",
        "value": ""
      },
      {
        "label": "HS Code",
        "value": "12024210"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "20 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "25, 50kg Jute Bags"
      }
    ],
    "importers": "Southeast Asia, Europe, Middle East",
    "moq": "1 FCL (20ft)",
    "load": "20 MT in 20ft",
    "packing": "25, 50kg Jute Bags",
    "hsCode": "12024210",
    "image": "/images/GroundNut.png",
    "fallbackImage": "https://images.unsplash.com/photo-1599909618055-6d0f62b212f4?auto=format&fit=crop&q=80&w=800",
    "profilePage": 7
  },
  {
    "id": "P-15",
    "numId": 15,
    "name": "Sunflower Oil",
    "title": "Sunflower Oil",
    "category": "Edible Oils",
    "badgeCategory": "EDIBLE OILS",
    "bullets": [
      "100% fat, providing about 120 calories and 14 grams of fat per tablespoon.",
      "Rich in polyunsaturated omega-6 fatty acids (linoleic acid) and vitamin E."
    ],
    "description": "• 100% fat, providing about 120 calories and 14 grams of fat per tablespoon.\n• Rich in polyunsaturated omega-6 fatty acids (linoleic acid) and vitamin E.",
    "specs": [
      {
        "label": "PUFA",
        "value": "48% - 74% Linoleic"
      },
      {
        "label": "MUFA",
        "value": "14% - 40% Oleic"
      },
      {
        "label": "Saturated Fats",
        "value": "10% - 15%"
      },
      {
        "label": "HS Code",
        "value": "15121910"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "24 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "Flexitank / Jerry Cans"
      }
    ],
    "importers": "Europe, Middle East, Africa",
    "moq": "1 FCL (20ft)",
    "load": "24 MT in 20ft",
    "packing": "Flexitank / Jerry Cans",
    "hsCode": "15121910",
    "image": "/images/SunflowerOil.png",
    "fallbackImage": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
    "profilePage": 8
  },
  {
    "id": "P-16",
    "numId": 16,
    "name": "Soyabean Oil",
    "title": "Soyabean Oil",
    "category": "Edible Oils",
    "badgeCategory": "EDIBLE OILS",
    "bullets": [
      "Extracted from seeds containing 18%-24% oil, yielding a high concentration of unsaturated fats.",
      "Rich in Linoleic Acid (51%-58%) and Oleic Acid (17%-30%)."
    ],
    "description": "• Extracted from seeds containing 18%-24% oil, yielding a high concentration of unsaturated fats.\n• Rich in Linoleic Acid (51%-58%) and Oleic Acid (17%-30%).",
    "specs": [
      {
        "label": "Linoleic Acid",
        "value": "51% - 58%"
      },
      {
        "label": "Oleic Acid",
        "value": "17% - 30%"
      },
      {
        "label": "Palmitic Acid",
        "value": "9% - 13%"
      },
      {
        "label": "HS Code",
        "value": "15079010"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "24 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "Flexitank / Drums"
      }
    ],
    "importers": "China, India, Middle East",
    "moq": "1 FCL (20ft)",
    "load": "24 MT in 20ft",
    "packing": "Flexitank / Drums",
    "hsCode": "15079010",
    "image": "/images/SoyabeanOil.png",
    "fallbackImage": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    "profilePage": 8
  },
  {
    "id": "P-17",
    "numId": 17,
    "name": "Ground Nut Oil",
    "title": "Ground Nut Oil",
    "category": "Edible Oils",
    "badgeCategory": "EDIBLE OILS",
    "bullets": [
      "Extracted from kernels that consist of 46% to 51% oil and roughly 26% proteins.",
      "1 kg of raw groundnut kernels typically produces 0.4 to 0.45 liters of oil."
    ],
    "description": "• Extracted from kernels that consist of 46% to 51% oil and roughly 26% proteins.\n• 1 kg of raw groundnut kernels typically produces 0.4 to 0.45 liters of oil.",
    "specs": [
      {
        "label": "Kernel Oil",
        "value": "46% - 51%"
      },
      {
        "label": "Kernel Protein",
        "value": "~26%"
      },
      {
        "label": "Yield",
        "value": "400 - 450g / kg"
      },
      {
        "label": "HS Code",
        "value": "15089091"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "24 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "Flexitank / 15L Tins"
      }
    ],
    "importers": "Europe, North America",
    "moq": "1 FCL (20ft)",
    "load": "24 MT in 20ft",
    "packing": "Flexitank / 15L Tins",
    "hsCode": "15089091",
    "image": "/images/GroundNutOil.png",
    "fallbackImage": "https://images.unsplash.com/photo-1599909618055-6d0f62b212f4?auto=format&fit=crop&q=80&w=800",
    "profilePage": 8
  },
  {
    "id": "P-18",
    "numId": 18,
    "name": "Cashew Nuts",
    "title": "Cashew Nuts",
    "category": "Dry Fruits",
    "badgeCategory": "DRY FRUITS",
    "bullets": [
      "Nutrient-dense nuts packed with heart-healthy unsaturated fats and plant-based protein.",
      "Rich in essential minerals like copper, magnesium, zinc, and iron."
    ],
    "description": "• Nutrient-dense nuts packed with heart-healthy unsaturated fats and plant-based protein.\n• Rich in essential minerals like copper, magnesium, zinc, and iron.",
    "specs": [
      {
        "label": "Calories",
        "value": "163 / oz"
      },
      {
        "label": "Protein",
        "value": "4.3g / oz"
      },
      {
        "label": "Total Fat",
        "value": "13.2g / oz"
      },
      {
        "label": "HS Code",
        "value": "08013220"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "15 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "22.68kg Vacuum Tins"
      }
    ],
    "importers": "USA, Europe, Middle East",
    "moq": "1 FCL (20ft)",
    "load": "15 MT in 20ft",
    "packing": "22.68kg Vacuum Tins",
    "hsCode": "08013220",
    "image": "/images/CashewNuts.png",
    "fallbackImage": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
    "profilePage": 9
  },
  {
    "id": "P-19",
    "numId": 19,
    "name": "Saffron",
    "title": "Saffron",
    "category": "Dry Fruits",
    "badgeCategory": "DRY FRUITS",
    "bullets": [
      "Composed of over 150 compounds, with vital phytochemicals: crocin, picrocrocin, and safranal.",
      "Dried threads contain roughly 65% carbohydrates, 11% protein, and 6% fat."
    ],
    "description": "• Composed of over 150 compounds, with vital phytochemicals: crocin, picrocrocin, and safranal.\n• Dried threads contain roughly 65% carbohydrates, 11% protein, and 6% fat.",
    "specs": [
      {
        "label": "Carbohydrates",
        "value": "~65%"
      },
      {
        "label": "Protein",
        "value": "~11%"
      },
      {
        "label": "Fat",
        "value": "~6%"
      },
      {
        "label": "HS Code",
        "value": "09102010"
      },
      {
        "label": "MOQ",
        "value": "50 KG"
      },
      {
        "label": "Load",
        "value": "Air Cargo"
      },
      {
        "label": "Packing",
        "value": "1g, 5g, 100g Tins"
      }
    ],
    "importers": "Middle East, Europe, USA",
    "moq": "50 KG",
    "load": "Air Cargo",
    "packing": "1g, 5g, 100g Tins",
    "hsCode": "09102010",
    "image": "/images/Saffron.png",
    "fallbackImage": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    "profilePage": 9
  },
  {
    "id": "P-20",
    "numId": 20,
    "name": "Almonds",
    "title": "Almonds",
    "category": "Dry Fruits",
    "badgeCategory": "DRY FRUITS",
    "bullets": [
      "Nutrient-dense edible seeds packed with plant-based protein, dietary fiber, and healthy fats.",
      "Exceptionally rich in vitamin E (7.3mg/oz) and magnesium (76.7mg/oz)."
    ],
    "description": "• Nutrient-dense edible seeds packed with plant-based protein, dietary fiber, and healthy fats.\n• Exceptionally rich in vitamin E (7.3mg/oz) and magnesium (76.7mg/oz).",
    "specs": [
      {
        "label": "Calories",
        "value": "164 / oz"
      },
      {
        "label": "Protein",
        "value": "6.0g / oz"
      },
      {
        "label": "Total Fat",
        "value": "14.2g / oz"
      },
      {
        "label": "HS Code",
        "value": "08021200"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "18 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "25kg Cartons"
      }
    ],
    "importers": "Europe, Middle East, Asia",
    "moq": "1 FCL (20ft)",
    "load": "18 MT in 20ft",
    "packing": "25kg Cartons",
    "hsCode": "08021200",
    "image": "/images/Almonds.png",
    "fallbackImage": "https://images.unsplash.com/photo-1599909618055-6d0f62b212f4?auto=format&fit=crop&q=80&w=800",
    "profilePage": 9
  },
  {
    "id": "P-21",
    "numId": 21,
    "name": "Tea",
    "title": "Tea",
    "category": "Beverages",
    "badgeCategory": "TEA & COFFEE",
    "bullets": [
      "True teas (Black, Green) from Camellia sinensis contain caffeine, amino acids, and flavonoids.",
      "Herbal teas are caffeine-free infusions made from botanicals, dried fruits, or herbs."
    ],
    "description": "• True teas (Black, Green) from Camellia sinensis contain caffeine, amino acids, and flavonoids.\n• Herbal teas are caffeine-free infusions made from botanicals, dried fruits, or herbs.",
    "specs": [
      {
        "label": "True Teas",
        "value": "Black, Green"
      },
      {
        "label": "Masala Chai",
        "value": "Spiced Blend"
      },
      {
        "label": "Herbal",
        "value": "Caffeine-Free"
      },
      {
        "label": "HS Code",
        "value": "09024020"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "10 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "Paper Sacks / Cartons"
      }
    ],
    "importers": "UK, USA, Middle East, Russia",
    "moq": "1 FCL (20ft)",
    "load": "10 MT in 20ft",
    "packing": "Paper Sacks / Cartons",
    "hsCode": "09024020",
    "image": "/images/Tea.png",
    "fallbackImage": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
    "profilePage": 10
  },
  {
    "id": "P-22",
    "numId": 22,
    "name": "Coffee",
    "title": "Coffee",
    "category": "Beverages",
    "badgeCategory": "TEA & COFFEE",
    "bullets": [
      "Brewed beverage from roasted beans, containing caffeine, tannins, carbohydrates, and proteins.",
      "A standard 8-oz brewed cup contains about 95 - 100 mg of caffeine."
    ],
    "description": "• Brewed beverage from roasted beans, containing caffeine, tannins, carbohydrates, and proteins.\n• A standard 8-oz brewed cup contains about 95 - 100 mg of caffeine.",
    "specs": [
      {
        "label": "Brewed",
        "value": "~80-100 mg"
      },
      {
        "label": "Espresso",
        "value": "~63 mg / shot"
      },
      {
        "label": "Cold Brew",
        "value": "~153-238 mg"
      },
      {
        "label": "HS Code",
        "value": "09011190"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "19 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "60kg Jute Bags"
      }
    ],
    "importers": "Europe, USA, Japan",
    "moq": "1 FCL (20ft)",
    "load": "19 MT in 20ft",
    "packing": "60kg Jute Bags",
    "hsCode": "09011190",
    "image": "/images/Coffee.png",
    "fallbackImage": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    "profilePage": 10
  },
  {
    "id": "P-23",
    "numId": 23,
    "name": "Coco",
    "title": "Coco",
    "category": "Beverages",
    "badgeCategory": "TEA & COFFEE",
    "bullets": [
      "Unsweetened cocoa powder is a nutrient-dense ingredient, rich in antioxidants, iron, and magnesium.",
      "1-tablespoon (5g) provides ~10 calories and 3g of carbohydrates (2g fiber)."
    ],
    "description": "• Unsweetened cocoa powder is a nutrient-dense ingredient, rich in antioxidants, iron, and magnesium.\n• 1-tablespoon (5g) provides ~10 calories and 3g of carbohydrates (2g fiber).",
    "specs": [
      {
        "label": "Calories",
        "value": "10 / tbsp"
      },
      {
        "label": "Carbohydrates",
        "value": "3g / tbsp"
      },
      {
        "label": "Fat",
        "value": "0.5g / tbsp"
      },
      {
        "label": "HS Code",
        "value": "18050000"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "15 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "25kg Multi-wall Paper"
      }
    ],
    "importers": "Europe, USA, Asia",
    "moq": "1 FCL (20ft)",
    "load": "15 MT in 20ft",
    "packing": "25kg Multi-wall Paper",
    "hsCode": "18050000",
    "image": "/images/Coco.png",
    "fallbackImage": "https://images.unsplash.com/photo-1599909618055-6d0f62b212f4?auto=format&fit=crop&q=80&w=800",
    "profilePage": 10
  },
  {
    "id": "P-24",
    "numId": 24,
    "name": "Dehydrated Onion Powder",
    "title": "Dehydrated Onion Powder",
    "category": "Dehydrated",
    "badgeCategory": "FOOD INGREDIENTS",
    "bullets": [
      "Highly concentrated flavor without fresh water weight, providing 342 kcal and 10g protein per 100g.",
      "Retains essential minerals and maintains a low moisture content of 4% to 6%."
    ],
    "description": "• Highly concentrated flavor without fresh water weight, providing 342 kcal and 10g protein per 100g.\n• Retains essential minerals and maintains a low moisture content of 4% to 6%.",
    "specs": [
      {
        "label": "Moisture",
        "value": "4% - 6%"
      },
      {
        "label": "Volatile Oils",
        "value": "≥ 0.25%"
      },
      {
        "label": "Ash Content",
        "value": "≤ 4% - 7%"
      },
      {
        "label": "HS Code",
        "value": "07122000"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "14 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "20kg Cartons / Polybag"
      }
    ],
    "importers": "Europe, USA, Middle East",
    "moq": "1 FCL (20ft)",
    "load": "14 MT in 20ft",
    "packing": "20kg Cartons / Polybag",
    "hsCode": "07122000",
    "image": "/images/DehydratedOnion.png",
    "fallbackImage": "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=800",
    "profilePage": 11
  },
  {
    "id": "P-25",
    "numId": 25,
    "name": "Dehydrated Garlic Powder",
    "title": "Dehydrated Garlic Powder",
    "category": "Dehydrated",
    "badgeCategory": "FOOD INGREDIENTS",
    "bullets": [
      "Made by drying and grinding fresh garlic cloves, containing zero fat and <5% moisture.",
      "Delivers essential nutrients like calcium, iron, and potassium while remaining shelf-stable."
    ],
    "description": "• Made by drying and grinding fresh garlic cloves, containing zero fat and <5% moisture.\n• Delivers essential nutrients like calcium, iron, and potassium while remaining shelf-stable.",
    "specs": [
      {
        "label": "Moisture",
        "value": "≤ 5% - 6%"
      },
      {
        "label": "Volatile Oil",
        "value": "≥ 0.3%"
      },
      {
        "label": "Calories",
        "value": "331 kcal"
      },
      {
        "label": "HS Code",
        "value": "07129020"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "14 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "20kg Cartons / Polybag"
      }
    ],
    "importers": "USA, Europe, Asia",
    "moq": "1 FCL (20ft)",
    "load": "14 MT in 20ft",
    "packing": "20kg Cartons / Polybag",
    "hsCode": "07129020",
    "image": "/images/DehydratedGarlic.png",
    "fallbackImage": "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=800",
    "profilePage": 11
  },
  {
    "id": "P-26",
    "numId": 26,
    "name": "Dehydrated Ginger Powder",
    "title": "Dehydrated Ginger Powder",
    "category": "Dehydrated",
    "badgeCategory": "FOOD INGREDIENTS",
    "bullets": [
      "Concentrated spice with 6% to 10% moisture, yielding 1.5% to 7% pungent gingerol.",
      "Breakdown per 100g includes ~70-72% carbs, ~12-14% dietary fiber, and ~6-9% protein."
    ],
    "description": "• Concentrated spice with 6% to 10% moisture, yielding 1.5% to 7% pungent gingerol.\n• Breakdown per 100g includes ~70-72% carbs, ~12-14% dietary fiber, and ~6-9% protein.",
    "specs": [
      {
        "label": "Carbohydrates",
        "value": "~70% - 72%"
      },
      {
        "label": "Dietary Fiber",
        "value": "~12% - 14%"
      },
      {
        "label": "Protein",
        "value": "~6% - 9%"
      },
      {
        "label": "HS Code",
        "value": "09101110"
      },
      {
        "label": "MOQ",
        "value": "1 FCL (20ft)"
      },
      {
        "label": "Load (20ft)",
        "value": "14 MT in 20ft"
      },
      {
        "label": "Packing",
        "value": "25kg Cartons / Polybag"
      }
    ],
    "importers": "Middle East, Europe, USA",
    "moq": "1 FCL (20ft)",
    "load": "14 MT in 20ft",
    "packing": "25kg Cartons / Polybag",
    "hsCode": "09101110",
    "image": "/images/DehydratedGinger.png",
    "fallbackImage": "https://images.unsplash.com/photo-1599909618055-6d0f62b212f4?auto=format&fit=crop&q=80&w=800",
    "profilePage": 11
  }

];

export const CATALOG_PRODUCTS = EXPORT_CATALOG;

const CATEGORIES = [
  'All Commodities',
  'Spices',
  'Rice',
  'Oil Seeds',
  'Edible Oils',
  'Dry Fruits',
  'Tea & Coffee',
  'Food Ingredients'
];

const ProductsPage = ({ addToCart: propAddToCart, setActivePage }) => {
  const cartContext = useCart ? useCart() : null;
  const addToCart = propAddToCart || cartContext?.addToCart;
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [activeCategory, setActiveCategory] = useState('All Commodities');
  const [searchQuery, setSearchQuery] = useState('');
  const [addedItems, setAddedItems] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pdfDrawerOpen, setPdfDrawerOpen] = useState(false);
  const [activePdfPage, setActivePdfPage] = useState(1);

  // Sync search query from URL parameter if navigated from another page
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('search');
    if (q) {
      setSearchQuery(q);
      const el = document.getElementById('catalog-products-section');
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 150);
      }
    }
  }, []);

  const filteredProducts = EXPORT_CATALOG.filter((item) => {
    const matchesCategory =
      activeCategory === 'All Commodities' ||
      item.category.toLowerCase() === activeCategory.toLowerCase() ||
      (activeCategory === 'Rice' && item.category === 'Agriculture');

    const matchesSearch =
      (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.category && item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.hsCode && item.hsCode.includes(searchQuery)) ||
      (item.importers && item.importers.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleGetQuote = (product) => {
    try {
      localStorage.setItem('an_quote_product', JSON.stringify({
        id: product.id,
        name: product.title || product.name,
        spec: product.spec,
        moq: product.moq,
        category: product.category,
        hsCode: product.hsCode
      }));
    } catch (e) {
      console.error(e);
    }

    if (typeof setActivePage === 'function') {
      setActivePage('contact');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/contact';
    }
  };

  const handleAddToRFQ = (product) => {
    if (addToCart) {
      addToCart(product);
    }
    setAddedItems((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const openPdfViewer = (pageNumber = 1) => {
    setActivePdfPage(pageNumber);
    setPdfDrawerOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black font-sans transition-colors duration-300">
      
      {/* 1. HERO SECTION (Single Image - No Carousel) */}
      <div className="relative w-full min-h-[500px] lg:min-h-[560px] flex items-center font-sans overflow-hidden bg-slate-950">
        {/* The Single Hero Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1586528116311-ad8ed7c83a7f?q=80&w=2000" 
            alt="Anjaney Nexus Agro Commodity Export" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        {/* Brand Dark Navy Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/95 via-blue-950/85 to-slate-950/75"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-black/30 pointer-events-none"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none"></div>

        {/* Hero Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-20">
          <div className="max-w-3xl">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-serif text-amber-300 leading-[1.15] mb-4 tracking-tight drop-shadow-[0_2px_12px_rgba(252,211,77,0.25)]">
              India's Global Pantry
            </h1>

            {/* Subheading / Tagline */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-200 font-sans font-normal not-italic max-w-2xl leading-relaxed">
              Submit your product, quantity, specification and destination inquiry, our export team will review your complete trade enquiry during published business hours.
            </p>
          </div>
        </div>
      </div>

      {/* 2. PRODUCT GRID SECTION */}
      <div id="catalog-products-section" className="max-w-7xl mx-auto px-6 sm:px-8 pt-16 sm:pt-20 pb-24">
        
        {/* Section Header & Search / Filters */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-[10px] font-black text-orange-500 dark:text-orange-400 uppercase tracking-[0.2em] mb-3 block">
              Our Products
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-blue-950 dark:text-white tracking-tight leading-[1.1]">
              Comprehensive Trade Solutions <br className="hidden md:block" />
              <span className="text-slate-400 dark:text-slate-600">for Global Business</span>
            </h2>
          </div>

          {/* Quick Search & Burger Button */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative min-w-[260px]">
              <input
                type="text"
                placeholder="Search products, HS code, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-3 pl-4 pr-10 text-xs font-bold rounded-xl border bg-white dark:bg-[#0a0a0a] border-slate-200 dark:border-slate-800 text-blue-950 dark:text-white placeholder:text-slate-400 outline-none focus:border-orange-500 shadow-sm"
              />
              {searchQuery ? (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-xs font-bold text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              ) : (
                <svg className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              )}
            </div>

            <button
              onClick={() => openPdfViewer(1)}
              className="px-4 py-3 bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-slate-800 hover:border-orange-500 text-blue-950 dark:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer shrink-0"
              title="Open entire 12-page company profile description"
            >
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <span>Brochure Menu</span>
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-950 dark:bg-blue-500 text-white dark:text-black shadow-md scale-105'
                    : 'bg-white dark:bg-[#0a0a0a] text-slate-500 dark:text-slate-400 hover:text-blue-950 dark:hover:text-white border border-slate-200 dark:border-slate-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white dark:bg-[#0a0a0a] rounded-2xl border border-dashed border-slate-200 dark:border-slate-800">
            <p className="text-base font-bold text-slate-400">No commodities match your query.</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All Commodities'); }}
              className="mt-4 px-6 py-2.5 bg-orange-500 text-white text-xs font-black uppercase tracking-wider rounded-xl cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className="bg-white dark:bg-[#0a0a0a] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:border-orange-500 dark:hover:border-orange-400 transition-all duration-300 flex flex-col group"
              >
                
                {/* Product Image with Category Pill & Menu Burger for Entire Description */}
                <div className="h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
                  <img 
                    src={product.image} 
                    alt={product.title || product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    onError={(e) => {
                      if (product.fallbackImage && e.target.src !== product.fallbackImage) {
                        e.target.src = product.fallbackImage;
                      } else {
                        e.target.onerror = null;
                        e.target.src = `https://placehold.co/800x600/f8fafc/0f172a?text=${encodeURIComponent(product.title || product.name)}`;
                      }
                    }}
                  />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-blue-950 dark:text-blue-400 border border-white/20">
                    {product.badgeCategory || product.category}
                  </div>

                  {/* Top-Right Menu Burger Button to check entire product description */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openPdfViewer(product.profilePage || 1);
                      }}
                      className="p-1.5 rounded-lg bg-black/80 hover:bg-orange-500 text-white backdrop-blur-sm border border-white/20 transition-all shadow-md group cursor-pointer"
                      title="Check Entire PDF Description"
                    >
                      <svg className="w-4 h-4 text-orange-400 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                      </svg>
                    </button>
                    {product.moq && (
                      <span className="bg-orange-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg uppercase tracking-wider shadow-sm">
                        MOQ: {product.moq}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  
                  {/* Title */}
                  <h3 className="text-2xl font-black text-blue-950 dark:text-white leading-tight mb-4">
                    {product.title || product.name}
                  </h3>
                  
                  {/* Bulleted Description */}
                  <div className="text-[13px] sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-6 space-y-2">
                    {product.bullets && product.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="mr-2 font-bold text-slate-400">•</span>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  {/* EXACT SPECIFICATIONS TABLE LAYOUT FROM IMAGE */}
                  <div className="flex flex-col border border-slate-200 dark:border-slate-700 mb-6 rounded-md bg-white dark:bg-[#0a0a0a]">
                    {product.specs && product.specs.map((spec, idx) => (
                      <div key={idx} className="flex text-[13px] sm:text-sm border-b last:border-b-0 border-slate-200 dark:border-slate-700">
                        {/* Left Label Column: White bg, dark teal/blue text */}
                        <div className="w-1/2 p-2.5 sm:p-3 border-r border-slate-200 dark:border-slate-700 text-blue-950 dark:text-slate-300 font-bold flex items-center">
                          {spec.label}
                        </div>
                        {/* Right Value Column: White bg, dark grey text, leaves blank via nbsp if no value provided */}
                        <div className="w-1/2 p-2.5 sm:p-3 text-right text-slate-800 dark:text-white font-bold flex items-center justify-end">
                          {spec.value || "\u00A0"}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Expand Indicator */}
                  <div className="flex justify-center mb-6 mt-auto pt-2">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="w-6 h-6 rounded-full bg-slate-50 dark:bg-slate-900 hover:bg-orange-500 hover:text-white flex items-center justify-center text-slate-300 dark:text-slate-700 transition-colors cursor-pointer"
                      title="Expand full technical specifications"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                    <button 
                      onClick={() => setSelectedProduct(product)}
                      className="flex-grow bg-blue-950 hover:bg-orange-500 dark:bg-blue-500/20 dark:text-blue-400 dark:border dark:border-blue-500/30 dark:hover:bg-orange-400 dark:hover:text-black dark:hover:border-orange-400 text-white text-[10px] sm:text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-all shadow-sm cursor-pointer"
                    >
                      View Details
                    </button>
                    
                    <button 
                      onClick={() => handleGetQuote(product)}
                      className="flex-grow bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-blue-950 dark:text-slate-300 text-[10px] sm:text-xs font-black uppercase tracking-widest py-3.5 rounded-xl transition-colors border border-transparent dark:border-slate-800 cursor-pointer"
                    >
                      Get Quote
                    </button>
                    
                    {/* RFQ / Cart Box Button */}
                    <button 
                      onClick={() => handleAddToRFQ(product)}
                      className={`w-12 sm:w-14 flex items-center justify-center border rounded-xl transition-colors shrink-0 shadow-sm cursor-pointer ${
                        addedItems[product.id]
                          ? 'bg-emerald-500 border-emerald-500 text-white'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0a0a] hover:bg-slate-50 dark:hover:bg-slate-900 text-slate-400 hover:text-orange-500 dark:hover:text-orange-400'
                      }`}
                      title={addedItems[product.id] ? "Added to RFQ Inquiry List" : "Add to RFQ Inquiry List"}
                    >
                      {addedItems[product.id] ? (
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* 4. MODAL: FULL TECHNICAL SPECIFICATIONS MODAL */}
      {selectedProduct && (() => {
        const baseKey = selectedProduct.id.split('-').slice(0, 2).join('-');
        const profile = PRODUCT_PROFILE_DETAILS[selectedProduct.id] || PRODUCT_PROFILE_DETAILS[baseKey] || {};
        return (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto"
            onClick={() => setSelectedProduct(null)}
          >
            <div
              className={`relative w-full max-w-4xl my-auto rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 max-h-[92vh] flex flex-col ${
                isDark
                  ? 'bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-slate-800 text-slate-100 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)]'
                  : 'bg-white border-slate-200 text-slate-900 shadow-2xl'
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`p-5 sm:p-6 border-b flex items-start justify-between gap-4 sticky top-0 z-20 backdrop-blur-md ${
                isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/95 border-slate-200'
              }`}>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-md bg-orange-500 text-white">
                      {profile.categoryHeader || selectedProduct.badgeCategory || selectedProduct.category}
                    </span>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md border ${
                      isDark ? 'bg-slate-800/80 text-slate-300 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200'
                    }`}>
                      Official Export Documentation
                    </span>
                    {selectedProduct.hsCode && (
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        isDark ? 'bg-slate-800 text-orange-400' : 'bg-slate-100 text-orange-600'
                      }`}>
                        HS: {selectedProduct.hsCode}
                      </span>
                    )}
                    {selectedProduct.moq && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        isDark ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        MOQ: {selectedProduct.moq}
                      </span>
                    )}
                  </div>
                  <h2 className={`text-2xl sm:text-3xl font-black tracking-tight ${isDark ? 'text-white' : 'text-slate-950'}`}>
                    {selectedProduct.title || selectedProduct.name}
                  </h2>
                  {profile.subHeader && (
                    <p className="text-xs sm:text-sm font-semibold text-orange-500 dark:text-orange-400">
                      {profile.subHeader}
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* View Original PDF Page Button */}
                  <button
                    onClick={() => {
                      const page = selectedProduct.profilePage || 1;
                      setSelectedProduct(null);
                      openPdfViewer(page);
                    }}
                    className={`p-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                      isDark ? 'bg-slate-800 hover:bg-slate-700 text-orange-400 border-slate-700' : 'bg-orange-50 hover:bg-orange-100 text-orange-600 border-orange-200'
                    }`}
                    title="View Original Profile PDF Page"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span className="hidden sm:inline">View PDF Page</span>
                  </button>

                  <button
                    onClick={() => setSelectedProduct(null)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer shrink-0 ${
                      isDark ? 'bg-slate-800 hover:bg-slate-750 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    }`}
                    aria-label="Close details"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Scrollable Content */}
              <div className="p-5 sm:p-8 overflow-y-auto space-y-6 text-sm">
                
                {/* Product Overview Top Box */}
                <div className={`p-4 sm:p-6 rounded-2xl border flex flex-col sm:flex-row items-center gap-6 ${
                  isDark ? 'bg-slate-950/60 border-slate-800/80' : 'bg-orange-50/30 border-orange-100'
                }`}>
                  <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-2xl p-2 flex items-center justify-center shrink-0 border overflow-hidden ${
                    isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.title || selectedProduct.name}
                      className="max-h-full max-w-full object-cover rounded-xl"
                      onError={(e) => {
                        if (selectedProduct.fallbackImage) {
                          e.target.src = selectedProduct.fallbackImage;
                        }
                      }}
                    />
                  </div>
                  <div className="space-y-3 flex-1 text-center sm:text-left">
                    <div className="text-xs font-bold uppercase tracking-wider text-orange-500">
                      Product Overview &amp; Specifications (Official Profile)
                    </div>
                    <p className={`text-sm sm:text-base leading-relaxed font-medium whitespace-pre-line ${
                      isDark ? 'text-slate-300' : 'text-slate-700'
                    }`}>
                      {profile.overview || selectedProduct.description || selectedProduct.sellingPoint}
                    </p>
                    {selectedProduct.importers && (
                      <p className={`text-xs font-medium ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        <strong>Key Export Destinations:</strong> {selectedProduct.importers}
                      </p>
                    )}
                  </div>
                </div>

                {/* Grading & Classifications if present */}
                {profile.grades && profile.grades.length > 0 && (
                  <div className="space-y-3">
                    <h4 className={`text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-blue-950'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      Grading &amp; Classifications
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {profile.grades.map((g, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border flex flex-col justify-between ${
                            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold text-orange-500 block mb-1">
                              {g.grade}
                            </span>
                            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                              {g.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Breakdown Items (Composition / Nutritional / Bioactives) */}
                {profile.breakdownItems && profile.breakdownItems.length > 0 && (
                  <div className="space-y-3">
                    <h4 className={`text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-blue-950'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      {profile.breakdownTitle || 'Chemical Composition & Bioactives'}
                    </h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                      {profile.breakdownItems.map((item, idx) => (
                        <div
                          key={idx}
                          className={`p-3 rounded-xl border text-center ${
                            isDark ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <div className="text-[11px] font-semibold text-slate-400 mb-0.5">
                            {item.label}
                          </div>
                          <div className={`text-sm sm:text-base font-black ${isDark ? 'text-white' : 'text-slate-900'}`}>
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Highlights / Active Compounds / Applications */}
                {profile.highlights && profile.highlights.length > 0 && (
                  <div className="space-y-3">
                    <h4 className={`text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-blue-950'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      Key Highlights &amp; Compounds
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {profile.highlights.map((h, idx) => (
                        <div
                          key={idx}
                          className={`p-4 rounded-xl border ${
                            isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                          }`}
                        >
                          <h5 className="text-xs font-bold text-orange-500 mb-1">{h.title}</h5>
                          <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                            {h.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Technical Specifications Table */}
                {(profile.technicalSpecs || selectedProduct.specs) && (
                  <div className="space-y-3">
                    <h4 className={`text-xs sm:text-sm font-black uppercase tracking-wider flex items-center gap-2 ${
                      isDark ? 'text-white' : 'text-blue-950'
                    }`}>
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                      Technical &amp; Quality Parameters
                    </h4>
                    <div className={`rounded-2xl border overflow-hidden ${
                      isDark ? 'border-slate-800 bg-slate-950/60' : 'border-slate-200 bg-white'
                    }`}>
                      <table className="w-full text-left text-xs border-collapse">
                        <tbody>
                          {profile.technicalSpecs ? (
                            profile.technicalSpecs.map((spec, idx) => (
                              <tr
                                key={idx}
                                className={`border-b last:border-0 ${
                                  isDark ? 'border-slate-800/80 hover:bg-slate-900/50' : 'border-slate-100 hover:bg-slate-50/80'
                                }`}
                              >
                                <td className="p-3 sm:p-3.5 font-bold text-orange-500 dark:text-orange-400 w-1/3">
                                  {spec.key}
                                </td>
                                <td className={`p-3 sm:p-3.5 font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                  {spec.value || "\u00A0"}
                                </td>
                              </tr>
                            ))
                          ) : (
                            selectedProduct.specs.map((spec, idx) => (
                              <tr
                                key={idx}
                                className={`border-b last:border-0 ${
                                  isDark ? 'border-slate-800/80 hover:bg-slate-900/50' : 'border-slate-100 hover:bg-slate-50/80'
                                }`}
                              >
                                <td className="p-3 sm:p-3.5 font-bold text-orange-500 dark:text-orange-400 w-1/3">
                                  {spec.label}
                                </td>
                                <td className={`p-3 sm:p-3.5 font-medium ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>
                                  {spec.value}
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Company Footer Note */}
                <div className={`p-4 rounded-xl border text-xs flex flex-col sm:flex-row items-center justify-between gap-3 ${
                  isDark ? 'bg-slate-900/60 border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
                }`}>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-500">Anjaney Nexus India LLP</span>
                    <span>• Certified Export Documentation (APEDA, Spices Board, FSSAI)</span>
                  </div>
                  <div className="text-[11px] font-mono">
                    Ahmedabad, Gujarat, India
                  </div>
                </div>

              </div>

              {/* Modal Action Footer */}
              <div className={`p-4 sm:p-5 border-t flex flex-col sm:flex-row items-center justify-between gap-3 sticky bottom-0 z-20 backdrop-blur-md ${
                isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
              }`}>
                <div className="text-xs text-slate-400 hidden sm:block">
                  Need private labelling, custom packaging, or SGS inspection?
                </div>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className={`flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer border ${
                      isDark ? 'border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700' : 'border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const prod = selectedProduct;
                      setSelectedProduct(null);
                      handleGetQuote(prod);
                    }}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/25"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Request Export Quote</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* 5. MODAL: FULL PRODUCT DESCRIPTION DRAWER / MENU (PDF BROCHURE VIEWER) */}
      {pdfDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setPdfDrawerOpen(false)}
        >
          <div 
            className={`relative w-full max-w-5xl h-[94vh] rounded-3xl border shadow-2xl overflow-hidden flex flex-col ${
              isDark ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header with Title & Controls */}
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md ${
              isDark ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black tracking-tight">
                    Official Product Profile &amp; Description Brochure
                  </h3>
                  <p className="text-xs text-orange-500 font-semibold">
                    Page {activePdfPage} of {PROFILE_PDF_PAGES.length}: {PROFILE_PDF_PAGES[activePdfPage - 1]?.title}
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setPdfDrawerOpen(false)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isDark ? 'bg-slate-800 hover:bg-slate-700 text-slate-300' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
                aria-label="Close Brochure Viewer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Quick Page Navigator Tabs */}
            <div className={`px-4 py-2.5 border-b overflow-x-auto flex items-center gap-2 scrollbar-none shrink-0 ${
              isDark ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              {PROFILE_PDF_PAGES.map((pg) => (
                <button
                  key={pg.page}
                  onClick={() => setActivePdfPage(pg.page)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activePdfPage === pg.page
                      ? 'bg-orange-500 text-white shadow-sm font-bold'
                      : isDark
                        ? 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        : 'bg-white text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  Pg {pg.page}: {pg.title.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Document Image Viewer Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex items-center justify-center bg-slate-950/40">
              <div className="max-w-3xl w-full flex flex-col items-center">
                <img
                  src={PROFILE_PDF_PAGES[activePdfPage - 1]?.image}
                  alt={PROFILE_PDF_PAGES[activePdfPage - 1]?.title}
                  className="w-full h-auto rounded-2xl shadow-2xl border border-slate-700/60 object-contain max-h-[68vh]"
                />
              </div>
            </div>

            {/* Viewer Navigation Footer */}
            <div className={`p-3 sm:p-4 border-t flex items-center justify-between gap-4 sticky bottom-0 z-20 ${
              isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <button
                disabled={activePdfPage <= 1}
                onClick={() => setActivePdfPage((prev) => Math.max(1, prev - 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold border transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
              >
                ← Previous Page
              </button>

              <div className="text-xs font-medium text-slate-400">
                Jump to specific products or commodities above
              </div>

              <button
                disabled={activePdfPage >= PROFILE_PDF_PAGES.length}
                onClick={() => setActivePdfPage((prev) => Math.min(PROFILE_PDF_PAGES.length, prev + 1))}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer shadow-sm"
              >
                Next Page →
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default ProductsPage;
