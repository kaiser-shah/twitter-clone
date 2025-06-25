import axios from "axios"
import { useState } from "react"
import { Button, Form, Modal, ModalBody } from 'react-bootstrap'
import {jwtDecode} from 'jwt-decode'

export default function NewPostModal({show, handleClose}) {
    const [postContent, setPostContent] = useState("")

    const handleSave = () => {
        //Get stored JWT token
        const token = localStorage.getItem("authToken")

        //Decode the token to fetch user id
        const decode = jwtDecode(token);
        const userId = decode.id // May change depending on how the server encode the token
  


    //Prepare data to be sent
    const data = {
        title: "Post Title", // add functionality to set this properly
        content: postContent,
        user_id: userId };  
    
//Make your API call
axios
.post("https://b2093b0a-b8a1-493b-a78f-36729cbde74e-00-l9pavi6cnqhn.sisko.replit.dev/posts", data)
.then((response) => {
    console.log("Success:", response.data);
    handleClose();
})

.catch((error) => {
    console.error("Error", error)
})
}
return (
    <>
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <ModalBody>
            <Form>
                <Form.Group controlId="postContent">
                    <Form.Control
                    placeholder="What is happening?"
                    as="textarea"
                    rows={3}
                    onChange={(e)=> setPostContent(e.target.value)}
                    />
                </Form.Group>
            </Form>
        </ModalBody>
        <Modal.Footer>
            <Button
            variant="primary"
            className="rounded-pill"
            onClick={handleSave}
            >Tweet
            </Button>
        </Modal.Footer>
    </Modal>
    </>
)}