import React, { useEffect, useState } from "react";
import { fetchPastTransactions } from "../../../utils/request";
import "./Transactions.css";

function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [transactionsLoading, toggleTransactionsLoading] = useState(false)

  useEffect(() => {
    const fetch = async () => {
      const txs = await fetchPastTransactions("0x8e49EF55f2bb15AbE342017deFf1A8d882D9C8e4");
      setTransactions(txs);
      toggleTransactionsLoading(false)
    };

    toggleTransactionsLoading(true)
    fetch();
  }, []);

  return (
    <div className="d-flex flex-column mt-5">
      <div className="transactions-headline">Transactions</div>
      {transactionsLoading && <div>Loading...</div>}
      {!transactionsLoading && !transactions.length && (
          <div className="mt-3">No recent transactions</div>
      )}
      {transactions.length > 0 && (
          <div className="d-flex flex-column">
            {transactions.map(t => (
                <div>to: {t.to}</div>
            ))}
          </div>
      )}
    </div>
  );
}

export default Transactions;
