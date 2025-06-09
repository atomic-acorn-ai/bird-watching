
export interface BirdSpecies {
  id: string;
  commonName: string;
  scientificName: string;
  family: string;
  habitat: string[];
  size: string;
  description?: string;
}

export const birdSpecies: BirdSpecies[] = [
  // Common North American Birds
  {
    id: "american-robin",
    commonName: "American Robin",
    scientificName: "Turdus migratorius",
    family: "Thrushes",
    habitat: ["Woodland", "Gardens", "Parks"],
    size: "Medium",
    description: "Gray-brown bird with warm orange underparts and dark head"
  },
  {
    id: "northern-cardinal",
    commonName: "Northern Cardinal",
    scientificName: "Cardinalis cardinalis",
    family: "Cardinals",
    habitat: ["Woodland", "Gardens", "Scrubland"],
    size: "Medium",
    description: "Bright red bird (male) with prominent crest"
  },
  {
    id: "blue-jay",
    commonName: "Blue Jay",
    scientificName: "Cyanocitta cristata",
    family: "Crows",
    habitat: ["Woodland", "Parks", "Gardens"],
    size: "Medium",
    description: "Bright blue bird with white underparts and black necklace"
  },
  {
    id: "house-sparrow",
    commonName: "House Sparrow",
    scientificName: "Passer domesticus",
    family: "Sparrows",
    habitat: ["Urban", "Gardens", "Farmland"],
    size: "Small",
    description: "Small brown and gray bird, very common in urban areas"
  },
  {
    id: "mourning-dove",
    commonName: "Mourning Dove",
    scientificName: "Zenaida macroura",
    family: "Doves",
    habitat: ["Open Areas", "Gardens", "Woodland Edge"],
    size: "Medium",
    description: "Soft gray-brown dove with long pointed tail"
  },
  {
    id: "red-tailed-hawk",
    commonName: "Red-tailed Hawk",
    scientificName: "Buteo jamaicensis",
    family: "Hawks",
    habitat: ["Open Areas", "Woodland", "Desert"],
    size: "Large",
    description: "Large hawk with distinctive red tail"
  },
  {
    id: "american-goldfinch",
    commonName: "American Goldfinch",
    scientificName: "Spinus tristis",
    family: "Finches",
    habitat: ["Fields", "Gardens", "Woodland Edge"],
    size: "Small",
    description: "Bright yellow bird (male in breeding season) with black wings"
  },
  {
    id: "downy-woodpecker",
    commonName: "Downy Woodpecker",
    scientificName: "Picoides pubescens",
    family: "Woodpeckers",
    habitat: ["Woodland", "Parks", "Gardens"],
    size: "Small",
    description: "Small black and white woodpecker"
  },
  {
    id: "black-capped-chickadee",
    commonName: "Black-capped Chickadee",
    scientificName: "Poecile atricapillus",
    family: "Chickadees",
    habitat: ["Woodland", "Parks", "Gardens"],
    size: "Small",
    description: "Small bird with black cap and white cheeks"
  },
  {
    id: "bald-eagle",
    commonName: "Bald Eagle",
    scientificName: "Haliaeetus leucocephalus",
    family: "Eagles",
    habitat: ["Waterways", "Coastal", "Large Lakes"],
    size: "Very Large",
    description: "Large bird of prey with white head and tail (adults)"
  },

  // European Birds
  {
    id: "european-robin",
    commonName: "European Robin",
    scientificName: "Erithacus rubecula",
    family: "Flycatchers",
    habitat: ["Woodland", "Gardens", "Parks"],
    size: "Small",
    description: "Small brown bird with distinctive red breast"
  },
  {
    id: "house-sparrow-eu",
    commonName: "House Sparrow",
    scientificName: "Passer domesticus",
    family: "Sparrows",
    habitat: ["Urban", "Gardens", "Farmland"],
    size: "Small",
    description: "Common small brown bird found in urban areas"
  },
  {
    id: "blackbird",
    commonName: "Common Blackbird",
    scientificName: "Turdus merula",
    family: "Thrushes",
    habitat: ["Woodland", "Gardens", "Parks"],
    size: "Medium",
    description: "All-black bird (male) with bright orange beak"
  },
  {
    id: "great-tit",
    commonName: "Great Tit",
    scientificName: "Parus major",
    family: "Tits",
    habitat: ["Woodland", "Gardens", "Parks"],
    size: "Small",
    description: "Yellow breast with distinctive black stripe down the middle"
  },
  {
    id: "blue-tit",
    commonName: "Blue Tit",
    scientificName: "Cyanistes caeruleus",
    family: "Tits",
    habitat: ["Woodland", "Gardens", "Parks"],
    size: "Small",
    description: "Small bird with bright blue cap and wings"
  },

  // Tropical/Exotic Birds
  {
    id: "scarlet-macaw",
    commonName: "Scarlet Macaw",
    scientificName: "Ara macao",
    family: "Parrots",
    habitat: ["Rainforest", "Tropical Woodland"],
    size: "Very Large",
    description: "Large colorful parrot with red, yellow, and blue plumage"
  },
  {
    id: "toucan",
    commonName: "Keel-billed Toucan",
    scientificName: "Ramphastos sulfuratus",
    family: "Toucans",
    habitat: ["Rainforest", "Tropical Woodland"],
    size: "Large",
    description: "Large bird with oversized colorful beak"
  },
  {
    id: "quetzal",
    commonName: "Resplendent Quetzal",
    scientificName: "Pharomachrus mocinno",
    family: "Quetzals",
    habitat: ["Cloud Forest", "Mountain Forest"],
    size: "Medium",
    description: "Brilliant green bird with very long tail feathers"
  },

  // Water Birds
  {
    id: "mallard",
    commonName: "Mallard",
    scientificName: "Anas platyrhynchos",
    family: "Ducks",
    habitat: ["Wetlands", "Ponds", "Rivers"],
    size: "Medium",
    description: "Common duck with green head (male)"
  },
  {
    id: "great-blue-heron",
    commonName: "Great Blue Heron",
    scientificName: "Ardea herodias",
    family: "Herons",
    habitat: ["Wetlands", "Coastal", "Rivers"],
    size: "Large",
    description: "Large wading bird with long neck and legs"
  },
  {
    id: "canada-goose",
    commonName: "Canada Goose",
    scientificName: "Branta canadensis",
    family: "Geese",
    habitat: ["Wetlands", "Parks", "Fields"],
    size: "Large",
    description: "Large waterfowl with distinctive black head and white chin strap"
  },

  // Raptors
  {
    id: "peregrine-falcon",
    commonName: "Peregrine Falcon",
    scientificName: "Falco peregrinus",
    family: "Falcons",
    habitat: ["Cliffs", "Urban", "Open Areas"],
    size: "Medium",
    description: "Fast-flying falcon, world's fastest bird in a dive"
  },
  {
    id: "great-horned-owl",
    commonName: "Great Horned Owl",
    scientificName: "Bubo virginianus",
    family: "Owls",
    habitat: ["Woodland", "Desert", "Swamps"],
    size: "Large",
    description: "Large owl with prominent ear tufts"
  },

  // Songbirds
  {
    id: "eastern-bluebird",
    commonName: "Eastern Bluebird",
    scientificName: "Sialia sialis",
    family: "Thrushes",
    habitat: ["Open Areas", "Fields", "Woodland Edge"],
    size: "Small",
    description: "Bright blue bird with orange breast"
  },
  {
    id: "baltimore-oriole",
    commonName: "Baltimore Oriole",
    scientificName: "Icterus galbula",
    family: "Blackbirds",
    habitat: ["Woodland", "Parks", "Gardens"],
    size: "Medium",
    description: "Bright orange and black bird"
  },
  {
    id: "ruby-throated-hummingbird",
    commonName: "Ruby-throated Hummingbird",
    scientificName: "Archilochus colubris",
    family: "Hummingbirds",
    habitat: ["Gardens", "Woodland Edge", "Parks"],
    size: "Very Small",
    description: "Tiny iridescent bird that hovers at flowers"
  }
];
