import React from 'react';
import { hot } from 'react-hot-loader/root'
import App, { Container } from 'next/app';
import getConfig from 'next/config';
import AirtableProvider, { withAirtableContext } from 'components/Airtable';
import BlockchainProvider from 'components/Blockchain';
import KyberProvider from 'components/KyberContext';
import NotificationsProvider from 'components/NotificationsModule';
import Notifications from 'components/Notifications';
import MetamaskChecker from 'components/MetamaskChecker';
import Head from 'components/Head';
import GlobalStyle from 'components/globalStyle';
import AppWrapper from 'components/AppWrapper';
import Theme from 'components/Theme'
import MobileMenu from 'components/MobileMenu'
import BancorContainer from 'ui/BancorContainer';
import Cookie from 'js-cookie';
import Router from 'next/router';
import { navbarOptions } from 'constants/navigationBar';
import { WEB3_BACKUP_PROVIDER } from 'constants/web3BackupProvider';
import { FULL_SCREEN_PAGES } from 'constants/fullScreenPages';
import { COOKIES } from 'constants/cookies';

class MyApp extends App {
  state = {
    mobileMenuOpen: false,
  }

  saveFirstVisit = () => {
    try {
      if (!Cookie.get(COOKIES.NEW_USER)) {
        Cookie.set(COOKIES.NEW_USER, 'true');
        return true;
      }
      return false;
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  prefetchPages = () => {
    Router.prefetch('/onboarding')
    Router.prefetch('/asset-manager')
    Router.prefetch('/asset')
    Router.prefetch('/transaction-history')
    Router.prefetch('/explore')
    Router.prefetch('/portfolio')
    Router.prefetch('/help')
    Router.prefetch('/watch-list')
    Router.prefetch('/list-asset')
  }

  componentDidMount = () => {
    require('utils/disableReactDevTools');
    this.prefetchPages();
    this.saveFirstVisit()
  }

  handleMobileMenuClicked = (state) => {
    this.setState({
      mobileMenuOpen: state,
    })
  }

  render () {
    const { Component, pageProps, router } = this.props;
    const {
      mobileMenuOpen,
    } = this.state;

    const isFullScreenPage = FULL_SCREEN_PAGES.includes(router.pathname);

    return (
      <Container>
        <GlobalStyle />
        <Head/>
        <Theme>
          <WithProviders>
            <Notifications />
            <MobileMenu
              isOpen={mobileMenuOpen}
              items={navbarOptions}
              currentPath={router.route}
              handleMobileMenuState={this.handleMobileMenuClicked}
            >
              <React.Fragment>
                <BancorContainer>
                  <AppWrapper
                    isFullScreenPage={isFullScreenPage}
                    handleMobileMenuState={this.handleMobileMenuClicked}
                  >
                    <Component
                      {...pageProps}
                      currentPath={router.route}
                    />
                  </AppWrapper>
                </BancorContainer>
              </React.Fragment>
            </MobileMenu>
          </WithProviders>
        </Theme>
      </Container>
    )
  }
}

const WithProviders = ({ children }) => (
    <NotificationsProvider>
      <AirtableProvider>
        <KyberProvider>
          <MetamaskChecker
            backupProvider={WEB3_BACKUP_PROVIDER}
          >
            <BlockchainProvider>
              {children}
            </BlockchainProvider>
          </MetamaskChecker>
        </KyberProvider>
      </AirtableProvider>
    </NotificationsProvider>
);

export default hot(MyApp);
