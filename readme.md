# Ганапольская правда (MG Truth)

[![Hugo](https://img.shields.io/badge/powered%20by-Hugo-ff4088)](https://gohugo.io/)
[![Vue.js](https://img.shields.io/badge/frontend-Vue.js-4FC08D)](https://vuejs.org/)
[![Cloudflare Workers](https://img.shields.io/badge/API-Cloudflare%20Workers-F38020)](https://workers.cloudflare.com/)

An unofficial fan site dedicated to showcasing Matvey Ganapolsky's informational, analytical, and entertainment projects.

## 📖 Project Overview

This platform serves as a central hub for content related to Matvey Ganapolsky. It aggregates videos from YouTube and provides additional features like book recommendations and donation options.

## 🏗️ Architecture

This project is organized as a monorepo with several components:

- **Client**
  - `hugo/` - Static site generator for the main content
  - `vue-shop/` - Vue.js application for the book shop interface

- **Workers**
  - `youtube-pub-sub/` - Cloudflare Worker for YouTube PubSubHubbub notifications
  - `yt-api-proxy/` - Cloudflare Worker for YouTube API proxying

## 🚀 Tech Stack

- **Frontend**
  - **Hugo**: Powers the main site with fast static page generation
  - **Vue.js 3**: Provides dynamic components for interactive elements like the book shop
  - **Pinia**: State management for Vue components

- **Backend & Infrastructure**
  - **Cloudflare Workers**: Serverless functions that handle API proxying for YouTube data
  - **Cloudflare KV**: Key-value storage for caching and state management
  - **Telegram Integration**: For notifications on new content

## 🛠️ Development

### Prerequisites

- Node.js (latest LTS version)
- Hugo (extended version)
- Wrangler CLI (for Cloudflare Workers)

### Setup

1. Clone the repository

   ```bash
   git clone <repository-url>
   cd mg-truth
   ```

2. Install dependencies

   ```bash
   # Install Hugo site dependencies
   cd client/hugo
   npm install

   # Install Vue shop dependencies
   cd ../vue-shop
   npm install

   # Install Workers dependencies
   cd ../../workers/youtube-pub-sub
   npm install
   cd ../yt-api-proxy
   npm install
   ```

3. Run development servers

   ```bash
   # Hugo site
   cd client/hugo
   hugo server

   # Vue shop
   cd ../vue-shop
   npm run dev

   # Workers (using wrangler)
   cd ../../workers/youtube-pub-sub
   wrangler dev
   ```

## 📜 License

This project is for non-commercial, fan-created content only.

## 🔗 Links

- YouTube Channel: [Ganapolsky](https://www.youtube.com/@Ganapolsky)
