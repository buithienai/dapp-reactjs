import Web3 from 'web3';
import MetaCoin from './MetaCoin.json';

const getWeb3 = async () => {
    // Wait for loading completion to avoid race conditions with web3 injection timing.
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
            return web3;
        } catch (error) {
            console.error(error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        // Use Mist/MetaMask's provider.
        const web3 = window.web3;
        console.log('Injected web3 detected.');
        return web3;
    }
    // Fallback to localhost; use dev console port by default...
    else {
        const provider = new Web3.providers.HttpProvider('http://127.0.0.1:9545');
        const web3 = new Web3(provider);
        console.log('No web3 instance injected, using Local web3.');
        return web3;
    }
};

export const web3Connect = async () => {
    const web3 = await getWeb3();
    const accounts = await web3.eth.getAccounts();
    if (web3.currentProvider.connection.networkVersion !== '3') {
        alert('Unknown network, please change network to Ropsten network');
        return;
    }
    if (accounts.length > 0) {
        const account = accounts[0];
        let balance = await web3.eth.getBalance(account);
        return {
            web3,
            account
        };
    } else {
        console.log('Account not found');
    }
};

export const instantiateContracts = async (web3) => {
    const networkId = process.env.REACT_APP_NETWORK_ID;
    let metaCoinAddress = MetaCoin.networks[networkId].address;
    let metaCoin = new web3.eth.Contract(MetaCoin.abi, metaCoinAddress, {
        transactionConfirmationBlocks: 1
    });

    return {
        metaCoin
    };
};

export const sendCoin = (receiver, amount) => {
    const state = getState();
    const metacoin = state.metacoin;
    const account = state.account;
    metacoin.methods
        .sendCoin(receiver, amount)
        .send({ account })
        .then(() => {
            console.log('success');
            dispatch({
                type: SEND_COIN,
                amount
            });
        })
        .catch((e) => {
            console.log(e);
        });
};

export const getBalance = async (account, metaCoin) => {
    let balance = await metaCoin.methods.getBalance(account).call({ from: account });
    return {
        balance
    };
};