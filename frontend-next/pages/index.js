import UserTable from "@/components/UserTable";
import { Box } from "@material-ui/core";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>GitHub User Search</title>
      </Head>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <UserTable />
      </Box>
    </>
  );
}
