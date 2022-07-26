import type { NextPage } from "next";
import { Box } from "@chakra-ui/react";
import Nav from "../components/NavBar";
import { LotteryFunction } from "../components/LotteryFunction";

const Home: NextPage = () => {
    return (
        <Box>
            <Nav />
            <LotteryFunction />
        </Box>
    );
};

export default Home;
