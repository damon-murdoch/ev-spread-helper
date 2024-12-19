// General Constants

const colsPerRow = 2

// Item Constants

const statHeaders = {
  "hp": "HP",
  "atk": "Attack",
  "def": "Defense",
  "spa": "Sp.Atk",
  "spd": "Sp.Def",
  "spe": "Speed"
}

const evModifierBig = {
  'main': 10,
  'ebr': 28
}

const evIncreaseBig = {
  "hp": "Health Mochi / HP Up",
  "atk": "Muscle Mochi / Protein",
  "def": "Resist Mochi / Iron",
  "spa": "Genius Mochi / Calcium",
  "spd": "Clever Mochi / Zinc",
  "spe": "Swift Mochi / Carbos",
}

const evModifierSmall = {
  'main': 1,
  'ebr': 4
}

const evIncreaseSmall = {
  "hp": "Health Feather",
  "atk": "Muscle Feather",
  "def": "Resist Feather",
  "spa": "Genius Feather",
  "spd": "Clever Feather",
  "spe": "Swift Feather",
}

const evDecreaseSmall = {
  "hp": "Pomeg Berry",
  "atk": "Kelpsy Berry",
  "def": "Qualot Berry",
  "spa": "Hondew Berry",
  "spd": "Grepa Berry",
  "spe": "Tamato Berry",
}

const ivIncrease = {
  "hp": "Razz Berry",
  "atk": "Bluk Berry",
  "def": "Nanab Berry",
  "spa": "Weapear Berry",
  "spd": "Pinap Berry",
  "spe": "Cornn Berry",
}

const ivDecrease = {
  "hp": "Magost Berry",
  "atk": "Rabuta Berry",
  "def": "Nomel Berry",
  "spa": "Spelon Berry",
  "spd": "Pamtre Berry",
  "spe": "Watmel Berry",
}

const ivMin = {
  "atk": "Durin Berry",
  "spe": "Belue Berry"
}

const natureMint = {
  "adamant": "Adamant Mint",
  "bashful": "Bashful Mint",
  "bold": "Bold Mint",
  "brave": "Brave Mint",
  "calm": "Calm Mint",
  "careful": "Careful Mint",
  "docile": "Docile Mint",
  "gentle": "Gentle Mint",
  "hardy": "Hardy Mint",
  "hasty": "Hasty Mint",
  "impish": "Impish Mint",
  "jolly": "Jolly Mint",
  "lax": "Lax Mint",
  "lonely": "Lonely Mint",
  "mild": "Mild Mint",
  "modest": "Modest Mint",
  "naive": "Naive Mint",
  "naughty": "Naughty Mint",
  "quiet": "Quiet Mint",
  "quirky": "Quirky Mint",
  "rash": "Rash Mint",
  "relaxed": "Relaxed Mint",
  "sassy": "Sassy Mint",
  "serious": "Serious Mint",
  "timid": "Timid Mint"
};

// Taken from: https://www.polygon.com/pokemon-sword-shield-guide/2019/11/26/20984044/how-to-ev-train-vitamins-macho-brace-poke-jobs

// PokeJob EVs
const pokeJobEvs = [
  336, 192, 168,
  112, 96, 96,
  64, 56, 42,
  32, 32, 28,
  24, 16, 16,
  14, 12, 8,
  8, 4
]

const pokeJobs = [
  "Whole day (24 hours) [pi]", "Whole day (24 hours) + Macho Brace", 
  "Half day (12 hours) [pi]", "Very long (8 hours) [pi]", 
  "Whole day (24 hours)", "Half day (12 hours) + Macho Brace", 
  "Very long (8 hours) + Macho Brace", "Long (4 hours) [pi]", 
  "Short (3 hours) [pi]", "Very short (2 hours) [pi]", 
  "Half day (12 hours)", "Long (4 hours) + Macho Brace", 
  "Short (3 hours) + Macho Brace", "Very long (8 hours)", 
  "Very short (2 hours) + Macho Brace", "A little while (1 hour) [pi]", 
  "Short (3 hours)", "Very short (2 hours)", 
  "A little while (1 hour) + Macho Brace", "A little while (1 hour)"
];

const powerItems = {
  "hp": "Power Weight",
  "atk": "Power Bracer",
  "def": "Power Lens",
  "spa": "Power Belt",
  "spd": "Power Band",
  "spe": "Power Anklet",
};

const evMons = {
  "bss": {
    "hp": "Skwovet",
    "atk": "Chewtle",
    "def": "Rolycoly",
    "spa": "Gastly",
    "spd": "Gossifleur",
    "spe": "Rookidee",
  },
  "bsv": {
    "hp": "Azurill",
    "atk": "Shinx / Yungoos",
    "def": "Scatterbug / Tarountula",
    "spa": "Psyduck / Mareep",
    "spd": "Spoink",
    "spe": "Fletchling / Rookidee",
  }
}

const usePkrs = {
  "main": false,
  "ebr": false,
  "bsv": true,
  "bss": true,
  "jobs": true
}

const useItems = {
  "main": false,
  "ebr": false,
  "bsv": true,
  "bss": true,
  "jobs": true
}
