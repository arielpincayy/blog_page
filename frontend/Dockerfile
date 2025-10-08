FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://192.168.0.16:5000
ENV NEXT_PUBLIC_PAGE_URL=http://192.168.0.16:3000

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]