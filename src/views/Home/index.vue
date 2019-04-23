<template>
  <v-app dark
         @contextmenu.native.prevent
         tabindex="0">
    <title-panel></title-panel>
    <top-panel></top-panel>
    <left-panel></left-panel>
    <right-panel></right-panel>
    <main-panel class="main-panel"></main-panel>
  </v-app>
</template>

<script>
import { ipcRenderer, remote } from 'electron';
import TopPanel from '@/views/Home/components/TopPanel/index.vue';
import LeftPanel from '@/views/Home/components/LeftPanel/index.vue';
import RightPanel from '@/views/Home/components/RightPanel/index.vue';
import MainPanel from '@/views/Home/components/MainPanel/index.vue';
import TitlePanel from '@/components/TitlePanel/index.vue';
import componentMixins from '@/mixins/component';
import { createNamespacedHelpers } from 'vuex';
import Project from '@/services/models/Project';
import { ADD_PAGE_COMPONENT } from '@/store/mutation-types';
import Page from '@/graphql/Page.gql';
import Toast from '@/plugins/Toast';
import '../../plugins/vuetify';
import widgets from '@/widgets';
import { Category } from '@/constant';

const { mapActions: pageActions, mapMutations } = createNamespacedHelpers(
  'page',
);

export default {
  mixins: [componentMixins],
  data() {
    return {
      isDomReady: false,
    };
  },
  components: {
    TopPanel,
    LeftPanel,
    RightPanel,
    MainPanel,
    TitlePanel,
  },
  methods: {
    ...pageActions(['resetProject', 'loadProject']),
    ...mapMutations([ADD_PAGE_COMPONENT]),
    reload(module) {
      this.resetProject();
      this.loadProject({ module });
    },
    domReady(callback) {
      // ! 重新获取一次，mounted可能获取不到
      // 避免获取不到webview
      setTimeout(() => {
        this.webview = document.querySelector('webview');
        try {
          if (this.webview.isLoading()) {
            this.webview.addEventListener('dom-ready', () => {
              this.isDomReady = true;
              if (callback) callback();
            });
          } else {
            this.isDomReady = true;
            if (callback) callback();
          }
        } catch (error) {
          console.error(error);
          this.webview.addEventListener('dom-ready', () => {
            this.isDomReady = true;
            if (callback) callback();
          });
        }
      }, 0);
    },
    fileLoadProject(event, paths) {
      if (!paths || !paths.length) return;
      const [projectPath] = paths;
      const module = Project.load(projectPath);

      this.reload(module);
    },
    asyncData() {
      return new Promise((resolve, reject) => {
        this.$apollo.addSmartQuery('page', {
          // 选项同上文
          query: Page,
          variables() {
            return {
              _id: this.$route.params._id,
            };
          },
          result({ data, loading, networkStatus }) {
            if (data) {
              this.reload(JSON.parse(data.page.pageData));
            }
            resolve();
          },
        });
      });
    },
    installDefaultPage() {
      const pageWidget = widgets.find(
        widget => widget.setting.category === Category.Layout,
      );
      this.selectWidget(pageWidget);
      const root = this.createComponentInfo(this.getGuid(), null, null);
      this.ADD_PAGE_COMPONENT(root);
    },
  },
  destroyed() {
    ipcRenderer.removeListener('load:project', this.fileLoadProject);
    this.resetProject();
  },
  created() {
    this.process = process;
    this.webview = null;
    this.installDefaultPage();
  },
  mounted() {
    Toast.loading();
    this.domReady(async () => {
      ipcRenderer.on('load:project', this.fileLoadProject);
      if (this.$route.params._id) {
        await this.asyncData();
      }
      Toast.clear();
    });
  },
};
</script>

<style scoped>
#app {
  height: 100%;
}
.main-panel {
  height: 100%;
}
</style>
<style lang="stylus">
@import '../../assets/style/native.styl';
</style>
