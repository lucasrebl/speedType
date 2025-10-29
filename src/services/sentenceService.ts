export interface Sentence {
  id: number
  text: string
  difficulty: 'easy' | 'medium' | 'hard' | 'hardcore'
}

export const sentences: Sentence[] = [
  // Phrases FACILES - Mots simples, logique naturelle
  {
    id: 1,
    text: "Le chat noir saute gracieusement par-dessus la barrière blanche du jardin fleuri.",
    difficulty: 'easy'
  },
  {
    id: 2,
    text: "Ma mère prépare un bon repas chaud pour toute la famille ce soir.",
    difficulty: 'easy'
  },
  {
    id: 3,
    text: "Les enfants jouent dans la cour avec leurs amis pendant la récréation.",
    difficulty: 'easy'
  },
  {
    id: 4,
    text: "Le soleil brille fort aujourd'hui et réchauffe la terre du potager.",
    difficulty: 'easy'
  },
  {
    id: 5,
    text: "Mon père lit le journal dans son fauteuil près de la fenêtre ouverte.",
    difficulty: 'easy'
  },
  {
    id: 6,
    text: "La voiture rouge roule lentement sur la route qui mène au village.",
    difficulty: 'easy'
  },
  {
    id: 7,
    text: "Les oiseaux chantent dans les arbres verts du parc municipal.",
    difficulty: 'easy'
  },
  {
    id: 8,
    text: "Le chien court après la balle que lance son maître dans le jardin.",
    difficulty: 'easy'
  },
  {
    id: 9,
    text: "Elle mange une pomme rouge bien sucrée après avoir fini ses devoirs.",
    difficulty: 'easy'
  },
  {
    id: 10,
    text: "Les fleurs du jardin sentent bon quand arrive le printemps coloré.",
    difficulty: 'easy'
  },

  // Phrases MOYENNES - Mots plus compliqués, logique moins évidente
  {
    id: 11,
    text: "Les étoiles brillent intensément dans le ciel nocturne d'une beauté extraordinaire.",
    difficulty: 'medium'
  },
  {
    id: 12,
    text: "La musique classique apaise l'esprit et réconforte le cœur des mélomanes passionnés.",
    difficulty: 'medium'
  },
  {
    id: 13,
    text: "L'architecture gothique témoigne de la magnificence artistique des siècles passés.",
    difficulty: 'medium'
  },
  {
    id: 14,
    text: "Les photographes capturent des instants éphémères avec une précision remarquable.",
    difficulty: 'medium'
  },
  {
    id: 15,
    text: "La bibliothèque municipale organise des conférences littéraires chaque jeudi soir.",
    difficulty: 'medium'
  },
  {
    id: 16,
    text: "Les scientifiques découvrent régulièrement de nouvelles espèces marines fascinantes.",
    difficulty: 'medium'
  },
  {
    id: 17,
    text: "L'exposition présente des œuvres contemporaines aux influences multiculturelles variées.",
    difficulty: 'medium'
  },
  {
    id: 18,
    text: "Les météorologues prévoient des perturbations atmosphériques importantes cette semaine.",
    difficulty: 'medium'
  },
  {
    id: 19,
    text: "La gastronomie française rayonne internationalement grâce à ses traditions culinaires.",
    difficulty: 'medium'
  },
  {
    id: 20,
    text: "Les archéologues étudient les vestiges antiques pour comprendre les civilisations disparues.",
    difficulty: 'medium'
  },

  // Phrases DIFFICILES - Mots mélangés, aucune logique narrative
  {
    id: 21,
    text: "Un programmeur expérimenté développe des applications complexes avec une grande précision.",
    difficulty: 'hard'
  },
  {
    id: 22,
    text: "Les océans profonds cachent des créatures mystérieuses aux formes étonnantes et colorées.",
    difficulty: 'hard'
  },
  {
    id: 23,
    text: "Paradoxalement, l'entrepreneur génère des algorithmes pendant que la bicyclette philosophique ronronne.",
    difficulty: 'hard'
  },
  {
    id: 24,
    text: "L'hippopotame quantique résout des équations différentielles près du réfrigérateur silencieux.",
    difficulty: 'hard'
  },
  {
    id: 25,
    text: "Simultanément, la jurisprudence danse avec l'électroencéphalogramme sous les parapluies violets.",
    difficulty: 'hard'
  },
  {
    id: 26,
    text: "Le xylophone bureaucratique chuchote des chronologies inexplicables aux champignons vénéneux.",
    difficulty: 'hard'
  },
  {
    id: 27,
    text: "Néanmoins, l'hypoténuse gastronomique questionne la photosynthèse du microscope endormi.",
    difficulty: 'hard'
  },
  {
    id: 28,
    text: "L'anticonstitutionnellement rebondit sur les chromosomes pendant que l'aspirateur médite profondément.",
    difficulty: 'hard'
  },
  {
    id: 29,
    text: "Subséquemment, la serrurerie psychanalytique bégaie des théorèmes vers les escalators mélancoliques.",
    difficulty: 'hard'
  },
  {
    id: 30,
    text: "L'extraordinaire pharmacopée zigzague entre les triangulations et les sardines philosophiques.",
    difficulty: 'hard'
  }
]

// Liste de mots complexes pour la difficulté hardcore
const hardcoreWords = [
  "anticonstitutionnellement", "psychopharmacologie", "électroencéphalogramme", 
  "rhinolaryngologie", "otorhinolaryngologie", "neuropsychopharmacologie",
  "radiocrisatallographie", "spectrophotométrie", "chromatographie", "crystallographie",
  "pneumoencéphalographie", "ventriculocisternostomie", "choledochojejunostomie",
  "pancréaticoduodénectomie", "œsophagogastroduodénoscopie", "bronchopneumopathie",
  "hexakosioihexekontahexaphobie", "hippopotomonstrosesquippedaliophobie",
  "pseudohypoparathyroïdisme", "dichlorodiphényltrichloroéthane", "paradichlrobenzène",
  "tétrachlorodibenzo-para-dioxine", "polyvinylpyrrolidone", "diméthylbenzanthracène",
  "phosphatidyléthanolamine", "acétylsalicylique", "phénylpropanolamine",
  "chlorpromazine", "dexaméthasone", "hydrocortisone", "thyrocalcitonine",
  "corticotrophine", "somatotrophine", "gonadotrophine", "mélanostimulante",
  "vasopressine", "ocytocine", "érythropoïétine", "interféron", "immunoglobuline",
  "cytomégalovirus", "adénosine", "guanosine", "thymidine", "désoxyadénosine",
  "ribonucléique", "désoxyribonucléique", "phosphodiester", "oligonucléotide",
  "polynucléotide", "chromatine", "chromosome", "télomérase", "transcriptase",
  "aminoacylation", "ubiquitination", "méthylation", "acétylation", "phosphorylation",
  "déphosphorylation", "glucosylation", "glycosylation", "hydroxylation",
  "carboxylation", "décarboxylation", "transaminase", "déshydrogénase",
  "oxydoréductase", "transférase", "hydrolase", "lyase", "isomérase", "ligase",
  "phosphofructokinase", "hexokinase", "pyruvate", "phosphoénolpyruvate",
  "cytochrome", "coenzyme", "flavine", "adénosine", "nicotinamide", "biotine",
  "cobalamine", "pyridoxine", "thiamine", "riboflavine", "niacine", "folate",
  "ascorbique", "ergocalciférol", "cholécalciférol", "phylloquinone", "ménaquinone",
  "tocophérol", "rétinol", "caroténoïde", "lycopène", "anthocyane", "flavonoïde",
  "polyphénol", "catéchine", "épicatéchine", "procyanidine", "délphinine",
  "pelargonidine", "cyanidine", "malvidine", "péonidine", "pétunidine"
]

export class SentenceService {
  static getRandomSentence(): Sentence {
    const randomIndex = Math.floor(Math.random() * sentences.length)
    const sentence = sentences[randomIndex]
    if (!sentence) {
      return sentences[0] as Sentence // Fallback to first sentence
    }
    return sentence
  }

  static getSentenceById(id: number): Sentence | undefined {
    return sentences.find(sentence => sentence.id === id)
  }

  static getSentencesByDifficulty(difficulty: 'easy' | 'medium' | 'hard' | 'hardcore'): Sentence[] {
    if (difficulty === 'hardcore') {
      // Générer une phrase hardcore aléatoire
      return [this.generateHardcoreSentence()]
    }
    return sentences.filter(sentence => sentence.difficulty === difficulty)
  }

  static getAllDifficulties(): Array<'easy' | 'medium' | 'hard' | 'hardcore'> {
    return ['easy', 'medium', 'hard', 'hardcore']
  }

  static generateHardcoreSentence(): Sentence {
    // Générer entre 15 et 25 mots
    const wordCount = Math.floor(Math.random() * 11) + 15 // 15 à 25
    const selectedWords: string[] = []

    // Sélectionner des mots aléatoires sans répétition
    const availableWords = [...hardcoreWords]
    for (let i = 0; i < wordCount && availableWords.length > 0; i++) {
      const randomIndex = Math.floor(Math.random() * availableWords.length)
      const selectedWord = availableWords[randomIndex]
      if (selectedWord) {
        selectedWords.push(selectedWord)
        availableWords.splice(randomIndex, 1) // Éviter les répétitions
      }
    }

    // Créer la phrase avec une majuscule au début et un point à la fin
    const text = selectedWords.join(' ')
    const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1) + '.'

    return {
      id: Date.now(), // ID unique basé sur le timestamp
      text: capitalizedText,
      difficulty: 'hardcore'
    }
  }
}