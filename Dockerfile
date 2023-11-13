FROM node:18-alpine AS builder
# where will be the project files will be listed inside the dontainer
WORKDIR /app
# copy the package.json and package-lock.json first to the workdir
COPY package*.json ./
# run npm clean install to install all the dependencies first
RUN npm install
# then copy all the project files to the workdir except the files listed in .dockerignore
COPY . .
# then run build command for building build file from typescript files
RUN npm run build

# now build image for node server
FROM node:18-alpine AS server
# setting build arguments for github actions
ARG NODE_ENV
ARG API_PORT
ARG API_HOST
ARG API_VERSION
ARG ROUTE_PREFIX
ARG REDIS_URL
ARG MONGO_URL
ARG ACCESS_TOKEN_EXPIRY_TIME
ARG REFRESH_TOKEN_EXPIRY_TIME
ARG VERIFY_TOKEN_SECRET
ARG VERIFY_TOKEN_EXPIRY_TIME
ARG CHANGE_PASSWORD_TOKEN_SECRET
ARG CHANGE_PASSWORD_TOKEN_EXPIRY_TIME
ARG PUBLIC_KEY
ARG PRIVATE_KEY
# setting env files form build arguments for github actions
ENV NODE_ENV=$NODE_ENV
ENV API_PORT=$API_PORT
ENV API_HOST=$API_HOST
ENV API_VERSION=$API_VERSION
ENV ROUTE_PREFIX=$ROUTE_PREFIX
ENV REDIS_URL=$REDIS_URL
ENV MONGO_URL=$MONGO_URL
ENV ACCESS_TOKEN_EXPIRY_TIME=$ACCESS_TOKEN_EXPIRY_TIME
ENV REFRESH_TOKEN_EXPIRY_TIME=$REFRESH_TOKEN_EXPIRY_TIME
ENV VERIFY_TOKEN_SECRET=$VERIFY_TOKEN_SECRET
ENV VERIFY_TOKEN_EXPIRY_TIME=$VERIFY_TOKEN_EXPIRY_TIME
ENV CHANGE_PASSWORD_TOKEN_SECRET=$CHANGE_PASSWORD_TOKEN_SECRET
ENV CHANGE_PASSWORD_TOKEN_EXPIRY_TIME=$CHANGE_PASSWORD_TOKEN_EXPIRY_TIME
ENV PUBLIC_KEY=$PUBLIC_KEY
ENV PRIVATE_KEY=$PRIVATE_KEY
# where will be the project files will be listed inside the dontainer
WORKDIR /app
# copy the package.json and package-lock.json first to the workdir
COPY package*.json ./
# run npm clean install to install all the dependencies first
RUN npm install --omit=dev
# copy the build files from the builder image dist directory to server image .dist
COPY --from=builder ./app/dist ./dist
# expose the 3030 port
EXPOSE 3030
# run the npm start command to start the server
CMD ["npm", "start"]