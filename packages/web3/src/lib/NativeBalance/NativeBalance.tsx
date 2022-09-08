import React, { useEffect, useState } from 'react';
import { useMoralis,useNativeBalance } from 'react-moralis';
import NativeBalanceStyles from './NativeBalance.styles';
import { NativeBalanceProps } from './types';

const { BalanceStyled } = NativeBalanceStyles;

const NativeBalance: React.FC<NativeBalanceProps> = ({ style, ...props }) => {
    const { account, chainId, web3, Moralis } = useMoralis();
    const [balance, setBalance] = useState<{
        formatted?: string;
        balance?: unknown;
    }>({});


    const { getBalances, data: bal, nativeToken, error, isLoading } = useNativeBalance();



    useEffect(() => {
        if (account && chainId) {

            getBalances().then((r) => console.log(r))
            console.log(bal)
            web3?.getBalance(account).then((result) => {
                console.log(result)
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



    useEffect(() => {

        if (account && chainId) {
            console.log(account)
        }
      
    
      
    }, [account,chainId])
    
















    if (!balance?.formatted || !account) return null;

    return (
        <>
            <BalanceStyled
                data-testid="test-native-balance"
                style={style}
                {...props}
            >
                {balance.formatted}
            </BalanceStyled>
            
        </>
        
    );
};

export default NativeBalance;
