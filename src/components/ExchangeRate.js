import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { getExchangeRates } from '../api';
import { ratesUpdated } from '../store/actions/RateActions';
import {
  getCurrencyCode,
  getSupportedCurrencies,
} from '../store/reducers/RateReducer';
import { AmountFieldContainer } from './AmountField';
import { CurrencyCodePickerContainer } from './CurrencyCodePicker';
import { RateTableContainer } from './RateTable';

export function ExchangeRate() {
  const dispatch = useDispatch();
  const currencyCode = useSelector(getCurrencyCode);
  const supportedCurrencies = useSelector(getSupportedCurrencies);

  React.useEffect(() => {
    getExchangeRates(currencyCode, supportedCurrencies).then((rates) => {
      dispatch(ratesUpdated(rates));
    });
  }, [currencyCode, supportedCurrencies, dispatch]);

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

export const ExchangeRateContainer = connect(null, null)(ExchangeRate);
