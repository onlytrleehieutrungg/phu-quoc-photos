FROM node:16.13.1-alpine as builder

WORKDIR /usr/src/app

#env 
ARG REACT_APP_TITLE=PhuQuocPhotos
ARG REACT_APP_ENVIROMENT=production
ARG REACT_APP_BASE_URL=https://api.phuquocphoto.com/api/v1

ENV REACT_APP_TITLE=PhuQuocPhotos
ENV REACT_APP_ENVIROMENT=production
ENV REACT_APP_BASE_URL=https://api.phuquocphoto.com/api/v1

# Copying source files
COPY . .

# Installing yarn package & Building app
RUN yarn install && \
    yarn global add env-cmd && \
    env-cmd -f .env.production yarn build

FROM node:16.13.1-alpine

# Create app directory
WORKDIR /usr/src/app

# copy from the builder
COPY --from=builder /usr/src/app/ .

RUN ls -la

EXPOSE 3000

# Start the app
CMD npm run start