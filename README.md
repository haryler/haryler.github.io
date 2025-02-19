# Documentation Utilisateur

Bienvenue dans **Pokedex**, application de recherche et découverte de Pokémon !  
Cette application vous permet de rechercher un Pokémon par nom ou identifiant, d'afficher ses détails, de consulter des recommandations aléatoires et de retrouver vos recherches précédentes dans l'historique.

---

## Fonctionnalités Principales

- **Recherche de Pokémon**  
  - **Comment faire ?**  
    Saisissez le nom ou l’identifiant d’un Pokémon dans la barre de recherche et cliquez sur le bouton **"Search"**.
  - **Affichage**  
    Le Pokémon recherché s'affiche avec son image, son nom et ses types.  
    Cliquez sur **"More details"** pour ouvrir une fenêtre (modal) présentant des informations complémentaires (description, couleur, poids, taille, statistiques et capacités).

- **Fenêtre de Détails (Modal)**  
  - La modal s’ouvre à droite de la zone principale et affiche les informations détaillées du Pokémon.
  - Pour fermer la modal, cliquez simplement sur la croix.

- **Recommandations Aléatoires**  
  - Dans la section **Random Pokemon**, cliquez sur le bouton **"Draw random pokemons"** pour générer une liste de 5 Pokémon choisis aléatoirement.
  - Chaque carte de recommandation affiche l'image et le nom du Pokémon.  
  - En cliquant sur une carte, le Pokémon s'affiche dans la zone principale via la modal et est ajouté à l’historique.

- **Historique des Recherches**  
  - La section **History** enregistre les 5 derniers Pokémon consultés.
  - Un clic sur un élément de l’historique relance une recherche sur ce Pokémon.

---

## Comment Utiliser l'Application

1. **Accès à l'application :**  
   Rendez-vous sur l'URL de l'application [https://haryler.github.io](https://haryler.github.io) pour l'ouvrir dans votre navigateur.

2. **Recherche d'un Pokémon :**  
   - Entrez un nom ou un identifiant dans la barre de recherche située en haut de la page.
   - Cliquez sur **"Search"** pour afficher le Pokémon correspondant dans la zone principale.

3. **Affichage des Détails :**  
   - Cliquez sur **"More details"** pour ouvrir la modal contenant toutes les informations complémentaires.
   - Pour fermer la modal, cliquez sur la croix située en haut à droite de la boîte de détails.

4. **Recommandations :**  
   - Dans la section **Random Pokemon**, cliquez sur **"Draw random pokemons"** pour obtenir une sélection de 5 Pokémon.
   - Cliquez sur l’un d’eux pour voir ses détails et l’ajouter à votre historique.

5. **Historique :**  
   - La section **History** affiche les Pokémon récemment recherchés, avec leur image et leur nom.
   - Cliquez sur l’un de ces éléments pour relancer la recherche correspondante.


---

# Documentation Technique

Ce document décrit l’architecture et le fonctionnement technique du projet **Pokedex**, développé en JavaScript et utilisant l’API [PokeAPI](https://pokeapi.co/).

---

## Structure du Projet

- **index.html**  
  Contient la structure de la page, répartie en plusieurs sections :
  - Une en-tête avec la barre de recherche.
  - La zone principale (`#container`) pour afficher les informations du Pokémon recherché.
  - Une section pour les recommandations aléatoires (**Random Pokemon**).
  - Une section pour l’historique des recherches (**History**).
  - La modal (fenêtre de détails) est intégrée dans un conteneur dédié.

- **style.css**  
  Fichier de style CSS pour :
  - Centrer et styliser la barre de recherche.
  - Organiser les affichages dans la zone principale, les recommandations et l’historique.
  - Styliser la modal, qui s'affiche à droite de la zone principale.  
  - Assurer une cohérence visuelle entre la section recommandations et l'historique (images et noms des Pokémon).

- **pokedex.js**  
  Fichier JavaScript gérant la logique de l’application :
  - **Recherche de Pokémon :**  
    Appels à l’API PokeAPI via les endpoints `/pokemon/` et `/pokemon-species/`.  
    Les données récupérées (image, nom, types, statistiques, etc.) sont affichées dans la zone principale.
  - **Modal (Fenêtre de Détails) :**  
    La fonction `showModal` construit dynamiquement le contenu de la modal avec des informations détaillées (description, couleur, poids, taille, statistiques, capacités).  
    La modal peut être fermée via un bouton.
  - **Historique des Recherches :**  
    Les 5 derniers Pokémon consultés sont enregistrés dans le `localStorage` sous forme d’objets `{name, image}`.  
    La fonction `renderHistory` génère dynamiquement une liste affichant pour chaque élément l'image (au-dessus) et le nom (en dessous).  
    Un écouteur d’événement permet de relancer une recherche en cliquant sur un élément de l’historique.
  - **Recommandations Aléatoires :**  
    La fonction `fetchRandomRecommendations` tire 5 identifiants aléatoires, récupère les données associées et crée des cartes cliquables dans la section **Random Pokemon**.  
    En cliquant sur une carte recommandée, le Pokémon est affiché et ajouté à l’historique.

---

## Technologies et Concepts Utilisés

- **HTML5 & CSS3 :**  
  Structure et mise en page de l'application. Utilisation de Flexbox pour une organisation responsive.
- **JavaScript :**  
  - Utilisation d’`async/await` pour la gestion asynchrone des appels API.
  - Manipulation du DOM pour injecter dynamiquement le contenu (recherche, modal, historique, recommandations).
  - Utilisation du `localStorage` pour persister l’historique entre les sessions.
- **PokeAPI :**  
  L’API fournit les données sur les Pokémon (endpoints `/pokemon/` et `/pokemon-species/`).

---

## Points Spécifiques

- **Gestion de l’Historique :**  
  Chaque Pokémon consulté est enregistré avec son nom et l’URL de son image.  
  La fonction `renderHistory` affiche ces informations de manière claire et permet de relancer la recherche en cliquant sur un élément de l’historique.

- **Modal et Recommandations :**  
  La modal est conçue pour apparaître à droite de la zone principale avec un contenu défilable et une croix de fermeture toujours visible dans le coin supérieur droit.
  Les recommandations aléatoires sont générées en sélectionnant 5 identifiants aléatoires et en affichant des cartes avec image et nom.

- **Erreurs et Gestion des Exceptions :**  
  Des blocs `try/catch` permettent de gérer les erreurs lors des appels API et d'afficher des messages d'alerte en cas d'échec (par exemple, si un Pokémon n'est pas trouvé).


---

**BUGS :** Le bouton "drawButton" ne fonctionne pas. Je ne comprends pas encore pourquoi la fonction appelée "on click" ne s'execute pas. 

**Hypothèse :** L'event Listener est effacé lors du premier appel de la fonction quand elle edite l'inner HTML. Mais je ne sais pas comment faire pour qu'elle ne le soit pas. Si je la rajoute dans l'inner HTML de ladite fonction, la fonction va s'executer en boucle. À creuser !

---

La structure HTML et le fichier CSS ont partiellement été générés avec chatGPT-o3-mini-high, puis sélectionnés et affinés par la suite.

