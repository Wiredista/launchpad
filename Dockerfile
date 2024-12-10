FROM oven/bun

RUN mkdir /app
COPY . /app
WORKDIR /app

ENTRYPOINT [ "bun", "run", "." ]

