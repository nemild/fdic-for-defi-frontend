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

  //"./assets/img/brand/favicon.png"
  const body = (
    <div>
      <div className="table-responsive">
        <table className="table align-items-center">
            <tbody>
                {props.lists.map((list) => {
                    return(
                        <ListCell 
                            icon={list.icon}
                            serviceName={list.serviceName}
                            eth={list.eth}
                            percentage={list.percentage}
                            percentageIcon={list.percentageIcon}
                        />
                    )
                })}
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
