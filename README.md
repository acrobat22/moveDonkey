# Reste à faire

- drag'and'drop (glisser déposer) -> modif des marges
- ajout div sur aside à droite pour deposer 2 images (zone récupérer grace à 
moins de marges) 
- dans CSS jouer avec 
    .galerie {
        display: grid;
        grid-template-columns: repeat(**4**, 1fr);
- faire les méthodes pour trouver les pairs d'image de manière aléatoire lors
du chargements des cartes 
ex : je choisi 12 cartes, il me faut une serie de 6 cartes aléatoires -> je ditribue
2 fois cette série de façon aléatoire sur les images
- gérer : 
    1 - si match -> effacement (ou autre effet visuel) des images dans galerie,
    2 - si pas match remise des images à leur emplacement d'origine
- Si match ajout 1 points -> création score (+ HTML)
- Ajout d'un timer qui affiche le temps restant et une fois le temps écoulé
    - Affiche perdu en transparence -> changer visuel du fond
    - retourne les cartes
    - modifier visuel du score