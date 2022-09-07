// @ts-check
const express = require('express');

const router = express.Router();
const POST = [
  {
    title: 'title1',
    content: 'content1',
  },
  {
    title: 'title2',
    content: 'content2',
  },
];

// 글 전체 목록 조회
router.get('/', (req, res) => {
  const postLen = POST.length;
  res.render('posts', { POST, postCounts: postLen });
});

// 특정 title을 가진 글 조회
router.get('/:postTitle', (req, res) => {
  const postData = POST.find((post) => post.title === req.params.postTitle);
  if (postData) res.send(postData);
  else {
    const err = new Error('TITLE not found');
    err.statusCode = 404;
    throw err;
  }
});

// 새로운 글 작성
router.post('/', (req, res) => {
  if (req.query.title && req.query.content) {
    const newPost = {
      title: req.query.title,
      content: req.query.content,
    };
    POST.push(newPost);
    res.send('글 작성 완료');
  } else {
    const err = new Error('Unexpected query');
    err.statusCode = 404;
    throw err;
  }
});

// 특정 title을 가진 글 수정
router.put('/:postTitle', (req, res) => {
  if (req.query.title && req.query.content) {
    const arrIndex = POST.findIndex(
      (post) => post.title === req.params.postTitle
    );
    if (arrIndex !== -1) {
      POST[arrIndex].title = req.query.title;
      POST[arrIndex].content = req.query.content;
      res.send('글 수정 완료');
    } else {
      const err = new Error('TITLE not found');
      err.statusCode = 404;
      throw err;
    }
  } else {
    const err = new Error('Unexpected query');
    err.statusCode = 404;
    throw err;
  }
});

// 특정 title을 가진 글 삭제
router.delete('/:postTitle', (req, res) => {
  const arrIndex = POST.findIndex(
    (post) => post.title === req.params.postTitle
  );
  if (arrIndex !== -1) {
    POST.splice(arrIndex, 1);
    res.send('글 삭제 완료');
  } else {
    const err = new Error('TITLE not found');
    err.statusCode = 404;
    throw err;
  }
});

module.exports = router;
