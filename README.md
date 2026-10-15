# Maïka App — Front-end prototype 

Maquette interactive responsive réalisée en HTML, CSS et JavaScript natifs.

## Démarrer
1. Décompresser l’archive.
2. Ouvrir `index.html` dans un navigateur.
3. Pour un test local plus proche d’une PWA, lancer un serveur statique depuis ce dossier (par exemple `python -m http.server 8000`) puis ouvrir `http://localhost:8000`.

## Écrans
- Accueil et catalogue public
- Catalogue avec recherche et filtres
- Espace de cours (vidéo de démonstration, modules, progression, onglets)
- Certificats
- Tableau de bord des responsables
- Validation simulée des paiements
- Formulaire de création de formation (données en mémoire)
- Gestion vidéo de démonstration : téléversement ou lien externe
- Actualités, ressources, opportunités et présentation de la Fondation

## Important
Cette version est un prototype frontend avec des données de démonstration. Les inscriptions, les comptes, les paiements, les fichiers vidéo, les certificats PDF et les progressions ne sont pas enregistrés sur un serveur. Ces fonctionnalités devront être reliées au backend FastAPI et à PostgreSQL. Le téléversement vidéo réel devra passer par le backend ou des URL d’envoi sécurisées vers le service vidéo retenu. Ne pas intégrer de clés secrètes dans le JavaScript public.

Les images et polices distantes nécessitent une connexion Internet. Remplacer les textes, chiffres et exemples par les données validées par la Fondation avant la mise en production.
