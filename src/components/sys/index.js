import Vue from 'vue'
import SkBtn from './common/form/SkBtn';
import SkLink from './common/form/SkLink';
import SkRadio from './common/form/SkRadio';
import SkTable from './common/table/SkTable';
import SkSearchBar from './common/SkSearchBar';
import SkBtnOptBar from './common/SkBtnOptBar';

/* istanbul ignore next */
SkBtn.install = function(Vue) {
    Vue.component(SkBtn.name, SkBtn);
};
SkLink.install = function(Vue) {
    Vue.component(SkLink.name, SkLink);
};
SkRadio.install = function(Vue) {
    Vue.component(SkRadio.name, SkRadio);
};
SkTable.install = function(Vue) {
    Vue.component(SkTable.name, SkTable);
};
SkSearchBar.install = function(Vue) {
    Vue.component(SkSearchBar.name, SkSearchBar);
};
SkBtnOptBar.install = function(Vue) {
    Vue.component(SkBtnOptBar.name, SkBtnOptBar);
};

Vue.use(SkBtn);
Vue.use(SkLink);
Vue.use(SkRadio);
Vue.use(SkTable);
Vue.use(SkSearchBar);
Vue.use(SkBtnOptBar);