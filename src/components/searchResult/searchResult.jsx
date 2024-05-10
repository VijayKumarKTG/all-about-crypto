/* eslint-disable react/prop-types */

import Loader from '../../assets/loader.svg';
import Error from '../../assets/error.svg';
import Empty from '../../assets/empty.svg';

import classes from './searchResult.module.scss';
import CollectionCard from '../collectionCard/collectionCard';
import NftCard from '../nftCard/nftCard';

const SearchResult = ({ results }) => {
  if (
    results &&
    results.length !== 0 &&
    (results[0].isLoading === true || results[1].isLoading)
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
    (results[0].isError === true || results[1].isError)
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
      <h4>Search Results</h4>
      <section className={classes.section}>
        <h5>NFTs owned by searched Wallet Address</h5>
        {!results[0].data.data.nfts.length ? (
          <div className={classes.status}>
            <img src={Empty} alt='Empty Icon' />
            <p>We are not able to find any NFTs!</p>
          </div>
        ) : (
          <ul className={classes.list}>
            {results[0].data.data.nfts.map((e, i) => (
              <NftCard
                key={e.collection_id}
                rank={i + 1}
                image={e.previews.image_medium_url}
                name={e.name}
                rarity_rank={e.rarity.rank}
                rarity_score={e.rarity.score}
                quantity={e.token_count}
                url={`https://opensea.io/assets/${e.chain}/${e.contract_address}/${e.token_id}`}
                collection={e.collection.name}
                collection_url={
                  e.collection.marketplace_pages &&
                  e.collection.marketplace_pages[0]?.collection_url
                }
              />
            ))}
          </ul>
        )}
      </section>
      <section className={classes.section}>
        <h5>Collections owned by searched Wallet Address</h5>
        {!results[1].data.data.collections.length ? (
          <div className={classes.status}>
            <img src={Empty} alt='Error Icon' />
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
    </div>
  );
};

export default SearchResult;
