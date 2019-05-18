import React from 'react';
import PageCard from './PageCard';

function ListPage(props) {
  const header = (
    <div>
        <div className="title">{props.title}</div>
        <div className="subtitle">{props.address}</div>
    </div>
  )

  const body = (
    <div>
      body
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
