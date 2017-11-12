export { default as createForm } from './createForm';
export { default as getData } from './getData';
export { default as Spinner } from './Spinner';

import { Rgo } from 'rgo';

declare global {
  interface Window {
    rgo: Rgo;
  }
}