// Contenu de la page. Les dates, le lieu, la durée, le rythme, le nombre de places
// et le coût sont PROVISOIRES : à remplacer par les informations officielles.

export const PROGRAMME = {
  nom: 'Femmes & Tech',
  clotureCourte: '15 nov.',
  places: 30,
  duree: '8 semaines',
  rythme: '2 ateliers par semaine',
  lieu: 'Bujumbura et en ligne',
  cout: 'Gratuit',
}

export const CALENDRIER = [
  { date: '13 oct. 2026', titre: 'Ouverture des candidatures' },
  { date: '15 nov. 2026', titre: 'Clôture des candidatures' },
  { date: '22 nov. 2026', titre: 'Annonce des participantes' },
  { date: '1er déc. 2026', titre: 'Premier atelier' },
  { date: '26 janv. 2027', titre: 'Présentation des projets' },
]

export const MODULES = [
  {
    id: 'marketing',
    semaines: 'Semaines 1 et 2',
    titre: 'Marketing digital',
    texte:
      'Définir ce que vous vendez et à qui. Construire une page Facebook, un compte Instagram et un catalogue WhatsApp Business qui donnent envie d’acheter.',
    image: '/img/contenu.webp',
    alt: 'Une couturière filme une robe en wax avec son téléphone sur trépied, dans son atelier.',
  },
  {
    id: 'outils',
    semaines: 'Semaines 3 et 4',
    titre: 'Outils numériques',
    texte:
      'Tenir ses comptes sur un tableur, partager ses fichiers dans le cloud, organiser ses commandes. Les outils qui font gagner des heures chaque semaine.',
    image: '/img/laptop.webp',
    alt: 'Une jeune femme réfléchit devant son ordinateur portable à une terrasse de café.',
  },
  {
    id: 'ecommerce',
    semaines: 'Semaines 5 et 6',
    titre: 'Vendre en ligne',
    texte:
      'Prendre des commandes à distance, encaisser par mobile money, emballer et livrer. Transformer les messages en ventes.',
    image: '/img/commande.webp',
    alt: 'Des mains emballent un pot de beurre de karité dans un colis en carton fermé d’une ficelle verte.',
  },
  {
    id: 'ia',
    semaines: 'Semaines 7 et 8',
    titre: 'Intelligence artificielle',
    texte:
      'Écrire une description de produit, préparer une affiche, répondre aux clientes plus vite. L’IA comme assistante, pas comme magie.',
    image: '/img/atelier.webp',
    alt: 'Cinq femmes autour d’une table avec des ordinateurs portables pendant un atelier.',
  },
]

export const PROFILS = [
  {
    id: 'commercante',
    nom: 'La commerçante',
    lieu: 'Au marché',
    texte: 'Vous vendez déjà au marché, en boutique ou depuis chez vous, et vous voulez plus de clientes.',
    image: '/img/commercante.webp',
    alt: 'Une commerçante en foulard jaune, téléphone en main, devant son étal de fruits.',
  },
  {
    id: 'entrepreneuse',
    nom: 'La créatrice',
    lieu: 'À la maison',
    texte: 'Vous avez un projet et vous voulez le lancer avec les bons outils dès le départ.',
    image: '/img/entrepreneuse.webp',
    alt: 'Une jeune entrepreneuse tient un colis en papier kraft et son téléphone dans son atelier.',
  },
  {
    id: 'etudiante',
    nom: 'L\u2019étudiante',
    lieu: 'Sur le campus',
    texte: 'Vous êtes étudiante ou en recherche d\u2019emploi, et le numérique vous ouvre des portes.',
    image: '/img/etudiante.webp',
    alt: 'Une étudiante sourit, un ordinateur portable serré contre elle, sur un campus.',
  },
]

export const QUESTIONS = [
  {
    q: 'Faut-il déjà savoir utiliser un ordinateur ?',
    r: 'Non. Un téléphone et l’envie d’apprendre suffisent. Les premiers ateliers reprennent les bases.',
  },
  {
    q: 'Combien de temps faut-il prévoir ?',
    r: 'Deux ateliers de deux heures par semaine pendant huit semaines, plus un peu de pratique sur votre propre activité entre les séances.',
  },
  {
    q: 'Comment les participantes sont-elles choisies ?',
    r: 'Nous lisons chaque candidature, en particulier votre motivation. Nous cherchons des profils variés et des projets concrets. Toutes les candidates reçoivent une réponse.',
  },
  {
    q: 'Puis-je suivre la formation à distance ?',
    r: 'Oui, chaque atelier est aussi proposé en ligne. Il vous faut une connexion internet suffisante pour la visio.',
  },
]
