import find from 'lodash/find';
import localStorage from '@/shared/utils/localStorage';
import { countryLocaleMap } from '@/shared/intl/consts/localeTypes';
import locale from '@/shared/intl/utils/locale';
import isEmpty from 'lodash/isEmpty';

const getCountry = nation => {
  const countries = localStorage.getObject('countries');

  if (!nation) {
    return countries;
  }

  const result = find(countries, country => country.nation === nation);

  return (!isEmpty(result) && result[countryLocaleMap[locale.currentLocale]]) || '';
};

export default getCountry;