import React from 'react';
import PageCard from './PageCard';
import ListCell from './ListCell';

function ListPage(props) {
  const header = (
    <div>
        <div className="title">{props.title}</div>
        <div className="subtitle">Your Address: {props.address}</div>
        <br />
        <div>Your current insurance levels by protocol</div>

    </div>
  )

  const protocols = [
    {
      icon: "./logos/compound-color.png",
      serviceName: "Compound",
      servicePrettyName: "Compound"
    },
    {
      icon: "./logos/0x-color.svg",
      serviceName: "0x",
      servicePrettyName: "0x (Coming soon)"
    },
    {
      icon: "./logos/augur-color.svg",
      serviceName: "Augur",
      servicePrettyName: "Augur (Coming soon)"
    },
    {
      icon: "./logos/cheesewizard-color.svg",
      serviceName: "Cheese Wizard",
      servicePrettyName: "Cheese Wizard (Coming soon)"
    },
    {
      icon: "./logos/dydx-color.svg",
      serviceName: "dYdX",
      servicePrettyName: "dYdX (Coming soon)"
    },
    {
      icon: "./logos/maker-color.svg",
      serviceName: "Maker",
      servicePrettyName: "Maker (Coming soon)"
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
                              servicePrettyName={list.servicePrettyName}
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
