import React from 'react';
// import Logos from '../home/Logos';
import Button from '../shared/Button';
import SimpleSlider from '../shared/SimpleSlider'
// import Card from '../shared/Card';

function Home() {
  return (
    <div className="container">
      <div className="row">
        <div>defisurance</div>
      </div>
      <div style={defaultFontStyle}>Insure your decentralized deposits</div>
      <div className="row center">
        <Button title="Get started" invertColors={true} />
      </div>
      <br />
      <div className="row">
        <img style={logoStyle} src="/logos/maker.svg" />
        <img style={logoStyle} src="/logos/compound.svg" />
        <img style={logoStyle} src="/logos/dYdX.svg" />
      </div>
      <br />
      <div className="row">
        <img style={logoStyle} src="/logos/0x.svg" />
        <img style={logoStyle} src="/logos/augur.svg" />
        <img style={logoStyle} src="/logos/cheesewizard.svg" />
      </div>

    </div>
  );
}

const defaultFontStyle = {
  color: '#ffffff',
  fontSize: '40px',
  textAlign: 'center',
};

const logoStyle = {
  padding: '25px'
}

export default Home;
