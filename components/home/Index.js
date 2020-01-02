import React, { Component } from 'react';
import logo from '../../static/images/logo.svg';
import * as appActions from '../../redux/actions/appActions';
import { connect } from 'react-redux';

class Index extends Component {
    constructor(props) {
        super(props);

        this.state = {
            amount: '',
            receiver: ''
        }
    }

    async componentDidMount() {
        await this.fetWeb3Init();
        await this.getBalance();
    }

    fetWeb3Init = async () => {
        const { web3 } = this.props.appReducer;

        await this.props.web3Connect();
        await this.props.instantiateContracts(web3);
    }

    getBalance = () => {
        const { account, metaCoin } = this.props.appReducer;

        setInterval(() => {
            this.props.getBalance(account, metaCoin);
        }, 2000);
    }

    handleChange = (data) => {
        this.setState({
            ...data
        });
    }

    render() {
        const { account, balance } = this.props.appReducer;
        const { amount, receiver } = this.state;

        console.log(this.props.appReducer);

        return (
            <div className='App'>
                <header className='App-header'>
                    <img src={logo} className='App-logo' alt='logo' />
                    <p>
                        <b>Account: </b> <i>{account}</i>
                    </p>
                    <br />
                    <p>Balance: {balance}</p>
                    <label>
                        Receiver:
                    <input
                            type='text'
                            value={receiver}
                            onChange={(e) => {
                                this.handleChange({ receiver: e.target.value });
                            }}
                        />
                    </label>
                    <label>
                        Amount:
                    <input
                            type='text'
                            value={amount}
                            onChange={(e) => {
                                this.handleChange({ amount: e.target.value });
                            }}
                        />
                    </label>
                    <button
                        onClick={() => {
                            this.props.sendCoin(receiver, amount);
                        }}
                    >
                        Submit
                </button>
                </header>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    appReducer: state.appReducer
});

const mapDispatchToProps = dispatch => ({
    getBalance: (data) => dispatch(appActions.getBalance(data)),
    web3Connect: () => dispatch(appActions.web3Connect()),
    instantiateContracts: (data) => dispatch(appActions.instantiateContracts(data)),
    // sendCoin: () => dispatch(appActions.sendCoin()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);