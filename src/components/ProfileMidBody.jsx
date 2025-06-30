// import { jwtDecode } from "jwt-decode";
import { useEffect, useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { Button, Col, Image, Nav, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import ProfilePostCard from "./ProfilePostCard";
import me_circle from "../assets/me_circle.jpeg"
import { fetchPostsByUser } from "../features/posts/postsSlice";

export default function ProfileMidBody() {
  // const [posts, setPosts] = useState([]);
  const url =
    "https://pbs.twimg.com/profile_banners/83072625/1602845571/1500x500";
  // const pic = "../assets/me_circle.jpeg"
  const dispatch = useDispatch();
  const posts = useSelector(store => store.posts.posts)
  const loading = useSelector(store => store.posts.loading)
  const { currentUser } = useContext(AuthContext);

  useEffect(()=> {
    dispatch(fetchPostsByUser(currentUser.uid))
  }, [dispatch, currentUser])

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (token) {
  //     const decodedToken = jwtDecode(token);
  //     const user_id = decodedToken.id;
  //     console.log(user_id)
  //     dispatch(fetchPostsByUser(user_id))
  //   }
  // }, [dispatch]);

  return (
    <Col sm={6} className="bg-light" style={{ border: "1px solid lightgrey" }}>
      <Image src={url} fluid />
      <br />
      <Image
        src={me_circle}
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
      {loading && (
        <Spinner animation="border" className="ms-3 mt-3" variant="primary" />
      )} {posts.map((post) => (
        <ProfilePostCard key={post.id} post={post}/>
    
      ))}
    </Col>)
}
