import { useWeb3Contract } from "react-moralis";
// import { abi, contractAddresses } from "../constants";
import { abi, contractAddresses } from "../constants/";
import { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
import { BigNumber, ContractTransaction, ethers } from "ethers";
import { Box, Button } from "@chakra-ui/react";
import { useNotification } from "web3uikit";

interface contractAddressInterface {
    [key: string]: string[];
}

export const LotteryFunction = () => {
    const addresses: contractAddressInterface = contractAddresses;
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
    const chainId: string = parseInt(chainIdHex!).toString();
    const raffleAddress = chainId in addresses ? addresses[chainId][0] : null;
    const [entranceFee, setEntranceFee] = useState<string>("0");
    const [numPlayers, setNumPlayers] = useState<string>("0");
    const [recentWinner, setRecentWinner] = useState<string>("");

    const dispatch = useNotification();

    const {
        error,
        runContractFunction: enterRaffle,
        isFetching,
        isLoading,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "enterRaffle",
        params: {},
        msgValue: entranceFee,
    });

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "getEntranceFee",
        params: {},
    });

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "getNumberOfPlayers",
        params: {},
    });

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress!,
        functionName: "getRecentWinner",
        params: {},
    });

    const updateUI = async () => {
        const entranceFeeFromCall = ((await getEntranceFee()) as BigNumber).toString();
        const numPlayersFromCall = ((await getNumberOfPlayers()) as BigNumber).toString();
        const recentWinerFromCall = (await getRecentWinner()) as string;
        setEntranceFee(entranceFeeFromCall);
        setNumPlayers(numPlayersFromCall);
        setRecentWinner(recentWinerFromCall);
    };

    const handleSuccess = async (tx: ContractTransaction) => {
        await tx.wait(1);
        console.log("success");
        handleNewNotification();
        updateUI();
    };

    const handleNewNotification = () => {
        dispatch({
            type: "info",
            message: "Transaction successful",
            title: "Transaction Notification",
            position: "topR",
            icon: "bell",
        });
    };

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI();
        }
    }, [isWeb3Enabled]);

    return (
        <Box p={10}>
            {raffleAddress ? (
                <Box>
                    <Box> Lottery at {raffleAddress}</Box>
                    <Button
                        onClick={async () =>
                            await enterRaffle({
                                onSuccess: (tx) => handleSuccess(tx as ContractTransaction),
                            })
                        }
                    >
                        Enter Raffle
                    </Button>
                </Box>
            ) : (
                <Box>Lottery at ____________</Box>
            )}

            <Box>Entrance Fee: {ethers.utils.formatUnits(entranceFee, "ether")} ETH</Box>
            <Box>Number of players: There are currently {numPlayers} players</Box>
            <Box>Recent winner: {recentWinner}</Box>
            {/* <Box> Entrance Fee: {entranceFee ? entranceFee : "1"} ETH</Box> */}
        </Box>
    );

    //  <Box>Lottery {raffleAddress}</Box>;
};
