import React from 'react';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import 'bootstrap/dist/css/bootstrap.min.css';
import css from './Cards.css';


const Cards = (props) => {
   
    return (
      <div className="Cards">
        <Row xs={3}>
            <Col>
            <Card
            bg="dark"
            border="info"
            text="white"
            >
                <Card.Header as="h4">{props.title1}</Card.Header>
                <Card.Body>
                <Card.Text as="h5">
                    {props.text1}
                </Card.Text><br/>
                <InputGroup className="mb-3" bg="primary">
                    <FormControl
                    onChange={props.onChange1}
                    placeholder={props.placeholder1}
                    />
                    <Button 
                    variant="outline-secondary"
                     id="button-addon2" 
                     onClick={props.onClick1}>
                    {props.button1}
                    </Button>
                </InputGroup>
                </Card.Body>
             </Card>
            </Col>
                <Col>
            <Card
                bg="dark"
                border="info"
                text="white"
            >
                <Card.Header as="h4">{props.title4}</Card.Header>
                <Card.Body>
                <Card.Text as="h5">
                    {props.text4}
                </Card.Text><br/>
                <InputGroup className="mb-3" bg="primary">
                    <FormControl
                    onChange={props.onChange4}
                    placeholder={props.placeholder4}
                    />
                     <Button 
                    variant="outline-secondary"
                     id="button-addon2" 
                     onClick={props.onClick4}>
                    {props.button4}
                    </Button>
                    <Button 
                    variant="outline-secondary"
                     id="button-addon2" 
                     onClick={props.onClick4a}>
                    {props.button4a}
                    </Button>
                </InputGroup>
                </Card.Body>
             </Card>
            </Col>
                <Col>
            <Card
                bg="dark"
                border="info"
                text="white"
            >
                <Card.Header as="h4">{props.title2}</Card.Header>
                <Card.Body>
                <Card.Text as="h5">
                    {props.text2}
                </Card.Text><br/>
                <InputGroup className="mb-3" bg="primary">
                    <FormControl
                    onChange={props.onChange2}
                    placeholder={props.placeholder2}
                    />
                    <Button 
                    variant="outline-secondary"
                     id="button-addon2" 
                     onClick={props.onClick2}
                     >
                    {props.button2}
                    </Button>
                </InputGroup>
                <InputGroup className="mb-3" bg="primary">
                    <FormControl
                    onChange={props.onChange2a}
                    placeholder={props.placeholder2a}
                    />
                    <Button 
                    variant="outline-secondary"
                     id="button-addon2" 
                     onClick={props.onClick2a}
                     >
                    {props.button2a}
                    </Button>
                </InputGroup>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card
                bg="dark"
                border="info"
                text="white"
            >
            <Card.Header as="h4">{props.title5}</Card.Header>
                <Card.Body>
                <Card.Text as="h5">
                    {props.text5}
                </Card.Text><br/>
                <InputGroup className="mb-3" bg="primary">
                    <FormControl
                    onChange={props.onChange5}
                    placeholder={props.placeholder5}
                    />
                    <Button 
                    variant="outline-secondary"
                     id="button-addon2" 
                     onClick={props.onClick5}
                     >
                    {props.button5}
                    </Button>
                </InputGroup>
                <InputGroup className="mb-3" bg="primary">
                    <FormControl
                    onChange={props.onChange5a}
                    placeholder={props.placeholder5a}
                    />
                    <Button 
                    variant="outline-secondary"
                     id="button-addon2" 
                     onClick={props.onClick5a}
                     >
                    {props.button5a}
                    </Button>
                </InputGroup>
                </Card.Body>
            </Card>
            </Col>
            <Col>
            <Card
                bg="dark"
                border="info"
                text="white"
                >
                <Card.Header as="h4">{props.title3}</Card.Header>
                <Card.Body>
                <Card.Text as="h5">
                    {props.text3}
                </Card.Text><br/>
                <InputGroup className="mb-3" bg="primary">
                    <FormControl
                    placeholder={props.placeholder3}
                    onChange={props.onChange3}
                    />
                    <Button 
                    variant="outline-secondary"
                     id="button-addon2"
                     onClick={props.onClick3}
                     >
                        {props.button3}
                    </Button><br/>
                </InputGroup>
                </Card.Body>
                <Button 
                    variant="success"
                    onClick={props.sendEth}
                >
                   Send ETH to my Account
                </Button>
            </Card>
            </Col>
        </Row>
    </div>
    );
  }
  

export default Cards;
