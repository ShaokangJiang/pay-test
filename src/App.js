import logo from './logo.svg';
import './App.css';
import React from 'react'
import Button from 'react-bootstrap/Button';
import base64 from 'base-64';
import urlencode from 'urlencode';
import UIDGenerator from 'uid-generator';
import Modal from 'react-bootstrap/Modal';
import Paymentwall from 'paymentwall';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: 0,
      payStart: true,
      modalShow: false,
      alertModalInfo: <></>
    };
    this.generatePayment = this.generatePayment.bind(this)
  }

  setModalShow(bool) {
    this.setState({ modalShow: bool });
  }

  generatePayment(id, price) {
    if (this.state.payStart == null)
      this.setState({ alertModalInfo: <></> })
    if (this.state.payStart) {
      Paymentwall.Configure(
        Paymentwall.Base.API_GOODS,
        '0467e65e8936484205c3d32a037a6349',
        '5ac79040ae1733754ff28dd1d91ef568'
      );
      console.log(this.state.uid);

      var widget = new Paymentwall.Widget(
        this.state.uid, // uid
        'pw_1', // widget 
        [
          new Paymentwall.Product(
            id, // ag_external_id
            price, // amount
            'USD', // currencycode
            'Gold Membership', // ag_name
            Paymentwall.Product.TYPE_FIXED // ag_type
          )
        ],
        {
          'email': 'user@hostname.com',
          'history[registration_date]': 'registered_date_of_user',
          'ps': 'all', // Replace it with specific payment system short code for single payment methods
          'additional_param_name': 'additional_param_value',
          'evaluation': 1
        }
      );
      let str = <iframe title="test payment" src={widget.getUrl()} width="" height="" style={{width: '100%', height: '100%', minWidth: '860px', minHeight: '640px'}} frameBorder="0"></iframe>;
      this.setState({ alertModalInfo: str, payStart: null, modalShow: true });
    } else {
      this.setState({ alertModalInfo: <></> })
    }
  }

  getPayment(uuid) {
    // var a = await uidgen.generate();
    // console.log(a);
    return (<Button variant="primary"
      title={uuid} onClick={() => {
        if (this.state.payStart != null) {
          this.generatePayment(12, 99);
        }
      }}
    >{uuid}</Button>)
  }


  async componentDidMount() {
    const uidgen = new UIDGenerator();
    var a = await uidgen.generate();
    // this.loadInitialState()
    this.setState({ uid: a });
  }

  render() {
    return (
      <>
      <div className="App">
         <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
          integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
          crossOrigin="anonymous"
        />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          {this.getPayment(12)}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
        
      </div>
      <MyVerticallyCenteredModal
      show={this.state.modalShow}
      onHide={() => this.setModalShow(false)}
      title={"Payment Status"}
      info={this.state.alertModalInfo}
    />
    </>
    );
  }
}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      size="lg"
      dialogClassName="my-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.info}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default App;
