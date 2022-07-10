import React, { useEffect, useState } from 'react';
import { useMoralis, useMoralisWeb3Api, useNativeBalance } from 'react-moralis';
import NativeBalanceStyles from './NativeBalance.styles';
import { NativeBalanceProps } from './types';

const { BalanceStyled } = NativeBalanceStyles;

const NativeBalance: React.FC<NativeBalanceProps> = ({ style, ...props }) => {
    const { account, chainId, web3, Moralis } = useMoralis();
    const Web3Api = useMoralisWeb3Api();

    const NB = useNativeBalance();
    const [balance, setBalance] = useState<{
        formatted?: string;
        balance?: unknown;
    }>({});

    useEffect(() => {
        if (account && chainId) {
            console.log(account);


            NB.getBalances().then(r => console.log(r))
            Web3Api.account
                .getNativeBalance({ address: account, chain: chainId as any })
                .then(r =>
                    console.log(
                        String(
                            Number(Moralis.Units.FromWei(r.balance.toString())).toFixed(
                                8,
                            ),
                        ),
                    ),
                );

            web3?.getBalance(account).then(result => {
                // eslint-disable-next-line new-cap
                setBalance({
                    formatted: String(
                        Number(
                            Moralis.Units.FromWei(result.toString()),
                        ).toFixed(8),
                    ),
                    balance: result,
                });
            });
        }
    }, [account, chainId]);

    if (!balance?.formatted || !account) return null;

    return (
        <BalanceStyled
            data-testid="test-native-balance"
            style={style}
            {...props}
        >
            {balance.formatted}
        </BalanceStyled>
    );
};

export default NativeBalance;
