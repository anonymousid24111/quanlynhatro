# Hướng dẫn cài đặt

1. Cài đặt node js
2. Cài đặt pnpm

### Chạy project client

1. vào command line nhập: cd client
2. cài đặt các package cần thiết: npm i hoặc pnpm i
3. khởi chạy dự án: npm start

### Tạo database

1. Truy cập pgAdmin4
2. Tạo database có tên quanlynhatro
3. Cập nhật lại tài khoản và mật khẩu trong file config (server/config/config.json)

### Migrate dữ liệu

1. vào command line nhập: cd server
2. chạy lệnh migration: npm run migrate:up

### Chạy project server

1. vào command line nhập: cd server
2. cài đặt các package cần thiết: npm i hoặc pnpm i
3. khởi chạy dự án: npm start

### Lệnh
1. npx sequelize-cli db:migrate
2. npx sequelize-cli db:migrate:undo
3. Up migrate: npx sequelize-cli db:migrate
4. Seed: npx sequelize-cli db:seed:all
5. Undo seed: npx sequelize-cli db:seed:undo
