import React, { useState, useEffect } from 'react'
import { BsArrowLeft } from 'react-icons/bs'
import { BsArrowRight } from 'react-icons/bs'
import ape from '../../assets/ape-2.33787833.jpeg'
import './BuyCoin.css'
import { loadWeb3, remoteWeb3 } from '../../connectivity/connectivity'
import { busdTokenAdress, tokenAdress, ziftCoinBuyContractAddress, ziftCoinContractAddress } from '../../contract/addresses/address'
import tokenAbi from '../../contract/abis/tokenAbi.json';
import busdTokenAbi from '../../contract/abis/busdTokenAbi.json';
import ziftCoinBuyContractAbi from '../../contract/abis/ziftCoinBuyContractAbi.json';
import ziftCoinContractAbi from '../../contract/abis/ziftCoinContractAbi.json';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import PulseLoader from "react-spinners/PulseLoader";

const BuyCoin = () => {
    let [loading, setLoading] = useState(false);
    const { isConnected, acc } = useSelector((state) => state.wallet)
    const [tokenInfo, setTokenInfo] = useState({
        tokenSymbol: 'Token Name',
        tokenBalance: '0',
        busdTokenBalance: '0'
    })
    const [count, setCount] = useState(10);
    const increment = () => {

        setCount(Number(count) + 1);

    }
    const decrement = () => {
        if (count > 1) {

            setCount(Number(count) - 1);
        }

    }

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);
    const getInfo = async () => {

        let obj = {}
        try {
            let acc = await loadWeb3()
            const web3 = window.web3

            let tokeninstance = new web3.eth.Contract(
                tokenAbi,
                tokenAdress
            );
            let busdTokeninstance = new web3.eth.Contract(
                busdTokenAbi,
                busdTokenAdress
            );
            let ziftCoinContractInstance = new web3.eth.Contract(
                ziftCoinContractAbi, ziftCoinContractAddress
            );
            let symbol = await tokeninstance.methods.symbol().call()
            let balance = await tokeninstance.methods.balanceOf(acc).call()
            let busdBalance = await busdTokeninstance.methods.balanceOf(acc).call()

            let defaultReferalAddress = await ziftCoinContractInstance.methods.getDefaultAddress().call()


            obj.tokenSymbol = symbol
            balance = balance / 10 ** 18
            busdBalance = busdBalance / 10 ** 18
            obj.tokenBalance = balance
            obj.busdTokenBalance = busdBalance
            setTokenInfo(obj)

        } catch (error) {
            console.error("error", error);
        }

    }

    useEffect(() => {
        if (isConnected) {

            getInfo()
        }

    }, [isConnected]);


    const handleDeposit = async () => {
        if (isConnected) {
            try {
                setLoading(true)
                let acc = await loadWeb3()
                const web3 = window.web3
                let ziftCoinContractInstance = new web3.eth.Contract(
                    ziftCoinBuyContractAbi, ziftCoinBuyContractAddress
                );
                let amount = await web3.utils.toWei(String(count))

                let busdTokeninstance = new web3.eth.Contract(
                    busdTokenAbi,
                    busdTokenAdress
                );
                const allowance = await busdTokeninstance.methods.allowance(acc, ziftCoinBuyContractAddress).call();
                console.log("allowance", allowance);
                if (parseFloat(web3.utils.fromWei(allowance)) < parseFloat(web3.utils.fromWei(amount))) {
                    const approveTx = busdTokeninstance.methods.approve(ziftCoinBuyContractAddress, (amount));
                    const gasApproveEstimate = await approveTx.estimateGas({ from: acc });
                    console.log(' Approve Estimate gas cost:', gasApproveEstimate);
                    console.log(web3.utils.toHex(web3.utils.toWei("10"), 'gwei'))
                    await busdTokeninstance.methods.approve(ziftCoinBuyContractAddress, (amount)).send({
                        from: acc,
                        gasPrice: "10000000000", // the gas price in Gwei
                        gasLimit: web3.utils.toHex(gasApproveEstimate)
                    })
                }
                let tx = ziftCoinContractInstance.methods.ZIFTbuyRouter(amount);
                let gasEstimate = await tx.estimateGas({ from: acc })
                await ziftCoinContractInstance.methods.ZIFTbuyRouter(amount).send(
                    {
                        from: acc,
                        gasPrice: "10000000000", // the gas price in Gwei
                        gasLimit: web3.utils.toHex(gasEstimate)
                    }
                );
                getInfo()
                toast.success('Deposit successfully')

            } catch (error) {
                setLoading(false)
                console.log('error while deposit', error)
            }
        }
        else {
            setLoading(false)
            toast.error('please connect wallet')
        }
    }
    return (
        <section>
            <h1 className='mb-lg-5 p-lg-5 buy_heading'>Buy ZiftCoin</h1>
            <div className="container p-lg-5">
                <div className="row">
                    <div className="col-lg-6 col-sm-12 mb-4">
                        <div className="border-stak2 mt-lg-5 mb-lg-5">
                            <img className='img-fluid mb-lg-5' src={ape} alt="" />
                            <br></br>
                            <span className='text-light mb-lg-4 mt-lg-5'> You MUST connect a Wallet to Buy Tokens.
                            </span>
                            <br></br>
                            <br></br>
                            <span className='text-light mb-lg-4 mt-lg-5'> Transactions will be done via the connected wallet.
                            </span>
                            <br></br>
                            <br></br>
                            <span className='text-light mb-lg-4 mt-lg-5'> You Must have BNB to pay gas fee when it comes to make transactions.
                            </span>
                            <br></br>
                            <br></br>
                            <span className='text-light mb-lg-4 mt-lg-5'> The number of mints per transaction is set according to each sales round.
                            </span>
                            <br></br>
                            <br></br>
                            <span className='text-light mt-lg-3'> Use <span className='text-warning'>0x33...F842</span> as a referral if you have got no Referral.
                            </span>
                        </div>
                    </div>
                    <div className="col-lg-6 col-sm-12">
                        <div className="border-stak2 mt-lg-5 mb-lg-5">
                            <div className='mb-lg-5'>
                                <span className='text-warning mb-lg-4'>Your Balance:</span>
                                <br></br>

                                <div className="card-stack">
                                    <span className='text-light'>Zift : </span> <span className='text-warning'>{tokenInfo.tokenBalance}</span>
                                </div>

                                <div className="card-stack">
                                    <span className='text-light'>BUSD: </span> <span className='text-warning'>{tokenInfo.busdTokenBalance}</span>
                                </div>

                            </div>


                            <div className="mt-lg-2">
                                <div className="border_coin"></div>

                            </div>

                            <div className='mb-lg-5 mt-lg-5'>
                                <span className='text-light'>
                                    Amount:</span>
                                <div className=' mx-auto level-container'>
                                    <button className="btn btn-outline-warning m-1" onClick={decrement}><BsArrowLeft /></button>
                                    <input type="text" className='text-light fs-3 buy_border rounded' onChange={(e) => setCount(e.target.value)} value={count} />

                                    {/* <span className='text-light fs-3 buy_border'>{count}</span> */}
                                    <button className="btn btn-outline-warning m-1" onClick={increment}><BsArrowRight /></button>

                                </div>
                                <button className="btn btn-outline-warning buy_btn mt-lg-3" onClick={handleDeposit} disabled={count == 0}>
                                    {loading ?
                                        <PulseLoader
                                            color="#fff"
                                            className='p-1'
                                            loading={loading}
                                            size={10}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                        : "Buy"}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default BuyCoin