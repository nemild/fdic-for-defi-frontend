import React from 'react';

function PageCard(props) {
  return (
    <div className="row justify-content-center pagecard">
      <div className="col-lg-10 col-md-10 col-sm-10">
        <div className="card card-fluid">
            <div className="card-header">
                {props.header}
            </div>
            <div className="card-body">
                {props.body}
            </div>
        </div>
      </div>
    </div>
  );
}

export default PageCard;
