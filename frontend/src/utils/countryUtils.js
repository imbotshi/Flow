/**
 * Utilitaires pour la gestion des pays et drapeaux
 */

// Mapping des noms de pays vers les codes ISO
const countryToCode = {
  // Pays francophones
  'france': 'fr',
  'belgique': 'be',
  'suisse': 'ch',
  'canada': 'ca',
  'luxembourg': 'lu',
  'monaco': 'mc',
  
  // Autres pays européens
  'allemagne': 'de',
  'espagne': 'es',
  'italie': 'it',
  'pays-bas': 'nl',
  'portugal': 'pt',
  'autriche': 'at',
  'danemark': 'dk',
  'finlande': 'fi',
  'norvège': 'no',
  'suède': 'se',
  'pologne': 'pl',
  'république tchèque': 'cz',
  'hongrie': 'hu',
  'slovaquie': 'sk',
  'slovénie': 'si',
  'croatie': 'hr',
  'bulgarie': 'bg',
  'roumanie': 'ro',
  'grèce': 'gr',
  'irlande': 'ie',
  'royaume-uni': 'gb',
  'grande-bretagne': 'gb',
  'angleterre': 'gb',
  
  // Pays d'Afrique
  'maroc': 'ma',
  'algérie': 'dz',
  'tunisie': 'tn',
  'sénégal': 'sn',
  'côte d\'ivoire': 'ci',
  'mali': 'ml',
  'burkina faso': 'bf',
  'niger': 'ne',
  'tchad': 'td',
  'cameroun': 'cm',
  'gabon': 'ga',
  'congo': 'cg',
  'république démocratique du congo': 'cd',
  'madagascar': 'mg',
  'maurice': 'mu',
  'seychelles': 'sc',
  'comores': 'km',
  'djibouti': 'dj',
  'guinée': 'gn',
  'guinée-bissau': 'gw',
  'guinée équatoriale': 'gq',
  'sao tomé-et-principe': 'st',
  'cap-vert': 'cv',
  'gambie': 'gm',
  'sierra leone': 'sl',
  'libéria': 'lr',
  'ghana': 'gh',
  'togo': 'tg',
  'bénin': 'bj',
  'nigeria': 'ng',
  'centrafrique': 'cf',
  'soudan': 'sd',
  'soudan du sud': 'ss',
  'éthiopie': 'et',
  'érythrée': 'er',
  'somalie': 'so',
  'kenya': 'ke',
  'tanzanie': 'tz',
  'ouganda': 'ug',
  'rwanda': 'rw',
  'burundi': 'bi',
  'zambie': 'zm',
  'zimbabwe': 'zw',
  'malawi': 'mw',
  'mozambique': 'mz',
  'angola': 'ao',
  'namibie': 'na',
  'botswana': 'bw',
  'afrique du sud': 'za',
  'eswatini': 'sz',
  'lesotho': 'ls',
  
  // Pays d'Amérique
  'états-unis': 'us',
  'amérique': 'us',
  'mexique': 'mx',
  'brésil': 'br',
  'argentine': 'ar',
  'chili': 'cl',
  'pérou': 'pe',
  'colombie': 'co',
  'venezuela': 've',
  'équateur': 'ec',
  'bolivie': 'bo',
  'paraguay': 'py',
  'uruguay': 'uy',
  'guyana': 'gy',
  'suriname': 'sr',
  'guyane française': 'gf',
  
  // Pays d'Asie
  'chine': 'cn',
  'japon': 'jp',
  'corée du sud': 'kr',
  'corée': 'kr',
  'inde': 'in',
  'pakistan': 'pk',
  'bangladesh': 'bd',
  'sri lanka': 'lk',
  'népal': 'np',
  'bhoutan': 'bt',
  'myanmar': 'mm',
  'thaïlande': 'th',
  'laos': 'la',
  'cambodge': 'kh',
  'vietnam': 'vn',
  'malaisie': 'my',
  'singapour': 'sg',
  'indonésie': 'id',
  'philippines': 'ph',
  'brunei': 'bn',
  'timor oriental': 'tl',
  'mongolie': 'mn',
  'kazakhstan': 'kz',
  'kirghizistan': 'kg',
  'tadjikistan': 'tj',
  'ouzbékistan': 'uz',
  'turkménistan': 'tm',
  'afghanistan': 'af',
  'iran': 'ir',
  'irak': 'iq',
  'syrie': 'sy',
  'liban': 'lb',
  'jordanie': 'jo',
  'israël': 'il',
  'palestine': 'ps',
  'arabie saoudite': 'sa',
  'yémen': 'ye',
  'oman': 'om',
  'émirats arabes unis': 'ae',
  'qatar': 'qa',
  'bahreïn': 'bh',
  'koweït': 'kw',
  
  // Pays d'Océanie
  'australie': 'au',
  'nouvelle-zélande': 'nz',
  'papouasie-nouvelle-guinée': 'pg',
  'fidji': 'fj',
  'vanuatu': 'vu',
  'nouvelle-calédonie': 'nc',
  'polynésie française': 'pf',
  'samoa': 'ws',
  'tonga': 'to',
  'kiribati': 'ki',
  'tuvalu': 'tv',
  'nauru': 'nr',
  'îles marshall': 'mh',
  'états fédérés de micronésie': 'fm',
  'palaos': 'pw',
  
  // Autres
  'russie': 'ru',
  'ukraine': 'ua',
  'biélorussie': 'by',
  'moldavie': 'md',
  'géorgie': 'ge',
  'arménie': 'am',
  'azerbaïdjan': 'az',
  'turquie': 'tr',
  'chypre': 'cy',
  'malte': 'mt',
  'islande': 'is',
  'estonie': 'ee',
  'lettonie': 'lv',
  'lituanie': 'lt'
};

/**
 * Convertit un nom de pays en code ISO pour le drapeau
 * @param {string} countryName - Nom du pays
 * @returns {string} Code ISO du pays ou 'fr' par défaut
 */
export function getCountryCode(countryName) {
  if (!countryName) {
    return 'fr'; // Drapeau français par défaut
  }
  
  // Normaliser le nom du pays
  const normalizedName = countryName.toLowerCase().trim();
  
  // Chercher dans le mapping
  const code = countryToCode[normalizedName];
  if (code) {
    return code;
  }
  
  // Si pas trouvé, essayer avec les 2 premières lettres
  const firstTwoLetters = normalizedName.substring(0, 2);
  if (firstTwoLetters.length === 2) {
    return firstTwoLetters;
  }
  
  // Par défaut, retourner le drapeau français
  return 'fr';
}

/**
 * Génère le chemin vers le fichier de drapeau
 * @param {string} countryName - Nom du pays
 * @returns {string} Chemin vers le fichier SVG du drapeau
 */
export function getFlagPath(countryName) {
  const countryCode = getCountryCode(countryName);
  return `/src/assets/flags/${countryCode}.svg`;
} 