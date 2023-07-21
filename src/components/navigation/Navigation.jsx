import React, { useEffect, useState } from 'react'

import images from '../../assets/zift-coin-logo-2.png';

import { Nav } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { CgMenuLeft } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';


import { loadWeb3 } from '../../connectivity/connectivity'
import './Navigation.css'
import { walletShortFormer } from '../../utils'
import tokenAbi from '../../contract/abis/tokenAbi.json';
import ziftCoinContractAbi from '../../contract/abis/ziftCoinContractAbi.json';
import { tokenAdress, ziftCoinContractAddress } from '../../contract/addresses/address';
import { updateWalletInfo } from '../../store/slice/wallet/walletSlice';
import { toast } from 'react-toastify';
import { LinkContainer } from 'react-router-bootstrap';

const Navigation = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);

// console.log('toggleMenu',toggleMenu)
  const { isConnected, acc } = useSelector((state) => state.wallet)
  const dispatch = useDispatch()


  const getaccount = async () => {
    let acc = await loadWeb3();

    if (acc == "No Wallet") {
      toast.error('please install metamask')
    }
    else if (acc == "Wrong Network") {
      toast.error('Wrong Network connect to binance testnet')
    } else {
      dispatch(updateWalletInfo(acc))


    }
  }

  return (
    <>
      <nav className="app__navbar">
        <div className="app__navbar-logo">
          <img src={images} alt="app__logo" />
        </div>
        <ul className="app__navbar-links mt-lg-3">
          <NavLink to="/">
            <li className="p__opensans"><a href="#home">Home</a></li>
          </NavLink>
          <NavLink to="about">
            <li className="p__opensans"><a href="#about">About Us</a></li>
          </NavLink>
          <NavLink to="history">
            <li className="p__opensans"><a href="#menu">History</a></li>
          </NavLink>
          <NavLink to="blog">
            <li className="p__opensans"><a href="#awards">Blog</a></li>
          </NavLink>
          <NavLink to="stack">
            <li className="p__opensans"><a href="#awards">Staking</a></li>
          </NavLink>
          <NavLink to="contact">
            <li className="p__opensans"><a href="#contact">Contact</a></li>
          </NavLink>
        </ul>
        <div className="app__navbar-login">
          <Nav.Link> <button className='btn btn2 me-2 btn_mob' onClick={getaccount}> {isConnected ? <>{walletShortFormer(acc)}</> : <>Connect Wallet</>}</button></Nav.Link>

          <NavLink to="/Bycoin">

            <button className='btn btn2 btn-mob'>Let's Play</button>
          </NavLink>

          <NavLink to="/Bycoin">

            <button className='btn btn2 btn-mob'>Buy ZiftCoin</button>
          </NavLink>
        </div>
        <div className="app__navbar-smallscreen">
          <CgMenuLeft color="#fff" fontSize={27} onClick={() => setToggleMenu(true)} />
          {toggleMenu && (
            <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
              <AiOutlineClose fontSize={27} className="overlay__close" onClick={() => setToggleMenu(false)} />
              <ul className="app__navbar-smallscreen_links">
                <NavLink to="/">
                  <li><a onClick={() => setToggleMenu(false)}>Home</a></li>
                </NavLink>
                <NavLink to="about">
                  <li><a onClick={() => setToggleMenu(false)}>About Us</a></li>
                </NavLink>
                <NavLink to="history">
                  <li><a onClick={() => setToggleMenu(false)}>History</a></li>
                </NavLink>
                <NavLink to="blog">
                  <li><a onClick={() => setToggleMenu(false)}>Blog</a></li>
                </NavLink>
                <NavLink to="stack">
                  <li><a onClick={() => setToggleMenu(false)}>Staking</a></li>
                </NavLink>
                <NavLink to="contact">
                  <li><a onClick={() => setToggleMenu(false)}>Contact</a></li>
                </NavLink>
                <NavLink to="Bycoin">

                <button className='btn btn2 stak-sd' onClick={() => setToggleMenu(false)}>Let's Play</button>
                </NavLink>

                <NavLink to="Bycoin">

                   <button className='btn btn2 stak-sd mt-3' onClick={() => setToggleMenu(false)} >Buy ZiftCoin</button>
                </NavLink>
              </ul>
            </div>
          )}
        </div>
      </nav>


    </>
  )
}

export default Navigation



