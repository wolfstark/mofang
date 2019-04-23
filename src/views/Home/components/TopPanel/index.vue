<template>
  <v-toolbar app
             dense
             clipped-left
             clipped-right>
    <v-btn @click.native="$router.back"
           flat>
      <v-icon>chevron_left</v-icon>页面管理
    </v-btn>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn @click="handleSave"
             flat><v-icon>cloud_upload</v-icon>保存</v-btn>
      <v-btn @click="handleImport"
             flat><v-icon>arrow_downward</v-icon>导入</v-btn>
      <v-btn @click="handleExport"
             flat><v-icon>arrow_upward</v-icon>导出</v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import { ipcRenderer } from "electron"; //eslint-disable-line
import { createNamespacedHelpers } from 'vuex';
import Project from '@/services/models/Project';
import Toast from '@/plugins/Toast';
import { stringifyComponent } from '@/utils/renderSfc';
import SAVE_PAGE from '@/graphql/SavePage.gql';

const { mapState: componentsState } = createNamespacedHelpers('components');
const { mapState: pageState } = createNamespacedHelpers('page');

export default {
  data() {
    return {};
  },
  computed: {
    ...componentsState(['pages', 'project']),
    ...pageState(['components']),
  },
  methods: {
    handleSave() {
      Toast.loading();
      // 确保截图不会失败
      this.$bus.$emit('changeMainPanel', 1);
      // await this.$nextTick();
      const webview = document.querySelector('webview');
      webview.capturePage(
        {
          x: 0,
          y: 0,
          width: 375,
          height: 667,
        },
        (image) => {
          const variables = {
            input: {
              name: this.$store.state.page.name,
              screenshot: image.toDataURL(),
              pageData: JSON.stringify(this.$store.state.page),
              sourceCode: stringifyComponent(this.components, false),
            },
          };
          if (this.$route.params._id) {
            variables.input._id = this.$route.params._id;
          }

          this.$apollo
            .mutate({
              // 查询语句
              mutation: SAVE_PAGE,
              // 参数
              variables,
              // 查询将先通过乐观响应、然后再通过真正的变更结果更新
              update: (store, { data: { savePage } }) => {
                if (savePage) {
                  Toast.clear();
                  this.$router.back();
                }
              },
            })
            .then((data) => {
              // 结果
              console.log('​handleSave -> data', data);
            })
            .catch((error) => {
              // 错误
              console.error(error);
              // 恢复初始用户输入
              // this.newTag = newTag;
            });
        },
      );
    },
    handleImport() {
      ipcRenderer.send('load:project');
    },
    handleExport() {
      if (!this.project.name || !this.project.path) {
        // this.settingDialogVisible = true;
        // this.status = 1;
        return;
      }
      this.saveProject();
    },
    saveProject() {
      const pages = this.$store.state.page;
      ipcRenderer.send('open-directory-dialog');
      ipcRenderer.on('selected-directory', (event, path) => {
        Project.save({ ...this.project, path }, pages, (err) => {
          if (err) {
            Toast.fail('保存失败！');
          } else {
            Toast.success('保存成功！');
          }
        });
      });
    },
  },
};
</script>

<style>
</style>
