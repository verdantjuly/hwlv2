# API 안내

## 계정    
/api/signup POST 회원가입  
/api/login POST 로그인  
 
## 게시글 CRUD   
/api/posts GET 게시글 전체 불러오기  
/api/posts/:postid GET 게시글 1개 불러오기  
/api/posts POST 게시글 작성하기   
/api/posts/:postid PATCH 게시글 수정하기  
/api/posts/:postid DELETE 게시글 삭제하기  

## 댓글 CRUD  
/api/comments/:postid GET 댓글 전체 조회하기   
/api/comments/:postid POST 댓글 작성하기  
/api/comments/:commentid PATCH 댓글 수정하기  
/api/comments/:commentid DELETE 댓글 삭제하기   