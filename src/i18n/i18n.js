import VueI18n from 'vue-i18n';
import iView from 'iview';
import i18nMessage from './message';

export default () => {
  const i18n = new VueI18n({
    locale: 'CN',
    messages: i18nMessage
  });
  iView.i18n((key, value) => i18n.t(key, value));
  return i18n;
};
