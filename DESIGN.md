---
name: Femmes & Tech
description: Appel à candidatures pour une formation des femmes au marketing digital et aux nouvelles technologies.
colors:
  foret: "#14532d"
  foret-900: "#0c3a1e"
  feuille: "#16a34a"
  ambre: "#fbbf24"
  papier: "#f8fafc"
  blanc: "#ffffff"
  encre: "#10241a"
  mousse: "#4b6355"
  trait: "#d9e2dc"
typography:
  display:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.9rem, 8.4vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 82, \"opsz\" 96"
  headline:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.3rem, 5vw, 4rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 82, \"opsz\" 96"
  title:
    fontFamily: "Bricolage Grotesque, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4vw, 3.25rem)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.03em"
    fontVariation: "\"wdth\" 82, \"opsz\" 96"
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  label:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 600
    lineHeight: 1.43
rounded:
  champ: "12px"
  bulle: "16px"
  panneau: "28px"
  pilule: "9999px"
spacing:
  gouttiere: "16px"
  gouttiere-large: "32px"
  colonne: "48px"
  colonne-large: "80px"
  section: "96px"
  section-large: "128px"
components:
  button-primary:
    backgroundColor: "{colors.ambre}"
    textColor: "{colors.encre}"
    rounded: "{rounded.pilule}"
    padding: "16px 28px"
  button-submit:
    backgroundColor: "{colors.foret}"
    textColor: "{colors.papier}"
    rounded: "{rounded.pilule}"
    padding: "16px 32px"
  button-submit-hover:
    backgroundColor: "{colors.foret-900}"
  button-nav:
    textColor: "{colors.papier}"
    rounded: "{rounded.pilule}"
    padding: "8px 16px"
  button-nav-hover:
    textColor: "{colors.ambre}"
  input:
    backgroundColor: "{colors.blanc}"
    textColor: "{colors.encre}"
    rounded: "{rounded.champ}"
    padding: "12px 16px"
  choice-tile:
    textColor: "{colors.encre}"
    rounded: "{rounded.champ}"
    padding: "12px"
  choice-tile-checked:
    backgroundColor: "{colors.foret}"
    textColor: "{colors.papier}"
  form-panel:
    backgroundColor: "{colors.papier}"
    textColor: "{colors.encre}"
    rounded: "{rounded.panneau}"
    padding: "40px"
  note-bubble:
    backgroundColor: "{colors.foret}"
    textColor: "{colors.papier}"
    rounded: "{rounded.bulle}"
    padding: "16px 20px"
---

# Design System: Femmes & Tech

## Overview

**Creative North Star: "L'étal au marché, vu depuis toute la ville"**

Le système raconte un passage : de l'étal physique, où le quartier connaît déjà la vendeuse, à l'écran du téléphone, où toute la ville peut la découvrir. Le vert forêt occupe des régions entières (le film d'ouverture, la section « portée », l'inscription, le pied de page), le papier porte la lecture, et l'ambre n'apparaît que comme un trait de marqueur : un souligné tracé à la main, le bouton principal, la figure Hairline, la barre de progression du film. Rien n'est décoré pour décorer ; chaque accent ambre désigne ce qu'il faut voir ou faire.

La densité est éditoriale et aérée : grandes sections (96 à 128 px de respiration verticale), titres énormes, étroits et lourds en Bricolage Grotesque, texte courant en Figtree à 18 px avec une interligne généreuse. Les photos portent un grain argentique léger et des coins très arrondis (28 px), comme des tirages posés sur la table. Le mouvement est lent et décéléré (une seule courbe, `ease-sortie`), toujours facultatif : tout le contenu est lisible sans animation et sans la vidéo.

Le système refuse explicitement le hero en dégradé décoratif avec photo stock et rangée de quatre cartes à icônes : le film plein cadre fait le pitch, le programme se lit semaine par semaine.

**Key Characteristics:**
- Aplats forêt sur des sections entières, alternant avec le papier ; pas de cartes posées sur fond gris.
- Un seul accent chaud, l'ambre, utilisé comme un trait de marqueur.
- Titres condensés (wdth 82), extra-gras, interligne 0,95, approche serrée.
- Photos au grain argentique, coins de 28 px.
- Une seule courbe de mouvement, et un mode réduit qui montre tout immédiatement.
- Mobile d'abord : une colonne, gouttière de 16 px, action d'inscription toujours accessible.

## Colors

Un vert forêt profond en aplats, un papier froid pour lire, et un ambre unique qui joue le rôle de surligneur.

### Primary
- **Vert forêt** (foret): la couleur du monde. Aplats de sections entières (Portée, Inscription), titres de section sur papier, bouton d'envoi du formulaire, tuile de choix cochée, bulle de note sur photo. Couleur `theme-color` du navigateur.
- **Forêt de nuit** (foret-900): la version la plus sombre, réservée au fond du film d'ouverture, au voile dégradé qui monte sous le titre du hero, au pied de page et au survol du bouton d'envoi.

### Secondary
- **Ambre marqueur** (ambre): l'unique accent chaud. Bouton principal « Je m'inscris », trait de marqueur sous un mot clé, mots mis en valeur dans un titre sur fond forêt (« toute la ville », « se montrer »), barre de progression du film, figure Hairline, point de la date limite, anneau de focus, sélection de texte. Le texte posé sur l'ambre est toujours en encre.

### Tertiary
- **Vert feuille** (feuille): l'état validé. Coches de la liste « Pour qui » et cercle de confirmation après l'envoi. C'est une couleur d'état et de pictogramme, pas une couleur de texte : sur papier, elle n'atteint pas le contraste requis pour du petit texte.

### Neutral
- **Papier** (papier): fond de page et de lecture, fond des panneaux du formulaire, texte clair sur forêt (avec opacités 85 %, 80 %, 70 %, 60 % pour hiérarchiser le texte secondaire sur fond sombre).
- **Blanc** (blanc): fond de la section Questions et fond des champs de saisie, pour les décoller légèrement du papier.
- **Encre** (encre): texte principal sur fond clair, texte sur ambre. Un vert presque noir, jamais un noir pur.
- **Mousse** (mousse): texte secondaire et paragraphes d'accompagnement sur fond clair, bordure de survol des champs.
- **Trait** (trait): filets de séparation entre sections, entre lignes de listes, ligne du calendrier, bordures de champs au repos.

### Named Rules
**La règle du trait de marqueur.** L'ambre est un geste, pas une surface : un souligné, un bouton, un mot, une ligne fine. Il ne remplit jamais un fond de section ni une carte. Sur un écran donné, il désigne une ou deux choses au plus.

**La règle des aplats.** Le vert forêt s'applique à des régions entières, d'un bord à l'autre de la fenêtre. Les sections alternent forêt et papier (ou blanc) ; elles ne se résolvent pas en cartes vertes posées sur fond clair.

**La règle du vert qui valide.** Le vert feuille signifie « fait, coché, acquis ». Il ne sert ni à décorer ni à porter des paragraphes.

## Typography

**Display Font:** Bricolage Grotesque (avec ui-sans-serif, system-ui), axes variables `wdth` 82 et `opsz` 96
**Body Font:** Figtree (avec ui-sans-serif, system-ui)

**Character:** Un grotesque étroit, extra-gras et un peu bricolé, comme une enseigne peinte de marché, contre un sans-serif rond et chaleureux qui reste simple à lire sur téléphone.

### Hierarchy
- **Display** (800, clamp(2.9rem, 8.4vw, 6rem), 0,95): le titre du film d'ouverture uniquement, sur le voile forêt, limité à 14 caractères de large environ. Les répliques du film (700 ou 800, clamp(2.2rem, 6vw, 4.4rem) à clamp(2.4rem, 6.6vw, 5rem)) restent dans cette famille.
- **Headline** (800, clamp(2.3rem, 5vw, 4rem), 0,95): chaque titre de section, en forêt sur papier, en papier sur forêt. La section Inscription monte à clamp(2.6rem, 6vw, 4.6rem).
- **Title** (800, clamp(2rem, 4vw, 3.25rem), 0,95): titres des modules du programme. Les dates du calendrier utilisent la même famille en 700 à 1,5rem.
- **Body** (400, 1,125rem, 1,625): paragraphes, réponses des questions, éléments de liste. Largeur limitée à 52–60 caractères. Le texte d'appui du hero monte à 1,25rem dès 640 px.
- **Label** (600, 0,875rem): libellés de champs, libellés de semaines, liens de navigation, mentions sous le bouton principal. Pas de capitales forcées.

### Named Rules
**La règle de l'enseigne.** Tout ce qui est titre passe par la classe de titre : Bricolage Grotesque condensé (wdth 82), extra-gras, interligne 0,95, approche −0,03 em, `text-wrap: balance`. Le texte courant ne l'emprunte jamais.

**La règle de la mesure courte.** Les titres sont contraints en caractères (14 à 18 ch) pour casser en deux ou trois lignes fortes ; les paragraphes ne dépassent pas 60 ch.

## Layout

Conteneur unique centré de 1280 px maximum, gouttière de 16 px sur mobile et 32 px dès 640 px. Les sections respirent de 96 px verticalement, 128 px dès 640 px (l'inscription : 80 puis 112 px). Tout commence en une colonne ; à partir de 1024 px, les sections passent à deux colonnes asymétriques (proportions 1,15/0,85, 0,9/1,1 ou 0,8/1,2) avec un écart de 48 px sur mobile et 64 à 80 px sur grand écran.

Le film d'ouverture occupe 100 svh en position collante sur une course de 340 svh (100 svh seulement si le mouvement est réduit) ; titre, texte et appel à l'action sont ancrés en bas à gauche. Le programme associe une image collante (à 12 vh du haut) à une liste de modules de 44 vh de haut chacun, l'image suivant le module actif ; sur mobile, chaque module porte sa propre image. Le calendrier passe d'une frise verticale (mobile) à deux colonnes (640 px) puis à une frise horizontale de cinq étapes (1024 px). Le bloc d'en-tête de l'inscription devient collant sur grand écran pendant que le formulaire défile.

Points de rupture : ceux de Tailwind (640, 768, 1024 px). Les ancres de section gardent un retrait de défilement de 16 px.

## Elevation & Depth

Le système est plat. La profondeur vient des aplats de couleur (forêt contre papier), des filets fins, du grain sur les photos et des voiles dégradés forêt sur le film, pas d'ombres portées sur les surfaces. Deux exceptions seulement, toutes deux teintées et diffuses : la lueur ambre sous le bouton principal, et l'ombre forêt sous la bulle de note qui chevauche une photo.

### Shadow Vocabulary
- **Lueur ambre** (`box-shadow: 0 10px 30px -10px rgba(251,191,36,.7)`): sous le bouton « Je m'inscris », sur le film, pour qu'il se détache de l'image.
- **Ombre forêt** (`box-shadow: 0 18px 40px -18px rgba(12,58,30,.7)`): sous un élément forêt qui chevauche une photo.

### Named Rules
**La règle du plat par défaut.** Les panneaux, champs, listes et images n'ont pas d'ombre. Une ombre n'existe que sous un élément qui flotte au-dessus d'une image, et elle prend la teinte de cet élément.

**La règle du voile forêt.** Le texte posé sur une photo ou le film se lit sur un dégradé forêt-900 qui monte du bas (92 % à 0 % sur 68 % de la hauteur) ; jamais un voile noir neutre.

## Shapes

Des coins très doux et cohérents par rôle : 28 px pour tout ce qui ressemble à un tirage ou à un panneau (photos, image collante du programme, panneau du formulaire et de confirmation), 16 px pour les images mobiles du programme et la bulle de note, 12 px pour les champs et les tuiles de choix, et la pilule complète pour les boutons, le lien de navigation « Candidater » et l'étiquette « Date limite ». Les points du calendrier sont des cercles de 15 px à bordure de 2 px. Les filets font 1 px.

Le trait de marqueur est la forme signature : un tracé SVG à main levée, légèrement ondulé, de 104 % de la largeur du mot, bout arrondi, épaisseur 7 sur un viewBox de 10, posé à −0,12 em sous la ligne de base.

## Components

### Buttons
Ronds, francs, gras ; un seul bouton principal par contexte.
- **Shape:** pilule complète (rounded.pilule).
- **Principal (ambre):** fond ambre, texte encre en 700, 16 px × 28 px, flèche de 18 px à droite. Au survol, le bouton monte de 2 px et la flèche glisse de 4 px vers la droite (300 ms, ease-sortie). Réservé à « Je m'inscris » sur le film.
- **Envoi (forêt):** fond forêt, texte papier en 700, 16 px × 32 px ; survol en forêt-900 ; pendant l'envoi, opacité 70 % et curseur d'attente, libellé « Envoi en cours… ».
- **Navigation « Candidater »:** contour papier à 40 %, texte papier en 600, 8 px × 16 px ; au survol, contour et texte passent à l'ambre.
- **Lien d'action textuel:** texte forêt en 600, souligné ambre de 2 px décalé de 4 à 6 px ; au survol, le souligné passe au forêt.
- **Focus:** contour ambre de 2 px décalé de 3 px, sur tous les éléments interactifs.

### Chips
- **Date limite :** plus de pilule ; la date clé porte le trait de marqueur et son point s'allume en ambre en dernier quand la ligne du calendrier se trace.

### Cards / Containers
- **Corner Style:** 28 px.
- **Background:** papier sur fond forêt (formulaire, confirmation) ; les photos sont des conteneurs à grain.
- **Shadow Strategy:** aucune (voir Elevation & Depth).
- **Border:** aucune ; la séparation vient du contraste papier/forêt.
- **Internal Padding:** 24 px sur mobile, 40 px dès 640 px (48 px pour la confirmation).

### Inputs / Fields
- **Style:** fond blanc, bordure trait de 1 px, rayon 12 px, 12 px × 16 px, texte encre 1rem ; libellé au-dessus en 0,875rem 600. Placeholder mousse à 70 %.
- **Hover:** la bordure passe au mousse.
- **Focus:** bordure forêt et halo forêt à 25 % de 2 px.
- **Error:** bordure rouge (#dc2626) et message sous le champ en rouge (#b91c1c), 0,875rem, rôle `alert` ; le focus est envoyé au premier champ fautif. Les messages disent quoi faire et donnent un exemple.
- **Tuiles de choix (niveau):** trois tuiles égales, bordure trait, rayon 12 px ; cochée, la tuile devient forêt plein avec texte papier ; le focus clavier dessine le contour ambre.
- **Case de consentement:** 20 px, couleur d'accent forêt.

### Navigation
Barre fine posée sur le film, sans fond, sur un dégradé forêt-900 à 55 % qui descend du haut. Nom « Femmes & Tech » à gauche en titre 1,25rem 800 papier ; liens en 0,875rem papier à 85 %, papier plein au survol. Sur mobile, seuls le nom et le bouton « Candidater » restent ; Programme et Calendrier apparaissent à 640 px, Questions à 768 px.

### Trait de marqueur (signature)
Un mot clé d'un titre (« vu », « commencer ») reçoit un souligné ambre tracé à main levée, dessiné une seule fois quand il entre à l'écran (900 ms, 200 ms de délai, ease-sortie). Le mot ne se coupe jamais. En mouvement réduit, le trait est présent d'emblée. Un seul mot marqué par titre, et pas sur chaque titre.

### Film au défilement (signature)
121 images plein cadre dessinées sur un canvas, pilotées par la progression du défilement, avec une barre ambre de 3 px en bas qui en indique l'avancement. Trois temps de texte se succèdent en fondu (700 ms) : titre et appel, deux répliques, puis la conclusion avec un second appel. En mouvement réduit, la section ne fait qu'un écran et reste sur la première image.

### Étal Hairline (signature)
Figure isométrique en traits fins sur fond forêt : arêtes papier à 78 %, 40 % et 20 %, accent ambre sur les pots soulevés, trait de 1,1. Une légende sous un filet papier à 15 % invite à survoler et lit la valeur en ambre, en chiffres tabulaires. La visite guidée joue une fois puis rend la main.

### Listes à filets
Les listes (Pour qui, modules, questions) sont des lignes séparées par des filets trait de 1 px, 24 px de marge verticale, sans cartes. Les questions sont des `details` dont le « + » tourne de 45° à l'ouverture (300 ms, ease-sortie) ; la question passe au forêt au survol.

### Apparition
Les blocs de contenu montent de 18 px en fondu (opacité 700 ms, déplacement 900 ms, ease-sortie) à leur entrée dans l'écran, avec un décalage de 80 ms entre éléments d'une même série. Le contenu est visible par défaut sans JavaScript et en mouvement réduit.

## Do's and Don'ts

### Do:
- **Do** poser le vert forêt (#14532d) en aplat sur des sections entières, et alterner avec le papier (#f8fafc) ou le blanc.
- **Do** réserver l'ambre (#fbbf24) au trait de marqueur, au bouton principal, à un mot mis en valeur sur fond forêt, à la figure Hairline et au focus ; toujours avec du texte encre (#10241a) posé dessus.
- **Do** composer chaque titre avec la classe de titre (Bricolage Grotesque wdth 82, 800, interligne 0,95, −0,03 em) et le contraindre à 14–18 ch.
- **Do** donner aux photos le grain argentique (overlay à 18 %) et des coins de 28 px.
- **Do** utiliser une seule courbe de mouvement (`cubic-bezier(0.16, 1, 0.3, 1)`) et laisser tout le contenu visible sans animation.
- **Do** séparer les éléments de liste par des filets trait (#d9e2dc) de 1 px plutôt que par des cartes.

### Don't:
- **Don't** construire un hero en dégradé décoratif avec photo stock et une rangée de quatre cartes à icônes.
- **Don't** remplir une surface ou un fond de section avec l'ambre, ni le placer sous du texte papier.
- **Don't** utiliser le vert feuille (#16a34a) pour des paragraphes ou du petit texte sur papier : il valide, il ne parle pas.
- **Don't** ajouter des ombres portées aux panneaux, champs ou images ; une ombre ne vit que sous un élément flottant sur une photo, teintée de sa couleur.
- **Don't** utiliser un voile noir neutre sur les images : le voile est forêt-900.
- **Don't** utiliser Bricolage Grotesque pour le texte courant, ni Figtree pour les titres.
- **Don't** montrer de témoignages, logos de partenaires ou chiffres inventés ; les images de personnes sont illustratives.


## Ajout : viseur et trame (bas de page)

- **Trame isométrique (`.trame`)** : grille 2:1 au trait (losanges 64 × 32 px, papier à 9 %, points de sommet à 22 %), reprise de la géométrie de l'étal Hairline, fondue vers les bords par un masque radial. Uniquement sur les aplats forêt (« Pour qui ? », Inscription). Un halo ambre à 10 % peut s'y ajouter une fois par section, jamais derrière un formulaire.
- **Cadre viseur (`Cadre`, `.biseau`)** : coupe biseautée de 28 px en haut à droite et en bas à gauche, deux repères d'angle de 20–24 px (haut gauche, bas droit) posés à 12 px du contenu. Repère ambre = élément actif ; papier à 40 % sinon. Utilisé pour les portraits de « Pour qui ? » et le panneau du formulaire (qui remplace l'ancien rayon de 28 px).
- **Constellation « Pour qui ? »** : trois portraits décalés verticalement (bureau), chacun relié à son étiquette par un filet vertical terminé d'un point ; un seul profil actif à la fois (couleur pleine, filet et repères ambre), les autres désaturés. Le repère passe d'un profil à l'autre toutes les 3,6 s jusqu'au premier survol, focus ou toucher ; immobile en mouvement réduit.
- **Photo annotée (section Promesse)** : sur papier, la trame passe au vert forêt (`.trame-foret`). Le portrait dans son viseur porte trois repères (cercle + point) reliés par des filets coudés à une colonne d'étiquettes ; le filet est clair sur la photo et vert forêt sur le papier. Un seul repère en ambre, celui de l'idée clé. Sous 1024 px, les repères deviennent une liste à filet gauche sous la photo.
- **Programme en viseur** : sur papier avec trame forêt fondue à gauche. L'image collante est dans le cadre viseur, avec un voile forêt en bas portant le titre du module, une piste de 8 segments (une par semaine ; ambre = semaines du module lu, papier à 70 % = déjà passées) et le compteur `n/8`. À droite, un rail vertical relie un nœud par module ; le nœud actif est ambre avec un halo à 22 % et tire un filet ambre vers le viseur (bureau seulement).
- **Hero en viseur** : repères d'angle sur tout l'écran (papier à 35 %, l'angle bas droit en ambre), trame forêt qui monte du bas sous le texte, et une **mire de mise au point** (quatre équerres, point ambre, étiquette floutée puis nette) qui suit le sujet du film image par image, avec le même calcul de recadrage que le canevas. Elle nomme ce qu'elle vise : Vitrine, Publication, Confiance. Rail de quatre chapitres cliquables à droite sur bureau (Au marché, Son étal, Son téléphone, Votre tour) ; sur mobile, quatre segments de progression en bas.
