import { PackageSelectionState } from 'sliver-builder-common';

export interface PackageConfig {
  priority: number,
  type: string,
  defaultMode: PackageSelectionState,
  cards?: string[],
  scryType?: string
}


const config: { packages: { [name: string]: PackageConfig } } = {
  packages: {
    commanders: {
      priority: 0,
      type: 'radio',
      defaultMode: PackageSelectionState.Manual,
      cards: [
        "Sliver Hivelord",
        "Sliver Legion",
        "Sliver Overlord",
        "Sliver Queen",
        "The First Sliver"
      ]
    },
    slivers: {
      priority: 2,
      type: 'checkbox',
      defaultMode: PackageSelectionState.None,
      cards: [
        "Acidic Sliver",
        "Armor Sliver",
        "Barbed Sliver",
        "Basal Sliver",
        "Battering Sliver",
        "Battle Sliver",
        "Belligerent Sliver",
        "Bladeback Sliver",
        "Blade Sliver",
        "Blur Sliver",
        "Bonescythe Sliver",
        "Bonesplitter Sliver",
        "Brood Sliver",
        "Cautery Sliver",
        "Cleaving Sliver",
        "Clot Sliver",
        "Cloudshredder Sliver",
        "Constricting Sliver",
        "Crypt Sliver",
        "Crystalline Sliver",
        "Darkheart Sliver",
        "Dementia Sliver",
        "Diffusion Sliver",
        "Dormant Sliver",
        "Dregscape Sliver",
        "Enduring Sliver",
        "Essence Sliver",
        "Firewake Sliver",
        "First Sliver's Chosen",
        "Frenetic Sliver",
        "Frenzy Sliver",
        "Fungus Sliver",
        "Fury Sliver",
        "Galerider Sliver",
        "Gemhide Sliver",
        "Ghostflame Sliver",
        "Groundshaker Sliver",
        "Harmonic Sliver",
        "Heart Sliver",
        "Hibernation Sliver",
        "Hollowhead Sliver",
        "Homing Sliver",
        "Horned Sliver",
        "Hunter Sliver",
        "Lancer Sliver",
        "Lavabelly Sliver",
        "Leeching Sliver",
        "Lymph Sliver",
        "Magma Sliver",
        "Manaweft Sliver",
        "Megantic Sliver",
        "Mesmeric Sliver",
        "Metallic Sliver",
        "Might Sliver",
        "Mindlash Sliver",
        "Mindwhip Sliver",
        "Mistform Sliver",
        "Mnemonic Sliver",
        "Muscle Sliver",
        "Necrotic Sliver",
        "Opaline Sliver",
        "Plague Sliver",
        "Plated Sliver",
        "Poultice Sliver",
        "Predatory Sliver",
        "Psionic Sliver",
        "Pulmonic Sliver",
        "Quick Sliver",
        "Quilled Sliver",
        "Reflex Sliver",
        "Root Sliver",
        "Screeching Sliver",
        "Scuttling Sliver",
        "Sedge Sliver",
        "Sentinel Sliver",
        "Shadow Sliver",
        "Shifting Sliver",
        "Sidewinder Sliver",
        "Sinew Sliver",
        "Sliver Construct",
        "Sliver Hivelord",
        "Sliver Legion",
        "Sliver Overlord",
        "Sliver Queen",
        "Spectral Sliver",
        "Spined Sliver",
        "Spinneret Sliver",
        "Spiteful Sliver",
        "Spitting Sliver",
        "Steelform Sliver",
        "Striking Sliver",
        "Synapse Sliver",
        "Synchronous Sliver",
        "Syphon Sliver",
        "Talon Sliver",
        "Telekinetic Sliver",
        "Tempered Sliver",
        "The First Sliver",
        "Thorncaster Sliver",
        "Toxin Sliver",
        "Two-Headed Sliver",
        "Vampiric Sliver",
        "Venom Sliver",
        "Venser's Sliver",
        "Victual Sliver",
        "Virulent Sliver",
        "Ward Sliver",
        "Watcher Sliver",
        "Winged Sliver"

      ]
    },
    rocks: {
      priority: 9,
      type: 'checkbox',
      defaultMode: PackageSelectionState.Manual,
      cards: [
        "sol ring", "mana crypt", "mana vault", "arcane signet", "commmander sphere",
        "grim monolith", "chrome mox", "mox diamond"
      ]
    },
    // test: {
    //   priority: 2,
    //   type: 'checkbox',
    //   defaultMode: PackageSelectionState.Auto,
    //   cards: [
    //     "Acidic Sliver",
    //     "Armor Sliver",
    //     "Barbed Sliver",
    //     "Basal Sliver",
    //     "Belligerent Sliver",
    //     "Bladeback Sliver",
    //     "Blade Sliver",
    //     "Blur Sliver",
    //     "Bonescythe Sliver",
    //     "Bonesplitter Sliver",
    //     "Brood Sliver",
    //     "Cautery Sliver",
    //     "Cleaving Sliver"
    //   ]
    // },

    signets: {
      priority: 10,
      type: 'checkbox',
      defaultMode: PackageSelectionState.Auto,
      cards: [
        "Azorius Signet",
        "Boros Signet",
        "Dimir Signet",
        "Golgari Signet",
        "Gruul Signet",
        "Izzet Signet",
        "Orzhov Signet",
        "Rakdos Signet",
        "Selesnya Signet",
        "Simic Signet"
      ]
    },
    talismans: {
      priority: 10,
      type: 'checkbox',
      defaultMode: PackageSelectionState.Auto,
      cards: [
        "Talisman of Conviction",
        "Talisman of Creativity",
        "Talisman of Curiosity",
        "Talisman of Dominance",
        "Talisman of Hierarchy",
        "Talisman of Impulse",
        "Talisman of Indulgence",
        "Talisman of Progress",
        "Talisman of Resilience",
        "Talisman of Unity"
      ]
    },
    suspend: {
      priority: 1,
      type: 'checkbox',
      defaultMode: PackageSelectionState.Auto,
      cards: [
        "Ancestral Vision",
        "Crashing Footfalls",
        "Hypergenesis",
        "Living End",
        "Lotus Bloom",
        "Mox Tantalite",
        "Restore Balance",
        "Wheel of Fate"
      ]
    },
    // lands: {
    //   priority: 20,
    //   type: 'subset',
    //   defaultMode: null,
    //   children:
    //   {
    // 'dual': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'fetchland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.Auto },
    // 'shockland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.Auto },
    // 'tangoland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'bikeland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'fastland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'checkland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'canopyland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'filterland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'bounceland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'painland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'scryland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'shadowland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'storageland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'creatureland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'triland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None },
    // 'gainland': { type: 'checkbox', scryType: 'nickname', defaultMode: PackageSelectionState.None }
    // }
    // }

  }
}


export { config };