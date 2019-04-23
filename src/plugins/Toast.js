import Vue from 'vue';
import _ from 'lodash';
import {
  VSnackbar,
  VDialog,
  VCard,
  VCardText,
  VProgressLinear,
} from 'vuetify/lib';

const defaultOptions = {
  color: '',
  top: true,
  right: true,
  timeout: 3000,
  value: false,
  message: '',
};

let $loading = null;

const parseOptions = message => (_.isObject(message) ? message : {
  message,
});

let queue = [];
let singleton = true;
let currentOptions = { ...defaultOptions };

function createInstance() {
  /* istanbul ignore if */
  if (!queue.length || !singleton) {
    const toast = new Vue({
      el: document.createElement('div'),
      data() {
        return Object.assign({}, defaultOptions);
      },
      render(h) {
        // console.log(this.props);
        return h(VSnackbar, {
          props: this.$data,
        }, this.message);
      },
    });
    document.getElementById('app').getElementsByClassName('application--wrap')[0].appendChild(toast
      .$el);
    queue.push(toast);
  }
  return queue[queue.length - 1];
}

// transform toast options to popup props
// function transformer(options) {
//   // options.overlay = options.mask;
//   return options;
// }

function Toast(options = {}) {
  const toast = createInstance();

  options = {
    ...currentOptions,
    ...parseOptions(options),
    value: true,
    clear() {
      toast.value = false;

      if (!singleton) {
        document.body.removeChild(toast.$el);
        toast.$destroy();
      }
    },
  };
  Object.assign(toast, options);
  clearTimeout(toast.timer);

  if (options.timeout > 0) {
    toast.timer = setTimeout(() => {
      toast.clear();
    }, options.timeout);
  }

  return toast;
}

const createMethod = type => options => Toast({
  color: type,
  ...parseOptions(options),
});

['success', 'error'].forEach((method) => {
  Toast[method] = createMethod(method);
});

function createLoadingInstance() {
  /* istanbul ignore if */
  if ($loading) {
    return $loading;
  }
  $loading = new Vue({
    el: document.createElement('div'),
    props: {
      value: Boolean,
    },
    render(h) {
      return h(VDialog, {
        props: {
          value: this.value,
          persistent: true,
          width: '300',
        },
      }, [h(VCard, {
        props: {
          color: 'primary',
        },
      }, [h(VCardText, ['请稍等', h(VProgressLinear, {
        class: 'mb-0',
        props: {
          indeterminate: true,
          color: 'white',
        },
      })])])]);
    },
  });
  // document.getElementById('app').getElementsByClassName('application--wrap')[0].appendChild(
  //   $loading.$el,
  // );
  return $loading;
}
Toast.loading = () => {
  const loading = createLoadingInstance();
  loading.value = true;
  loading.clear = () => {
    loading.value = false;
  };
  return loading;
};

Toast.clear = (all) => {
  if (queue.length) {
    if (all) {
      queue.forEach((toast) => {
        toast.clear();
      });
      queue = [];
    } else if (singleton) {
      queue[0].clear();
    } else {
      queue.shift().clear();
    }
  }
  if ($loading) {
    $loading.clear();
    $loading.$destroy();
    $loading = null;
  }
};

Toast.setDefaultOptions = (options) => {
  Object.assign(currentOptions, options);
};

Toast.resetDefaultOptions = () => {
  currentOptions = { ...defaultOptions };
};

Toast.allowMultiple = (allow = true) => {
  singleton = !allow;
};

Toast.install = () => {
  // Vue.use(VSnackbar);
  Vue.prototype.$toast = Toast;
};

// Vue.prototype.$toast = Toast;

export default Toast;
