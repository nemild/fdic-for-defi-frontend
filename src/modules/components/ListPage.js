import React from 'react';
import PageCard from './PageCard';
import ListCell from './ListCell';

function ListPage(props) {
  const header = (
    <div>
        <div className="title">{props.title}</div>
        <div className="subtitle">{props.address}</div>
        <br />
        <div>Pick a protocol to get insurance for</div>

    </div>
  )

  const protocols = [
    {
      icon: "./logos/0x-color.svg",
      serviceName: "0x",
    },
    {
      icon: "./logos/augur-color.svg",
      serviceName: "Augur",
    },
    {
      icon: "./logos/cheesewizard-color.svg",
      serviceName: "Cheese Wizard",
    },
    {
      icon: "./logos/compound-color.png",
      serviceName: "Compound",
    },
    {
      icon: "./logos/dydx-color.svg",
      serviceName: "dYdX",
    },
    {
      icon: "./logos/maker-color.svg",
      serviceName: "Maker",
    },
  ]

  const body = (
    <div>
      <div className="table-responsive">
        <table className="table align-items-center">
            <tbody>
                {protocols.map((list, id) => {
                    return(
                        <ListCell
                              key={id}
                              icon={list.icon}
                              serviceName={list.serviceName}
                              eth={props.lists[list.serviceName].eth}
                              percentage={props.lists[list.serviceName].percentage}
                          />
                    )
                })}
            </tbody>
        </table>
      </div>
    </div>
  )

  return (
    <div>
      <PageCard
        header={header}
        body={body}
    />
    </div>
  );
}
  
export default ListPage;
