import { useQueries } from '@tanstack/react-query';
import { useState } from 'react';

import classes from './search.module.scss';

import custom_axios from '../../axios';
import SearchResult from '../../components/searchResult/searchResult';
import CHAINS from '../../constants';

function Search() {
  const [search, setSearch] = useState({
    address: null,
    chain: null,
  });

  const results = useQueries({
    queries: [
      {
        queryKey: ['Search-NFTs', search.address, search.chain],
        queryFn: () =>
          custom_axios.get(
            `nfts/owners?chains=${search.chain}&wallet_addresses=${search.address}&limit=50`
          ),
        enabled: search.address !== null && search.chain !== null,
      },
      {
        queryKey: ['Search-Collections', search.address, search.chain],
        queryFn: () =>
          custom_axios.get(
            `nfts/collections/${search.chain}/${search.address}?limit=50`
          ),
        enabled: search.address !== null && search.chain !== null,
      },
    ],
  });

  const onSubmit = (event) => {
    event.preventDefault();

    setSearch({
      address: event.target[0].value,
      chain: event.target[1].value,
    });
  };

  return (
    <section>
      <h2>Search Who Own What</h2>
      <div className={classes.search}>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor='address'>Wallet Address</label>
            <input
              required
              aria-required
              type='text'
              id='address'
              name='address'
              placeholder={`Enter a Wallet Address`}
              maxLength={42}
              minLength={42}
            />
          </div>
          <div>
            <label htmlFor='chain'>Choose a Chain</label>
            <select id='chain' name='chain' defaultValue={CHAINS[0].chain}>
              {CHAINS.map((e) => (
                <option key={e.chain} value={e.chain}>
                  {e.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button type='Submit'>Search</button>
          </div>
        </form>
      </div>
      {(results[0].isLoading ||
        results[0].isError ||
        results[1].isLoading ||
        results[1].isError ||
        results[0].isSuccess ||
        results[1].isSuccess) && (
        <div>
          <SearchResult results={results} />
        </div>
      )}
    </section>
  );
}

export default Search;
