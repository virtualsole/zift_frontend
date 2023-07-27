import React, { useEffect, useRef, useState } from 'react'
// import React, {  } from 'react';

import stackBg from '../../assets/Staking_zift.png'
import { FaRegCopy } from 'react-icons/fa'
import { toast } from 'react-toastify';
import './Stack.css'
import Cards from './Cards/Cards/Cards';
import sponser from "../../assets/footer.ca581494.ca581494fb47e71a326f.png"
import sponder1 from '../../assets/PenCake_logo.caaabc72b5350befa1dc.png'
import sponder2 from '../../assets/Coinbase_logo.f8e6c7b9100d0af7651d.png'
import sponder3 from '../../assets/download.png'
import { loadWeb3, remoteWeb3 } from '../../connectivity/connectivity'
import { tokenAdress, ziftCoinContractAddress } from '../../contract/addresses/address'
import ziftCoinContractAbi from '../../contract/abis/ziftCoinContractAbi.json';
import tokenAbi from '../../contract/abis/tokenAbi.json';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { baseUrl } from '../../utils';
import AffiliateReward from '../level/levelRenderComponents/AffiliateReward';
import Reward from '../level/levelRenderComponents/Reward';
import Withdrawed from '../level/levelRenderComponents/Withdrawed';
import { updateStatus } from '../../store/slice/update';
import DirectReward from '../level/levelRenderComponents/DirectReward';
import AllReward from '../level/levelRenderComponents/AllReward';
import PulseLoader from "react-spinners/PulseLoader";
const Stack = () => {
  const packages = [
    {
      name: 'package1',
      levelAmount: [1, 100000],
    },
    {
      name: 'package2',
      levelAmount: [100001, 500000]
    },
    {
      name: 'package3',
      levelAmount: [500001, 1000000]
    },
    {
      name: 'package4',
      levelAmount: [1000001, 2000000]
    },
    {
      name: 'package5',
      levelAmount: [2000001, "unlimited"]
    }
  ]
  const dispatch = useDispatch()
  let [initiallink, setinitiallink] = useState(
    "http://localhost:3000/stack/?referrallink="
  );
  let [loading, setLoading] = useState(false);
  const [registerAddress, setRegisterAddress] = useState("");
  const [isStake, setIsStake] = useState(false);
  const [totalClaimed, setTotalClaimed] = useState(0);

  const [referalAddress, setReferalAddress] = useState('')
  const { isConnected, acc } = useSelector((state) => state.wallet);
  const { isUpdate } = useSelector((state) => state.update);
  console.log("isUpdate", isUpdate);
  const [tokenInfo, setTokenInfo] = useState({
    tokenSymbol: 'Token Name',
    tokenBalance: '0'
  })
  const [userInfo, setUserInfo] = useState({
    tokenSymbol: 'Token Name',
    totalStaked: '0',
    totalWithdrawl: '0',
    directs: '0',
  })
  useEffect(() => {
    // window.scrollTo(0, 0)
  }, []);

  const getInfo = async () => {

    let obj = {}
    let tokenInfo = {}
    try {

      const web3 = window.web3

      let tokeninstance = new web3.eth.Contract(
        tokenAbi,
        tokenAdress
      );
      let ziftCoinContractInstance = new web3.eth.Contract(
        ziftCoinContractAbi, ziftCoinContractAddress
      );

      let symbol = await tokeninstance.methods.symbol().call()
      obj.tokenSymbol = symbol
      let { totalDeposit } = await ziftCoinContractInstance.methods.getUserInfo(acc).call();
      obj.totalStaked = await web3.utils.fromWei(String((totalDeposit)))
      let response = await axios.get((`${baseUrl}/getUserReferralReward/${acc}`))
      obj.directs = response.data.data

      let balance = await tokeninstance.methods.balanceOf(acc).call()
      console.log("bal", balance);
      let defaultReferalAddress = await ziftCoinContractInstance.methods.getDefaultAddress().call()
      tokenInfo.tokenSymbol = symbol
      balance = balance / 10 ** 18
      tokenInfo.tokenBalance = balance
      setTokenInfo(tokenInfo)

      setUserInfo(obj)
      let url = window.location.href;
      if (url.includes("referrallink")) {
        let { referrer, totalDeposit } = await ziftCoinContractInstance.methods.getUserInfo(acc).call();
        if ((referrer != '0x0000000000000000000000000000000000000000' && totalDeposit > 0)) {
          setRegisterAddress(acc)
          setReferalAddress(acc)
        }
        else {
          var position = url.indexOf("=");
          position = position + 1;
          let address = url.slice(position);
          let { referrer, totalDeposit } = await ziftCoinContractInstance.methods.getUserInfo(address).call();
          if ((referrer != '0x0000000000000000000000000000000000000000' && totalDeposit != 0) || address == defaultReferalAddress) {
            setReferalAddress('')
            setRegisterAddress(address)
          }
          else {
            setReferalAddress('')
            setRegisterAddress(defaultReferalAddress)
            toast.error('invalid referrer')
          }
        }
      }
      else {
        let { referrer, totalDeposit } = await ziftCoinContractInstance.methods.getUserInfo(acc).call();

        if (referrer == '0x0000000000000000000000000000000000000000') {
          setRegisterAddress(defaultReferalAddress)
          setReferalAddress('')
        }
        else if (referrer != '0x0000000000000000000000000000000000000000' && totalDeposit > 0) {
          setRegisterAddress(acc)
          setReferalAddress(acc)
        }
        else {
          // setRegisterAddress(acc)
          setRegisterAddress(defaultReferalAddress)
          setReferalAddress('')
        }
      }

    } catch (error) {
      console.error("error", error);
    }

  }
  useEffect(() => {
    if (isConnected) {

      getInfo()
    }

  }, [isConnected]);

  const handleStake = async (userId, packageLevel, stakeAmount) => {
    if (isConnected) {
      try {
        const pkg = packages.find(pkg => pkg.name === packageLevel);
        if (!pkg) {
          console.error('Invalid package level');
          return;
        }

        // Check if stakeAmount falls within the levelAmount range
        const [min, max] = pkg.levelAmount;

        // If max is not defined, it means it's unlimited
        if (max) {
          if (stakeAmount < min || stakeAmount > max) {
            toast.error('Invalid stake amount in your selected pool.');
            return;
          }
        } else {
          if (stakeAmount < min) {
            toast.error('Invalid stake amount in your selected pool.');
            return;
          }
        }
        let acc = await loadWeb3()
        const web3 = window.web3
        let ziftCoinContractInstance = new web3.eth.Contract(
          ziftCoinContractAbi, ziftCoinContractAddress
        );
        let amount = await web3.utils.toWei(String(stakeAmount))
        let tokeninstance = new web3.eth.Contract(
          tokenAbi,
          tokenAdress
        );
        let signatureInfo = await axios.post((`${baseUrl}/getSignatureDeposit`), {
          contractAddress: ziftCoinContractAddress,
          userAddress: acc,
          referalAddress: registerAddress,
          amount: amount
        })
        const txApp = tokeninstance.methods.approve(ziftCoinContractAddress, amount);
        const gasEstimateApp = await txApp.estimateGas({ from: acc })
        await tokeninstance.methods.approve(ziftCoinContractAddress, amount).send({
          from: acc,
          gasPrice: web3.utils.toHex(web3.utils.toWei("10", 'gwei')),
          gasLimit: web3.utils.toHex(gasEstimateApp)
        })
        getInfo()
        const tx = ziftCoinContractInstance.methods.deposit(amount, registerAddress, signatureInfo.data.nonce, signatureInfo.data.signature);
        const gasEstimate = await tx.estimateGas({ from: acc })
        await ziftCoinContractInstance.methods.deposit(amount, registerAddress, signatureInfo.data.nonce, signatureInfo.data.signature).send(
          {
            from: acc,
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", 'gwei')),
            gasLimit: web3.utils.toHex(gasEstimate)
          }
        );
        let stakeObj = {
          userId: userId,
          packageId: packageLevel,
          stakeAmount: Number(stakeAmount)
        };
        axios.post((`${baseUrl}/investments`), stakeObj).then((value) => {
          setIsStake(!isStake)
        }).catch((error) => {
          console.error('error while stake', error.message)
        })
        toast.success('Deposit successfully')
        getInfo()
        dispatch(updateStatus(!isUpdate))

      } catch (error) {
        console.log('error while deposit', error.message)
      }
    }
    else {
      toast.error('please connect wallet')
    }
  }

  const withdraw = async () => {
    try {
      if (!isConnected) {
        toast.error("please connect wallet");
        return
      }
      setLoading(true)
      const web3 = window.web3
      let ziftCoinContractInstance = new web3.eth.Contract(
        ziftCoinContractAbi, ziftCoinContractAddress
      );
      let { data: { reward } } = await axios.get(`${baseUrl}/getUserReward/${acc}`)

      if (reward > 0) {
        let amount = await web3.utils.toWei(String(reward))
        let signatureInfo = await axios.post((`${baseUrl}/getSignature`), {
          contractAddress: ziftCoinContractAddress,
          userAddress: acc,
          amount: amount
        })
        let tx = ziftCoinContractInstance.methods.withdraw(amount, signatureInfo.data.nonce, signatureInfo.data.signature);
        let gasEstimate = await tx.estimateGas({ from: acc })
        await ziftCoinContractInstance.methods.withdraw(amount, signatureInfo.data.nonce, signatureInfo.data.signature).send(
          {
            from: acc,
            gasPrice: "10000000000", // the gas price in Gwei
            gasLimit: web3.utils.toHex(gasEstimate)
          }
        );
        await axios.put(`${baseUrl}/resetRewards`, {
          address: acc
        })
        dispatch(updateStatus(!isUpdate))
        toast.success('successfuly withdraw')
        setLoading(false)
        getInfo()
      } else {
        setLoading(false)
        toast.info("Insufficient reward!")
      }

    } catch (error) {
      setLoading(false)
      console.error('error while withdraw', error.message)
    }
  }
  return (
    <section className='bg_stak'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-6 col-sm-12 mt-lg-5 p-lg-4">
            <span className='text-light fs-1 fw-bold mb-lg-5 stak-sd' data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="3000">Staking</span>

            <p className='text-light mt-lg-3 stak-sd'>Sacred Farms offer multiple farming opportunities to you. Get double rewards by staking your HPG tokens in return for additional HPG tokens and earning high income.</p>

            <button className="btn btn2 stak-sd mt-2" data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="3000">Learn how to start</button>
          </div>
          <div className="col-lg-6 stak-sd col-sm-12"><img className='img-fluid' src={stackBg} alt="" /></div>
        </div>
        <div className="row">
          <div className='col-sm-12'>
            <div className="border-stak">

              <h2 className='text-stack text-center mt-lg-5'>MAXIMUM CAPPING FOR ALL BONUS MARKETING</h2>
              <p className="text-light text-center mt-lg-4 fw-light-bold">5x will need to renew their package same or bigger to enjoy more marketing profits.<br></br>
                Bonus will be count : Direct commissions & 10 level commissions</p>
            </div>
          </div>

        </div>
        <div className="border-stak2 mt-4 mb-5 stack-sd">
      
         <div className="row stak-sdd">
            <div className="col-lg-4 col-md-6 col-sm-12 mt-lg-4 p-lg-3 sm-stak ">
              <span className='total_stack'>Total Staked</span>
              <br></br>
              <br></br>
              <span className='text-hpg'>{userInfo?.totalStaked} ZFT</span>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-lg-4 p-lg-3 sm-stak">
              <span className='total_stack'>Your Directs Bonus</span>
              <br></br>
              <br></br>
              <span className='text-hpg'>{isConnected ? <DirectReward address={acc} /> : 0} ZFT</span>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 mt-lg-4 p-lg-3 sm-stak">
              <span className='total_stack'>Your Affiliate Reward
              </span>
              <br></br>
              <br></br>
              <span className='text-hpg'>{isConnected ? <AffiliateReward address={acc} /> : 0} ZFT</span>
            </div>
            </div>
            <div className="row stak-sdd">
            <div className="col-lg-4 col-md-6 col-sm-12 mt-lg-4 p-lg-3 sm-stak">
              <span className='total_stack'>Claimed staking reward</span>
              <br></br>
              <br></br>
              <span className='text-hpg w-50'>{isConnected ? <Reward address={acc} /> : 0}  ZFT</span>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 p-lg-3 sm-stak mt-lg-2">
              <span className='total_stack'>Withdraw</span>
              <br></br>
              <br></br>
              <span className='text-hpg'>{isConnected ? <Withdrawed address={acc} /> : 0}  ZFT</span>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 p-lg-3 mt-lg-2">
              <span className='total_stack'>Claimed, Directs & Affiliate</span>
              <br></br>
              <br></br>
              <span className='text-hpg'>{isConnected ? <AllReward address={acc} /> : 0} ZFT</span>
            </div>
          </div>
        
          <h2 className='text-stack text-center mt-5'>Withdraw Directs and Affiliate Reward</h2>
          <div className="cta_stak mt-4">
            <button class="btn btn-outline-warning m-1" onClick={withdraw}>
              {loading ?
                <PulseLoader
                  color="#fff"
                  className='p-1'
                  loading={loading}
                  size={10}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
                : "Withdraw"}

            </button>
            <NavLink to="level">
              <button class="btn btn-outline-warning m-1">Level</button>
            </NavLink>
            {/* <NavLink to="detail">
              <button class="btn btn-outline-warning m-1">  Details</button>
            </NavLink> */}
          </div>
          <h2 className='text-stack text-center mt-5'>Referral link</h2>
          <div className="stak-copy mt-3">
            <form>
              <input type="text" value={initiallink + referalAddress} readOnly />
              <button type='button' disabled={!isConnected || referalAddress.length < 1} onClick={() => { navigator.clipboard.writeText(initiallink + referalAddress); toast.success('copied') }}><FaRegCopy className='fas-btn' /></button>
            </form>
          </div>
        </div>
        <div className='text-center mb-5'>
          <span className='balance fs-5'>User Balance</span>
          <span className='text-dark balance text-center ms-5 fs-5 fw-bold'>{Number(tokenInfo.tokenBalance).toFixed(4)}Zift</span>
        </div>
        <Cards symbol={tokenInfo.tokenSymbol} handleStake={handleStake} acc={acc} setTotalClaimed={setTotalClaimed} tokenBalance={tokenInfo.tokenBalance} isStake={isStake} />
        <div className="border-stak4 p-5 mx-auto">
          <div className="row">
            <span className='text-light mb-4'>  Total income: based on your tarrif plan ( <span className='text-warning'>from 0.15% to 0.23% daily</span> )
            </span>
            <span className='text-light mb-4'>
              Basic interest rate: <span className='text-warning'>+0.15% every 24 hours</span> - only for new deposits
            </span>
            <span className='text-light mb-4'>Minimum deposit: <span className='text-warning'>100 Zift</span>, no maximum limit</span>
            <span className='text-light mb-4'>
              Minimum withdraw: <span className='text-warning'>100 Zift</span>, no maximum limit
            </span>
            <div>
            </div>
          </div>
        </div>
        <h2 className='text-stack text-center mt-5 mb-lg-5'>SPONSORS</h2>
        <div className='sponser1'>
          <img className='img-fluid' src={sponser} alt="" />
        </div>
        <div className="cta_stak mt-lg-4">
          <img className='img-fluid sponser' width={176} height={44} src={sponder1} alt="" />
          <img className='img-fluid sponser' width={176} height={44} src={sponder2} alt="" />
          <img className='img-fluid sponser' width={176} height={44} src={sponder3} alt="" />
        </div>
      </div>
    </section>
  )
}

export default Stack
