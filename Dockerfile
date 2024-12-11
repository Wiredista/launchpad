FROM oven/bun

RUN mkdir /app
WORKDIR /app

COPY package.json /app
RUN bun install

COPY . /app

ENTRYPOINT [ "bun", "run", "." ]

