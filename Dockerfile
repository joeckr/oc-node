ARG REGISTRY=docker.io/library
ARG NODE_VERSION=24
ARG ALPINE_VERSION=3.24

FROM $REGISTRY/node:$NODE_VERSION-alpine

WORKDIR /build

COPY package.json package-lock.json /build/
RUN npm ci --omit dev

FROM $REGISTRY/alpine:$ALPINE_VERSION

RUN apk update && \
    apk upgrade

ARG NODE_VERSION=24
ARG LATEST=false

RUN apk add curl

RUN if [ "$LATEST" = "true" ]; then \
        apk add nodejs-current=~$NODE_VERSION; \
    else \
        apk add nodejs=~$NODE_VERSION; \
    fi

WORKDIR /src

COPY --from=0 /build/node_modules /src/node_modules
COPY index.js package.json /src/

RUN chgrp -R 0 /src && \
    chmod -R g+rwX /src

USER 1031

# TO DO: LOOK INTO SIGTERM

CMD [ "node", "index.js" ]
