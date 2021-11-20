FROM node:14-alpine as builder
WORKDIR /app
RUN apk add --update bash
RUN apk add dos2unix --update-cache --repository http://dl-3.alpinelinux.org/alpine/edge/community/ --allow-untrusted
COPY . .
ARG REACT_APP_HTTPS=false
ENV REACT_APP_HTTPS=$REACT_APP_HTTPS
RUN dos2unix /app/docker-script
RUN chmod +x /app/docker-script
RUN yarn
RUN yarn build --production

FROM node:13-alpine
WORKDIR /app
COPY --from=builder /app/build .
COPY --from=builder /app/docker-script .
RUN yarn global add serve
RUN apk add --no-cache tzdata
ENV TZ=America/Argentina/Buenos_Aires
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN env
EXPOSE 80
RUN ls /app
CMD ["/app/docker-script"]
