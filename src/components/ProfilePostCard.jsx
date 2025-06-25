import { Button, Col, Image, Row } from "react-bootstrap";
import { useEffect, useState} from 'react';

export default function ProfilePostCard({ content, post_id }) {
  const [likes, setLikes] = useState(0);
  const pic =    "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

    useEffect(() => {
      fetch(
        `https://b2093b0a-b8a1-493b-a78f-36729cbde74e-00-l9pavi6cnqhn.sisko.replit.dev/likes/post/${post_id}`
      )
      .then((response) => response.json())
      .then((data) => {console.log(data); setLikes(data.length)})
      .catch((error) => console.error("Error", error));
    }, [post_id]);

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
          <Button variant="light">
            <i className="bi bi-heart">{likes}</i>
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
