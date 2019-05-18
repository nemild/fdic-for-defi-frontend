import React from 'react';

function Card({content}) {
    return (
        <div className="card card-override">
                <div className="card-body">
                  <div className="d-flex align-items-center">
                  {content}
                  </div>
                </div>
              </div>
    );
}

export default Card;