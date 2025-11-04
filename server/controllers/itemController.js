import itemModel from "../models/itemModel";

const wikiLink = "https://www.realmeye.com/wiki/";
const categories = ["weapons", "ability-items", "armor", "rings"];
const subcategories = [
  "daggers",
  "dual-blades",
  "bows",
  "longbows",
  "staves",
  "spellblades",
  "wands",
  "morning-stars",
  "swords",
  "flails",
  "katanas",
  "tachis",
  "cloaks",
  "quivers",
  "spells",
  "tomes",
  "helms",
  "shields",
  "seals",
  "poisons",
  "skulls",
  "traps",
  "orbs",
  "prisms",
  "scepters",
  "stars",
  "wakizashi",
  "lutes",
  "maces",
  "sheaths",
  "leather-armors",
  "robes",
  "heavy-armors",
  "health-rings",
  "magic-rings",
  "attack-rings",
  "defense-rings",
  "speed-rings",
  "dexterity-rings",
  "vitality-rings",
  "wisdom-rings",
  "untiered-rings",
  "limited-rings",
];

// Webscrape Realmeye and add item data to MongoDB
const scrapeItemData = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error: " + error.message,
    });
  }
};
