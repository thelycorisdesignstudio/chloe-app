/**
 * Venue generator — produces 400+ additional activities with diverse images.
 * Uses a seeded PRNG for deterministic output.
 */
import type { Activity } from './activities';

// ─── Seeded PRNG (mulberry32) ──────────────────────────────
function mulberry32(seed: number) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(42);
const pick = <T>(arr: T[]): T => arr[Math.floor(rand() * arr.length)];
const pickN = <T>(arr: T[], n: number): T[] => {
  const shuffled = [...arr].sort(() => rand() - 0.5);
  return shuffled.slice(0, n);
};
const randInt = (min: number, max: number) => Math.floor(rand() * (max - min + 1)) + min;
const randFloat = (min: number, max: number, decimals = 1) => Number((rand() * (max - min) + min).toFixed(decimals));

// ─── Diverse image pools (8-12 per category) ──────────────
const images: Record<string, string[]> = {
  "Indoor Play": [
    "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800",
    "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800",
    "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800",
    "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800",
    "https://images.unsplash.com/photo-1564429238961-bf8bb6c36a13?w=800",
    "https://images.unsplash.com/photo-1560968747-13c10cfddcac?w=800",
    "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=800",
  ],
  "Parks & Playgrounds": [
    "https://images.unsplash.com/photo-1584903337677-789a8115669d?w=800",
    "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?w=800",
    "https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800",
    "https://images.unsplash.com/photo-1575783970733-1aaedde1db74?w=800",
    "https://images.unsplash.com/photo-1597843786411-a7fa8ad44a95?w=800",
    "https://images.unsplash.com/photo-1560103045-bae0f44fae0e?w=800",
    "https://images.unsplash.com/photo-1564429238961-bf8bb6c36a13?w=800",
    "https://images.unsplash.com/photo-1548690395-1e1af05a4e8e?w=800",
    "https://images.unsplash.com/photo-1573557048657-61b79f10e8e5?w=800",
  ],
  "Beaches": [
    "https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=800",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
    "https://images.unsplash.com/photo-1473116763249-2faaef81ccda?w=800",
    "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=800",
    "https://images.unsplash.com/photo-1501949997128-2fdb239f0cdb?w=800",
    "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
    "https://images.unsplash.com/photo-1520942702018-0862200e6873?w=800",
  ],
  "Museums & Attractions": [
    "https://images.unsplash.com/photo-1542708993627-b6e5bbae43c4?w=800",
    "https://images.unsplash.com/photo-1523321516086-42777161b979?w=800",
    "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800",
    "https://images.unsplash.com/photo-1503152394-c571994fd383?w=800",
    "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800",
    "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800",
    "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
    "https://images.unsplash.com/photo-1610642372651-fe6e7bc547c7?w=800",
  ],
  "Water Parks": [
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800",
    "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=800",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    "https://images.unsplash.com/photo-1560968747-13c10cfddcac?w=800",
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800",
    "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=800",
    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800",
    "https://images.unsplash.com/photo-1584903337677-789a8115669d?w=800",
  ],
  "Theme Parks": [
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800",
    "https://images.unsplash.com/photo-1560968747-13c10cfddcac?w=800",
    "https://images.unsplash.com/photo-1536768139911-e290a59011e4?w=800",
    "https://images.unsplash.com/photo-1569974507005-6dc61f97fb5c?w=800",
    "https://images.unsplash.com/photo-1587654780291-39c9404d7dd0?w=800",
    "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800",
    "https://images.unsplash.com/photo-1514477917009-389c76a86b68?w=800",
  ],
  "Outdoor Adventures": [
    "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
    "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
    "https://images.unsplash.com/photo-1533130061792-64b345e4a833?w=800",
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800",
    "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
  ],
  "Zoos & Wildlife": [
    "https://images.unsplash.com/photo-1543336780-6927d78070d6?w=800",
    "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?w=800",
    "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=800",
    "https://images.unsplash.com/photo-1503919005314-30d93d07d823?w=800",
    "https://images.unsplash.com/photo-1456926631375-92c8ce872def?w=800",
    "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800",
    "https://images.unsplash.com/photo-1590691566903-692bf5ca7493?w=800",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800",
  ],
  "Shopping & Entertainment": [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800",
    "https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?w=800",
    "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800",
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
    "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800",
    "https://images.unsplash.com/photo-1555992643-1d06dba5e513?w=800",
    "https://images.unsplash.com/photo-1581467655410-0c2bf55d9d6c?w=800",
  ],
  "Sports & Recreation": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
    "https://images.unsplash.com/photo-1461896836934-bd45ba8fcde2?w=800",
    "https://images.unsplash.com/photo-1526232761682-d26e03ac148e?w=800",
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800",
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=800",
    "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800",
  ],
  "Educational Centers": [
    "https://images.unsplash.com/photo-1542708993627-b6e5bbae43c4?w=800",
    "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800",
    "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=800",
    "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800",
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=800",
    "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
  ],
  "Restaurants & Cafes": [
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800",
    "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800",
    "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800",
    "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800",
    "https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=800",
  ],
  "Libraries & Books": [
    "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800",
    "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800",
    "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=800",
    "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800",
    "https://images.unsplash.com/photo-1529148482759-b35b25c5f217?w=800",
    "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800",
    "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800",
    "https://images.unsplash.com/photo-1568667256549-094345857637?w=800",
  ],
  "Art & Culture": [
    "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800",
    "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800",
    "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800",
    "https://images.unsplash.com/photo-1482160549825-59d1b23cb208?w=800",
    "https://images.unsplash.com/photo-1536924940564-5ee5b6b1570f?w=800",
    "https://images.unsplash.com/photo-1499781350541-7783f6c6a0c8?w=800",
    "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800",
    "https://images.unsplash.com/photo-1554907984-15263bfd63bd?w=800",
  ],
  "Swimming Pools": [
    "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800",
    "https://images.unsplash.com/photo-1575429198097-0414ec08e8cd?w=800",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
    "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800",
    "https://images.unsplash.com/photo-1525183995014-bd94c0750cd5?w=800",
    "https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800",
    "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=800",
  ],
  "Desert Activities": [
    "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?w=800",
    "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?w=800",
    "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800",
    "https://images.unsplash.com/photo-1542401886-65d6c61db217?w=800",
    "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800",
    "https://images.unsplash.com/photo-1504730655501-24b78ba1f1e3?w=800",
    "https://images.unsplash.com/photo-1533591380348-14193f1de18f?w=800",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800",
  ],
  "Historic Sites": [
    "https://images.unsplash.com/photo-1549944850-84e00be4203b?w=800",
    "https://images.unsplash.com/photo-1539768942893-daf53e736b68?w=800",
    "https://images.unsplash.com/photo-1547483238-f400e65ccd56?w=800",
    "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?w=800",
    "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800",
    "https://images.unsplash.com/photo-1548013146-72479768bada?w=800",
    "https://images.unsplash.com/photo-1564769662533-4f00a87b4056?w=800",
    "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800",
  ],
  "Cinemas": [
    "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
    "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800",
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800",
    "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800",
    "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800",
    "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=800",
    "https://images.unsplash.com/photo-1460881680858-30d872d5b530?w=800",
    "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800",
  ],
  "Bowling & Games": [
    "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800",
    "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=800",
    "https://images.unsplash.com/photo-1566140967404-b8b3932483f5?w=800",
    "https://images.unsplash.com/photo-1626716493137-b67fe9501e76?w=800",
    "https://images.unsplash.com/photo-1560968747-13c10cfddcac?w=800",
    "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800",
    "https://images.unsplash.com/photo-1514477917009-389c76a86b68?w=800",
  ],
};

// ─── Areas per region ──────────────────────────────────────
const areas: Record<string, string[]> = {
  Dubai: ["Dubai Marina", "JBR", "Downtown Dubai", "DIFC", "Al Quoz", "Al Barsha", "Jumeirah", "Business Bay", "Al Karama", "Deira", "Bur Dubai", "Silicon Oasis", "Sports City", "Motor City", "Dubai Hills", "Mirdif", "Oud Metha", "Palm Jumeirah", "City Walk", "Dubai Mall", "Festival City", "JLT", "Creek Harbour", "Al Safa", "Zabeel"],
  "Abu Dhabi": ["Yas Island", "Saadiyat Island", "Corniche", "Al Reem Island", "Al Maryah Island", "Khalifa City", "Al Raha", "Al Bateen", "Tourist Club Area", "Al Mushrif", "Al Wahda", "Masdar City", "Al Ain", "Al Shamkha", "Al Reef"],
  Sharjah: ["Al Majaz", "Al Khan", "Al Nahda", "Al Qasimia", "Muwaileh", "University City", "Al Taawun", "Sharjah Corniche", "Al Mamzar", "Kalba"],
  Ajman: ["Al Nuaimiya", "Al Rashidiya", "Ajman Corniche", "Al Jurf", "Al Rawda", "Emirates City"],
  "Ras Al Khaimah": ["Al Hamra", "Al Nakheel", "Marjan Island", "Jebel Jais", "Al Jazeera", "RAK City Centre"],
  Fujairah: ["Fujairah City", "Dibba", "Al Bidya", "Kalba", "Al Aqah", "Masafi"],
  "Umm Al Quwain": ["UAQ City", "Al Salama", "Dreamland", "Al Raas", "Falaj Al Mualla"],
  Riyadh: ["Olaya", "Al Malaz", "Al Nakheel", "Al Rawdah", "Al Muruj", "Diplomatic Quarter", "King Abdullah Financial District", "Al Thumama"],
  Jeddah: ["Al Balad", "Corniche", "Al Rawdah", "Al Andalus", "Al Shati", "Obhur", "Al Hamra", "Red Sea Mall"],
  Makkah: ["Al Haram", "Aziziyah", "Al Shisha", "Al Awali"],
  Madinah: ["Al Haram", "Quba", "Al Aqiq", "King Fahd Road"],
  Dammam: ["Corniche", "Al Faisaliah", "Al Shati", "Al Aziziyah"],
  Khobar: ["Corniche", "Al Khobar North", "Al Aqrabiyah", "Half Moon Bay"],
  Doha: ["The Pearl", "Lusail", "West Bay", "Katara", "Souq Waqif", "Al Sadd", "Msheireb", "Education City"],
  "Al Wakrah": ["Al Wakrah Souq", "Al Wakrah Beach", "Al Wukair"],
  Lusail: ["Marina District", "Fox Hills", "Lusail Boulevard"],
  "Kuwait City": ["Salmiya", "Hawalli", "Mishref", "Bayan", "Abu Halifa", "Shaab", "Marina Mall", "The Avenues"],
  Manama: ["Juffair", "Adliya", "Seef", "Bahrain Bay", "Muharraq", "Amwaj Islands"],
  Muscat: ["Al Qurum", "Muscat Hills", "Bawshar", "MQ", "Ruwi", "Seeb"],
  Salalah: ["Al Haffa", "Al Baleed", "Al Mughsail"],
  Amman: ["Abdoun", "Sweifieh", "Rainbow Street", "Al Hussein", "Jabal Amman"],
  Aqaba: ["South Beach", "Tala Bay", "Ayla Oasis"],
  Cairo: ["Zamalek", "Maadi", "New Cairo", "6th of October", "Heliopolis", "Downtown"],
  Alexandria: ["Montaza", "Stanley", "Sidi Gaber", "Corniche"],
  "Sharm El Sheikh": ["Naama Bay", "Sharks Bay", "Ras Mohamed"],
};

// ─── Venue name templates per category ─────────────────────
const nameTemplates: Record<string, string[]> = {
  "Indoor Play": [
    "Little Stars Play Center", "Jungle Joy Indoor Park", "Happy Feet Play Zone",
    "Tiny Town Adventure Center", "Rainbow Play Palace", "Kidz Galaxy Play Center",
    "Fun Factory Indoor Park", "Little Legends Play Area", "Wonderland Kids Zone",
    "Super Stars Entertainment", "Play Planet", "Giggle Garden",
    "Kiddo's Kingdom", "Little Movers Play Space", "Tiny Treasures Play Zone",
  ],
  "Parks & Playgrounds": [
    "Green Oasis Park", "Family Garden Park", "Central Playground",
    "Children's Paradise Park", "Sunset Park", "Lakeside Park",
    "Community Recreation Park", "Nature's Playground", "Heritage Garden",
    "Palm Grove Park", "Riverside Park", "Victory Garden",
    "Jubilee Park", "Al Noor Garden", "Botanical Garden Park",
  ],
  "Beaches": [
    "Sunset Beach", "Coral Beach", "Golden Sands Beach",
    "Palm Beach Club", "Crystal Beach", "Seashell Beach",
    "Marina Beach", "Lagoon Beach", "Breeze Beach Club",
    "Pearl Beach", "Blue Flag Beach", "Coastline Beach Park",
  ],
  "Museums & Attractions": [
    "Discovery Science Museum", "Children's Art Museum", "Interactive World Museum",
    "Heritage House Museum", "Maritime Museum", "Natural History Museum",
    "Innovation Center", "Cultural Heritage Center", "Space Discovery Center",
    "Observation Tower", "Aquarium & Marine Center", "Wax Museum",
  ],
  "Water Parks": [
    "Splash Zone Water Park", "Aqua Fun Water Park", "Wave Rider Water Park",
    "Crystal Lagoon Water Park", "Blue Lagoon Water Park", "Oasis Water Park",
    "Splash & Play Water Park", "Tsunami Water Park", "Coral Reef Water Park",
  ],
  "Theme Parks": [
    "Adventure World", "Fantasy Land", "Fun City Theme Park",
    "Magic Kingdom Park", "Galaxy Theme Park", "Carnival World",
    "Joy Land Adventure Park", "Wonder World", "Dream Park",
  ],
  "Outdoor Adventures": [
    "Adventure Trail Park", "Mountain Explorer Center", "Zipline Adventure Park",
    "Kayak & Canoe Center", "Rock Climbing Center", "Nature Trail Adventures",
    "Desert Adventure Camp", "Jungle Adventure Park", "Treetop Explorer",
  ],
  "Zoos & Wildlife": [
    "Wildlife Sanctuary", "Safari Park", "Animal Discovery Center",
    "Petting Zoo & Farm", "Bird Sanctuary", "Butterfly Garden",
    "Marine Life Center", "Exotic Animal Farm", "Nature Reserve",
  ],
  "Shopping & Entertainment": [
    "Family Fun Mall", "Entertainment Plaza", "Kids Shopping World",
    "Festival Market", "Lifestyle Mall", "Family Souk",
    "The Galleria", "Family Hub Mall", "Toy World Store",
  ],
  "Sports & Recreation": [
    "Family Sports Club", "Ice Skating Arena", "Climbing Gym",
    "Junior Gymnastics Center", "Multi-Sport Academy", "Tennis Academy for Kids",
    "Football Academy", "Swimming Academy", "Martial Arts Center",
    "BMX & Skate Park", "Junior Golf Academy", "Dance Studio",
  ],
  "Educational Centers": [
    "Little Innovators Lab", "STEM Discovery Center", "Young Explorers Academy",
    "Science & Art Workshop", "Coding Academy for Kids", "Robotics Lab",
    "Nature Learning Center", "Space Education Center", "Creative Kids Academy",
    "Junior Engineer Lab", "Math & Science Hub", "Language & Culture Center",
  ],
  "Restaurants & Cafes": [
    "Family Bites Cafe", "Little Chef Restaurant", "Kids Corner Cafe",
    "The Family Table", "Happy Tummy Restaurant", "Tiny Bakers Cafe",
    "Sweet Dreams Dessert Lounge", "Healthy Kids Kitchen", "Pizza Planet Family",
    "The Pancake House", "Smoothie & Juice Bar", "Family Brunch Spot",
  ],
  "Libraries & Books": [
    "Story Time Library", "Children's Reading Room", "Book Worm Library",
    "Little Readers Corner", "Knowledge Hub Library", "Community Library",
    "Digital Library & Media Center", "Young Authors Library",
  ],
  "Art & Culture": [
    "Creative Canvas Studio", "Art Lab for Kids", "Cultural Arts Center",
    "Pottery & Clay Workshop", "Music Academy for Kids", "Theater & Drama School",
    "Photography Workshop", "Dance & Movement Studio", "Craft Workshop",
  ],
  "Swimming Pools": [
    "Aqua Kids Swimming Center", "Family Pool Club", "Splash & Swim Center",
    "Olympic Swim Academy", "Beach Club Pool", "Resort Pool & Spa",
    "Community Swimming Center", "Junior Swim School", "Lagoon Pool Club",
  ],
  "Desert Activities": [
    "Desert Safari Camp", "Bedouin Experience Camp", "Dune Adventure Tours",
    "Sandboarding Center", "Camel Riding Experience", "Desert Glamping Resort",
    "Falconry Experience Center", "Desert Nature Reserve", "Stargazing Camp",
  ],
  "Historic Sites": [
    "Heritage Village", "Old Town Walking Tour", "Archaeological Site",
    "Historic Fort", "Traditional Souk Tour", "Cultural Quarter",
    "Ancient Ruins Park", "Maritime Heritage Center", "Pearl Diving Museum",
  ],
  "Cinemas": [
    "Family Cinema Complex", "Kids Movie Theater", "Premium Cinema",
    "IMAX Experience Center", "Drive-In Cinema", "Outdoor Movie Night",
    "VIP Cinema Lounge", "4DX Cinema Experience",
  ],
  "Bowling & Games": [
    "Strike Zone Bowling", "Family Bowling Alley", "Arcade & Bowling Center",
    "Game Zone Family Center", "Laser Tag Arena", "Escape Room Adventures",
    "Virtual Reality Gaming Center", "Mini Golf & Games", "Go Kart Racing Center",
  ],
};

// ─── Feature/amenity pools per category ────────────────────
const featuresByCategory: Record<string, string[]> = {
  "Indoor Play": ["Soft Play", "Ball Pit", "Slides", "Climbing Walls", "Trampoline", "Role Play", "Baby Zone", "Sensory Play", "Building Blocks", "Art Corner", "Obstacle Course", "Mini Cars"],
  "Parks & Playgrounds": ["Playgrounds", "Jogging Track", "Cycling Path", "BBQ Areas", "Lake", "Fountain", "Flower Garden", "Sports Courts", "Skating Area", "Picnic Areas", "Dog Park"],
  "Beaches": ["Swimming", "Water Sports", "Playground", "Food Trucks", "Volleyball", "Showers", "Lifeguards", "Kayaking", "Paddleboarding", "Beach Toys Rental"],
  "Museums & Attractions": ["Interactive Exhibits", "Guided Tours", "VR Experiences", "Gift Shop", "Workshops", "Planetarium", "4D Cinema", "Science Lab", "Art Gallery"],
  "Water Parks": ["Water Slides", "Wave Pool", "Lazy River", "Kids Area", "Splash Pad", "Tube Rides", "Speed Slides", "Family Raft Ride"],
  "Theme Parks": ["Thrill Rides", "Family Rides", "Shows & Entertainment", "Character Meet", "Haunted House", "Carousel", "Bumper Cars", "Roller Coaster"],
  "Outdoor Adventures": ["Zip Lines", "Rock Climbing", "Obstacle Course", "Hiking Trails", "Kayaking", "Mountain Biking", "Archery", "Nature Walks"],
  "Zoos & Wildlife": ["Animal Feeding", "Safari Tour", "Petting Zoo", "Bird Shows", "Reptile House", "Nocturnal Animals", "Marine Life", "Educational Programs"],
  "Shopping & Entertainment": ["Kids Zone", "Arcade", "Cinema", "Food Court", "Toy Stores", "Family Lounge", "Events Area", "Ice Rink"],
  "Sports & Recreation": ["Swimming", "Tennis", "Football", "Basketball", "Gymnastics", "Ice Skating", "Rock Climbing", "Martial Arts", "Dance Classes"],
  "Educational Centers": ["Science Lab", "Robotics", "Coding Classes", "Art Workshop", "Music Room", "Library", "Planetarium", "Nature Garden", "STEM Activities"],
  "Restaurants & Cafes": ["Kids Menu", "Play Area", "High Chairs", "Birthday Packages", "Healthy Options", "Outdoor Seating", "Private Dining"],
  "Libraries & Books": ["Story Time", "Reading Nooks", "Computer Lab", "Study Rooms", "Children's Section", "Audio Books", "Book Club"],
  "Art & Culture": ["Art Classes", "Pottery", "Music Lessons", "Dance", "Theater", "Photography", "Sculpture", "Cultural Events"],
  "Swimming Pools": ["Kids Pool", "Olympic Pool", "Lessons", "Water Slides", "Jacuzzi", "Pool Toys", "Swim Academy", "Aqua Aerobics"],
  "Desert Activities": ["Dune Bashing", "Camel Rides", "Sandboarding", "BBQ Dinner", "Falconry", "Stargazing", "Henna Painting", "Cultural Show"],
  "Historic Sites": ["Guided Tours", "Museum", "Archaeological Exhibits", "Traditional Architecture", "Gift Shop", "Cultural Programs"],
  "Cinemas": ["IMAX", "4DX", "Kids Cinema", "VIP Lounge", "Snack Bar", "Dine-In"],
  "Bowling & Games": ["Bowling Lanes", "Arcade Games", "Laser Tag", "Mini Golf", "VR Games", "Escape Rooms", "Go Karts", "Pool Tables"],
};

const amenityPool = [
  "Restrooms", "Cafe", "Parking", "Wi-Fi", "Prayer Room", "Baby Changing",
  "First Aid", "Lockers", "Gift Shop", "Party Rooms", "Stroller Rental",
  "ATM", "Food Court", "Accessibility Ramp", "Nursing Room",
];

const allDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
const weekends = ["Friday", "Saturday"];

const tagsByCategory: Record<string, string[]> = {
  "Indoor Play": ["indoor", "play", "kids", "toddler", "birthday-parties", "soft-play", "entertainment", "rainy-day"],
  "Parks & Playgrounds": ["park", "outdoor", "playground", "free", "picnic", "nature", "cycling", "family"],
  "Beaches": ["beach", "swimming", "outdoor", "free", "water-sports", "family", "sunset", "coastal"],
  "Museums & Attractions": ["museum", "educational", "interactive", "cultural", "history", "science", "art"],
  "Water Parks": ["waterpark", "slides", "swimming", "outdoor", "summer", "family", "splash", "adventure"],
  "Theme Parks": ["theme-park", "rides", "entertainment", "attractions", "family", "adventure", "fun"],
  "Outdoor Adventures": ["adventure", "outdoor", "hiking", "climbing", "nature", "active", "exploration"],
  "Zoos & Wildlife": ["animals", "wildlife", "zoo", "nature", "educational", "safari", "birds"],
  "Shopping & Entertainment": ["shopping", "mall", "entertainment", "family", "dining", "arcade"],
  "Sports & Recreation": ["sports", "fitness", "active", "swimming", "skating", "lessons", "team-sports"],
  "Educational Centers": ["educational", "stem", "science", "learning", "workshops", "coding", "robotics"],
  "Restaurants & Cafes": ["dining", "family-restaurant", "cafe", "kids-menu", "healthy", "brunch"],
  "Libraries & Books": ["reading", "books", "educational", "quiet", "storytime", "free", "community"],
  "Art & Culture": ["art", "culture", "creative", "music", "dance", "theater", "workshops"],
  "Swimming Pools": ["swimming", "pool", "lessons", "fitness", "water", "family", "recreation"],
  "Desert Activities": ["desert", "safari", "adventure", "arabian", "outdoor", "cultural", "camping"],
  "Historic Sites": ["history", "heritage", "cultural", "architecture", "museum", "educational", "free"],
  "Cinemas": ["cinema", "movies", "entertainment", "family", "imax", "kids"],
  "Bowling & Games": ["bowling", "arcade", "games", "entertainment", "family", "laser-tag", "fun"],
};

// ─── Currency per country ──────────────────────────────────
const currencyMap: Record<string, string> = {
  UAE: "AED", KSA: "SAR", QAT: "QAR", KWT: "KWD", BHR: "BHD", OMN: "OMR", JOR: "JOD", EGY: "EGP",
};

// ─── Regions per country (for generation) ──────────────────
const regionsByCountry: Record<string, string[]> = {
  UAE: ["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"],
  KSA: ["Riyadh", "Jeddah", "Makkah", "Madinah", "Dammam", "Khobar"],
  QAT: ["Doha", "Al Wakrah", "Lusail"],
  KWT: ["Kuwait City"],
  BHR: ["Manama"],
  OMN: ["Muscat", "Salalah"],
  JOR: ["Amman", "Aqaba"],
  EGY: ["Cairo", "Alexandria", "Sharm El Sheikh"],
};

// ─── Pricing config per category ───────────────────────────
const pricingByCategory: Record<string, { type: 'free' | 'paid' | 'mixed'; minChild: number; maxChild: number; minAdult: number; maxAdult: number }> = {
  "Indoor Play": { type: 'paid', minChild: 40, maxChild: 150, minAdult: 0, maxAdult: 50 },
  "Parks & Playgrounds": { type: 'free', minChild: 0, maxChild: 10, minAdult: 0, maxAdult: 10 },
  "Beaches": { type: 'free', minChild: 0, maxChild: 0, minAdult: 0, maxAdult: 0 },
  "Museums & Attractions": { type: 'paid', minChild: 20, maxChild: 135, minAdult: 30, maxAdult: 150 },
  "Water Parks": { type: 'paid', minChild: 100, maxChild: 300, minAdult: 150, maxAdult: 350 },
  "Theme Parks": { type: 'paid', minChild: 100, maxChild: 300, minAdult: 150, maxAdult: 350 },
  "Outdoor Adventures": { type: 'paid', minChild: 50, maxChild: 200, minAdult: 75, maxAdult: 250 },
  "Zoos & Wildlife": { type: 'paid', minChild: 30, maxChild: 100, minAdult: 50, maxAdult: 130 },
  "Shopping & Entertainment": { type: 'mixed', minChild: 30, maxChild: 100, minAdult: 30, maxAdult: 100 },
  "Sports & Recreation": { type: 'paid', minChild: 50, maxChild: 150, minAdult: 60, maxAdult: 150 },
  "Educational Centers": { type: 'paid', minChild: 30, maxChild: 100, minAdult: 0, maxAdult: 50 },
  "Restaurants & Cafes": { type: 'paid', minChild: 30, maxChild: 80, minAdult: 50, maxAdult: 150 },
  "Libraries & Books": { type: 'free', minChild: 0, maxChild: 0, minAdult: 0, maxAdult: 0 },
  "Art & Culture": { type: 'paid', minChild: 40, maxChild: 120, minAdult: 50, maxAdult: 150 },
  "Swimming Pools": { type: 'paid', minChild: 30, maxChild: 80, minAdult: 40, maxAdult: 100 },
  "Desert Activities": { type: 'paid', minChild: 80, maxChild: 200, minAdult: 100, maxAdult: 250 },
  "Historic Sites": { type: 'free', minChild: 0, maxChild: 30, minAdult: 0, maxAdult: 50 },
  "Cinemas": { type: 'paid', minChild: 30, maxChild: 60, minAdult: 40, maxAdult: 80 },
  "Bowling & Games": { type: 'paid', minChild: 40, maxChild: 100, minAdult: 50, maxAdult: 120 },
};

// ─── Description templates ─────────────────────────────────
function generateDescription(name: string, category: string, area: string, region: string, features: string[]): string {
  const featureList = features.slice(0, 3).join(', ');
  const templates = [
    `${name} is a popular ${category.toLowerCase()} destination in ${area}, ${region}. Featuring ${featureList}, it offers an excellent experience for families with children of all ages. A must-visit for parents looking for quality time with their kids.`,
    `Located in the heart of ${area}, ${name} provides a fantastic ${category.toLowerCase()} experience. With ${featureList} and more, families can enjoy hours of fun and entertainment. Clean, well-maintained, and perfect for a day out.`,
    `Discover ${name} in ${area}, ${region} — a premier ${category.toLowerCase()} venue. Highlights include ${featureList}. Whether you're looking for adventure, education, or relaxation, this destination has something for every family member.`,
    `${name} offers a wonderful ${category.toLowerCase()} experience in ${area}. Known for its ${featureList}, the venue is a favorite among local families. Great atmosphere, friendly staff, and plenty of activities to keep children engaged.`,
  ];
  return pick(templates);
}

function generateShortDescription(name: string, category: string, features: string[]): string {
  const feat = features[0] || 'family activities';
  const templates = [
    `Family-friendly ${category.toLowerCase()} with ${feat.toLowerCase()}`,
    `Popular ${category.toLowerCase()} venue for all ages`,
    `${feat} and more for families`,
    `Top-rated ${category.toLowerCase()} destination`,
    `Fun-filled ${category.toLowerCase()} for kids and families`,
  ];
  return pick(templates);
}

// ─── Main generator ────────────────────────────────────────
export function generateVenues(): Activity[] {
  const generated: Activity[] = [];
  const allCategories = Object.keys(nameTemplates);
  let counter = 0;

  // Distribution: heavy on UAE (~60%), then KSA (~15%), QAT (~8%), rest split
  const countryWeights: [string, number][] = [
    ["UAE", 240], ["KSA", 60], ["QAT", 35], ["KWT", 15], ["BHR", 15], ["OMN", 15], ["JOR", 12], ["EGY", 12],
  ];

  for (const [countryCode, targetCount] of countryWeights) {
    const countryRegions = regionsByCountry[countryCode] || [];
    const currency = currencyMap[countryCode] || "AED";

    for (let i = 0; i < targetCount; i++) {
      counter++;
      const region = pick(countryRegions);
      const regionAreas = areas[region] || [region];
      const area = pick(regionAreas);
      const category = pick(allCategories);
      const names = nameTemplates[category] || ["Family Fun Center"];
      const baseName = pick(names);
      // Append area to make names more unique
      const name = `${baseName} ${area}`;
      const id = `gen-${countryCode.toLowerCase()}-${counter}`;

      const categoryImages = images[category] || images["Indoor Play"];
      const activityImages = [pick(categoryImages), pick(categoryImages)].filter((v, i, a) => a.indexOf(v) === i);

      const categoryFeatures = featuresByCategory[category] || ["Family Activities"];
      const features = pickN(categoryFeatures, randInt(3, 6));
      const amenities = pickN(amenityPool, randInt(3, 6));

      const pricing = pricingByCategory[category] || pricingByCategory["Indoor Play"];
      const isFree = pricing.type === 'free' || (pricing.type === 'mixed' && rand() > 0.5);
      const childPrice = isFree ? undefined : randInt(pricing.minChild, pricing.maxChild);
      const adultPrice = isFree ? undefined : randInt(pricing.minAdult, pricing.maxAdult);

      const ageMin = pick([0, 0, 1, 2, 3, 4]);
      const ageMax = pick([8, 10, 12, 12, 12, 14]);
      const isIndoor = ["Indoor Play", "Museums & Attractions", "Cinemas", "Bowling & Games", "Shopping & Entertainment", "Libraries & Books", "Educational Centers"].includes(category) || rand() > 0.6;

      const openTime = pick(["08:00", "09:00", "10:00", "10:00", "10:00"]);
      const closeTime = pick(["18:00", "19:00", "20:00", "21:00", "22:00", "23:00"]);
      const openDays = rand() > 0.8 ? weekdays.concat(pick(weekends) === "Friday" ? ["Friday"] : ["Saturday"]) : allDays;

      const categoryTags = tagsByCategory[category] || ["family", "fun"];
      const tags = pickN(categoryTags, randInt(3, 5));

      const rating = randFloat(3.8, 4.9);
      const reviewCount = randInt(200, 15000);

      generated.push({
        id,
        name,
        category,
        description: generateDescription(name, category, area, region, features),
        shortDescription: generateShortDescription(name, category, features),
        location: {
          country: countryCode,
          region,
          area,
          address: `${area}, ${region}`,
        },
        ageRange: { min: ageMin, max: ageMax },
        pricing: {
          type: isFree ? 'free' : 'paid',
          ...(childPrice !== undefined ? { childPrice } : {}),
          ...(adultPrice !== undefined ? { adultPrice } : {}),
          currency,
        },
        timing: { openDays, openTime, closeTime },
        features,
        amenities,
        images: activityImages,
        rating,
        reviewCount,
        isIndoor,
        isFamilyFriendly: true,
        hasParking: rand() > 0.15,
        isWheelchairAccessible: rand() > 0.25,
        tags,
      });
    }
  }

  return generated;
}
