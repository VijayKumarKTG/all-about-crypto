// import { useAccount } from 'wagmi';
// import { useQuery } from '@tanstack/react-query';

// import classes from './personalAnalytics.module.scss';

// import custom_axios from '../../axios';

// function PersonalAnalytics() {
//   const { address, chain, isConnected } = useAccount();

//   const { isLoading, isError, error, data } = useQuery({
//     queryKey: isConnected
//       ? ['personal-collection', address, chain, isConnected]
//       : [],
//     queryFn: () =>
//       axios.get(
//         `nfts/owners?chains=${chain.name}&wallet_addresses=${address}&limit=50`
//       ),
//     enabled: false,
//   });

//   if (isLoading || isError) {
//     return isLoading ? (
//       <div className={classes.loading}>Loading...</div>
//     ) : (
//       <div className={classes.error}>{error.message}</div>
//     );
//   }

//   if (data?.data?.nfts?.length === 0) {
//     return <h4>No NFTs found!</h4>;
//   }

//   if (!isConnected) {
//     return <h4>No NFTs found!</h4>;
//   }

//   return (
//     <section>
//       <h2>Personal Analytics</h2>
//       <p>{address}</p>
//       <p>{chain.name}</p>
//       <p>{chain.id}</p>
//     </section>
//   );
// }

// export default PersonalAnalytics;
