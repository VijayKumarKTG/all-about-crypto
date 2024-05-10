/* eslint-disable react/prop-types */
import { MetaMaskAvatar } from 'react-metamask-avatar';

import classes from './walletCard.module.scss';

const WalletCard = ({ rank, address, tx_count, chain }) => {
  return (
    <li className={classes.collectionItem}>
      <div>
        <div className={classes.count}>{rank}</div>
        <MetaMaskAvatar address={address} size={80} />
      </div>
      <div>
        <h4>
          <a
            href={`https://${
              chain === 'ethereum'
                ? 'etherscan.io'
                : chain === 'bsc'
                ? 'bscscan.com'
                : chain === 'base'
                ? 'basescan.org'
                : 'polygonscan.com'
            }/address/${address}`}
            target='_blank'
            rel='noreferrer'>
            {address.substring(0, 8)}...{address.substring(36)}
          </a>
        </h4>
        <div className={classes.metadata}>
          <span>TXs Count : </span>
          <strong>{tx_count}</strong>
        </div>
        <div className={classes.metadata}>
          <span>Chain : </span>
          <strong>{chain}</strong>
        </div>
      </div>
    </li>
  );
};

export default WalletCard;
