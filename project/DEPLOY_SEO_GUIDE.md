# 🚀 GUIDE COMPLET: DÉPLOYER ET RÉFÉRENCER SUR GOOGLE

## ✅ AVANT DE DÉPLOYER

### 1. Vérifier les fichiers créés ✓

```
public/
├── sitemap.xml              ✓ Créé
├── robots.txt                ✓ Créé
└── index.html               (génération auto Vite)

src/
├── components/
│   ├── SEO.tsx              ✓ Créé
│   └── Schema.tsx           ✓ Créé
├── data/
│   └── seo-content.ts       ✓ Créé
└── App.tsx                  ✓ Modifié
```

### 2. Installer react-helmet

```bash
npm install react-helmet react-helmet-async
npm install --save-dev @types/react-helmet
```

### 3. Vérifier package.json

```json
{
  "dependencies": {
    "react": "^18.x",
    "react-dom": "^18.x",
    "react-helmet": "latest"
  }
}
```

---

## 📤 ÉTAPE 1: DÉPLOYER SUR VERCEL

### Option A: Via Vercel CLI (Recommandé)

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Se connecter
vercel login

# 3. Déployer
vercel --prod
```

### Option B: Via GitHub (Recommandé si tu as GitHub)

```bash
# 1. Push ton repo sur GitHub
git add .
git commit -m "SEO optimization complete"
git push origin main

# 2. Aller sur https://vercel.com
# 3. Importer depuis GitHub
# 4. Configurer et déployer
```

---

## 🔗 ÉTAPE 2: ACHETER ET CONFIGURER DOMAINE

### 1. Acheter le domaine

**Où acheter?**
- Namecheap: https://www.namecheap.com
- Google Domains: https://domains.google
- Godaddy: https://www.godaddy.com

**Nom à acheter:**
```
epicesimperiale.cd    (domaine National .CD)
OU
epicesimperiale.com   (international backup)
```

**Budget:** ~$15/an pour .cd, ~$10/an pour .com

### 2. Configurer sur Vercel

**Étapes:**

```
1. Aller sur https://vercel.com/dashboard
2. Sélectionner ton projet
3. Settings → Domains
4. Ajouter ton domaine
5. Copier les nameservers Vercel

Nameservers Vercel à copier:
- ns1.vercel-dns.com
- ns2.vercel-dns.com
```

**Puis, chez ton registrar (Namecheap, etc.):**

```
1. Aller dans Domain Management
2. Chercher "Nameservers"
3. Remplacer par les nameservers Vercel
4. Sauvegarder (propagation: 24-48h)
```

**Vérifier:**
```bash
# Test dans terminal
nslookup epicesimperiale.cd
# Doit retourner les IPs Vercel
```

---

## 🔍 ÉTAPE 3: SOUMETTRE À GOOGLE SEARCH CONSOLE

### 1. Accéder Google Search Console

```
https://search.google.com/search-console
```

### 2. Ajouter une propriété

```
Sélectionner: Domaine
Entrer: epicesimperiale.cd
```

### 3. Vérifier la propriété

**Google propose plusieurs méthodes. Utilise celle-ci (la plus simple):**

```
Méthode: Enregistrement DNS TXT

1. Copier la valeur TXT que Google donne
2. Aller chez ton registrar (Namecheap, etc.)
3. Advanced DNS
4. Ajouter un nouveau record:
   Type: TXT
   Host: @
   Value: google-site-verification=xxxxxxxxxxxx
5. Sauvegarder
6. Attendre 5-10 min
7. Revenir à Google Search Console
8. Cliquer "Vérifier"
```

### 4. Soumettre le Sitemap

```
Après vérification:

1. Google Search Console → Sitemaps
2. Ajouter le nouveau sitemap
3. URL: https://epicesimperiale.cd/sitemap.xml
4. Soumettre
```

---

## 🤖 ÉTAPE 4: SOUMETTRE À BING (2x le trafic gratuit!)

### Étapes:

```
1. Aller sur https://www.bing.com/webmasters
2. Cliquer "Tools" → "Verify your site"
3. Méthode: XML file
4. Télécharger le fichier BingSiteAuth.xml
5. Uploader dans public/BingSiteAuth.xml (Vercel auto-déploie)
6. Vérifier sur Bing
7. Soumettre sitemap
```

---

## 📍 ÉTAPE 5: GOOGLE BUSINESS PROFILE (TRÈS IMPORTANT!)

### Créer ton profil business pour Kinshasa

```
1. Aller sur https://www.google.com/business/
2. Créer un compte
3. Remplir:
   - Nom: ÉPICES IMPÉRIALE
   - Catégorie: Specialty Food Store / E-commerce
   - Adresse: Kinshasa, RDC (si tu as physique)
   - Téléphone: +243 80 191 06 23
   - Site: https://epicesimperiale.cd
   - Description: "Épices naturelles premium cultivées en RDC"
4. Ajouter photos des produits
5. Ajouter horaires d'ouverture
6. Activer "Livraison"
```

### Avantages:

- ✅ Apparaît dans "Google Maps"
- ✅ Améliore réponses à "épices Kinshasa"
- ✅ Avis clients directement sur Google
- ✅ Augmente confiance utilisateurs

---

## ⚡ ÉTAPE 6: OPTIMISER VERCEL POUR PERFORMANCE

### Configurer vercel.json

Crée ce fichier à la racine: `vercel.json`

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "outputDirectory": "dist",
  "env": {
    "VITE_APP_URL": "@vite_app_url"
  },
  "headers": [
    {
      "source": "/sitemap.xml",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/xml"
        }
      ]
    },
    {
      "source": "/robots.txt",
      "headers": [
        {
          "key": "Content-Type",
          "value": "text/plain"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600, s-maxage=86400"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "SAMEORIGIN"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

---

## 🎯 ÉTAPE 7: OPTIMISATIONS MOBILES

### Vérifier Mobile Friendly

```
1. Google Search Console → Mobile-Friendly Test
2. Tester: https://epicesimperiale.cd
3. Doit être "Mobile-friendly"
```

### Vérifier Performance

```
1. PageSpeed Insights: https://pagespeed.web.dev
2. Tester: https://epicesimperiale.cd
3. Objectif: Score > 80 pour mobile
```

---

## 📊 ÉTAPE 8: MONITORER AVEC ANALYTICS

### Google Analytics 4

```
1. Aller sur https://analytics.google.com
2. Créer une nouvelle propriété
3. URL du site: https://epicesimperiale.cd
4. Copier le code de suivi
5. Le code se met automatiquement via Helmet
```

### Google Search Console

Vérifie régulièrement:

```
Dashboard → Clique sur ton domaine
- Core Web Vitals (performance)
- Erreurs de couverture
- Rapports de clics
- Requêtes populaires
```

---

## 📅 CHECKLIST DE LANCEMENT

```
[ ] Domaine acheté (epicesimperiale.cd)
[ ] Nameservers configurés (24-48h de propagation)
[ ] Vercel Search Console vérifié
[ ] Sitemap soumis: /sitemap.xml
[ ] Robots.txt, en place
[ ] Google Business Profile créé
[ ] Bing Webmasters soumis
[ ] PageSpeed Insights > 80
[ ] Mobile-Friendly ✓
[ ] Meta tags sur homepage
[ ] Schema.org actif
[ ] Contenu SEO optimisé
[ ] Images optimisées + alt text
[ ] Liens internes (linking strategy)
[ ] Back-links (si possible)
```

---

## 🔄 MAINTENANCE MENSUELLE

### Commandes à lancer

```bash
# Mettre à jour sitemap avec nouveaux produits
# S'assurer que robots.txt est correct
# Vérifier les erreurs dans Google Search Console
# Ajouter du nouveau contenu (blog posts, etc.)
```

---

## 💡 STRATÉGIE POUR DOMINER GOOGLE RDC

### Court terme (1 mois):
- ✅ SEO technique (sitemap, robots, schema)
- ✅ Contenu optimisé avec mots-clés locaux
- ✅ Google Business Profile complet

### Moyen terme (2-3 mois):
- ✅ Blog avec articles (épices RDC, recettes)
- ✅ Avis clients sur Google Business
- ✅ Backlinks qualité (partenariats)

### Long terme (6+ mois):
- ✅ Autorité de domaine élevée
- ✅ Classement #1 pour "épices Kinshasa"
- ✅ Revenu organique important

---

## ⚠️ ERREURS À ÉVITER

```
❌ Ne pas ignorer Search Console (erreurs de crawl)
❌ Ne pas mettre à jour sitemap (nouvelles pages)
❌ Ne pas optimiser images (lenteur)
❌ Ne pas utiliser mots-clés locaux
❌ Ne pas configurer Google Business (PERDU!)
❌ Ne pas mobile-first (Google pénalise)
❌ Ne pas mettre canonical tags
❌ Mauvais meta descriptions (CTR faible)
```

---

## 📞 SUPPORT

Si tu as besoin d'aide:
- Google Search Console: documentation complète gratuite
- Vercel docs: https://vercel.com/docs
- React Helmet: https://github.com/nfl/react-helmet
