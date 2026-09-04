# Stage 1: Build stage

FROM node:22-alpine AS build
WORKDIR /frontend
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage 2: Runtime stage (nginx)

FROM nginx:alpine
COPY nginxfolder/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /frontend/dist/apartman-handler/browser /usr/share/nginx/html