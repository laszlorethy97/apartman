# Stage 1: Build stage

FROM node:22-alpine AS build
WORKDIR /backend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime stage 

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

COPY --from=build /backend/dist ./dist

USER node
EXPOSE 3000
CMD ["node", "dist/main.js"]