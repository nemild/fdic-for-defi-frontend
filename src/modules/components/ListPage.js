import React from 'react';
import PageCard from './PageCard';
import ListCell from './ListCell';

function ListPage(props) {
  const header = (
    <div>
        <div className="title">{props.title}</div>
        <div className="subtitle">{props.address}</div>
    </div>
  )

  const body = (
    <div>
      <div className="table-responsive">
        <table className="table align-items-center">
            <tbody>
                <ListCell 
                    icon="./assets/img/brand/favicon.png"
                    serviceName="Dydx"
                    eth="3"
                    percentage="100%"
                    percentageIcon="./assets/img/svg/done.svg"
                />
                 <ListCell 
                    icon="./assets/img/brand/favicon.png"
                    serviceName="Dydx"
                    eth="3"
                    percentage="100%"
                    percentageIcon="./assets/img/svg/done.svg"
                />
            </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <PageCard
        header={header}
        body={body}
    />
  );
}
  
export default ListPage;
