import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Button, Col, Image, Row } from "react-bootstrap";
import { useEffect, useState} from 'react';

export default function ProfilePostCard({ content, post_id }) {
  const [likes, setLikes] = useState([]);
  
  // Decoding to get the user_id
  const token = localStorage.getItem("authToken");
  const decode = jwtDecode(token)
  const user_id = decode.id

  const pic =    "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";
  const BASE_URL = "https://b2093b0a-b8a1-493b-a78f-36729cbde74e-00-l9pavi6cnqhn.sisko.replit.dev"
    
  useEffect(() => {
      fetch(`${BASE_URL}/likes/post/${post_id}`)
      .then((response) => response.json())
      .then((data) => setLikes(data))
      .catch((error) => console.error("Error", error));
    }, [post_id]);
console.log("Likes: ", likes)
    const isLiked = likes.some((like) => like.user_id === user_id)
    const handleLike = () => (isLiked? removeFromLikes() : addToLikes())

    const addToLikes = () => {
      axios.post(`${BASE_URL}/likes`, {
        user_id: user_id,
        post_id: post_id,
      })
      .then((response) => {
        setLikes([...likes, {...response.data, likes_id: response.data.id}])
      })
      .catch((error)=> console.error("Error:", error))
    }

    const removeFromLikes = () => {
      const like = likes.find((like) => like.user_id === user_id);
      if (like) {
        axios
        .put(`${BASE_URL}/likes/${user_id}/${post_id}`) // Include user_id and post_id in the URL
        .then(()=> {
          // Update the state to reflect the removal of the like
          setLikes(likes.filter((likeItem) => likeItem.user_id !== user_id))
        })
        .catch((error)=> console.error("Error:", error));
      }
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
