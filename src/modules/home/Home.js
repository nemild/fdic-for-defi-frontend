import React from 'react';
// import Logos from '../home/Logos';
import Button from '../shared/Button';
import SimpleSlider from '../shared/SimpleSlider'
// import Card from '../shared/Card';

function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-12 center">
          <div className="logo" style={logoFont}>defisurance</div>
        </div>
      </div>
      <div style={defaultFontStyle}>Insure your decentralized deposits</div>
      <div className="row">
      <div className="col-sm-12 center">

        <Button title="Get started" invertColors={true} />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-sm-12 center">
          <img style={logoStyle} src="/logos/maker.svg" />
          <img style={logoStyle} src="/logos/compound.svg" />
          <img style={logoStyle} src="/logos/dYdX.svg" />
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 center">
          <img style={logoStyle} src="/logos/0x.svg" />
          <img style={logoStyle} src="/logos/augur.svg" />
          <img style={logoStyle} src="/logos/cheesewizard.svg" />
        </div>
      </div>

    </div>
  );
}

const defaultFontStyle = {
  color: '#ffffff',
  fontSize: '40px',
  textAlign: 'center',
  fontWeight: '700'
};

const logoStyle = {
  padding: '25px'
}

const logoFont = {
  fontSize: '60px',
}

export default Home;
