<template>
  <v-layout column
            fill-height>
    <v-system-bar status
                  style="flex: 0 0 auto;"
                  lights-out>组件配置</v-system-bar>
    <template v-if="selectedComponent">
      <v-flex style="overflow:auto">
        <v-expansion-panel :value="0">
          <v-expansion-panel-content>
            <template sslot="header">
              <div>
                样式
              </div>
            </template>
            <v-card>
              <v-card-text>
                <v-layout v-for="(_,index) in selectedComponent.setting.config.Props"
                          :key="index">
                  <input-factory :type="_.inputType"
                                 v-model="props[_.key]"
                                 :items="_.data"
                                 :label="_.label"
                                 :placeholder="JSON.stringify(_.default)"
                                 :required="_.required"
                                 @input="handleChange"
                                 item-text="label"></input-factory>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <template slot="header">
              <div>
                属性
              </div>
            </template>
            <v-card>
              <v-card-text>
                <v-layout v-for="(_,index) in Style"
                          :key="index">
                  <!-- TODO: 还没做style值适配 -->
                  <input-factory :type="_.inputType"
                                 v-model="props.style[_.key]"
                                 :items="_.data"
                                 :label="_.label"
                                 :placeholder="JSON.stringify(_.default)"
                                 :required="_.required"
                                 @input="handleChange"
                                 item-text="label"></input-factory>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <template slot="header">
              <div>
                事件
              </div>
            </template>
            <v-card>
              <v-card-text>
                <v-layout v-for="(_,index) in selectedComponent.setting.config.Listeners"
                          :key="index">
                  <v-combobox v-model="props.listeners[_.key]"
                              :label="_.label"
                              @change="handleChange"
                              chips
                              multiple>
                    <v-chip slot="selection"
                            slot-scope="{item}"
                            @input="()=>{props.listeners[_.key].splice(props.listeners[_.key].indexOf(item),1)&&handleChange()}"
                            close>
                      {{item.name}}
                    </v-chip>
                    <listener-dialog slot="append"
                                     @addTask="(val)=>props.listeners[_.key].push(val)&&handleChange()"></listener-dialog>
                  </v-combobox>
                </v-layout>
              </v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { UPDATE_COMPONENT } from '@/store/mutation-types';
import { InputType, PropType, Style } from '@/constant';
import InputFactory from '@/components/InputFactory/index.vue';
import lodash from 'lodash';
import ListenerDialog from '@/components/ListenerDialog/index.vue';
import widgets from '@/widgets';
// import ComponentMixin from '@/mixins/component';

export default {
  data() {
    return {
      props: {},
    };
  },
  // mixins: [ComponentMixin],
  computed: {
    ...mapState('page', ['selectedComponent']),
  },
  components: {
    InputFactory,
    ListenerDialog,
  },
  watch: {
    selectedComponent(val) {
      if (!val) return;
      // 当时认为，已经初始化过默认值，不需要再合成
      this.props = lodash.cloneDeep(val.props);
    },
  },
  methods: {
    ...mapActions('page', ['deleteComponent']),
    handleDeleteComponent() {
      this.deleteComponent(this.selectedComponent);
    },
    handleChange() {
      this.$store.commit(`page/${UPDATE_COMPONENT}`, {
        id: this.selectedComponent.id,
        props: lodash.cloneDeep(this.props), // 如果不克隆处理，组件内的prop会被双向绑定污染
      });
    },
    handleAddTask(val) {
      this.props.listeners[_.key].push(val);
      this.handleChange();
    },
  },
  created() {
    this.InputType = InputType;
    this.PropType = PropType;
    this.Style = Style;
    this.Props = widgets; //! we
    // const id = this.getGuid();
    // const component = this.createComponentInfo(id, null, null);
  },
};
</script>
