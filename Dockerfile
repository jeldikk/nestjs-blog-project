# ---- Build stage ----
FROM node:22-alpine AS build

WORKDIR /usr/src/app

# Install dependencies (including devDependencies needed for the build)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ---- Production stage ----
FROM node:22-alpine AS production

ENV NODE_ENV=production
WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled output from the build stage
COPY --from=build /usr/src/app/dist ./dist

EXPOSE 4000

CMD ["node", "dist/main"]
