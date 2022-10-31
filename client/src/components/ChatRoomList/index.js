import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const ChatRoomList = ({ chatrooms }) => {
  if (!chatrooms.length) {
    return <h3>No ChatRooms</h3>;
  }

  return (
    <Row xs={1} md={3} className="g-4">
      {chatrooms.map((rooms) => (
        <Col key={rooms._id}>
          <Card className="bg-main">
            <Card.Body>
              <Card.Title className="text-light">{rooms.roomName}</Card.Title>
              <div className="d-grid">
                <Link className="text-light btn bg-dark">Join Chat Room</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default ChatRoomList;
