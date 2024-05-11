import { useAccount } from 'wagmi';
import { useQueries } from '@tanstack/react-query';

import classes from './personalAnalytics.module.scss';

import custom_axios from '../../axios';
import SearchResult from '../../components/searchResult/searchResult';
import Empty from '../../assets/empty.svg';

function PersonalAnalytics() {
  const { address, chain, isConnected, isDisconnected } = useAccount();

  const results = useQueries({
    queries: [
      {
        queryKey: ['personal-NFTs', address, chain?.name, isConnected],
        queryFn: () =>
          custom_axios.get(
            `nfts/owners?chains=${chain?.name?.toLowerCase()}&wallet_addresses=${address}&limit=50`
          ),
        enabled: isConnected,
      },
      {
        queryKey: ['personal-Collections', address, chain?.name],
        queryFn: () =>
          custom_axios.get(
            `nfts/collections/${chain?.name?.toLowerCase()}/${address}?limit=50`
          ),
        enabled: isConnected,
      },
    ],
  });

  if (isDisconnected) {
    return (
      <section>
        <div className={classes.header}>
          <h2>General Trends</h2>
        </div>
        <div className={classes.status}>
          <img src={Empty} alt='empty icon' />
          <p>Please connect your wallet to use the section!</p>
          <w3m-button />
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className={classes.header}>
        <h2>General Trends</h2>
      </div>
      {(results[0].isLoading ||
        results[0].isError ||
        results[1].isLoading ||
        results[1].isError ||
        results[0].isSuccess ||
        results[1].isSuccess) && (
        <div>
          <SearchResult notSearch results={results} />
        </div>
      )}
    </section>
  );
}

export default PersonalAnalytics;
