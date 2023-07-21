import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../../utils';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

function AffiliateReward({ address }) {
    let [totalReward, settotalReward] = useState(null);
    const { isUpdate } = useSelector((state) => state.update);
    const getTotalDepost = async () => {
        try {
            let { data: { totalLevelReward } } = await axios.get(`${baseUrl}/totalLevelRewards/${address}`)
            settotalReward(totalLevelReward)
        } catch (error) {
            console.error("error while get total deposit", error);
        }
    }
    useEffect(() => {
        getTotalDepost()
    }, [address, isUpdate])
    return (
        <>

            {
                totalReward == null ?
                    <Skeleton />
                    :
                    Number(totalReward).toFixed(5)
            }

        </>
    )
}

export default AffiliateReward