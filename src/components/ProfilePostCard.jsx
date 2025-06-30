import { Button, Col, Image, Row } from "react-bootstrap";
import { useContext, useState} from 'react';
import { useDispatch } from "react-redux";
import { likePost, removeLikeFromPost } from "../features/posts/postsSlice";
import { AuthContext } from "./AuthProvider";

export default function ProfilePostCard({ post }) {
  const { content, id: postId} = post;
  const [likes, setLikes] = useState(post.likes || [])
  const dispatch = useDispatch()
  const {currentUser} = useContext(AuthContext)
  const userId = currentUser?.uid

  // user has likesd the post if their id is in the likes array
  const isLiked = likes.includes(userId)

  const pic =    "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";
  const BASE_URL = "https://b2093b0a-b8a1-493b-a78f-36729cbde74e-00-l9pavi6cnqhn.sisko.replit.dev"
    
  
    const handleLike = () => (isLiked? removeFromLikes() : addToLikes())

//add userID to likes Array

const addToLikes = () => {
  setLikes([...likes, userId]);
  dispatch(likePost({ userId, postId}))
}

// remove userID from likes array and update the backend

const removeFromLikes = () => {
  setLikes(likes.filter((id) => id !== userId))
  dispatch(removeLikeFromPost({userId, postId}))
}

  return (
    <Row
      className="p-3"
      style={{
        borderTop: "1px solid #D3D3D3",
        borderBottom: "1px solid #D3D3D3",
      }}
    >
      <Col sm={1}>
        <Image src={pic} fluid roundedCircle />
      </Col>

      <Col>
        <strong>Shah</strong>
        <span>@gmail.com May 25</span>
        <p>{content}</p>
        <div className="d-flex justify-content-between">
          <Button variant="light">
            <i className="bi bi-chat"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-repeat"></i>
          </Button>
          <Button variant="light" onClick={handleLike}>
            {isLiked ? (
            <i className="bi bi-heart-fill text-danger"></i>) :
            (<i className="bi bi-heart"></i>)}
            {likes.length}
          </Button>
          <Button variant="light">
            <i className="bi bi-graph-up"></i>
          </Button>
          <Button variant="light">
            <i className="bi bi-upload"></i>
          </Button>
        </div>
      </Col>
    </Row>
  );
}
