FROM node:22
WORKDIR /app 
COPY package*.json ./
RUN npm install
COPY . .
COPY .env .env
EXPOSE 8000
EXPOSE 4000
CMD ["npm", "run", "dev"]