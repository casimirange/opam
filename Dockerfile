### STAGE 1:RUN ####

FROM node:16-alpine AS build
# Create a Virtual directory inside the docker image
WORKDIR /app

RUN npm cache clean --force

COPY . .

RUN rm package-lock.json

#RUN yarn install --immutable --immutable-cache
RUN yarn install --ignore-engines

#RUN yarn add crypto-js

RUN yarn build

RUN ls

RUN ls dist
### STAGE 2:RUN ###

# Defining nginx image to be used
FROM nginx:latest AS ngi

COPY --from=build /app/dist/gulfin /usr/share/nginx/html
#COPY ./nginx/cert /etc/nginx/ssl
COPY ./nginx/nginx.conf  /etc/nginx/conf.d/default.conf


EXPOSE 80
EXPOSE 443
CMD ["nginx", "-g", "daemon off;"]
