# Install dependencies only when needed
FROM node:lts-alpine AS deps
WORKDIR /srv/app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:lts-alpine AS builder
WORKDIR /srv/app

COPY --from=deps /srv/app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run
FROM node:lts-alpine AS runner
WORKDIR /srv/app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 worker
RUN adduser --system --uid 1001 --ingroup worker worker
USER worker

COPY --from=builder /srv/app/dist ./dist
COPY --from=builder /srv/app/node_modules ./node_modules
COPY --from=builder /srv/app/package.json /srv/app/package-lock.json ./

CMD ["node", "./dist/index.js"]
