const dummyListings = [
  {
    title: "Vintage Leather Journal",
    description: "A beautifully crafted genuine leather journal with unlined pages, perfect for sketching or writing. Features a wrap-around tie closure.",
    start_price: "25.00",
    reserve_price: "40.00"
  },
  {
    title: "Antique Silver Teaspoon Set (6)",
    description: "Elegant set of six sterling silver teaspoons, intricately engraved. A timeless addition to any collection, ideal for tea enthusiasts.",
    start_price: "80.00",
    reserve_price: "120.00"
  },
  {
    title: "Handmade Ceramic Mug - Ocean Blue",
    description: "Unique artisan ceramic mug with a vibrant ocean blue glaze. Ergonomic handle and generous capacity, great for coffee or tea.",
    start_price: "18.50",
    reserve_price: "25.00"
  },
  {
    title: "Rare First Edition Sci-Fi Novel",
    description: "Collectors' item: First edition of 'The Martian Chronicles' by Ray Bradbury. Hardcover with original dust jacket, in very good condition.",
    start_price: "300.00",
    reserve_price: "500.00"
  },
  {
    title: "Classic Board Game: 'The Settlers of Catan'",
    description: "Complete set of the iconic strategy board game. All pieces accounted for, box in good condition. Fun for family and friends!",
    start_price: "35.00",
    reserve_price: "50.00"
  },
  {
    title: "Organic Cotton Baby Blanket - Grey Elephant",
    description: "Soft and breathable organic cotton blanket for babies. Adorable grey elephant pattern, perfect for nursery decor or a gentle swaddle.",
    start_price: "29.99",
    reserve_price: "45.00"
  },
  {
    title: "Vintage Polaroid Camera (Working)",
    description: "Fully functional vintage Polaroid OneStep camera. A retro classic, ideal for instant photography enthusiasts. Film not included.",
    start_price: "75.00",
    reserve_price: "110.00"
  },
  {
    title: "Artisan Leather Wallet - Slim Design",
    description: "Hand-stitched full-grain leather wallet with a minimalist, slim design. Features multiple card slots and a cash compartment. Ages beautifully.",
    start_price: "45.00",
    reserve_price: "70.00"
  },
  {
    title: "Collectible Stamp Set - Historic Figures",
    description: "Limited edition collection of stamps featuring renowned historical figures. Mint condition, ideal for philatelists or history buffs.",
    start_price: "90.00",
    reserve_price: "150.00"
  },
  {
    title: "Portable Bluetooth Speaker - Water Resistant",
    description: "Compact and powerful Bluetooth speaker with clear sound and deep bass. Water-resistant design, perfect for outdoor adventures.",
    start_price: "60.00",
    reserve_price: "90.00"
  },
  {
    title: "Gourmet Coffee Bean Selection (3-pack)",
    description: "Curated selection of three distinct gourmet coffee bean blends from around the world. Freshly roasted for optimal flavor. 250g each.",
    start_price: "32.00",
    reserve_price: "48.00"
  },
  {
    title: "Beginner's Acoustic Guitar - Natural Finish",
    description: "Full-size acoustic guitar with a natural wood finish. Easy to play, ideal for aspiring musicians. Comes with a soft gig bag.",
    start_price: "150.00",
    reserve_price: "220.00"
  },
  {
    title: "Stainless Steel Insulated Water Bottle (750ml)",
    description: "Durable double-walled stainless steel bottle keeps drinks cold for 24 hours or hot for 12. Leak-proof cap, perfect for daily use.",
    start_price: "20.00",
    reserve_price: "30.00"
  },
  {
    title: "Children's Illustrated Story Book - 'The Little Prince'",
    description: "Beautifully illustrated classic children's book, perfect for bedtime stories. Hardcover edition, suitable for ages 6-10.",
    start_price: "15.00",
    reserve_price: "22.00"
  },
  {
    title: "Compact Travel Backpack - Black",
    description: "Lightweight and durable travel backpack with multiple compartments. Ideal for day trips or as a carry-on. Water-repellent fabric.",
    start_price: "55.00",
    reserve_price: "85.00"
  },
  {
    title: "Set of 4 Plant Pots - Terracotta Style",
    description: "Stylish and sturdy plant pots with a classic terracotta look. Perfect for herbs, succulents, or small flowers. Drainage holes included.",
    start_price: "28.00",
    reserve_price: "40.00"
  },
  {
    title: "Yoga Mat - Eco-Friendly Non-Slip",
    description: "Premium eco-friendly yoga mat providing excellent grip and cushioning. Ideal for all types of yoga and fitness routines. Includes carry strap.",
    start_price: "40.00",
    reserve_price: "60.00"
  },
  {
    title: "Wireless Ergonomic Mouse - Black",
    description: "Comfortable wireless mouse with ergonomic design, reducing wrist strain. Adjustable DPI settings for precision. USB receiver included.",
    start_price: "22.00",
    reserve_price: "35.00"
  },
  {
    title: "Classic Science Fiction Film Collection (Blu-ray)",
    description: "Box set of five iconic sci-fi films on Blu-ray. Remastered editions with bonus features. A must-have for movie buffs.",
    start_price: "49.99",
    reserve_price: "75.00"
  },
  {
    title: "Pet Grooming Brush - Self-Cleaning",
    description: "Efficient grooming brush for cats and dogs, with a self-cleaning button for easy hair removal. Gentle on pet's skin.",
    start_price: "16.00",
    reserve_price: "25.00"
  },
  {
    title: "Digital Art Tablet - Drawing & Sketching",
    description: "Graphics tablet for digital artists, offering high pressure sensitivity and a smooth drawing experience. Compatible with major software.",
    start_price: "180.00",
    reserve_price: "280.00"
  },
  {
    title: "Premium Hand Soap Set (3 bottles)",
    description: "Luxurious set of three natural hand soaps with essential oils. Variety of refreshing scents, gentle on skin. 300ml each.",
    start_price: "24.00",
    reserve_price: "38.00"
  },
  {
    title: "Outdoor Camping Lantern - LED",
    description: "Bright and durable LED camping lantern with multiple light modes. Water-resistant and long-lasting battery life. Ideal for outdoor adventures.",
    start_price: "28.00",
    reserve_price: "42.00"
  },
  {
    title: "Educational Kids Puzzle - World Map",
    description: "Large, colorful world map puzzle designed for children. Helps develop geography skills and fine motor coordination. 100 pieces.",
    start_price: "19.50",
    reserve_price: "30.00"
  },
  {
    title: "Wireless Charging Pad - Fast Charge",
    description: "Sleek and compact wireless charging pad compatible with all Qi-enabled devices. Provides fast and efficient charging.",
    start_price: "27.00",
    reserve_price: "40.00"
  },
  {
    title: "Fitness Resistance Bands Set (5-pack)",
    description: "Versatile set of five resistance bands with varying strengths. Perfect for home workouts, physical therapy, and strength training. Includes carry bag.",
    start_price: "20.00",
    reserve_price: "35.00"
  },
  {
    title: "Vintage Vinyl Record Player",
    description: "Fully restored vintage turntable, perfect for audiophiles. Enjoy your classic vinyl collection with rich, warm sound. Built-in speakers.",
    start_price: "250.00",
    reserve_price: "400.00"
  },
  {
    title: "Aromatherapy Essential Oil Diffuser",
    description: "Ultrasonic essential oil diffuser with soothing LED lights. Creates a calming ambiance and disperses your favorite essential oils. Quiet operation.",
    start_price: "35.00",
    reserve_price: "55.00"
  },
  {
    title: "Portable Espresso Maker - Manual",
    description: "Compact and easy-to-use manual espresso maker. Perfect for coffee lovers on the go, camping, or travel. Rich crema guaranteed.",
    start_price: "50.00",
    reserve_price: "80.00"
  },
  {
    title: "Gardening Tool Set (3-piece)",
    description: "Essential gardening tool set including a trowel, cultivator, and transplanter. Durable stainless steel construction with ergonomic handles. Ideal for small gardens.",
    start_price: "22.50",
    reserve_price: "35.00"
  }
];

module.exports = dummyListings;