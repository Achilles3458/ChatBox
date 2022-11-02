import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import { Link } from "react-router-dom";
import Auth from "../../utils/auth";

const ChatRoomList = ({ chatrooms }) => {
  if (!chatrooms.length) {
    return <h3>No ChatRooms</h3>;
  }
  for (const roomId of chatrooms) {
    console.log(roomId._id);
  }
  return (
    <Row xs={1} md={3} className="g-4">
      {chatrooms.map((rooms) => (
        <Col key={rooms._id}>
          <Card className="bg-main">
            <Card.Body>
              <Card.Title className="text-light">{rooms.roomName}</Card.Title>
              <div className="d-grid">
                {Auth.loggedIn() ? (
                  <Link
                    className="text-light btn bg-dark"
                    to={`/chatrooms/${rooms._id}`}
                  >
                    Join Chat Room
                  </Link>
                ) : (
                  <Alert variant="danger">
                    You Need to login for chat room access.
                  </Alert>
                )}
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ChatRoomList;
