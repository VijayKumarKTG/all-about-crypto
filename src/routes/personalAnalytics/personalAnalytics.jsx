import { useAccount, useSignMessage } from 'wagmi';
import { useQuery } from '@tanstack/react-query';

import classes from './personalAnalytics.module.scss';

import custom_axios from '../../axios';

function PersonalAnalytics() {
  const { address, chain, isConnected } = useAccount();
  const { signMessage } = useSignMessage();

  return (
    <section>
      <h2>Personal Analytics</h2>
      <p>{address}</p>
      <p>{chain.name}</p>
      <p>{chain.id}</p>
      <button onClick={() => signMessage({ message: 'hello world' })}>
        Sign message
      </button>
    </section>
  );
}

export default PersonalAnalytics;
