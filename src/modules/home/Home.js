import React from 'react';
import {Redirect} from 'react-router-dom';
import Button from '../shared/Button';

import GlobalContext from '../../GlobalContext';

class Home extends React.Component {
  static contextType = GlobalContext;

  constructor(props) {
    super(props);

    this.state = {
      start: false
    };

    this.handleGetStarted = this.handleGetStarted.bind(this);
  }

  async handleGetStarted() {
    if (!window.web3) {
      await this.context.setupTorus();
    } else {
      console.log('handleGetStarted');
      this.context.setupGlobalContext();
    }
    this.setState({start: true});
  }

  render() {
    return (
      <div className='container'>
        {
          this.state.start && <Redirect to='/services'/>
        }
        <div className='row'>
          <div className='col-sm-12 center'>
            <div className='logo' style={logoFont}>defisurance</div>
          </div>
        </div>
        <div style={defaultFontStyle}>Insure your decentralized deposits</div>

        <div style={smallerStyle}>We use Augur to protect the cryptocurrency you hold in decentralized protocols</div>
        <br />
        <div className="row">
        <div className="col-sm-12 center">
          <Button title='Get started' onClick={this.handleGetStarted} style={{cursor: 'pointer'}} invertColors={true} />
          
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-sm-12 center'>
            <img style={logoStyle} src='/logos/maker.svg' alt='maker-icon' />
            <img style={logoStyle} src='/logos/compound.svg' alt='compound-icon' />
            <img style={logoStyle} src='/logos/dYdX.svg' alt='dYdX-con'/>
          </div>
        </div>
        <div className='row'>
          <div className='col-sm-12 center'>
            <img style={logoStyle} src='/logos/0x.svg' alt='0x-icon' />
            <img style={logoStyle} src='/logos/augur.svg' alt='augur-icon' />
            <img style={logoStyle} src='/logos/cheesewizard.svg' alt='cheesewizard-icon' />
          </div>

        </div>
        <div className='row'>
          <div className='col-sm-12 center'>

          <div style={smallestStyle}>And login with</div>
          
          <div style={smallerStyle}><a href="https://tor.us"><img src="/assets/img/torus-logo-new.png" style={torusLogo}></img></a></div>
        </div></div>
      </div>
    );
  }
}

const defaultFontStyle = {
  color: '#ffffff',
  fontSize: '40px',
  textAlign: 'center',
  fontWeight: '700'
};

const torusStyle = {
  backgroundColor: 'rgba(255,255,255,0.5)'
};

const smallerStyle = {
  fontSize: '30px',
  color: 'white',
  textAlign: 'center',
  width: '100%'
}

const smallestStyle = {
  fontSize: '15 px',
  color: 'white',
  textAlign: 'center',
  width: '100%'
}

const torusLogo = {
  maxWidth: '60px'
};


const logoStyle = {
  padding: '25px'
}

const logoFont = {
  fontSize: '60px'
}

export default Home;
