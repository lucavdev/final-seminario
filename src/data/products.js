// ============================================================
// products.js – Fuego Sport
// 12 featured products + 300 generated (100 per category)
// ============================================================

// ── Helpers ─────────────────────────────────────────────────
const cy = (arr, i) => arr[i % arr.length];
const rt = (i) => [4.5,4.7,4.3,4.8,4.6,4.4,4.9,4.2,4.7,4.5,4.8,4.3,4.6,4.4,4.9,4.1,4.7,4.8,4.5,4.6][i%20];

// ── Image pools ──────────────────────────────────────────────
const IMG = {
  menShoe: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&q=80',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  ],
  menCloth: [
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
    'https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80',
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
  ],
  womenShoe: [
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80',
    'https://images.unsplash.com/photo-1549298916-f52d724204b4?w=600&q=80',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
  ],
  womenCloth: [
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80',
    'https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80',
    'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
  ],
  kidsShoe: [
    'https://images.unsplash.com/photo-1556906781-9a412961a6bf?w=600&q=80',
    'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&q=80',
    'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80',
  ],
  kidsCloth: [
    'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
    'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    'https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80',
  ],
};

// ── Size pools ───────────────────────────────────────────────
const SZ = {
  menShoe:   ['40','41','42','43','44','45'],
  womenShoe: ['36','37','38','39','40','41'],
  kidsShoe:  ['28','29','30','31','32','33','34','35'],
  adultCl:   ['XS','S','M','L','XL'],
  kidsCl:    ['S','M','L'],
};

// ── Description pools ────────────────────────────────────────
const DESC = {
  menShoe: [
    'Zapatillas de alto rendimiento con tecnología de amortiguación reactiva y upper de malla transpirable ultra liviana para máxima comodidad.',
    'Diseñadas para el corredor exigente: suela de carbono, sistema de cushioning de última generación y ajuste anatómico preciso.',
    'Zapatillas de trail con protección reforzada, agarre extremo en terrenos difíciles y materiales técnicos resistentes al agua.',
    'Modelo urbano de alto rendimiento con suela EVA de doble densidad y upper de knit elástico que se adapta perfectamente al pie.',
    'Zapatillas cross-training con estabilidad lateral reforzada, suela plana flexible y materiales premium ultra respirables.',
    'Running shoe de larga distancia con foam propulsivo en entresuela, drop de 8mm y peso ultraligero de solo 240g.',
  ],
  menCloth: [
    'Prenda de entrenamiento con tejido DryFit de absorción de humedad ultra rápida. Costuras planas para mayor comodidad en ejercicio intenso.',
    'Diseño ergonómico con cortes estratégicos para libertad de movimiento total. Tejido de alta densidad que mantiene su forma tras cada lavado.',
    'Confeccionado en tejido técnico de compresión graduada que mejora la circulación y reduce la fatiga muscular en sesiones prolongadas.',
    'Material cortaviento con membrana interna que protege sin agregar peso. Dobladillo ajustable y bolsillos con cierre resistente al agua.',
    'Tejido de doble capa con interior térmico y exterior DryFit. Ideal para entrenamientos en baja temperatura o como capa intermedia.',
    'Ultra liviano y transpirable. Paneles de malla estratégicos para máxima ventilación en las zonas de mayor calor corporal durante el ejercicio.',
  ],
  womenShoe: [
    'Zapatillas femeninas con horma anatómica de mayor anchura en el antepié. Amortiguación adaptativa y upper ultra transpirable.',
    'Diseñadas con tecnología de retorno de energía para cada pisada. Suela de goma Continental para máximo agarre en superficie mojada.',
    'Modelo de trail con refuerzos laterales, sistema de cierre rápido y suela multidireccional de alta tracción. Resistente al agua y al desgaste.',
    'Running shoe ligero con foam reactivo, plantilla removible OrthoLite y exterior de malla Primeknit que se adapta al movimiento del pie.',
    'Zapatilla de gym con suela plana para yoga, pilates y levantamiento. Upper de malla flexible con soporte lateral reforzado.',
    'Diseño premium en tonos terra con detalles en naranja fuego. Tecnología Boost en la entresuela para una experiencia de confort superior.',
  ],
  womenCloth: [
    'Conjunto de yoga y fitness en tela de compresión suave de 4 vías. Top con soporte integrado y calza de cintura alta con bolsillo oculto.',
    'Calza de compresión de cintura alta con tela opaca sin transparencias. Tecnología de compresión gradual para mejor performance y recuperación.',
    'Campera ultraliviana con capucha plegable en el cuello. Tejido cortaviento que protege sin sofocar en días de baja temperatura.',
    'Sports bra de soporte medio-alto con espalda cruzada y breteles ajustables. Interior de mesh que elimina la humedad y reduce el roce.',
    'Short de running con malla interior integrada, bolsillo trasero con cierre y cintura elástica de alta sujeción sin restricciones.',
    'Remera de entrenamiento con corte amplio y suelto, tejido de bambú mezclado con poliéster para suavidad y transpirabilidad superiores.',
  ],
  kidsShoe: [
    'Zapatillas infantiles con suela flexible antideslizante y cierre fácil de velcro. Upper suave que protege sin comprimir el pie en desarrollo.',
    'Diseño colorido y liviano con puntera reforzada. Suela de EVA que amortigua los impactos durante los juegos más activos.',
    'Zapatilla deportiva con sistema de cierre rápido y materiales antibacteriales en el interior. Fácil de poner y sacar sin ayuda adulta.',
    'Suela ultraflex con hendiduras que permiten doblarse 360°. Horma amplia para pies en crecimiento con soporte de arco plantilla.',
    'Running shoe junior con materiales reflectivos para mayor seguridad. Liviano y transpirable, ideal para actividades escolares y deporte.',
  ],
  kidsCloth: [
    'Prenda deportiva infantil de tela suave que no irrita la piel. Corte ergonómico que no limita el movimiento durante el juego o deporte.',
    'Tejido DryFit de secado rápido. Costuras planas para evitar roces y elástico suave en cintura sin apretar. Lavable a máquina.',
    'Tela de doble capa con interior suave tipo polar liviano y exterior resistente al viento. Cierre fácil y bolsillos seguros con velcro.',
    'Resistente a lavados frecuentes. Colores vivos que no pierden intensidad. Telas hipoalergénicas certificadas dermatológicamente.',
    'Diseño moderno con detalles reflectivos y estampados divertidos. Tela antibacterial que inhibe el mal olor tras el ejercicio intenso.',
  ],
};

// ── Tag pool ─────────────────────────────────────────────────
const TAGS = [null, null, null, 'Nuevo', null, 'Más Vendido', null, null, 'Premium', null, 'Tendencia', null, null, null];

// ── Product builder ──────────────────────────────────────────
const build = (raw, startId, category, type, imgKey, sizes, descKey) =>
  raw.map(([name, price], i) => ({
    id: startId + i,
    name,
    category,
    type,
    price,
    description: cy(DESC[descKey], i),
    image: cy(IMG[imgKey], i),
    sizes,
    tag: cy(TAGS, i),
    rating: rt(i),
  }));

// ── Raw product data ─────────────────────────────────────────

// HOMBRE – CALZADO (50) ids 13-62
const MEN_SHOE = [
  ['Rocket X Pro 2.0', 32000], ['Thunder Boost Elite', 28500], ['Storm Runner Pro', 24900],
  ['Blaze Sprint X', 31000],   ['Fire Trail Elite', 35000],    ['Vortex Cross Pro', 27500],
  ['Apex Racer X', 33000],     ['Summit Peak Elite', 29000],   ['Flash Run Pro', 26500],
  ['Dynamic Force X', 30000],  ['Power Step Elite', 28000],    ['Elite Drive Pro', 34500],
  ['Ultra Grip X', 22000],     ['Speed Carbon Pro', 38000],    ['Carbon Max Elite', 41000],
  ['Phoenix Rise Pro', 29500], ['Bolt Runner X', 27000],       ['Hyper Pace Elite', 32500],
  ['Rapid Strike Pro', 25000], ['Wind Cutter X', 28000],       ['Terra Boss Elite', 23500],
  ['Road Conqueror Pro', 30500],['Sprint Max X', 26000],       ['Velocity Elite Pro', 33000],
  ['Endurance King X', 31500], ['Marathon Elite Pro', 36000],  ['Mountain Trek X', 34000],
  ['Trail Blazer Pro', 29000], ['Jungle Force Elite', 27500],  ['Desert Storm Pro', 32000],
  ['Arctic Runner X', 24500],  ['Peak Performer Pro', 35500],  ['Power Surge Elite', 28500],
  ['Energy Boost X', 26000],   ['Thunder Strike Pro', 30000],  ['Lightning Elite X', 37000],
  ['Meteor Runner Pro', 25500],['Comet Sprint X', 29000],      ['Nova Racer Elite', 31000],
  ['Galaxy Drive Pro', 33500], ['Orbit Runner X', 27000],      ['Star Force Elite', 29500],
  ['Zenith Elite Pro', 36500], ['Apex Master X', 28000],       ['Summit Boss Elite', 31500],
  ['Peak Master Pro', 34000],  ['Crest Runner X', 26500],      ['Ridge Racer Elite', 30000],
  ['Canyon Cross Pro', 28500], ['Valley Sprint X', 23000],
];

// HOMBRE – INDUMENTARIA (50) ids 63-112
const MEN_CLOTH = [
  ['Training Tee Elite', 8900],    ['Performance Short Pro', 9500],  ['Fire Hoodie X', 18500],
  ['Zip Jacket Storm', 22000],     ['Compression Tee Pro', 7500],    ['Dry Fit Shorts Elite', 8200],
  ['Tech Training Pants', 14500],  ['Runner Vest Pro', 11000],       ['Athletic Cap Fire', 5500],
  ['Muscle Tank Elite', 7000],     ['Wind Jacket Pro', 21000],       ['Power Legging X', 12000],
  ['Sport Tee Blaze', 8500],       ['Training Short Rapid', 9000],   ['Flex Hoodie Storm', 17500],
  ['Base Layer Pro', 11500],       ['Warm Up Jacket X', 19500],      ['Sport Cap Ultra', 6000],
  ['Compression Short Pro', 10000],['Training Tank Elite', 7500],    ['Elite Running Top', 9000],
  ['Speed Short Pro', 8800],       ['Storm Jacket Pro', 23500],      ['Training Hoodie X', 18000],
  ['Flex Tee Elite', 8200],        ['Road Running Pants', 15000],    ['Warm Layer Jacket', 20000],
  ['Sprint Short Pro', 9200],      ['Athletic Vest Fire', 11500],    ['Training Cap Elite', 5800],
  ['Performance Top X', 8700],     ['Ultra Dry Tee Pro', 7800],      ['Cardio Short Elite', 9400],
  ['Marathon Jacket Pro', 24000],  ['Flex Pant Storm', 14800],       ['Running Tee Rapid', 8400],
  ['Cross Training Short', 9800],  ['Power Jacket Elite', 22500],    ['Ultra Hoodie Pro', 19000],
  ['Sport Vest X', 12000],         ['Tech Tee Performance', 8600],   ['Training Pant Rapid', 15500],
  ['Long Sleeve Pro', 10000],      ['Warm Up Short Elite', 8900],    ['Compression Jacket X', 21500],
  ['Speed Tee Ultra', 7900],       ['Athletic Hoodie Fire', 17000],  ['Training Long Tee', 9100],
  ['Sport Jacket Blaze', 22000],   ['Elite Vest Pro X', 12500],
];

// MUJER – CALZADO (50) ids 113-162
const WOMEN_SHOE = [
  ['Ember Run Pro', 25500],    ['Aurora Sprint X', 28000],   ['Bloom Racer Elite', 23000],
  ['Crystal Step Pro', 26500], ['Dawn Dash X', 24000],       ['Echo Pace Elite', 29000],
  ['Flower Force Pro', 21500], ['Grace Sprint X', 27500],    ['Harmony Run Elite', 24500],
  ['Iris Boost Pro', 31000],   ['Jade Racer X', 26000],      ['Luna Speed Elite', 28500],
  ['Maple Run Pro', 22500],    ['Nova Sprint X', 30000],     ['Opal Force Elite', 27000],
  ['Pearl Dash Pro', 23500],   ['Quartz Runner X', 29500],   ['Rose Sprint Elite', 25000],
  ['Sapphire Pace Pro', 32000],['Terra Bloom X', 24500],     ['Ursa Run Elite', 26500],
  ['Violet Speed Pro', 28000], ['Wave Dash X', 23000],       ['Yoga Boost Elite', 21000],
  ['Zara Run Pro', 27000],     ['Aria Racer X', 29500],      ['Bella Speed Elite', 25500],
  ['Coral Force Pro', 31500],  ['Daisy Run X', 22000],       ['Ember Pro Elite', 33000],
  ['Fern Sprint Pro', 27500],  ['Glow Dash X', 24000],       ['Haven Force Elite', 29000],
  ['Isla Run Pro', 26000],     ['Jade Sprint X', 28500],     ['Kiwi Boost Elite', 23500],
  ['Lily Speed Pro', 30000],   ['Mint Runner X', 25000],     ['Neon Bloom Elite', 27500],
  ['Olive Sprint Pro', 32500], ['Prism Run X', 24500],       ['River Dash Elite', 28000],
  ['Sol Sprint Pro', 26500],   ['Teal Runner X', 22500],     ['Uma Speed Elite', 29500],
  ['Vera Force Pro', 27000],   ['Wind Bloom X', 23000],      ['Yara Sprint Elite', 31000],
  ['Zola Run Pro', 25500],     ['Flora Dash X', 28500],
];

// MUJER – INDUMENTARIA (50) ids 163-212
const WOMEN_CLOTH = [
  ['Yoga Flow Set', 14200],          ['Compression Legging Elite', 10500], ['Sports Bra Ultra', 8000],
  ['Run Easy Jacket', 21000],        ['Active Short Pro', 9000],           ['Training Top Bloom', 8500],
  ['Yoga Pant Flow Pro', 12000],     ['Compression Top X', 9500],          ['Cardio Short Elite', 8800],
  ['Run Jacket Soft Pro', 22000],    ['Flex Legging Ultra', 11000],        ['Support Bra Pro X', 8200],
  ['Ease Short Runner', 9200],       ['Active Top Bloom Pro', 8700],       ['Flow Pant Yoga X', 12500],
  ['Ultra Compression Set', 15000],  ['Trail Jacket Light Pro', 20000],    ['Warm Legging Elite', 11500],
  ['Training Bra Ultra', 7800],      ['Sport Short Flow Pro', 9400],       ['Performance Jacket X', 23000],
  ['Active Tank Ultra Pro', 8300],   ['Run Pant Elite', 13000],            ['Yoga Top Soft X', 8900],
  ['Compression Short Ultra', 9800], ['Flow Jacket Elite Pro', 21500],     ['Trail Top Runner X', 8600],
  ['Ultra Short Bloom Pro', 9100],   ['Support Tank Elite', 8100],         ['Run Set Pro Ultra', 16000],
  ['Cardio Jacket Light', 20500],    ['Flex Top Ultra Pro', 8800],         ['Training Pant Bloom X', 13500],
  ['Sport Tank Flow Pro', 8400],     ['Yoga Short Elite', 9600],           ['Elastic Legging Pro X', 11500],
  ['Run Bra Ultra Elite', 8500],     ['Active Jacket Bloom', 22500],       ['Flow Short Runner Pro', 9700],
  ['Trail Legging Ultra X', 12000],  ['Ultra Top Bloom Elite', 8900],      ['Cardio Tank Runner', 8200],
  ['Yoga Jacket Flow Pro', 23000],   ['Performance Short X', 9900],        ['Flow Bra Elite Pro', 8700],
  ['Active Pant Ultra', 13500],      ['Trail Tank Bloom X', 8600],         ['Run Legging Elite Pro', 11800],
  ['Sport Jacket Flow Ultra', 22000],['Training Set Elite Pro', 17000],
];

// NIÑOS – CALZADO (50) ids 213-262
const KIDS_SHOE = [
  ['Junior Sprint X', 15900],   ['Mini Racer Pro', 14500],    ['Tiny Boost Elite', 13000],
  ['Little Runner X', 15500],   ['Kinder Step Pro', 12500],   ['Active Junior Elite', 14000],
  ['Young Racer X', 16500],     ['Speed Kid Pro', 13500],     ['Flash Junior Elite', 15000],
  ['Zoom Mini X', 12000],       ['Quick Step Pro', 14500],    ['Fun Runner Elite', 13000],
  ['Play Boost X', 15500],      ['Kids Force Pro', 16000],    ['Jump Sprint Elite', 14000],
  ['Active Mini X', 13500],     ['Trail Junior Pro', 17000],  ['Run Kid Elite', 14500],
  ['Dash Mini X', 13000],       ['Power Junior Pro', 16500],  ['Speed Mini Elite', 15000],
  ['Blast Junior X', 14000],    ['Zoom Kid Pro', 17500],      ['Race Mini Elite', 13500],
  ['Quick Junior X', 15500],    ['Young Force Pro', 16000],   ['Small Sprint Elite', 12500],
  ['Jump Kid X', 14500],        ['Tiny Racer Pro', 13000],    ['Fun Step Elite', 15000],
  ['Bright Runner X', 14000],   ['Cool Boost Pro', 16500],    ['Fast Junior Elite', 13500],
  ['Play Racer X', 15500],      ['Active Step Pro', 14000],   ['Zoom Junior Elite', 17000],
  ['Run Mini X', 13000],        ['Sprint Kid Pro', 15000],    ['Dash Junior Elite', 14500],
  ['Power Mini X', 16000],      ['Speed Force Pro', 13500],   ['Flash Kid Elite', 14000],
  ['Quick Mini X', 15500],      ['Young Sprint Pro', 16500],  ['Jump Racer Elite', 13000],
  ['Tiny Force X', 14500],      ['Cool Junior Pro', 15000],   ['Fast Mini Elite', 13500],
  ['Bright Step X', 16000],     ['Run Force Pro', 14000],
];

// NIÑOS – INDUMENTARIA (50) ids 263-312
const KIDS_CLOTH = [
  ['Junior Training Tee', 7500],   ['Kids Sport Short', 8000],    ['Young Hoodie Pro', 11200],
  ['Mini Active Top', 7000],       ['Little Runner Tee', 7800],   ['Kinder Training Set', 12500],
  ['Youth Sport Jacket', 10500],   ['Kids Active Short', 8200],   ['Young Training Top', 7600],
  ['Mini Hoodie Sport', 10800],    ['Junior Sport Pant', 9500],   ['Tiny Training Tee', 7200],
  ['Active Kids Short', 8400],     ['Speed Junior Tee', 7900],    ['Young Sport Jacket', 11000],
  ['Flash Kids Set', 13000],       ['Mini Runner Short', 8100],   ['Kinder Active Top', 7500],
  ['Youth Training Tee', 7800],    ['Junior Sport Short', 8500],  ['Kids Warm Jacket', 11500],
  ['Young Active Tee', 7600],      ['Mini Sport Short', 8200],    ['Little Training Set', 12800],
  ['Speed Kids Jacket', 11000],    ['Young Runner Tee', 7700],    ['Kinder Sport Short', 8300],
  ['Mini Active Jacket', 10500],   ['Junior Training Short', 8600],['Kids Flex Top', 7900],
  ['Young Sport Set', 13500],      ['Tiny Active Tee', 7400],     ['Flash Junior Short', 8500],
  ['Mini Training Jacket', 11200], ['Kinder Runner Tee', 7800],   ['Youth Active Set', 13000],
  ['Junior Flex Short', 8700],     ['Kids Training Jacket', 11500],['Young Mini Tee', 7500],
  ['Speed Kids Short', 8400],      ['Mini Sport Jacket', 10800],  ['Little Active Tee', 7600],
  ['Young Training Short', 8600],  ['Kinder Sport Set', 12500],   ['Junior Runner Jacket', 11000],
  ['Mini Flex Tee', 7700],         ['Kids Active Top', 7900],     ['Young Speed Short', 8500],
  ['Tiny Sport Jacket', 10500],    ['Junior Active Set', 13500],
];

// ── Assemble all products ────────────────────────────────────
const featured = [
  {
    id: 1, name: 'Zapatillas Rocket X Pro', category: 'Hombre', type: 'Calzado', price: 29999,
    description: 'Zapatillas de running de alto rendimiento con tecnología de amortiguación reactiva. Suela de carbono para máxima propulsión y upper de malla transpirable ultra liviana.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    sizes: ['39','40','41','42','43','44'], tag: 'Nuevo', rating: 4.8,
  },
  {
    id: 2, name: 'Campera Training Fire', category: 'Hombre', type: 'Indumentaria', price: 18500,
    description: 'Campera de entrenamiento con tejido DryFit que evacúa la humedad. Diseño ergonómico con costuras planas para mayor comodidad en movimiento.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    sizes: ['S','M','L','XL'], tag: 'Más Vendido', rating: 4.6,
  },
  {
    id: 3, name: 'Zapatillas Ember Run', category: 'Mujer', type: 'Calzado', price: 25500,
    description: 'Zapatillas de running femeninas con horma anatómica y amortiguación adaptativa. Diseño elegante en tonos terra con detalles en naranja fuego.',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80',
    sizes: ['36','37','38','39','40','41'], tag: 'Nuevo', rating: 4.9,
  },
  {
    id: 4, name: 'Conjunto Yoga Terra', category: 'Mujer', type: 'Indumentaria', price: 14200,
    description: 'Conjunto de yoga de dos piezas en tela de compresión suave. Top deportivo con soporte integrado y calza de cintura alta con bolsillo lateral.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    sizes: ['XS','S','M','L','XL'], tag: 'Tendencia', rating: 4.7,
  },
  {
    id: 5, name: 'Zapatillas Junior Sprint', category: 'Niños', type: 'Calzado', price: 15900,
    description: 'Zapatillas deportivas para niños con sistema de cierre fácil y suela antideslizante. Diseño colorido que combina estilo y funcionalidad para los más activos.',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961a6bf?w=600&q=80',
    sizes: ['30','31','32','33','34','35'], tag: 'Kids', rating: 4.5,
  },
  {
    id: 6, name: 'Remera Performance Hombre', category: 'Hombre', type: 'Indumentaria', price: 8900,
    description: 'Remera de entrenamiento con tecnología de absorción de humedad. Tejido ultraligero y costuras planas para máxima comodidad durante el ejercicio intenso.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    sizes: ['S','M','L','XL'], tag: null, rating: 4.4,
  },
  {
    id: 7, name: 'Buzo Junior Active', category: 'Niños', type: 'Indumentaria', price: 11200,
    description: 'Buzo deportivo para niños de tela polar liviana con capucha. Perfecto para actividades al aire libre con diseño ergonómico que no limita el movimiento.',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
    sizes: ['S','M','L'], tag: null, rating: 4.3,
  },
  {
    id: 8, name: 'Zapatillas Vortex Trail', category: 'Hombre', type: 'Calzado', price: 32500,
    description: 'Zapatillas de trail running con protección reforzada y agarre extremo para terrenos difíciles. Upper de materiales técnicos resistentes al agua y al desgaste.',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&q=80',
    sizes: ['40','41','42','43','44','45'], tag: 'Premium', rating: 4.9,
  },
  {
    id: 9, name: 'Calza Compresión Mujer', category: 'Mujer', type: 'Indumentaria', price: 10500,
    description: 'Calza de compresión de cintura alta con tela opaca y bolsillo en cinturilla. Tecnología de compresión gradual que mejora la circulación y reduce la fatiga muscular.',
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80',
    sizes: ['XS','S','M','L','XL'], tag: 'Más Vendido', rating: 4.8,
  },
  {
    id: 10, name: 'Zapatillas Flare Junior', category: 'Niños', type: 'Calzado', price: 13800,
    description: 'Zapatillas urbanas para niños con suela flexible y materiales livianos. Diseño moderno con detalles reflectivos para mayor seguridad en condiciones de poca luz.',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    sizes: ['28','29','30','31','32','33'], tag: null, rating: 4.6,
  },
  {
    id: 11, name: 'Campera Running Mujer', category: 'Mujer', type: 'Indumentaria', price: 21000,
    description: 'Campera de running femenina ultraliviana con capucha plegable en cuello. Tejido cortaviento que protege sin sofocar. Diseño aerodinámico para máxima performance.',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80',
    sizes: ['XS','S','M','L'], tag: 'Nuevo', rating: 4.7,
  },
  {
    id: 12, name: 'Short Training Elite', category: 'Hombre', type: 'Indumentaria', price: 9500,
    description: 'Short de entrenamiento con doble forro interior y bolsillos laterales con cierre. Tejido de secado rápido y cintura elástica con cordón regulable.',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
    sizes: ['S','M','L','XL'], tag: null, rating: 4.5,
  },
];

export const products = [
  ...featured,
  ...build(MEN_SHOE,    13,  'Hombre', 'Calzado',      'menShoe',   SZ.menShoe,   'menShoe'),
  ...build(MEN_CLOTH,   63,  'Hombre', 'Indumentaria', 'menCloth',  SZ.adultCl,   'menCloth'),
  ...build(WOMEN_SHOE,  113, 'Mujer',  'Calzado',      'womenShoe', SZ.womenShoe, 'womenShoe'),
  ...build(WOMEN_CLOTH, 163, 'Mujer',  'Indumentaria', 'womenCloth',SZ.adultCl,   'womenCloth'),
  ...build(KIDS_SHOE,   213, 'Niños',  'Calzado',      'kidsShoe',  SZ.kidsShoe,  'kidsShoe'),
  ...build(KIDS_CLOTH,  263, 'Niños',  'Indumentaria', 'kidsCloth', SZ.kidsCl,    'kidsCloth'),
];

// ── Tag color map ─────────────────────────────────────────────
export const tagColors = {
  'Nuevo':       'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Más Vendido': 'bg-fire-orange/20 text-fire-orange border-fire-orange/30',
  'Tendencia':   'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Kids':        'bg-sky-500/20 text-sky-400 border-sky-500/30',
  'Premium':     'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};
