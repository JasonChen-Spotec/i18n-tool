import { useResponsive } from 'ahooks/lib/useResponsive';

function useResponsiveWrap() {
  const { xs, sm, md } = useResponsive();
  const newResponsive = {
    small: false,
    middle: false,
    large: false
  };

  if (xs && !sm) {
    newResponsive.small = true;
  } else if (sm && !md) {
    newResponsive.middle = true;
  } else {
    newResponsive.large = true;
  }

  return newResponsive;
}

export default useResponsiveWrap;
