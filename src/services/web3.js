import Portis from "@portis/web3";
import Web3 from "web3";
const Tx = require("ethereumjs-tx").Transaction;

const portis = new Portis("5c3812e9-63c9-4900-9298-f9a20037b126", "mainnet");
export const web3Portis = new Web3(portis.provider);

export const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/b520d227f8e1479ab2bf09aebb9ea6db'))

export async function sendEtherTransaction(_privateKey, _to, _value) {
  return new Promise(function (resolve, reject) {
    try {
      web3.eth.getBlock("latest", false, (error, result) => {
        var _gasLimit = result.gasLimit;

        web3.eth.getGasPrice(async function (error, result) {
          var _gasPrice = result;

          const privateKey = Buffer.from(_privateKey, 'hex')

          var _hex_gasLimit = web3.utils.toHex(_gasLimit.toString());
          var _hex_gasPrice = web3.utils.toHex(_gasPrice.toString());
          var _hex_value = web3.utils.toHex(web3.utils.toWei(_value, 'ether'));
          
          const keystore = await web3.eth.accounts.privateKeyToAccount("0x" + _privateKey);  
          const _from = keystore.address;
          var _trx_count = await web3.eth.getTransactionCount(_from);
          var _hex_Gas = web3.utils.toHex('50000');

          const rawTx = {
            nonce: web3.utils.toHex(_trx_count),
            to: _to,
            from: _from,
            gasLimit: _hex_gasLimit,
            gas: _hex_Gas,
            gasPrice: _hex_gasPrice,
            value: _hex_value,
            data: '0x00'
          }

          const tx = new Tx(rawTx);
          tx.sign(privateKey);

          var serializedTx = '0x' + tx.serialize().toString('hex');
          web3.eth.sendSignedTransaction(serializedTx.toString('hex'), function (err, hash) {
            if (err) {
              resolve(err);
            }
            else {
              resolve('Txn Sent and hash is ' + hash);

            }
          });
        });
      });
    } catch (error) {
      resolve(error);
    }
  })
}