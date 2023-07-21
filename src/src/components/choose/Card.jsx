import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import card1 from '../../assets/cardImg/card1.png'
import card2 from '../../assets/cardImg/card2.png'
import card3 from '../../assets/cardImg/card3.png'
import "./Card.css"
const Card = () => {
        
    const [cards, setCards] = useState([
        {
            id: 1, 
            img: card1,
            title: 'Privacy Protection',
            pera: 'Its easy to see how much money is in every bitcoin address'
        },
        {
            id: 2, 
            img: card2,
            title: 'Works Everywhere',
            pera: 'Bitcoin does not just stop at being a currency--its an entire, anonymous system for trading and exchanging.'
        },
        {
            id: 3, 
            img: card3,
            title: 'ZIFT Networks',
            pera: 'As more people join the ZiftCoin network, its value increases'
        }
    ]);
  return (
    <Container>
            
        <Row className='justify-content-center'>

{cards.map((card) => (
   <Col sm={12} md={8} lg={4}>
    
    <div className="content">

<div class="box">
                <div class="inner">
                    <div class="icon">   <img className='mt-4' src={card.img} alt="" />
</div>
<h2 className='mt-3 hes'>{card.title}</h2>

<p className='mt-5 ppp'>{card.pera}</p>

                </div>
           </div>
</div>



   
   </Col>
))}
 
</Row>
    </Container>
  )
}

export default Card
