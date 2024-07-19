const Film = require('../models/Film');
const User = require('../models/User');
const Token = require('../../utils/token');
const dotenv = require('dotenv');

dotenv.config();

class TestController {

    test(req, res) {
        const data = {
            "items": [
                {
                    "id": 129,
                    "account": " odoo-ldap",
                    "email": "",
                    "fullName": "",
                    "isActive": true
                },
                {
                    "id": 381,
                    "account": "anhbh",
                    "email": "anhbh@newwave.vn",
                    "fullName": "Bui Hoai Anh",
                    "phone": "0353528661",
                    "address": "Hoài Đức, Hà Nội",
                    "isActive": true,
                    "avatarUrl": "/Upload/Avatar/Origin/cd7672b6-3a80-429b-8117-4f4f01bde3bd.jpg",
                    "avatarResizeUrl": "/Upload/Avatar/Resize/1c85cf45-691d-49dd-b99a-7416858b2cc3-resize.jpg"
                },
                {
                    "id": 81,
                    "account": "anhbm",
                    "email": "anhbm@newwave.vn",
                    "fullName": "Bui Minh Anh",
                    "phone": "12344556789",
                    "address": "",
                    "isActive": true
                },
                {
                    "id": 301,
                    "account": "anhbm1",
                    "email": "anhbm1@newwave.vn",
                    "fullName": "bùi minh anh",
                    "isActive": true
                },
                {
                    "id": 1568,
                    "account": "anhbq",
                    "email": "anhbq@newwave.vn",
                    "fullName": "Bui Quoc Anh",
                    "isActive": true
                },
                {
                    "id": 285,
                    "account": "anhbth",
                    "email": "anhbth@newwave.vn",
                    "fullName": "Bui Thi Hong Anh",
                    "isActive": true
                },
                {
                    "id": 270,
                    "account": "anhdt1",
                    "email": "anhdt1@newwave.vn",
                    "fullName": "Duong Tien Anh",
                    "phone": "0886691396",
                    "address": "",
                    "isActive": true
                },
                {
                    "id": 107,
                    "account": "anhdv",
                    "email": "anhdv@newwave.vn",
                    "fullName": "Doan Viet Anh",
                    "isActive": true,
                    "avatarUrl": "/Upload/Avatar/Origin/74ca65a8-e671-4a04-8912-4ec471590518.jpg",
                    "avatarResizeUrl": "/Upload/Avatar/Resize/a33ad335-3c39-473c-86c2-34a39fed5049-resize.jpg"
                },
                {
                    "id": 1540,
                    "account": "anhlh",
                    "email": "anhlh@newwave.vn",
                    "fullName": "Le Hoang Anh",
                    "isActive": true
                },
                {
                    "id": 4,
                    "account": "anhlt",
                    "email": "anhlt@newwave.vn",
                    "fullName": "Le Tuan Anh",
                    "phone": "0916301090",
                    "address": "",
                    "isActive": true,
                    "avatarUrl": "/Upload/Avatar/Origin/85f511ee-23c4-434c-98f7-cb738cd33f51.jpg",
                    "avatarResizeUrl": "/Upload/Avatar/Resize/27340fe9-8676-4ae6-92ff-f5ceddfd6a90-resize.jpg"
                }
            ],
            "paging": {
                "itemsPerPage": 10,
                "currentPage": 1,
                "toTalPage": 49,
                "toTalRecord": 484
            }
        }
        res.status(200).json(data);
    }

}

module.exports = new TestController();
