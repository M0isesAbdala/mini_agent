FROM oven/bun:1 AS builder

WORKDIR /app

COPY package.json bun.lock ./
RUN bun install

COPY ./src ./src

RUN bun build ./src/index.ts \
  --outdir ./target \
  --target bun \
  --minify-whitespace \
  --minify-identifiers \
  --minify-syntax


FROM oven/bun:1

WORKDIR /app

COPY --from=builder /app/target ./target

EXPOSE 3000

CMD ["bun", "target/index.js"]