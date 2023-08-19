import { debounce } from 'lodash';
import React from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { amountChanged } from '../store/actions/RateActions';
import { getAmount } from '../store/reducers/RateReducer';

export function AmountField() {
  const dispatch = useDispatch();
  const amount = useSelector(getAmount);
  const [displayAmount, setDisplayAmount] = React.useState(amount);

  const changeAmount = (newAmount) => dispatch(amountChanged(newAmount));
  const onAmountChanged = debounce(changeAmount, 500);

  function onChange(e) {
    let newAmount = e.target.value;
    setDisplayAmount(newAmount);
    onAmountChanged(newAmount);
  }

  return (
    <form className="ExchangeRate-form">
      <input type="text" value={displayAmount} onChange={onChange} />
    </form>
  );
}

export const AmountFieldContainer = connect()(AmountField);
