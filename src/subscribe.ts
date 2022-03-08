import fs from 'fs';
import dotenv from 'dotenv';
import Web3 from 'web3';

dotenv.config();

const app = () => {
  console.log('Run Start');

  const jsonRpc = process.env.JSON_RPC_WC;
  if (!jsonRpc) return console.log('Failed to load .env');

  const web3 = new Web3(jsonRpc);
  web3.eth.subscribe('newBlockHeaders', async (error, result) => {
    if (error !== null) return console.log({ error });

    // const timestamp = result.timestamp;
    const blockNumber = result.number;
    const gasLimit = result.gasLimit;
    const gasUsed = result.gasUsed;
    const baseFee = result.baseFeePerGas;

    const date = new Date();

    const text = `time: ${date} BlockNumber: ${blockNumber} GasLimit: ${gasLimit} GasUsed: ${gasUsed} BaseFee: ${baseFee}`;
    console.log(text + '\n');

    fs.appendFile('logs.txt', text + '\n', (err) => {
      if (err) throw err;
    });
  });
};

app();
