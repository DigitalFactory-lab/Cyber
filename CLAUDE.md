# Atelier Cyber-réflexes

Site statique (HTML/CSS/JS pur, aucun framework, aucun build, aucun backend) pour un atelier de
sensibilisation à la cybersécurité destiné à des demandeurs d'emploi, donné par Le Forem / Digital
Factory. Utilisé sur tablettes le jour de l'atelier ; sert à la fois de support de cours et
d'exercices interactifs.

## Contraintes non négociables
- **100 % statique** : pas de serveur, pas d'API, pas de collecte de données. Tout tourne dans le
  navigateur (localStorage pour le suivi de progression uniquement).
- **Style** : blanc / gris / mauve / bleu, sobre et professionnel — jamais le vert du guide source
  d'origine. Palette dans `assets/style.css` (`--mauve`, `--blue`, `--wash`, etc.). Pas d'emoji
  comme icônes : SVG (Lucide-style) partout.
- **Hébergement** : GitHub Pages (gratuit), pas Netlify (abandonné, plus de crédits). Le site se
  republie automatiquement à chaque push sur `main`. URL suivant le propriétaire du dépôt
  (`https://<owner>.github.io/Cyber/`).

## Structure
- `index.html` — landing / hub unique. Déroulé de la journée (`.prog`), suivi de progression
  (`CR` module de `assets/site.js`), bloc « Outils formateur » (baromètre + carnet à imprimer).
- `etape1.html` … `etape5.html`, `bestiaire.html` (= Étape 2), `nadia.html` (cas pratique),
  `cloture.html` — les 6 étapes numérotées + le cas pratique + la clôture. Chaque page a un
  exercice interactif et un bouton « J'ai terminé cette étape » qui appelle `CR.marquer(cle)`.
- `barometre.html` — outil **réservé au formateur** (baromètre de confiance matin/après-midi).
  N'est PAS un outil participant : localStorage est local à l'appareil, donc un seul écran pour
  toute la salle (posé ou projeté). Ne jamais le lier depuis le programme ou une page participant.
- `carnet.html` — carnet de bord imprimable (CSS `@media print`, format A4). Les livrables
  individuels des étapes 1/2/5 (ex-4) ont été retirés des tablettes et renvoyés ici : les tablettes
  affichent un encadré `.vers-carnet` disant de remplir sur papier, pas de formulaire dupliqué.
  `carnet-cyber-reflexes.pdf` est le PDF généré à partir de cette page (voir plus bas).
- `assets/style.css` — design system partagé par la plupart des pages étapes. `index.html` et
  `carnet.html` ont CHACUN leur propre `<style>` embarqué (ne linkent PAS `assets/style.css`) —
  toute modif de palette/comportement global (ex. `touch-action`) doit être répétée aux 3 endroits.
- `assets/site.js` — module `CR` (localStorage) : `marquer(cle)`, `estFait(cle)`, `reinitialiser()`.
  Pas d'auto-reset par date (supprimé : ne gérait pas les sessions en demi-journée). Reset
  uniquement manuel, via le bouton `#resetProg` sur la landing.

## Numérotation des étapes
6 étapes numérotées (le bestiaire est l'Étape 2, pas un « 1 bis »). Si la numérotation ou l'ordre
change un jour, il faut mettre à jour en parallèle : titres/étiquettes de chaque page HTML, le
déroulé `.prog` de `index.html`, ET les badges `.sec-num` + sous-titres `.sur` de `carnet.html`
(sinon le PDF se décale par rapport au site — bug déjà rencontré une fois).

## Régénérer le PDF du carnet
```
node -e "
import('/opt/node22/lib/node_modules/playwright/index.mjs').then(async ({chromium})=>{
  const b = await chromium.launch({ executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
  const p = await b.newPage();
  await p.goto('file://'+process.cwd()+'/carnet.html', { waitUntil:'networkidle' });
  await p.pdf({ path:'carnet-cyber-reflexes.pdf', format:'A4', printBackground:true });
  await b.close();
});
"
```
Pour vérifier visuellement AVANT de livrer : émuler `page.emulateMedia({media:'print'})` puis
screenshot — un rendu écran normal peut avoir l'air correct alors que le CSS `@media print` casse
la mise en page (bug déjà rencontré : `.page{min-height:auto}` en print écrasait la couverture).

## Images
Toutes les images (`hero-*.jpg`, `bete-*.png`, `logo*.png/jpg`) sont fournies par l'utilisatrice via
upload dans le dépôt (pas de génération d'image). Les couleurs de marque (jaune, fuchsia du
baromètre) ont été prélevées par pipette directement sur ces images plutôt que devinées — même
réflexe à avoir pour toute nouvelle teinte à ajouter.

## Ce qui a déjà été essayé et écarté
- Auto-reset de la progression par changement de date → abandonné (ne gérait pas 2 sessions le
  même jour). Reset manuel uniquement.
- Lien du baromètre dans le programme / la page de clôture → retiré : ce n'est pas un outil
  multi-tablette, seulement pour le formateur.
- Emoji comme icônes → remplacés par des SVG partout (doctrine du skill `ui-ux-pro-max`).
