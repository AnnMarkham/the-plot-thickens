import React from 'react';
import {Card, Nav} from 'react-bootstrap'

const StoryCard = () => {
    return(
        <Card>
        <Card.Header>
          <Nav variant="pills" defaultActiveKey="#first">
            <Nav.Item>
              <Nav.Link href="#first">Plot</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Setting</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="#link">Characters</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body>
          <Card.Title>Story Title can Go Here</Card.Title>
          <Card.Text>
            With basic description of the story or something else.  
          </Card.Text>
        </Card.Body>
      </Card>
    )
}  


export default StoryCard;        