FROM mcr.microsoft.com/playwright:v1.62.1-noble

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY dashboard ./dashboard
COPY next-persian-fonts/sahel ./next-persian-fonts/sahel
COPY public ./public
COPY schemas ./schemas
COPY scripts ./scripts
COPY src ./src

RUN npm run build && npm prune --omit=dev

RUN chown -R pwuser:pwuser /app

ENV NODE_ENV=production \
    ANALYTICS_HOST=0.0.0.0 \
    ANALYTICS_PORT=4567 \
    ANALYTICS_AUTO_CRAWL=false \
    ANALYTICS_HEADLESS=true

EXPOSE 4567

STOPSIGNAL SIGTERM

USER pwuser

CMD ["npm", "start"]
