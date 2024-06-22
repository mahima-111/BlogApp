import express from 'express';
import { createBlog, getAllBlogs, userBlogs, oneBlog, likeBlog, updateBlog, UnlikeBlog, likedBlogs } from '../controllers/blogController.js';
import verifyToken from '../middleware/authMiddleware.js';
import checkOwnership from '../middleware/ownershipMiddleware.js';

const router=express.Router();

router.post('/create',verifyToken,createBlog);
router.get('/',getAllBlogs);
router.get('/user-blogs',verifyToken,userBlogs);
router.get('/liked-blogs',verifyToken,likedBlogs);
router.get('/:blogId',oneBlog);
router.put('/like',verifyToken,likeBlog);
router.put('/unlike',verifyToken,UnlikeBlog);
router.put('/update/:blogId',verifyToken,checkOwnership,updateBlog);

export default router;