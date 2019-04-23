<template>
  <v-dialog v-model="dialog"
            persistent
            lazy
            max-width="600px">
    <v-btn slot="activator"
           round
           small
           color="primary">
      <v-icon>add</v-icon>
    </v-btn>
    <v-card>
      <v-card-title>
        <span class="headline">添加任务</span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-subheader>列表</v-subheader>
              <v-combobox :items="middleware"
                          v-model="selectedTask"
                          item-text="label"
                          item-value="name">
                <template slot="selection"
                          slot-scope="{item}">
                  <strong>{{ item.label }}</strong>&nbsp;
                  <span>({{item.name}})</span></template>
              </v-combobox>
            </v-flex>
            <v-flex v-if="selectedTask"
                    xs12>
              <v-subheader>参数</v-subheader>
              <input-factory :type="selectedTask.inputType"
                             v-model="params"></input-factory>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary"
               flat
               @click="handleDialogClose">关闭</v-btn>
        <v-btn color="primary"
               flat
               @click="handleDialogEntry">确认</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import InputFactory from '@/components/InputFactory/index.vue';
import middleware from '@/middleware';

export default {
  data() {
    return {
      dialog: false,
      selectedTask: null,
      params: null,
    };
  },
  components: {
    InputFactory,
  },
  created() {
    this.middleware = middleware;
  },
  computed: {
    // selectedTask() {
    //   return middleware.find(task => task.name === this.selectedTaskName);
    // },
  },
  methods: {
    // handleTaskChange(val) {
    //   console.log("TCL: handleTaskChange -> val", val);
    //   this.selectedTask = middleware.find(task => task.name === val);
    // },
    handleDialogClose() {
      this.dialog = false;
      this.selectedTask = null;
      this.params = null;
    },
    handleDialogEntry() {
      if (!this.selectedTask) return;
      this.$emit('addTask', {
        name: this.selectedTask.name,
        option: this.params,
      });
      this.handleDialogClose();
    },
  },
};
</script>

<style>
</style>
