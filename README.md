# NINJA QUIZ - Backend

Backend de l'application **Ninja Quiz** développé avec **Fastify**, **TypeScript** et **PostgreSQL**.

---

## 🚀 Fonctionnalités

- API REST pour gérer :
    - Les utilisateurs
    - Les scores
    - Les questions, thèmes et sujets de quiz
- Génération aléatoire de questions selon les thèmes
- Authentification via JWT et cookies HTTPOnly
- Cron automatique de remise à zéro des scores tous les mois

---

## 📦 Stack technique

- [Fastify](https://fastify.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [node-cron](https://github.com/node-cron/node-cron)
- PostgreSQL

---

## 🔜 Améliorations possibles

- Pour l'instant il n'y a que 3 sujets (Géographie, Histoire et Mathématiques) mais je pense que je rajouterai d'autre thèmes et sujets à l'avenir. 
- Je pense aussi externaliser les sources de données pour l'histoire et la géographie dans des API open-sources dédiées. En effet, pendant le développement j'ai remarqué qu'il n y avait que très peu voir pas d'API francophone pour ces sujets. C'est pourquoi j'ai codé les données en dur dans des tableaux.

## 📢 Auteur

Développé par [MisterWaner](https://github.com/MisterWaner)