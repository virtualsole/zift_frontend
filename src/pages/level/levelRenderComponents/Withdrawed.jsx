import React, { useEffect, useState } from 'react'
import { ziftCoinContractAddress } from '../../../contract/addresses/address'
import ziftCoinContractAbi from '../../../contract/abis/ziftCoinContractAbi.json';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
function Withdrawed({ address }) {
    let [userWithdrawed, setUserWithdrawed] = useState(null)
    const { isUpdate } = useSelector((state) => state.update);
    const getWithdraw = async () => {
        try {

            const web3 = window.web3;
            const instance = new web3.eth.Contract(ziftCoinContractAbi, ziftCoinContractAddress);
            let withdraw = await instance.methods.getUserWithdrawed(address).call();
            console.log("withdraw", web3.utils.fromWei(withdraw));
            setUserWithdrawed(web3.utils.fromWei(withdraw))
        } catch (error) {
            console.error("error while get withdraw", error);
        }
    }
    useEffect(() => {
        getWithdraw()
    }, [address, isUpdate])
    return (
        <>
            {
                userWithdrawed == null ?
                    <Skeleton />
                    :
                    Number(userWithdrawed).toFixed(5)
            }
        </>
    )
}

export default Withdrawed