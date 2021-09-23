import { v4 as uuid } from 'uuid';
export default ({ app }, inject) => {
  inject('uuid', () => uuid());
};
