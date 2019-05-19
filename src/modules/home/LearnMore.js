import React from 'react';
import PageCard from '../components/PageCard';

const howItWorksStyle = {
    color: 'black'
};


const body = (
    <div className="row">
    <div className="col-sm-12" style={howItWorksStyle}>
        Learn more goes here
    </div>
</div>);

function LearnMore() {
    return (
        <PageCard header="Learn More" body={body}></PageCard>
    );
}


export default LearnMore;