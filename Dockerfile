FROM node:24-alpine AS builder

WORKDIR /node

RUN corepack enable

COPY package.json yarn.lock .yarnrc.yml ./
COPY Services ./Services/
COPY Membermanagement ./Membermanagement/

COPY . .

RUN yarn install
RUN yarn build



FROM node:24-alpine AS runner

WORKDIR /node

RUN corepack enable

COPY --from=builder /node/node_modules ./node_modules
COPY --from=builder /node/Services ./Services
COPY --from=builder /node/Membermanagement ./Membermanagement

EXPOSE  3000

CMD ["node","Membermanagement/dist/app.js"]
