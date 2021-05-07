import { useSelector, shallowEqual } from 'react-redux';

export default function(selector) {
  return useSelector(selector, shallowEqual);
}
