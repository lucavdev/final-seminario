// ============================================================
// products.js – Fuego Sport
// 12 featured products + 60 generated (10 per category)
// Each product has a unique, contextually appropriate image
// ============================================================

// ── Tag color map ─────────────────────────────────────────────
export const tagColors = {
  'Nuevo':       'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  'Más Vendido': 'bg-fire-orange/20 text-fire-orange border-fire-orange/30',
  'Tendencia':   'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Kids':        'bg-sky-500/20 text-sky-400 border-sky-500/30',
  'Premium':     'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
};

// ── Size pools ───────────────────────────────────────────────
const SZ = {
  menShoe:   ['40','41','42','43','44','45'],
  womenShoe: ['36','37','38','39','40','41'],
  kidsShoe:  ['28','29','30','31','32','33','34','35'],
  adultCl:   ['XS','S','M','L','XL'],
  kidsCl:    ['S','M','L'],
};

// ── Featured / Hero products (ids 1–12) ──────────────────────
const featured = [
  {
    id: 1, name: 'Zapatillas Rocket X Pro', category: 'Hombre', type: 'Calzado', price: 29999,
    description: 'Zapatillas de running de alto rendimiento con tecnología de amortiguación reactiva. Suela de carbono para máxima propulsión y upper de malla transpirable ultra liviana.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    sizes: SZ.menShoe, tag: 'Nuevo', rating: 4.8,
  },
  {
    id: 2, name: 'Campera Training Fire', category: 'Hombre', type: 'Indumentaria', price: 18500,
    description: 'Campera de entrenamiento con tejido DryFit que evacúa la humedad. Diseño ergonómico con costuras planas para mayor comodidad en movimiento.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Más Vendido', rating: 4.6,
  },
  {
    id: 3, name: 'Zapatillas Ember Run', category: 'Mujer', type: 'Calzado', price: 25500,
    description: 'Zapatillas de running femeninas con horma anatómica y amortiguación adaptativa. Diseño elegante en tonos terra con detalles en naranja fuego.',
    image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&q=80',
    sizes: SZ.womenShoe, tag: 'Nuevo', rating: 4.9,
  },
  {
    id: 4, name: 'Conjunto Yoga Terra', category: 'Mujer', type: 'Indumentaria', price: 14200,
    description: 'Conjunto de yoga de dos piezas en tela de compresión suave. Top deportivo con soporte integrado y calza de cintura alta con bolsillo lateral.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Tendencia', rating: 4.7,
  },
  {
    id: 5, name: 'Zapatillas Junior Sprint', category: 'Niños', type: 'Calzado', price: 15900,
    description: 'Zapatillas deportivas para niños con sistema de cierre fácil y suela antideslizante. Diseño colorido que combina estilo y funcionalidad para los más activos.',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961a6bf?w=600&q=80',
    sizes: SZ.kidsShoe, tag: 'Kids', rating: 4.5,
  },
  {
    id: 6, name: 'Remera Performance Hombre', category: 'Hombre', type: 'Indumentaria', price: 8900,
    description: 'Remera de entrenamiento con tecnología de absorción de humedad. Tejido ultraligero y costuras planas para máxima comodidad durante el ejercicio intenso.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    sizes: SZ.adultCl, tag: null, rating: 4.4,
  },
  {
    id: 7, name: 'Buzo Junior Active', category: 'Niños', type: 'Indumentaria', price: 11200,
    description: 'Buzo deportivo para niños de tela polar liviana con capucha. Perfecto para actividades al aire libre con diseño ergonómico que no limita el movimiento.',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
    sizes: SZ.kidsCl, tag: null, rating: 4.3,
  },
  {
    id: 8, name: 'Zapatillas Vortex Trail', category: 'Hombre', type: 'Calzado', price: 32500,
    description: 'Zapatillas de trail running con protección reforzada y agarre extremo para terrenos difíciles. Upper de materiales técnicos resistentes al agua y al desgaste.',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&q=80',
    sizes: SZ.menShoe, tag: 'Premium', rating: 4.9,
  },
  {
    id: 9, name: 'Calza Compresión Mujer', category: 'Mujer', type: 'Indumentaria', price: 10500,
    description: 'Calza de compresión de cintura alta con tela opaca y bolsillo en cinturilla. Tecnología de compresión gradual que mejora la circulación y reduce la fatiga muscular.',
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Más Vendido', rating: 4.8,
  },
  {
    id: 10, name: 'Zapatillas Flare Junior', category: 'Niños', type: 'Calzado', price: 13800,
    description: 'Zapatillas urbanas para niños con suela flexible y materiales livianos. Diseño moderno con detalles reflectivos para mayor seguridad en condiciones de poca luz.',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    sizes: SZ.kidsShoe, tag: null, rating: 4.6,
  },
  {
    id: 11, name: 'Campera Running Mujer', category: 'Mujer', type: 'Indumentaria', price: 21000,
    description: 'Campera de running femenina ultraliviana con capucha plegable en cuello. Tejido cortaviento que protege sin sofocar. Diseño aerodinámico para máxima performance.',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Nuevo', rating: 4.7,
  },
  {
    id: 12, name: 'Short Training Elite', category: 'Hombre', type: 'Indumentaria', price: 9500,
    description: 'Short de entrenamiento con doble forro interior y bolsillos laterales con cierre. Tejido de secado rápido y cintura elástica con cordón regulable.',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
    sizes: SZ.adultCl, tag: null, rating: 4.5,
  },
];

// ── HOMBRE – CALZADO (10 productos, ids 13–22) ───────────────
const menShoes = [
  {
    id: 13, name: 'Thunder Boost Elite', category: 'Hombre', type: 'Calzado', price: 28500,
    description: 'Zapatillas de alto rendimiento con foam reactivo de última generación. Diseño bicolor aerodinámico con sistema de cierre rápido.',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=600&q=80',
    sizes: SZ.menShoe, tag: 'Nuevo', rating: 4.7,
  },
  {
    id: 14, name: 'Storm Runner Pro', category: 'Hombre', type: 'Calzado', price: 24900,
    description: 'Zapatilla de running con upper de knit ultraliviano y entresuela de doble densidad para absorber impactos en largas distancias.',
    image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80',
    sizes: SZ.menShoe, tag: null, rating: 4.5,
  },
  {
    id: 15, name: 'Blaze Sprint X', category: 'Hombre', type: 'Calzado', price: 31000,
    description: 'Velocidad y estilo en cada paso. Suela de carbono con retorno de energía óptimo para competición y entrenamiento de alto nivel.',
    image: 'https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600&q=80',
    sizes: SZ.menShoe, tag: 'Premium', rating: 4.8,
  },
  {
    id: 16, name: 'Fire Trail Elite', category: 'Hombre', type: 'Calzado', price: 35000,
    description: 'Zapatillas de trail con outsole multidireccional de agarre extremo, membrana waterproof y refuerzos laterales de protección.',
    image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=600&q=80',
    sizes: SZ.menShoe, tag: null, rating: 4.6,
  },
  {
    id: 17, name: 'Apex Racer X', category: 'Hombre', type: 'Calzado', price: 33000,
    description: 'Diseñado para el corredor de competición. Drop de 8mm, peso de 240g y upper de malla Flyknit que se moldea al pie.',
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&q=80',
    sizes: SZ.menShoe, tag: 'Más Vendido', rating: 4.9,
  },
  {
    id: 18, name: 'Speed Carbon Pro', category: 'Hombre', type: 'Calzado', price: 38000,
    description: 'Placa de carbono completa incrustada en foam Pebax. La elección de atletas de élite para maratones y competiciones de fondo.',
    image: 'https://images.unsplash.com/photo-1571736772567-6b539ef2d994?w=600&q=80',
    sizes: SZ.menShoe, tag: 'Premium', rating: 4.9,
  },
  {
    id: 19, name: 'Urban Cross Elite', category: 'Hombre', type: 'Calzado', price: 26500,
    description: 'Zapatilla urbana de entrenamiento cruzado con suela plana estable, upper reforzado y cushioning de media densidad.',
    image: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?w=600&q=80',
    sizes: SZ.menShoe, tag: null, rating: 4.4,
  },
  {
    id: 20, name: 'Marathon Elite Pro', category: 'Hombre', type: 'Calzado', price: 36000,
    description: 'Upper de malla ultraliviana con seams mínimas. Entresuela de 4cm de altura con foam de retorno energético superior al 85%.',
    image: 'https://images.unsplash.com/photo-1556048219-bb6978360b84?w=600&q=80',
    sizes: SZ.menShoe, tag: 'Tendencia', rating: 4.7,
  },
  {
    id: 21, name: 'Hyper Pace Elite', category: 'Hombre', type: 'Calzado', price: 32500,
    description: 'Zapatilla de velocidad con geometría de suela rockered que propulsa el paso hacia adelante. Ideal para 5K y 10K.',
    image: 'https://images.unsplash.com/photo-1562183241-b937e9102303?w=600&q=80',
    sizes: SZ.menShoe, tag: null, rating: 4.6,
  },
  {
    id: 22, name: 'Mountain Trek X', category: 'Hombre', type: 'Calzado', price: 34000,
    description: 'Bota deportiva de montaña con tobillera reforzada, suela Vibram de agarre superior y membrana impermeable certificada.',
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=600&q=80',
    sizes: SZ.menShoe, tag: null, rating: 4.5,
  },
];

// ── HOMBRE – INDUMENTARIA (10 productos, ids 23–32) ──────────
const menClothes = [
  {
    id: 23, name: 'Training Tee Elite', category: 'Hombre', type: 'Indumentaria', price: 8900,
    description: 'Remera técnica de entrenamiento con tejido DryFit de secado ultra rápido y costuras planas para mayor comodidad.',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80',
    sizes: SZ.adultCl, tag: null, rating: 4.5,
  },
  {
    id: 24, name: 'Fire Hoodie X', category: 'Hombre', type: 'Indumentaria', price: 18500,
    description: 'Buzo con capucha de tejido técnico termorrégulador. Interior suave tipo micro-polar y exterior cortaviento resistente.',
    image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Más Vendido', rating: 4.7,
  },
  {
    id: 25, name: 'Zip Jacket Storm', category: 'Hombre', type: 'Indumentaria', price: 22000,
    description: 'Campera con cierre full-zip, paneles de malla estratégicos y bolsillos con cremallera resistente al agua.',
    image: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Nuevo', rating: 4.6,
  },
  {
    id: 26, name: 'Performance Short Pro', category: 'Hombre', type: 'Indumentaria', price: 9500,
    description: 'Short de running 7 pulgadas con liner interior integrado, bolsillo trasero con cierre y cintura elástica con cordón.',
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=600&q=80',
    sizes: SZ.adultCl, tag: null, rating: 4.4,
  },
  {
    id: 27, name: 'Compression Tee Pro', category: 'Hombre', type: 'Indumentaria', price: 7500,
    description: 'Camiseta de compresión de manga larga con gradación progresiva para mejorar la circulación y reducir la fatiga.',
    image: 'https://images.unsplash.com/photo-1589083130544-0d6a2926e519?w=600&q=80',
    sizes: SZ.adultCl, tag: null, rating: 4.3,
  },
  {
    id: 28, name: 'Tech Training Pants', category: 'Hombre', type: 'Indumentaria', price: 14500,
    description: 'Pantalón técnico de entrenamiento con tejido de 4 vías, rodilleras articuladas y bolsillos laterales con cremallera.',
    image: 'https://images.unsplash.com/photo-1517940310602-26535839fe84?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Tendencia', rating: 4.6,
  },
  {
    id: 29, name: 'Wind Jacket Pro', category: 'Hombre', type: 'Indumentaria', price: 21000,
    description: 'Rompevientos ultraliviano que se guarda en su propio bolsillo. Membrana de 2 capas y sellado de costuras críticas.',
    image: 'https://images.unsplash.com/photo-1539533018257-27f4aa8e75e5?w=600&q=80',
    sizes: SZ.adultCl, tag: null, rating: 4.5,
  },
  {
    id: 30, name: 'Muscle Tank Elite', category: 'Hombre', type: 'Indumentaria', price: 7000,
    description: 'Musculosa de entrenamiento con corte atlético, sisa amplia y tejido de malla abierta para máxima ventilación.',
    image: 'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=600&q=80',
    sizes: SZ.adultCl, tag: null, rating: 4.2,
  },
  {
    id: 31, name: 'Power Legging X', category: 'Hombre', type: 'Indumentaria', price: 12000,
    description: 'Calza de compresión masculina para running y ciclismo. Tejido de 78% poliamida con panel de malla en zonas de alta transpiración.',
    image: 'https://images.unsplash.com/photo-1506902385686-a0ca8cb9fd0e?w=600&q=80',
    sizes: SZ.adultCl, tag: null, rating: 4.4,
  },
  {
    id: 32, name: 'Marathon Jacket Pro', category: 'Hombre', type: 'Indumentaria', price: 24000,
    description: 'Campera de competición con detalles reflectivos de 360°, capucha integrada aerodinámica y cierre resistente al agua.',
    image: 'https://images.unsplash.com/photo-1504198453431-c8e3a01e3938?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Premium', rating: 4.8,
  },
];

// ── MUJER – CALZADO (10 productos, ids 33–42) ────────────────
const womenShoes = [
  {
    id: 33, name: 'Ember Run Pro', category: 'Mujer', type: 'Calzado', price: 25500,
    description: 'Zapatilla femenina con horma anatómica wide-toe, amortiguación reactiva y upper de malla transpirable en colores vibrantes.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
    sizes: SZ.womenShoe, tag: 'Nuevo', rating: 4.8,
  },
  {
    id: 34, name: 'Aurora Sprint X', category: 'Mujer', type: 'Calzado', price: 28000,
    description: 'Diseñada con tecnología de retorno de energía para cada pisada. Suela Continental para máximo agarre en superficie mojada.',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80',
    sizes: SZ.womenShoe, tag: null, rating: 4.6,
  },
  {
    id: 35, name: 'Bloom Racer Elite', category: 'Mujer', type: 'Calzado', price: 23000,
    description: 'Zapatilla liviana con plantilla OrthoLite removible, exterior Primeknit y suela translúcida de goma de alta resistencia.',
    image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80',
    sizes: SZ.womenShoe, tag: 'Más Vendido', rating: 4.7,
  },
  {
    id: 36, name: 'Coral Force Pro', category: 'Mujer', type: 'Calzado', price: 31500,
    description: 'Zapatilla de trail femenina con refuerzos laterales, sistema de cierre quick-lace y suela multidireccional de alta tracción.',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80',
    sizes: SZ.womenShoe, tag: null, rating: 4.5,
  },
  {
    id: 37, name: 'Crystal Step Pro', category: 'Mujer', type: 'Calzado', price: 26500,
    description: 'Zapatilla de gym con suela plana específica para yoga, pilates y levantamiento. Upper de malla flexible con soporte lateral.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    sizes: SZ.womenShoe, tag: 'Tendencia', rating: 4.6,
  },
  {
    id: 38, name: 'Luna Speed Elite', category: 'Mujer', type: 'Calzado', price: 28500,
    description: 'Running shoe de velocidad con foam Peba ultraligero, placa de nylon y upper de malla de 100% materiales reciclados.',
    image: 'https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?w=600&q=80',
    sizes: SZ.womenShoe, tag: null, rating: 4.7,
  },
  {
    id: 39, name: 'Nova Sprint X', category: 'Mujer', type: 'Calzado', price: 30000,
    description: 'Diseño premium con degradé de colores vibrantes. Foam Boost de alta memoria y geometría de suela estabilizadora.',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    sizes: SZ.womenShoe, tag: 'Premium', rating: 4.8,
  },
  {
    id: 40, name: 'Sapphire Pace Pro', category: 'Mujer', type: 'Calzado', price: 32000,
    description: 'Zapatilla de fondo con drop de 6mm, foam de alta compresión y tira reflectiva trasera para entrenamientos nocturnos.',
    image: 'https://images.unsplash.com/photo-1561861422-a549073e547a?w=600&q=80',
    sizes: SZ.womenShoe, tag: null, rating: 4.6,
  },
  {
    id: 41, name: 'Violet Speed Pro', category: 'Mujer', type: 'Calzado', price: 28000,
    description: 'Upper de knit elástico 360°, entresuela de PU reactivo y refuerzo de talón con exoesqueleto de TPU ultraligero.',
    image: 'https://images.unsplash.com/photo-1600185652960-b8adb76aebe5?w=600&q=80',
    sizes: SZ.womenShoe, tag: null, rating: 4.5,
  },
  {
    id: 42, name: 'Iris Boost Pro', category: 'Mujer', type: 'Calzado', price: 31000,
    description: 'Sistema Boost completo en entresuela con retorno de energía del 85%. Horma específica femenina para mejor ajuste y confort.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    sizes: SZ.womenShoe, tag: 'Más Vendido', rating: 4.9,
  },
];

// ── MUJER – INDUMENTARIA (10 productos, ids 43–52) ───────────
const womenClothes = [
  {
    id: 43, name: 'Yoga Flow Set', category: 'Mujer', type: 'Indumentaria', price: 14200,
    description: 'Conjunto de yoga en tela de compresión suave de 4 vías. Top con soporte integrado y calza de cintura alta con bolsillo oculto.',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Tendencia', rating: 4.7,
  },
  {
    id: 44, name: 'Compression Legging Elite', category: 'Mujer', type: 'Indumentaria', price: 10500,
    description: 'Calza de compresión de cintura alta con tela opaca sin transparencias. Tecnología de compresión gradual para mejor performance.',
    image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Más Vendido', rating: 4.8,
  },
  {
    id: 45, name: 'Sports Bra Ultra', category: 'Mujer', type: 'Indumentaria', price: 8000,
    description: 'Sports bra de soporte medio-alto con espalda cruzada y breteles ajustables. Interior de mesh que elimina la humedad.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
    sizes: SZ.adultCl, tag: null, rating: 4.6,
  },
  {
    id: 46, name: 'Run Easy Jacket', category: 'Mujer', type: 'Indumentaria', price: 21000,
    description: 'Campera ultraliviana con capucha plegable en el cuello. Tejido cortaviento con membrana interna de protección a la lluvia.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Nuevo', rating: 4.5,
  },
  {
    id: 47, name: 'Active Short Pro', category: 'Mujer', type: 'Indumentaria', price: 9000,
    description: 'Short de running 3 pulgadas con malla interior integrada, bolsillo trasero con cierre y cintura elástica de alta sujeción.',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=600&q=80',
    sizes: SZ.adultCl, tag: null, rating: 4.4,
  },
  {
    id: 48, name: 'Training Top Bloom', category: 'Mujer', type: 'Indumentaria', price: 8500,
    description: 'Remera de entrenamiento con corte amplio y suelto. Tejido de bambú mezclado con poliéster para suavidad y transpirabilidad.',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80',
    sizes: SZ.adultCl, tag: null, rating: 4.5,
  },
  {
    id: 49, name: 'Trail Jacket Light Pro', category: 'Mujer', type: 'Indumentaria', price: 20000,
    description: 'Campera de trail ultracompacta que se guarda en su bolsillo. Costuras selladas y capucha ajustable con correa elástica.',
    image: 'https://images.unsplash.com/photo-1578681994506-b8f463449011?w=600&q=80',
    sizes: SZ.adultCl, tag: null, rating: 4.6,
  },
  {
    id: 50, name: 'Warm Legging Elite', category: 'Mujer', type: 'Indumentaria', price: 11500,
    description: 'Calza térmica con interior de felpa suave y exterior DryFit. Ideal para entrenamientos en temperatura baja o como capa base.',
    image: 'https://images.unsplash.com/photo-1542060748-10c28b62716f?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Nuevo', rating: 4.7,
  },
  {
    id: 51, name: 'Performance Jacket X', category: 'Mujer', type: 'Indumentaria', price: 23000,
    description: 'Campera de competición con cremalleras resistentes al agua, paneles de ventilación y detalles reflectivos en mangas.',
    image: 'https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Premium', rating: 4.8,
  },
  {
    id: 52, name: 'Run Set Pro Ultra', category: 'Mujer', type: 'Indumentaria', price: 16000,
    description: 'Set completo de running: top de compresión con soporte integrado y calza de cintura alta. Tejido de 4 vías ultra suave.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    sizes: SZ.adultCl, tag: 'Tendencia', rating: 4.9,
  },
];

// ── NIÑOS – CALZADO (10 productos, ids 53–62) ────────────────
const kidsShoes = [
  {
    id: 53, name: 'Junior Sprint X', category: 'Niños', type: 'Calzado', price: 15900,
    description: 'Zapatillas infantiles con suela flexible antideslizante y cierre de velcro doble. Upper suave que protege sin comprimir el pie.',
    image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=600&q=80',
    sizes: SZ.kidsShoe, tag: 'Kids', rating: 4.6,
  },
  {
    id: 54, name: 'Mini Racer Pro', category: 'Niños', type: 'Calzado', price: 14500,
    description: 'Diseño colorido y liviano con puntera reforzada. Suela de EVA que amortigua los impactos durante los juegos más activos.',
    image: 'https://images.unsplash.com/photo-1555274175-6cbf6f3b137b?w=600&q=80',
    sizes: SZ.kidsShoe, tag: null, rating: 4.5,
  },
  {
    id: 55, name: 'Tiny Boost Elite', category: 'Niños', type: 'Calzado', price: 13000,
    description: 'Zapatilla con sistema de cierre rápido y materiales antibacteriales en interior. Fácil de poner y sacar sin ayuda adulta.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    sizes: SZ.kidsShoe, tag: 'Nuevo', rating: 4.4,
  },
  {
    id: 56, name: 'Flash Junior Elite', category: 'Niños', type: 'Calzado', price: 15000,
    description: 'Running shoe junior con materiales reflectivos para mayor seguridad. Liviano y transpirable, ideal para actividades escolares.',
    image: 'https://images.unsplash.com/photo-1563545817-2b17a9a1e02e?w=600&q=80',
    sizes: SZ.kidsShoe, tag: null, rating: 4.5,
  },
  {
    id: 57, name: 'Active Junior Elite', category: 'Niños', type: 'Calzado', price: 14000,
    description: 'Suela ultraflex con hendiduras que permiten doblarse 360°. Horma amplia para pies en crecimiento con soporte de arco plantilla.',
    image: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=80',
    sizes: SZ.kidsShoe, tag: null, rating: 4.3,
  },
  {
    id: 58, name: 'Young Racer X', category: 'Niños', type: 'Calzado', price: 16500,
    description: 'Zapatilla deportiva de alta performance para niños activos. Foam de entresuela con excelente retorno de energía y grip superior.',
    image: 'https://images.unsplash.com/photo-1556906781-9a412961a6bf?w=600&q=80',
    sizes: SZ.kidsShoe, tag: 'Más Vendido', rating: 4.7,
  },
  {
    id: 59, name: 'Bright Runner X', category: 'Niños', type: 'Calzado', price: 14000,
    description: 'Colores vibrantes con parches reflectivos en talón. Suela con patrón específico para césped y superficies urbanas.',
    image: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=600&q=80',
    sizes: SZ.kidsShoe, tag: null, rating: 4.4,
  },
  {
    id: 60, name: 'Speed Kid Pro', category: 'Niños', type: 'Calzado', price: 13500,
    description: 'Zapatilla de velcro de apertura fácil y amplia. Interior lavable y materiales hipoalergénicos certificados para piel sensible.',
    image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=600&q=80',
    sizes: SZ.kidsShoe, tag: null, rating: 4.3,
  },
  {
    id: 61, name: 'Cool Boost Pro', category: 'Niños', type: 'Calzado', price: 16500,
    description: 'Inspirada en modelos de alta competición pero adaptada a pie infantil. Upper de malla con detalles en TPU y foam reactivo.',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=600&q=80',
    sizes: SZ.kidsShoe, tag: 'Tendencia', rating: 4.6,
  },
  {
    id: 62, name: 'Trail Junior Pro', category: 'Niños', type: 'Calzado', price: 17000,
    description: 'Zapatilla de trail para niños aventureros. Suela de agarre multidireccional, refuerzo en puntera y tobillera ligera de soporte.',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&q=80',
    sizes: SZ.kidsShoe, tag: null, rating: 4.5,
  },
];

// ── NIÑOS – INDUMENTARIA (10 productos, ids 63–72) ───────────
const kidsClothes = [
  {
    id: 63, name: 'Junior Training Tee', category: 'Niños', type: 'Indumentaria', price: 7500,
    description: 'Remera deportiva infantil de tela DryFit suave que no irrita la piel. Corte ergonómico que no limita el movimiento.',
    image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=600&q=80',
    sizes: SZ.kidsCl, tag: null, rating: 4.4,
  },
  {
    id: 64, name: 'Kids Sport Short', category: 'Niños', type: 'Indumentaria', price: 8000,
    description: 'Short deportivo con elástico suave en cintura y bolsillos laterales. Tejido DryFit de secado rápido y lavable a máquina.',
    image: 'https://images.unsplash.com/photo-1519278409-1f56ab241a43?w=600&q=80',
    sizes: SZ.kidsCl, tag: null, rating: 4.3,
  },
  {
    id: 65, name: 'Young Hoodie Pro', category: 'Niños', type: 'Indumentaria', price: 11200,
    description: 'Buzo con capucha de doble capa, interior suave tipo polar liviano y exterior resistente al viento. Cierre fácil y bolsillos seguros.',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&q=80',
    sizes: SZ.kidsCl, tag: 'Más Vendido', rating: 4.6,
  },
  {
    id: 66, name: 'Kinder Training Set', category: 'Niños', type: 'Indumentaria', price: 12500,
    description: 'Conjunto deportivo de dos piezas: remera y short a juego. Telas hipoalergénicas certificadas dermatológicamente.',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=80',
    sizes: SZ.kidsCl, tag: 'Nuevo', rating: 4.5,
  },
  {
    id: 67, name: 'Youth Sport Jacket', category: 'Niños', type: 'Indumentaria', price: 10500,
    description: 'Campera deportiva juvenil con paneles de malla en espalda y axilas. Cierre central y puños con elástico suave ajustable.',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80',
    sizes: SZ.kidsCl, tag: null, rating: 4.4,
  },
  {
    id: 68, name: 'Mini Hoodie Sport', category: 'Niños', type: 'Indumentaria', price: 10800,
    description: 'Buzo casual deportivo con diseño de personajes divertidos. Tela antibacterial que inhibe el mal olor tras el ejercicio.',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&q=80',
    sizes: SZ.kidsCl, tag: null, rating: 4.3,
  },
  {
    id: 69, name: 'Junior Sport Pant', category: 'Niños', type: 'Indumentaria', price: 9500,
    description: 'Pantalón deportivo con cintura elástica regulable y botamanga ajustable. Tejido de felpa liviana con interior suave.',
    image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80',
    sizes: SZ.kidsCl, tag: null, rating: 4.2,
  },
  {
    id: 70, name: 'Flash Kids Set', category: 'Niños', type: 'Indumentaria', price: 13000,
    description: 'Set completo de 3 piezas: short, remera y buzo. Colores vivos que no pierden intensidad. Resistente a lavados frecuentes.',
    image: 'https://images.unsplash.com/photo-1471286174890-9c112ffca5b4?w=600&q=80',
    sizes: SZ.kidsCl, tag: 'Tendencia', rating: 4.7,
  },
  {
    id: 71, name: 'Active Kids Short', category: 'Niños', type: 'Indumentaria', price: 8200,
    description: 'Short de deporte con diseño moderno y detalles reflectivos. Tejido DryFit con bolsillo lateral con velcro para seguridad.',
    image: 'https://images.unsplash.com/photo-1483721310020-03333e577078?w=600&q=80',
    sizes: SZ.kidsCl, tag: null, rating: 4.4,
  },
  {
    id: 72, name: 'Young Sport Jacket', category: 'Niños', type: 'Indumentaria', price: 11000,
    description: 'Campera ligera con capucha integrada y detalles de color contrastante. Perfecta para entrenamiento o uso urbano diario.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600&q=80',
    sizes: SZ.kidsCl, tag: null, rating: 4.5,
  },
];

// ── Export ───────────────────────────────────────────────────
export const products = [
  ...featured,
  ...menShoes,
  ...menClothes,
  ...womenShoes,
  ...womenClothes,
  ...kidsShoes,
  ...kidsClothes,
];
