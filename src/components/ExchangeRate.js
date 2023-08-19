import React from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { ratesUpdated } from '../store/actions/RateActions';
import {
  getCurrencyCode,
  getSupportedCurrencies,
} from '../store/reducers/RateReducer';
import { RateTableContainer } from './RateTable';
import { CurrencyCodePickerContainer } from './CurrencyCodePicker';
import { getExchangeRates } from '../api';
import { AmountFieldContainer } from './AmountField';

export function ExchangeRate({ updateRates }) {
  const currencyCode = useSelector(getCurrencyCode);
  const supportedCurrencies = useSelector(getSupportedCurrencies);

  React.useEffect(() => {
    getExchangeRates(currencyCode, supportedCurrencies).then((rates) => {
      updateRates(rates);
    });
  }, [currencyCode, supportedCurrencies, updateRates]);

  return (
    <>
      <section>
        <h1 className="ExchangeRate-header">
          Exchange Rates <CurrencyCodePickerContainer />
        </h1>
      </section>
      <section>
        <AmountFieldContainer />
      </section>
      <section>
        <RateTableContainer />
      </section>
    </>
  );
}

// props types
ExchangeRate.propTypes = {
  supportedCurrencies: PropTypes.arrayOf(PropTypes.string),
};

// redux stuff
function mapDispatchToProps(dispatch) {
  return {
    updateRates: (rates) => dispatch(ratesUpdated(rates)),
  };
}
export const ExchangeRateContainer = connect(
  null,
  mapDispatchToProps
)(ExchangeRate);
