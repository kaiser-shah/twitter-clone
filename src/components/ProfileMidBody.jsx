import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { Button, Col, Image, Nav, Row } from "react-bootstrap";
import ProfilePostCard from "./ProfilePostCard";

export default function ProfileMidBody() {
  const [posts, setPosts] = useState([]);
  const url =
    "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500";
  const pic =
    "https://pbs.twimg.com/profile_images/1587405892437221376/h167Jlb2_400x400.jpg";

  const fetchPosts = (user_id) => {
    fetch(`https://b2093b0a-b8a1-493b-a78f-36729cbde74e-00-l9pavi6cnqhn.sisko.replit.dev/posts/users/${user_id}`)
    .then((response) => response.json())
    .then((data) => setPosts(data))
    .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const user_id = decodedToken.id;
      console.log(user_id)
      fetchPosts(user_id)
    }
  }, []);

  return (
    <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
      <Image src={url} fluid />
      <br />
      <Image
        src={pic}
        roundedCircle
        style={{
          width: 150,
          position: "absolute",
          top: "140px",
          border: "4px solid #F8F9FA",
          marginLeft: 15,
        }}
      />

      <Row className="justify-content-end">
        <Col xs="auto">
          <Button className="rounded-pill mt-2" variant="outline-secondary">
            Edit Profile
          </Button>
        </Col>
      </Row>

      <p
        className="mt-5"
        style={{ margin: 0, fontWeight: "bold", fontSize: "15px" }}
      >
        Shah
      </p>
      <p style={{ marginBottom: "2px" }}>@Shah.Jabbar</p>

      <p>I am an amazing person</p>
      <p>Software Legend</p>
      <p>
        <strong>271</strong> Following <strong>610</strong> Followers
      </p>
      <Nav variant="underline" defaultActiveKey="/home" justify>
        <Nav.Item>
          <Nav.Link eventKey="/home"> Tweets </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/link-1"> Replies </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/link-2"> Highlights </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/link-3"> Media </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/link-4"> Likes </Nav.Link>
        </Nav.Item>
      </Nav>
      {posts.length > 0 && posts.map((post) => (
        <ProfilePostCard key={post.id} content={post.content} post_id={post.id} />
      ))}
    </Col>)
}
