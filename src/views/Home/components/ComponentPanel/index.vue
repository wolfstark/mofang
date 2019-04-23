<template>
  <section>
    <v-system-bar status
                  lights-out>组件列表</v-system-bar>
    <v-expansion-panel :value="0">
      <v-expansion-panel-content :key="key"
                                 v-for="(category,key) in Category">

        <template slot="header">
          <div>{{category}}</div>
        </template>
        <v-card>
          <v-card-text>
            <v-hover :key="index"
                     v-for="(widget, index) of widgetsFilter(category)">
              <v-list-tile slot-scope="{ hover }"
                           :class="`elevation-${hover ? 12 : 2}`"
                           class="dropComponent"
                           @dragstart.native.passive="selectWidget(widget)"
                           draggable>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{widget.setting.label}}
                  </v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon
                         @click="addToView(widget)"
                         ripple>
                    <v-icon color="grey lighten-1">
                      add_circles
                    </v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </v-hover>
          </v-card-text>
        </v-card>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </section>
</template>

<script>
import { Category } from '@/constant';
import componentMixins from '@/mixins/component';
import widgets from '@/widgets';

export default {
  mixins: [componentMixins],

  data() {
    return {};
  },
  methods: {
    widgetsFilter(category) {
      return widgets.filter(widget => widget.setting.category === category);
    },
    preventDrag() {
      return false;
    },
    addToView(widget) {
      this.selectWidget(widget);
      this.handleDropInPage();
    },
  },
  created() {
    this.Category = Category;
  },
};
</script>

<style scoped>
.dropComponent {
  -webkit-user-drag: element;
  cursor: move;
  transition: all 0.2s;
}
</style>
