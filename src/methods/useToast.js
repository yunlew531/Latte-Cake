import { createToast } from 'mosha-vue-toastify';

//  useToast('文字文字文字', 'success'/'danger');
export default (text, type = 'success') => {
  const color = type === 'success' ? '#30E69A' : '#c63232';

  createToast(text, {
    timeout: 5000,
    showCloseButton: true,
    swipeClose: true,
    position: 'top-center',
    transition: 'zoom',
    showIcon: true,
    toastBackgroundColor: color,
    type,
  });
};
