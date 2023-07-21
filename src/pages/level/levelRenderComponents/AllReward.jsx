import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { baseUrl } from '../../../utils';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';

function AllReward({ address }) {
    let [totalReward, settotalReward] = useState(null);
    const { isUpdate } = useSelector((state) => state.update);

    const getTotalDepost = async () => {
        try {
            let { data: { reward } } = await axios.get(`${baseUrl}/getUserReward/${address}`)
            let { data: { totalLevelReward } } = await axios.get(`${baseUrl}/totalLevelRewards/${address}`)
            // let { data } = await axios.get(`${baseUrl}/directReward/${address}`)
            settotalReward(reward + totalLevelReward)

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
export default AllReward