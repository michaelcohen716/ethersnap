const gweiToEthDivisor = 1000000000;

export const etherToGwei = etherValue => {
    return etherValue * gweiToEthDivisor;
};

export const gweiToEther = gweiValue => {
    return gweiValue / gweiToEthDivisor;
};
