import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getExchangeRates } from '../api';
import { ratesUpdated } from '../store/actions/RateActions';
import {
  getCurrencyCode,
  getSupportedCurrencies,
} from '../store/reducers/RateReducer';
import { AmountField } from './AmountField';
import { CurrencyCodePicker } from './CurrencyCodePicker';
import { RateTable } from './RateTable';

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
          Exchange Rates <CurrencyCodePicker />
        </h1>
      </section>
      <section>
        <AmountField />
      </section>
      <section>
        <RateTable />
      </section>
    </>
  );
}
