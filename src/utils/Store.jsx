import {proxy} from 'valtio'

const store=proxy({
  currSection:'Home'
});

export default store