import { NextPage } from "next";

import { trpc } from "../../utils/trpc";

const AgaashAccomPage: NextPage = () => {
  const { data: isAgaash, ...isAgaashQuery } =
    trpc.adminRouter.checkIfAgaash.useQuery();

  const { data: accomsData, ...agaashViewAccomsQuery } =
    trpc.adminRouter.agaashViewAccomodation.useQuery();

  if (isAgaashQuery.isLoading) return <div>Loading...</div>;
  if (isAgaashQuery.isError) return <div>Error</div>;

  if (!isAgaash) {
    return <div>You&apos;re not Agaash</div>;
  }

  return (
    <div className="mx-24">
      <div className="mt-20 text-3xl">Hello, Agaash.</div>

      {/* <div>{JSON.stringify(accoms, null, 2)}</div> */}
      <table className="border-collapse border">
        <thead>
          <tr>
            {/* <th>id</th> */}
            <th>Cluster</th>
            <th>Check In Date</th>
            <th>Check Out Date</th>
          </tr>
        </thead>

        {/* {accomsData?.accoms.map((accom) => (
          <>
            <div>{JSON.stringify(accom)}</div>
          </>
        ))} */}
      </table>
    </div>
  );
};

export default AgaashAccomPage;
