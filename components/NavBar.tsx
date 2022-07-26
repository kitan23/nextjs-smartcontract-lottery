import { ReactNode, useEffect } from "react";
import {
    Box,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
    Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { ByMoralis, useMoralis } from "react-moralis";
import { ConnectButton } from "web3uikit";

const NavLink = ({ children }: { children: ReactNode }) => (
    <Link
        px={2}
        py={1}
        rounded={"md"}
        _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.200", "gray.700"),
        }}
        href={"#"}
    >
        {children}
    </Link>
);

export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();

    const {
        web3,
        enableWeb3,
        account,
        isWeb3Enabled,
        Moralis,
        isWeb3EnableLoading,
        web3EnableError,
        deactivateWeb3,
    } = useMoralis();
    //  useEffect(() => {
    //      if (isWeb3Enabled) return;
    //      if (typeof window !== undefined) {
    //          if (window.localStorage.getItem("connected")) {
    //              enableWeb3();
    //          }
    //      }
    //  }, [isWeb3Enabled]);
    //  console.log(isWeb3Enabled);
    //  console.log(account);

    const handleConnect = async () => {
        await enableWeb3();
        if (typeof window !== "undefined") {
            window.localStorage.setItem("connected", "injected");
        }
    };

    useEffect(() => {
        Moralis.onAccountChanged((account) => {
            console.log(`Account changed to ${account}`);
            if (account == null) {
                window.localStorage.removeItem("connected");
                deactivateWeb3();
                console.log("Null account found");
            }
        });
    }, []);

    return (
        <>
            <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
                <Flex h={16} alignItems={"center"} justifyContent={"space-around"}>
                    <Box fontSize="xl" fontWeight="600">
                        Decentralized Lottery
                    </Box>

                    <ConnectButton />
                    {/* <Button onClick={handleConnect} disabled={isWeb3EnableLoading}>
                        Connect
                    </Button> */}
                    {/* {account ? (
                        <Box fontWeight={600}>
                            {account?.slice(0, 6)}...{account?.slice(account.length - 4)}
                        </Box>
                    ) : (
                        <Button onClick={handleConnect} disabled={isWeb3EnableLoading}>
                            Connect to wallet
                        </Button>
                        // <ConnectButton />
                    )} */}

                    <Flex alignItems={"center"}>
                        <Stack direction={"row"} spacing={7}>
                            <Button onClick={toggleColorMode}>
                                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                            </Button>

                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={"full"}
                                    variant={"link"}
                                    cursor={"pointer"}
                                    minW={0}
                                >
                                    <Avatar
                                        size={"sm"}
                                        src={"https://avatars.dicebear.com/api/male/username.svg"}
                                    />
                                </MenuButton>
                                <MenuList alignItems={"center"}>
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={"2xl"}
                                            src={
                                                "https://avatars.dicebear.com/api/male/username.svg"
                                            }
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>Username</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    <MenuItem>Account Settings</MenuItem>
                                    <MenuItem>Logout</MenuItem>
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}
