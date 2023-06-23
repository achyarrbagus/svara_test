# Nama Proyek

Deskripsi singkat proyek.

## Daftar Isi

- [Instalasi](#instalasi)
- [Instalasi Docker](#instalasi-docker)
- [About Me ](#about-me)

## Instalasi

Langkah-langkah untuk menginstal proyek ini:

1. Clone repositori ini: `git clone https://github.com/achyarrbagus/svara_test.git`
2. Masuk ke direktori proyek: `cd svara_test`
3. Instal dependensi: `npm install`

## Penggunaan

Cara menggunakan proyek ini:

1. Jalankan aplikasi: `npm start`
2. konnfigurasi file .env
```
   DB_HOST= #mongodb host mu 

   DB_USER= #mongodb user

   DB_PASSWORD= #mongodb password

   DB_NAME=  #mongodb name

   DB_PORT= #mongodb port 

   NODE_DOCKER_PORT= #port your aplication ex:3000
```
4. Buka aplikasi di browser dengan URL: `http://localhost:3000`


## Instalasi Docker

## Penggunaan

Cara menggunakan proyek ini:

1.Buka terminal lalu jalankan perintah : `docker-compose up`

2.Jika ingin menjalan kan aplikasi diluar background/dilatar belakang jalankan perintah : `docker-compose up -d`

3.jika ingin mengkonfigurasi file dapat merubah file


```
version: "1.0"

services:
  mongodb:
    image: mongo:4.2 || versi image mongodb dapat rubah sesuai dengan yang kmu ingin kan
    restart: unless-stopped
    env_file: ./.env
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root | dapat kamu sesuaikan
      - MONGO_INITDB_ROOT_PASSWORD=123  | dapat kamu sesuaikan
    ports:
      - port local mongodb:port mongodb docker
      -27017:27017
    volumes:
      - db:/data/db
  app:
    depends_on:
      - mongodb
    build: .
    restart: unless-stopped
    env_file: .env
    ports:
      - localport aplikasi : docker port aplikasi
      - 3000:3000
    environment:
      - DB_HOST=mongodb 
      - DB_USER=root | mongodb username docker 
      - DB_PASSWORD=123 | mongodb password docker
      - DB_NAME=test-svara | dapat kamu sesuaikan
      - DB_PORT=27017 | db port docker
    stdin_open: true
    tty: true

volumes:
  db:
```
4. Buka aplikasi di browser dengan URL: `http://localhost:3000`

## About Me
[Instagram](https://www.instagram.com/achyarrbagus51) |
[LinkedIn](https://www.linkedin.com/in/achyarbaguspambudi/) |
[Email](achyarbagus@email.com)

## Created By : Achyar Bagus Pambudi. 
