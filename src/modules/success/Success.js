import PageCard from '../components/PageCard';
import React from 'react'

function Success(props) {
    const header = (
        <div className="title">Success</div>
    )

    const body = (
        <div>
        {props.percentageCovered || 0}% of your {props.contractAmount || 0} ETH is now insured.
        </div>
    )

    return (
        <PageCard header={header} body={body}/>
    )
}

export default Success