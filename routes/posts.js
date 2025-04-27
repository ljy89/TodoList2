const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const db = require('../config/db.js');

// 리스트 가져오기
router.get('/posts', (req, res) => {
    db.query('SELECT * FROM todos ORDER BY tododate DESC', (err, data) => {
        if (err) {
           res.status(500).json({erro: 'failed to fetch posts'});
        };
        res.json(data);
    });
});

// 글 등록하기
router.post('/posts', (req, res) => {
    const { content, date, lat, slg } = req.body;
    db.query('INSERT INTO todos (tododate, content, lat, slg) VALUES (?, ?, ?, ?)', [date, content, lat, slg], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.send('등록 완료');
    });
});

// 상세 페이지 불러오기
router.get('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM todos WHERE id = ?', [id], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.json(data[0]);
    });
});

// 수정 페이지
router.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const { content, date, lat, slg } = req.body;
    db.query('UPDATE todos SET tododate = ?, content = ?, lat = ?, slg = ? WHERE id = ?', [date, content, lat, slg, id], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.send('수정 완료');
    });
});

// 삭제
router.delete('/posts/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM todos WHERE id = ?', [id], (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Database error' });
        }
        res.send('삭제 완료');
    });
});



module.exports = router;