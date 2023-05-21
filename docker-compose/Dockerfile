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
# where will be the project files will be listed inside the dontainer
WORKDIR /app
# copy the package.json and package-lock.json first to the workdir
COPY package*.json ./
# run npm clean install to install all the dependencies first
RUN npm install --omit=dev
# copy the build files from the builder image dist directory to server image .dist
COPY --from=builder ./app/dist ./dist
COPY --from=builder ./app/.env ./
# expose the 3030 port
EXPOSE 3030
# run the npm start command to start the server
CMD ["npm", "start"]