import React from 'react'
import Add1 from '../../assets/Screenshot_2022-10-24_140105-removebg-preview.png'
import Add2 from '../../assets/Screenshot_2022-10-24_140117-removebg-preview.png'
import Add3 from '../../assets/pngwing.com.png'
import Add4 from '../../assets/Screenshot_2022-10-24_140144-removebg-preview.png'
import Add5 from '../../assets/usd-coin-usdc-logo.png'

import Add7 from '../../assets/logo_zift-removebg-preview.png'
import './Top.css'
const Top = () => {
  return (
   <section className='Top-bg'>
     <div className="container pt-5">
        <div className="row justify-content-center">
            <div className="col-6" data-aos="fade-left"
            data-aos-anchor-placement="center-bottom"
            data-aos-duration="3000"
            data-aos-easing="linear">
                <h1 className='text-white lh-1 fs-1 mb-lg-3 mt-lg-5 bold top-sd'>
Check our top
clients & partners</h1>
            </div>
            <div className="col-lg-6 pt-5">
                <span className='mt-lg-5 text-light   top-sd'>
                ZiftCoin.com Institutional Markets is a full-stack crypto services platform that works with crypto-native businesses and institutional clients on lending, trading, and custody solutions tailored to your needs.
                </span>
            </div>
        </div>
        <div data-aos="zoom-in" data-aos-offset="400" className='row justify-content-between mt-lg-4'>
            <div className='col-lg-12 col-sm-6 d-block d-lg-flex justify-content-between text-center stak-sd'>
            <img className='client-img' src={Add1} alt="" />
            <img className='client-img' src={Add2} alt="" />
            <img className='client_img mt-lg-3' src={Add3} alt="" />
            <img className='client-img' src={Add4} alt="" />
            <img className='client_img mt-lg-3' src={Add5} alt="" />
            <img className='client-img' src={Add7} alt="" />
           
            </div>
        </div>
    </div>
   </section>
  )
}

export default Top
