import { notice, success, error, defaults } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';

import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';

defaults.styling = 'material';
defaults.icons = 'material';
function notifyError() {
  error({
    text: `
As a result, there are a lot of countries. You need to make your request more specific`,
    delay: 3000,
  });
}
function notifyNotice() {
  notice({
    text: 'For detailed information enter a specific query',
    delay: 5000,
  });
}

function notifySuccess() {
  success({
    text: 'Your query is correct!',
    delay: 3000,
  });
}

export default { notifyError, notifyNotice, notifySuccess };
