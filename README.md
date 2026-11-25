# CryptoCharts Overlay

Terminal graphique de bureau sans cadre, superposable et en français. Les données sont fournies par les API publiques Binance Spot et CoinGecko; aucune clé API n’est requise.

## Installation

Prérequis : Windows 10/11 pour les exécutables, Node.js 18+ pour le développement et une connexion Internet.

```bash
npm install
npm start
```

Création des installateurs Windows NSIS et portable :

```bash
npm run build
```

Les exécutables sont créés dans `dist/`. Lightweight Charts 4.2.0 est embarqué localement depuis `node_modules`.

## Marchés et recherche

- Recherche Binance Spot parmi toutes les paires négociables, sans restriction sur l’actif de cotation. La liste déroulante permet un filtre par devise de cotation (USDT, USDC, FDUSD, BTC, ETH, EUR, TRY, etc.) et la saisie filtre les symboles, actifs de base et de cotation.
- Pour les actifs non trouvés sur Binance, saisissez un nom, un symbole ou un identifiant CoinGecko. La recherche locale utilise `/coins/list`; en cas d’ambiguïté, choisissez une entrée dans la liste proposée. Les graphiques CoinGecko sont exprimés en USD.
- Les chandelles Binance utilisent le flux WebSocket de klines. Les chandelles CoinGecko (OHLC, complétées si besoin par la série de prix) se rafraîchissent par interrogation périodique. La fréquence et le nombre de points disponibles dépendent des granularités proposées par CoinGecko pour la période sélectionnée.
- La liste de suivi reçoit les prix et variations 24 h des marchés Binance par flux combiné `miniTicker`. Les actifs CoinGecko de la liste sont interrogés périodiquement. Les connexions Binance tentent une reconnexion automatique.
- Les erreurs réseau et limites de débit sont signalées sans interrompre l’application; réessayez après un délai en cas de limitation CoinGecko.

## Graphique et outils

- Intervalles : 1m, 5m, 15m, 1h, 4h, 1j, 1s et 1M. La granularité historique CoinGecko varie selon les données disponibles.
- Chandelles, Heikin-Ashi, OHLC, ligne et zone.
- SMA 20, EMA 50/200, bandes de Bollinger, volume, RSI 14 et MACD (12,26,9).
- Alertes de prix avec notification système.
- Outils de dessin : crayon, ligne, rayon, horizontale/verticale, rectangle, ellipse, flèche, texte, Fibonacci, mesure et gomme; couleur, épaisseur, pointillés, annuler/rétablir, masquer, effacer. Les dessins sont sauvegardés localement par actif et intervalle.
- Thème clair/sombre, export PNG, opacité, fenêtre toujours au premier plan et mode clic traversant.

## Raccourcis

| Raccourci | Action |
| --- | --- |
| `Ctrl+Shift+X` | Activer/désactiver le clic traversant, globalement |
| `Ctrl+Z` | Annuler le dernier dessin |
| `Ctrl+Y` | Rétablir le dessin |
| `Échap` | Revenir au curseur |

## Confidentialité et notes

Electron utilise un preload isolé (`contextIsolation: true`, Node désactivé dans le renderer). Les préférences, alertes, liste de suivi et dessins sont enregistrés dans le `localStorage` local. L’application ne requiert aucun secret; les prix et historiques restent soumis à la disponibilité et aux limites des API publiques.
