import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../../utils';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

function Deposit({ address }) {
    let [totalDeposit, settotalDeposit] = useState(null);
    const { isUpdate } = useSelector((state) => state.update);
    const getTotalDepost = async () => {
        try {
            // settotalDeposit(null)
            let {data:{sum}} = await axios.get(`${baseUrl}/getUserDeposit/${address}`)
            settotalDeposit(sum)

        } catch (error) {
            console.error("error while get total deposit", error);
        }
    }
    useEffect(() => {
        getTotalDepost()
    }, [address, isUpdate])
    return (
        <div className="col-lg-2 col-md-6 col-sm-12 p-lg-3 mt-lg-4">
            <span className='total_stack'>
                {
                    totalDeposit == null ?
                    <Skeleton />
                    :
                    totalDeposit
                }
            </span>

        </div>
    )
}

export default Deposit