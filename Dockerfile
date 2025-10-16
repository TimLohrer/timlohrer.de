FROM oven/bun:latest as builder

WORKDIR /app/next-app

COPY bun.lock ./
COPY package.json ./

RUN bun install

COPY . .

ENV NEXT_TELEMETRY_DISABLED 1

RUN bun next build

FROM oven/bun:latest

WORKDIR /app

COPY --from=builder /app/next-app ./

ENV GITHUB_TOKEN=""

CMD ["bun", "next", "start"]