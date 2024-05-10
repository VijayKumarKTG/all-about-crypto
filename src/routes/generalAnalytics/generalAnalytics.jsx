import { useState } from 'react';
import { useQueries } from '@tanstack/react-query';

import Loader from '../../assets/loader.svg';
import Error from '../../assets/error.svg';
import Empty from '../../assets/empty.svg';

import classes from './generalAnalytics.module.scss';

import CollectionCard from '../../components/collectionCard/collectionCard';
import custom_axios from '../../axios';
import WalletCard from '../../components/walletCard/walletCard';
import CHAINS from '../../constants';

function GeneralAnalytics() {
  const [chain, setChain] = useState('ethereum');

  const results = useQueries({
    queries: [
      {
        queryKey: ['top-collections', chain],
        queryFn: () =>
          custom_axios.get(`nfts/collections/top_v2?chains=${chain}&limit=50`),
      },
      {
        queryKey: ['trending-collections', chain],
        queryFn: () =>
          custom_axios.get(
            `nfts/collections/trending?chains=${chain}&limit=50`
          ),
      },
      {
        queryKey: ['top-wallets', chain],
        queryFn: () => custom_axios.get(`nfts/top_wallets?chain=${chain}`),
      },
    ],
  });

  if (
    results &&
    results.length !== 0 &&
    (results[0].isLoading === true ||
      results[1].isLoading ||
      results[2].isLoading)
  ) {
    return (
      <div className={classes.container}>
        <div className={classes.status}>
          <img src={Loader} alt='Loading animation' />
          <p>We are loading your requested data!</p>
        </div>
      </div>
    );
  }

  if (
    results &&
    results.length !== 0 &&
    (results[0].isError === true || results[1].isError || results[2].isError)
  ) {
    return (
      <div className={classes.container}>
        <div className={classes.status}>
          <img src={Error} alt='Error Icon' />
          <p>Something went wrong!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>General Trends</h2>
        <select
          id='chain'
          name='chain'
          value={chain}
          onChange={(event) => setChain(event.target.value)}>
          {CHAINS.map((e) => (
            <option key={e.chain} value={e.chain}>
              {e.name}
            </option>
          ))}
        </select>
      </div>

      <section className={classes.section}>
        <h3>Top Collections</h3>
        {!results[0].data.data.collections.length ? (
          <div className={classes.status}>
            <img src={Empty} alt='Empty Icon' />
            <p>We are not able to find any collections!</p>
          </div>
        ) : (
          <ul className={classes.list}>
            {results[0].data.data.collections.map((e, i) => (
              <CollectionCard
                key={e.collection_id}
                rank={i + 1}
                image={e.collection_details.image_url}
                name={e.collection_details.name}
                category={e.collection_details.category}
                quantity={e.collection_details.total_quantity}
                chain={e.collection_details.chains[0]}
                url={
                  e.collection_details.marketplace_pages &&
                  e.collection_details.marketplace_pages[0]?.collection_url
                }
              />
            ))}
          </ul>
        )}
      </section>

      <section className={classes.section}>
        <h3>Trending Collections</h3>
        {!results[1].data.data.collections.length ? (
          <div className={classes.status}>
            <img src={Empty} alt='Empty Icon' />
            <p>We are not able to find any collections!</p>
          </div>
        ) : (
          <ul className={classes.list}>
            {results[1].data.data.collections.map((e, i) => (
              <CollectionCard
                key={e.collection_id}
                rank={i + 1}
                image={e.collection_details.image_url}
                name={e.collection_details.name}
                category={e.collection_details.category}
                quantity={e.collection_details.total_quantity}
                chain={e.collection_details.chains[0]}
                url={
                  e.collection_details.marketplace_pages &&
                  e.collection_details.marketplace_pages[0]?.collection_url
                }
              />
            ))}
          </ul>
        )}
      </section>

      <section className={classes.section}>
        <h3>Top Wallets</h3>
        {!results[2].data.data.top_wallets.length ? (
          <div className={classes.status}>
            <img src={Empty} alt='Empty Icon' />
            <p>We are not able to find any top wallets!</p>
          </div>
        ) : (
          <ul className={classes.list}>
            {results[2].data.data.top_wallets.map((e) => (
              <WalletCard
                key={e.address_id}
                rank={e.rank}
                address={e.address_id}
                tx_count={e.transaction_count}
                chain={e.chain}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

export default GeneralAnalytics;
