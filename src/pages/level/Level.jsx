import React, { useEffect, useState } from 'react'
import level from '../../assets/20371751_3d_rendering_business_illustration-removebg-preview.png'
import NumberCounter from './NumberCounter'
import { ziftCoinContractAddress } from '../../contract/addresses/address'
import ziftCoinContractAbi from '../../contract/abis/ziftCoinContractAbi.json';
import './Level.css'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { baseUrl, walletShortFormer } from '../../utils';
import Skeleton from 'react-loading-skeleton'
import Deposit from './levelRenderComponents/Deposit';
import Reward from './levelRenderComponents/Reward';
import AffiliateReward from './levelRenderComponents/AffiliateReward';
import Withdrawed from './levelRenderComponents/Withdrawed';
const Level = () => {
      const { isConnected, acc } = useSelector((state) => state.wallet)
      let [level, setLevel] = useState(1)
      let [isLoading, setIsLoading] = useState(false)
      let [levelDetails, setLevelDetails] = useState({
            addresses: [],
            levelUserLength: 0,
            grandTotal: 0,
            grandTotalReward: 0,
            grandTotalLevelReward: 0
      })
      const getUserLevels = async () => {
            try {
                  setIsLoading(true)
                  const web3 = window.web3;
                  const instance = new web3.eth.Contract(ziftCoinContractAbi, ziftCoinContractAddress);
                  let referralas = await instance.methods.getUserReferrals(acc, level).call()
                  if (referralas.length) {
                        let { data: { grandTotal, grandTotalReward, grandTotalLevelReward } } = await axios.post(`${baseUrl}/investments/sum`, {
                              addresses: referralas
                        })
                        console.log("referralas", referralas);
                        console.log("res", grandTotal, grandTotalReward, grandTotalLevelReward);
                        setLevelDetails({
                              addresses: referralas,
                              levelUserLength: referralas.length,
                              grandTotal: grandTotal,
                              grandTotalReward: grandTotalReward,
                              grandTotalLevelReward: grandTotalLevelReward
                        })
                        setIsLoading(false)
                  } else {
                        setIsLoading(false)
                        setLevelDetails({
                              addresses: [],
                              levelUserLength: 0,
                              grandTotal: 0,
                              grandTotalReward: 0,
                              grandTotalLevelReward: 0
                        })
                  }
            } catch (error) {
                  setIsLoading(false)
                  console.error("error while get user levels", error);
            }
      }
      useEffect(() => {
            if (isConnected)
                  getUserLevels()
      }, [level, isConnected])
      // useEffect(() => {
      //       window.scrollTo(0, 0)
      // }, []);
      return (
            <section className='bg'>
                  <div className="container p-lg-5">
                        <div className="row">
                              <div className="col-lg-6 col-sm-12 mt-lg-5 p-lg-5">
                                    <span className='text-light fs-1 fw-bold mb-lg-5 level-sd'>Level Detail</span>

                                    <p className='text-light mt-lg-3 level-sd'>Sacred Farms offer multiple farming opportunities to you. Get double rewards by staking your HPG tokens in return for additional HPG tokens and earning high income.</p>
                              </div>
                              <div className="col-lg-6 col-sm-12"><img className='img-fluid' src={level} alt="" /></div>
                        </div>

                        <NumberCounter setLevel={setLevel} />
                        <div className="border-stak2 mt-5 mb-5">

                              <div className="row ms-4">
                                    <div className="col-lg-3 col-md-6 col-sm-12 p-lg-3 mt-lg-4 card-stack">
                                          <span className='total_stack'>Total User</span>
                                          <br></br>
                                          <br></br>
                                          <span className='text-hpg'>{isLoading ? <Skeleton className='w-50' /> : levelDetails.levelUserLength}</span>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 p-lg-3 mt-lg-4 card-stack">
                                          <span className='total_stack'>Total Deposit</span>
                                          <br></br>
                                          <br></br>
                                          <span className='text-hpg'>{isLoading ? <Skeleton className='w-50' /> : levelDetails.grandTotal + " " + "ZIFT"}</span>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 p-lg-3 mt-lg-4 card-stack">
                                          <span className='total_stack'>Total Claim</span>
                                          <br></br>
                                          <br></br>
                                          <span className='text-hpg'>{isLoading ? <Skeleton className='w-50' /> : Number(levelDetails.grandTotalReward).toFixed(3) + " " + "ZIFT"} </span>
                                    </div>
                                    <div className="col-lg-3 col-md-6 col-sm-12 p-lg-3 mt-lg-4 card-stack">
                                          <span className='total_stack'>Total Affiliate Reward</span>
                                          <br></br>
                                          <br></br>
                                          <span className='text-hpg'>{isLoading ? <Skeleton className='w-50' /> : Number(levelDetails.grandTotalLevelReward).toFixed(3) + " " + "ZIFT"}</span>
                                    </div>
                              </div>


                        </div>
                        <div className="border-stak2 mt-5 mb-5">

                              <span className='text-light bold level mb-4'>LEVEL {level} DETAIL</span>
                              <div className="row ms-4">
                                    <div className="col-lg-2 col-md-6 col-sm-12 p-lg-3 mt-4">
                                          <span className='total_stack'>No</span>

                                    </div>
                                    <div className="col-lg-2 col-md-6 col-sm-12 p-lg-3 mt-lg-4">
                                          <span className='total_stack'>Address</span>

                                    </div>
                                    <div className="col-lg-2 col-md-6 col-sm-12 p-lg-3 mt-lg-4">
                                          <span className='total_stack'>Deposit</span>

                                    </div>
                                    <div className="col-lg-2 col-md-6 col-sm-12 p-lg-3 mt-lg-4">
                                          <span className='total_stack'>Reward </span>

                                    </div>
                                    <div className="col-lg-2 col-md-6 col-sm-12 p-lg-3 mt-lg-4">
                                          <span className='total_stack'>Affiliate Generated</span>

                                    </div>
                                    <div className="col-lg-2 col-md-6 col-sm-12 p-lg-3 mt-lg-4">
                                          <span className='total_stack'>Withdrawed</span>

                                    </div>
                              </div>
                              {
                                    levelDetails.levelUserLength > 0 && <div className="row ms-4">
                                          {
                                                levelDetails.addresses.map((address, index) => {
                                                      return <>
                                                            <div className="col-lg-2 col-md-6 col-sm-12 p-lg-3 mt-4">
                                                                  <span className='total_stack'>{index + 1}</span>

                                                            </div>
                                                            <div className="col-lg-2 col-md-6 col-sm-12 p-lg-3 mt-lg-4">
                                                                  <span className='total_stack'>{walletShortFormer(address)}</span>

                                                            </div>
                                                            <Deposit address={address} />
                                                            <div className="col-lg-2 col-md-6 col-sm-12 p-lg-3 mt-lg-4">
                                                                  <span className='total_stack'><Reward address={address} /> </span>

                                                            </div>

                                                            <div className="col-lg-2 col-md-6 col-sm-12 p-lg-3 mt-lg-4">
                                                                  <span className='total_stack'><AffiliateReward address={address} /></span>

                                                            </div>
                                                            <div className="col-lg-2 col-md-6 col-sm-12 p-lg-3 mt-lg-4">
                                                                  <span className='total_stack'><Withdrawed address={address} /></span>

                                                            </div>
                                                      </>
                                                })
                                          }
                                    </div>
                              }
                        </div>
                  </div>
            </section>
      )
}

export default Level
