import debounce from 'lodash.debounce';
import country from '../template/country.hbs';
import countryList from '../template/country-list.hbs';
import notifyFunctions from '../js/notification';
import countriesAPI from '../js/fetchCountries';
const refs = {
  inputRef: document.querySelector('input'),
  listRef: document.querySelector('.country'),
};

let nameCountry;
const debounceFetchCountry = debounce(e => {
  nameCountry = e.target.value;
  refs.listRef.innerHTML = '';
  if (nameCountry) {
    countriesAPI
      .fetchCountries(nameCountry)
      .then(data => {
        if (data.status === 404) {
          notifyFunctions.notifyNoticeError();
          return Promise.reject(`answer: request incorrect`);
        }
        return listOfCountries(data);
      })
      .catch(err => {
        console.warn(err);
      });
  }
}, 500);

refs.inputRef.addEventListener('input', debounceFetchCountry);

function listOfCountries(data) {
  if (data.length > 10) {
    notifyFunctions.notifyError();
    return;
  }
  if (data.length >= 2 && data.length <= 10) {
    notifyFunctions.notifyNotice();
    const markup = countryList(data);
    refs.listRef.insertAdjacentHTML('beforeend', markup);
    return;
  }
  if (data.length === 1) {
    notifyFunctions.notifySuccess();
    const markup = country(data);
    refs.listRef.insertAdjacentHTML('beforeend', markup);
    return;
  }
}
