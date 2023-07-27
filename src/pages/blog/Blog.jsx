import React, {useEffect} from 'react'
import {TbSearch} from 'react-icons/tb'
import { Form, Button } from 'react-bootstrap'
import BlogFuture from '../../assets/WhatsApp-Image-2022-10-24-at-2.41.04-PM-1.jpeg'
import BlogFuture2 from '../../assets/WhatsApp-Image-2022-10-24-at-2.41.03-PM-840x473.jpeg'
import BlogFuture3 from '../../assets/PinInstagram.jpg'
import BlogFuture4 from '../../assets/ziftcoin 4-01.png'
import BlogFuture5 from '../../assets/WhatsApp-Image-2022-10-24-at-2.40.47-PM.jpeg'
import BlogFuture6 from '../../assets/WhatsApp-Image-2022-10-24-at-2.41.04-PM-1.jpeg'
import './Blog.css'
const Blog = () => {
  useEffect(() => {
    window.scrollTo(0,0)
  },[])
  return (
    <section className='history-bg'>
    <div className="container pt-lg-5">
      <h1 className='mb-lg-5 mt-lg-5 blog_heading'>Blog Standard</h1>

      <div className="row">
        <div className="col-lg-8 col-sm-12">
          <img className='img-fluid blog mb-5' src={BlogFuture} alt="" height={499} width={500}/>
          <span className='text-light fs-3 d-block'>Wake Up And Buy ZIFT</span>
          <div className="d-flex mb-3">
          <span className='text-light p-1'>May 14, 2023</span>
          <span className='text-light p-1'></span>
          <span className='text-light p-1'>0 Comments</span>
          </div>
          <img className='img-fluid blog mb-5' src={BlogFuture2} alt="" height={499} width={500}/>
          <span className='text-light fs-3 d-block'>Get Free Zift Token</span>
          <div className="d-flex mb-3">
          <span className='text-light p-1'>May 14, 2023</span>
          <span className='text-light p-1'></span>
          <span className='text-light p-1'>0 Comments</span>
          </div>
          <span className='text-light p-1'>Begin Investing in Zift Coin and invite friend multiple earning Quickly with us.</span>

          <img className='img-fluid blog mt-3 mb-5' src={BlogFuture3} alt="" height={499} width={500}/>
          <span className='text-light fs-3 d-block'>Zift Coin</span>
          <div className="d-flex mb-3">
          <span className='text-light p-1'>May 14, 2023</span>
          <span className='text-light p-1'></span>
          <span className='text-light p-1'>0 Comments</span>
          </div>
          <img className='img-fluid blog mb-5' src={BlogFuture4} alt=""height={499} width={500} />
          <span className='text-light fs-3 d-block '>Long Term Use</span>
          <div className="d-flex mb-3">
          <span className='text-light p-1'>May 14, 2023</span>
          <span className='text-light p-1'></span>
          <span className='text-light p-1'>0 Comments</span>
          </div>
          <img className='img-fluid blog' src={BlogFuture5} alt="" height={499} width={500} />
          <span className='text-light fs-3 d-block'>
Future Investment</span>
          <div className="d-flex mb-3">
          <span className='text-light p-1'>May 14, 2023</span>
          <span className='text-light p-1'></span>
          <span className='text-light p-1'>0 Comments</span>
          </div>
          
          <img className='img-fluid blog' src={BlogFuture6} alt="" height={499} width={500}/>
          <span className='text-light fs-3 d-block'>ZIFT COIN Access
</span>
          <div className="d-flex mb-3">
          <span className='text-light p-1'>April 21, 2023</span>
          <span className='text-light p-1'></span>
          <span className='text-light p-1'>0 Comments</span>
          </div>
          
        </div>
        <div className="col-lg-4 col-sm-12">
        <div className="blog-border pt-5 pb-5">
          <span className='p-4 mt-5 text-light fs-4'>Search</span>
        <Form className="d-flex p-2 mb-2">
            <Form.Control
              type="search"
              placeholder="Search"
              className="m-2 blog-search"
              aria-label="Search"
            />
            <Button variant="outline-success"><TbSearch /></Button>
          </Form>
          <span className='p-4 mt-5 text-light mb-3'>Recent Posts</span>

          <div className="row pt-3 pb-3">
            <div className="col-4">
              <img className='img-fluid p-2 ms-3' src={BlogFuture} alt="" />
            </div>
            <div className="col-8 mt-3">
            
          <span className='text-light p-1'>ANNOUNCEMENTS</span>
          <span className='text-danger p-1'>May 14, 2023</span>
          <br></br>
          <span className='text-warning fs-5 '>Wake Up And Buy ZIFT</span>
        
            </div>
          </div>
          <div className="row pb-3 mb-">
            <div className="col-4">
              <img className='img-fluid p-2 ms-3' src={BlogFuture2} alt="" />
            </div>
            <div className="col-8 mt-3">
            
          <span className='text-light p-1'>Blog</span>
          <span className='text-danger p-1'>May 14, 2023</span>
          <br></br>
          <span className='text-warning fs-5 ms-1 '>Get Free Zift Token</span>
        
            </div>
          </div>
                
          
                  <div className="blanck-border mt-4"></div>
         
            
        </div>
        </div>
      </div>
    

    </div>
  </section>
  )
}

export default Blog