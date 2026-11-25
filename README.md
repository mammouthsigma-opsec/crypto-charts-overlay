# CryptoCharts Overlay

Application de graphiques crypto de bureau, conçue comme un terminal compact, sans cadre, toujours au premier plan. Interface en français, alimentée par les API publiques Binance Spot. Les cotations et les bougies se chargent au démarrage; une connexion WebSocket actualise la bougie courante.

## Prérequis et installation

- Windows 10/11 pour les exécutables; Node.js 18 ou supérieur pour le développement.
- Connexion Internet (API et WebSocket publics Binance).

```bash
npm install
npm start
```

Pour produire les installateurs Windows NSIS et portable :

```bash
npm run build
```

Les exécutables `.exe` sont produits dans `dist/`. Le graphique Lightweight Charts 4.2.0 est embarqué localement depuis `node_modules`.

## Fonctionnalités

- Recherche des paires Binance Spot USDT négociables; bougies historiques (jusqu'à 1 000 points) et flux kline temps réel.
- Intervalles : 1m, 5m, 15m, 1h, 4h, 1j, 1s et 1M.
- Chandelles, Heikin-Ashi, OHLC, ligne et zone.
- SMA 20, EMA 50/200, bandes de Bollinger, volume, RSI 14 et MACD (12,26,9).
- Liste de suivi (ajout de la paire affichée), alertes de prix avec notification système.
- Outils de dessin : crayon, ligne, rayon, horizontale/verticale, rectangle, ellipse, flèche, texte, Fibonacci, mesure et gomme; couleur, épaisseur, pointillés, annuler/rétablir, masquer, effacer. Les dessins se replacent à partir de l'heure et du prix; sauvegarde locale par paire et intervalle.
- Mode clair/sombre, export PNG du graphique avec dessins, réglage d'opacité, toujours-au-premier-plan et clic traversant.

## Raccourcis

| Raccourci | Action |
| --- | --- |
| `Ctrl+Shift+X` | Activer/désactiver le clic traversant, globalement |
| `Ctrl+Z` | Annuler le dernier dessin |
| `Ctrl+Y` | Rétablir le dessin |
| `Échap` | Revenir au curseur |

## Notes techniques

Electron utilise un preload isolé (`contextIsolation: true`, Node désactivé dans le renderer). Les préférences, alertes, paire suivie et dessins sont conservés dans le `localStorage` local à l'application. Aucune clé API n'est requise. La disponibilité dépend du réseau et des services Binance.
