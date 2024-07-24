//@ts-nocheck
import React, { useCallback, useState, useEffect } from "react";
import styled from "styled-components";
import { Account, getPolkadotAccounts } from "../utils/AccountManagment";
import { getAccountFromMnemonic } from "../utils/accounts";
import { connectSdk } from "../utils/connect";

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #0056b3;
  }
`;

const SUBSTRATE_MNEMONIC = '';
const baseUrl = "http://localhost:3000/"

const ConnectPolkadot: React.FC = () => {
  const [accounts, setAccounts] = useState<Map<string, Account>>(new Map());
  const [sdk, setSdk] = useState<any>(null);

  useEffect(() => {
    const initializeSdk = async () => {
      const account = getAccountFromMnemonic(SUBSTRATE_MNEMONIC);
      const sdkInstance = await connectSdk(baseUrl, account);
      setSdk(sdkInstance);
    };

    initializeSdk();
  }, []);

  const fetchPolkadotAccounts = useCallback(async () => {
    if (!sdk) return;
    const polkadotAccounts = await getPolkadotAccounts();

    if (!polkadotAccounts || polkadotAccounts.length === 0) return;

    for (let [address, account] of polkadotAccounts) {
      const balanceResponse = await sdk.balance.get({ address });
      account.balance = Number(balanceResponse.availableBalance.amount);
      polkadotAccounts.set(address, account);
    }

    setAccounts(new Map([...polkadotAccounts]));
  }, [sdk]);

  return (
    <TopBar>
      <Button onClick={fetchPolkadotAccounts}>Connect Polkadot Wallet</Button>
    </TopBar>
  );
};

export default ConnectPolkadot;
