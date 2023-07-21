import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import card1 from '../../assets/cardImg/card1.png'
import card2 from '../../assets/cardImg/card2.png'
import card3 from '../../assets/cardImg/card3.png'
import "./Card.scss"
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
{/*     
    <div className="content mt-lg-5">

<div class="box">
                <div class="inner">
                    <div class="icon">   <img className='mt-4' src={card.img} alt="" />
</div>
<h2 className='mt-3 hes'>{card.title}</h2>

<p className='mt-3 ppp'>{card.pera}</p>

                </div>
           </div>
</div> */}

<div class="grid stak-sd">
  <div class="cards mt-5 ">
    <span class="icon stak-sd">
    <img className='mt-4' src={card.img} alt="" />
    </span>
    <h4 className='mt-3 hes'>{card.title}</h4>
<p className='mt-3 ppp'>{card.pera}</p>
    <div class="shine"></div>
    <div class="background">
      <div class="tiles">
        <div class="tile tile-1"></div>
        <div class="tile tile-2"></div>
        <div class="tile tile-3"></div>
        <div class="tile tile-4"></div>

        <div class="tile tile-5"></div>
        <div class="tile tile-6"></div>
        <div class="tile tile-7"></div>
        <div class="tile tile-8"></div>

        <div class="tile tile-9"></div>
        <div class="tile tile-10"></div>
      </div>

      <div class="line line-1"></div>
      <div class="line line-2"></div>
      <div class="line line-3"></div>
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
