import React from 'react';
import ListPage from '../components/ListPage';

function Services() {
  const title = 'Your services'
  const address = '0xlalalalalalallala'
  const protocols = {
    '0x': {
      eth: 3,
      percentage: 100,
    },
    'Augur': {
      eth: 3,
      percentage: 5,
    },
    'Cheese Wizard': {
      eth: 3,
      percentage: 5,
    },
    'Compound': {
      eth: 3,
      percentage: 20,
    },
    'Dydx': {
      eth: 3,
      percentage: 3,
    },
    'Maker': {
      eth: 3,
      percentage: 78,
    },
  }
  
  return (
    <ListPage 
      title = {title}
      address = {address}
      lists = {protocols}
    />
  );
}

export default Services;
