import { getAuth } from "firebase/auth";
import { Navbar, Container, Button, Row } from "react-bootstrap";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSideBar from "../components/ProfileSideBar";
import ProfileMidBody from "../components/ProfileMidBody";
import { AuthContext } from "../components/AuthProvider";

export default function ProfilePage() {
  const auth = getAuth()
  const navigate = useNavigate();
  const {currentUser} = useContext(AuthContext);


  //Check if currentUser is logged in
  useEffect(() => {
 if (!currentUser) {
    navigate("/login"); //redirect to login in user not logged in
  }
  }, [currentUser, navigate])

const handleLogout = () => {
  auth.signOut();
}

  return (
    <>
      <Container>
        <Row>
          <ProfileSideBar handleLogout={handleLogout} />
          <ProfileMidBody />
        </Row>
      </Container>
    </>
  );
}
