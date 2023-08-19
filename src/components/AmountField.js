import { debounce } from 'lodash';
import React, { useCallback, useMemo } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { amountChanged } from '../store/actions/RateActions';
import { getAmount } from '../store/reducers/RateReducer';

export function AmountField() {
  const dispatch = useDispatch();
  const amount = useSelector(getAmount);
  const [displayAmount, setDisplayAmount] = React.useState(amount);

  const changeAmount = useCallback(
    (newAmount) => dispatch(amountChanged(newAmount)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onAmountChanged = useMemo(
    () => debounce(changeAmount, 500),
    [changeAmount]
  );

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
