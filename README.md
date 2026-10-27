# sonnet-ui

Design system React documenté avec Storybook : design tokens, composants accessibles, thème clair et sombre, tests.

**Démo en ligne : [storybook.romain-sonnet.fr](https://storybook.romain-sonnet.fr)**

## Ce que contient le projet

| Catégorie | Composants |
| --- | --- |
| Foundations | Couleurs, espacements, typographie |
| Actions | Button |
| Forms | TextField |
| Feedback | Alert, Badge |

Chaque composant est livré avec ses variantes, ses états (désactivé, chargement, erreur), une page de documentation générée, et des tests.

## Principes

- **Accessible par défaut.** Les paires de couleurs atteignent au moins le contraste WCAG AA. Les composants gèrent le focus clavier et les attributs ARIA. L'addon Accessibility de Storybook audite chaque story.
- **Tout passe par les design tokens.** Les composants n'utilisent que des variables CSS (`--sui-*`). Le thème sombre redéfinit uniquement ces variables.
- **Peu de composants, mais finis.** Un composant entre dans la bibliothèque quand il a ses stories, sa documentation et ses tests.

## Stack

React 19, TypeScript, Storybook 10 avec Vite, Vitest et Testing Library. Déployé en site statique servi par Nginx, via Docker et Coolify. GitHub Actions vérifie les types, les tests et le build à chaque push.

## Structure

```
src/
  tokens/tokens.css          design tokens (clair et sombre)
  docs/                      pages Foundations (MDX)
  components/
    Button/
      Button.tsx             composant
      Button.css             styles, uniquement via les tokens
      Button.stories.tsx     stories Storybook
      Button.test.tsx        tests
      index.ts               exports
```

## Lancer le projet

```sh
npm install
npm run storybook        # http://localhost:6006
npm test                 # tests
npm run typecheck        # vérification TypeScript
npm run build-storybook  # build statique dans storybook-static/
```

## Déploiement

```sh
docker build -t sonnet-ui .
```

L'image construit le Storybook puis le sert avec Nginx sur le port 80, avec un endpoint `/health`.

## Méthode de travail

Ce projet est développé avec l'aide d'un assistant IA (Claude), utilisé comme binôme : je définis les specs de chaque composant, l'assistant propose une implémentation, puis je relis, teste et ajuste. Les choix d'API, d'accessibilité et de design sont les miens et documentés dans chaque story.

## Licence

MIT
