import Links from './components/links';
import { PortfolioTypes } from 'constants/portfolioTypes';

export const MyBitGo = () => (
  <Links
    data={[{
      name: 'Explore',
      url: '/explore',
      internal: true,
    }, {
      name: 'Portfolio',
      url: `/portfolio?type=${PortfolioTypes.INVESTMENTS}`,
      as: `/portfolio/${PortfolioTypes.INVESTMENTS}`,
      internal: true,
    }, {
      name: 'Transactions',
      url: `/transaction-history`,
      internal: true,
    }, {
      name: 'Watch List',
      url: `/watch-list`,
      internal: true,
    }, {
      name: 'List Asset',
      url: `/list-asset`,
      internal: true,
    }, {
      name: 'Knowledge Base',
      url: `/help`,
      internal: true,
    }, {
      name: 'Onboarding',
      url: `/onboarding`,
      internal: true,
    },
  ]}/>
);

export const AboutMyBit = () => (
  <Links
    data={[{
      name: 'Company',
      url: 'https://mybit.io/about',
    }, {
      name: 'Token',
      url: 'https://learn.mybit.io/learn/mybit-token-myb-1',
    }, {
      name: 'Blog',
      url: 'https://medium.com/mybit-dapp',
    }, {
      name: 'Contact',
      url: 'mailto:info@mybit.io',
    },
  ]}/>
);

export const Products = () => (
  <Links
    data={[{
      name: 'SDK',
      url: 'https://developer.mybit.io/portal/',
    }, {
      name: 'MyBit Go',
      url: '/',
    }, {
      name: 'Task.Market',
      url: 'https://task.market/',
    }, {
      name: 'MYDAX',
      url: 'https://mydax.io/',
    }, {
      name: 'Other dApps',
      url: 'https://mybit.io/tools',
    },
  ]}/>
);
