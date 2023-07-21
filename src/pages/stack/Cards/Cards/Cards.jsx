import React, { useState } from 'react'
import logo from '../../../../assets/zift-coin-logo-2.png'
import './Cards.css'
import axios from 'axios';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Countdown from 'react-countdown';
import { toast } from 'react-toastify';
import { baseUrl } from '../../../../utils';
import { updateStatus } from '../../../../store/slice/update';
import PulseLoader from "react-spinners/PulseLoader";
const Cards = ({ symbol, handleStake, setTotalClaimed, tokenBalance, isStake }) => {
  const dispatch = useDispatch()
  const { isConnected, acc } = useSelector((state) => state.wallet)
  const { isUpdate } = useSelector((state) => state.update)
  const [PoolInfo, setPoolInfo] = useState([
    {
      name: 'package1',
      levelAmount: '1-100000',
      levelRoi: '0.15',
      value: '',
      errorMessage: '',
      disable: true
    },
    {
      name: 'package2',
      levelAmount: '100001-500000',
      levelRoi: '0.17',
      value: '',
      errorMessage: '',
      disable: true
    },
    {
      name: 'package3',
      levelAmount: '500001-1000000',
      levelRoi: '0.19',
      value: '',
      errorMessage: '',
      disable: true
    },
    {
      name: 'package4',
      levelAmount: '1000001-2000000',
      levelRoi: '0.2',
      value: '',
      errorMessage: '',
      disable: true
    },
    {
      name: 'package5',
      levelAmount: '2000001-unlimited',
      levelRoi: '0.23',
      value: '',
      errorMessage: '',
      disable: true
    }
  ])
  let [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [userStaked, setUserStaked] = useState([])
  const handleInputChange = (index, event) => {
    if (event.target.value > tokenBalance) {
      const values = [...PoolInfo];
      values[index] = { ...values[index], value: event.target.value, errorMessage: "You don't have enough token", disable: true }
      setPoolInfo(values);
      setErrorMessage("you don't have enough token")

    }
    else {
      const values = [...PoolInfo];
      values[index] = { ...values[index], value: event.target.value, errorMessage: '', disable: false }
      setPoolInfo(values);
    }
  };

  const checkUser = async () => {
    try {

      let response = await axios.get((`${baseUrl}/getWalletId/${acc}`))
      console.log('checkuser response', response)
      let status = response.data.success
      if (status) {

        setUserId(response?.data?.id)

        let responsed = await axios.get((`${baseUrl}/getUserinvestments/${response?.data?.id}`))
        console.log('checkuser responsed', responsed)

        setUserStaked(responsed.data)

      }
      else {
        let response = await axios.post((`${baseUrl}/newUser/`), {
          walletAddress: acc
        })
        setUserId(response.data._id)
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  useEffect(() => {
    if (acc) {
      checkUser()
    }
  }, [acc, isStake]);


  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {

      return <Completionist checkUser={checkUser} />;
    } else {

      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };
  const claimed = async (id) => {
    try {
      setLoading(true)
       await axios.put((`${baseUrl}/investments/${id}/calculateReward`))
      toast.success('calimed')
      checkUser()
      dispatch(updateStatus(!isUpdate))
      setLoading(false)
    } catch (error) {
      console.error('error while claim', error.message)
    }

  }
  useEffect(() => {
    if (userStaked.length > 0) {
      var sum = userStaked.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue['reward'];
      }, 0);
      setTotalClaimed(sum)
    }

  }, [userStaked]);

  return (
    <>
      {
        PoolInfo && PoolInfo.map((item, index) => {
          let roi = item.levelRoi
          return (
            <div className="border-stak3 mb-4" key={item.levelRoi}>
              <span className='text-light bold HPG'>Zift POOL {index + 1}</span>
              <div className="row mt-lg-4">

                <div className="col-lg-4 col-md-6 col-sm-12 mt-2"><img className='img-fluid mt-2' src={logo} alt="" width={72} height={74} />
                  <div className="card-stack">
                    <span className='d-block stoki text-light'>Staked</span>
                    <span className='d-block stoki text-bold'>{item.levelAmount}</span>
                  </div>
                  <span className='' style={{ color: '#ffba00' }}>Reward {item.levelRoi} % per day</span>
                </div>
                <div className="col-lg-4 col-md-6 col-sm-12"><span className='d-block stoki text-light'>Amount</span>
                  <form className='mt-lg-4 mb-sm-4 card-stack'>
                    <input className='mt-lg-3' name={item.name} value={item.value} type="number" placeholder='0' onChange={event => handleInputChange(index, event)} />
                    <button type='button' disabled={item.disable} className='btn btn-outline-warning ms-4' onClick={() => { handleStake(userId, item.name, item.value) }}>Stake Zift</button>
                    {item.errorMessage && <p className='text-danger'>{item.errorMessage}</p>}
                  </form>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12">
                  {
                    userStaked.length > 0 && <div className="table-container">

                      <table className="transparent-table">
                        <thead>
                          <tr>
                            <th>Staked Amount</th>
                            <th>Reward</th>
                            <th>Remaning Time</th>
                            <th>Claim</th>
                          </tr>
                        </thead>
                        <tbody>
                          {
                            userStaked.filter((myitem) => myitem.packageId == item.name).map((item) => {
                              let originalTime = new Date(item.stakeTime);
                              let increasedTime = new Date(originalTime.getTime() + 3 * 60000);
                              let currentTime = new Date();
                              return (
                                <tr key={item.packageId}>
                                  <td>{item.stakeAmount}</td>
                                  <td>{currentTime > increasedTime ? (item.stakeAmount * roi) / 100 : 0}</td>
                                  <td>
                                    <Countdown
                                      date={Date.now() + new Date(item.stakeTime).getTime() + (3 * 60 * 1000) - Date.now()}
                                      renderer={renderer}
                                      key={item.stakeTime}
                                    />
                                  </td>
                                  <td>
                                    <button className="btn btn-outline-warning" onClick={() => claimed(item._id)} disabled={new Date(item.stakeTime).getTime() + (3 * 60 * 1000) > Date.now() || loading}>
                                      {loading ?
                                        <PulseLoader
                                          color="#fff"
                                          className='p-1'
                                          loading={loading}
                                          size={10}
                                          aria-label="Loading Spinner"
                                          data-testid="loader"
                                        />
                                        : "Claim"}
                                    </button>
                                  </td>
                                </tr>
                              )
                            })
                          }

                        </tbody>
                      </table>
                    </div>
                  }
                </div>
              </div>
            </div>
          )
        })
      }

    </>
  )
}

export default Cards





const Completionist = ({ checkUser }) => {
  useEffect(() => {
    checkUser()
  }, [])
  return <span>Time End!</span>;
}
