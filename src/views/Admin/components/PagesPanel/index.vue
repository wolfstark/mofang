<template>
  <section>
    <v-container fluid
                 class="pa-0"
                 justify-center
                 grid-list-xl>
      <!-- Loading -->
      <div v-if="loading"
           class="loading">Loading...</div>

      <!-- Error -->
      <div v-else-if="error"
           class="error">An error occured</div>
      <!-- Result -->
      <v-layout class="result"
                justify-start
                v-else-if="pages.pages.length"
                row
                wrap>
        <v-flex v-for="page of pages.pages"
                xs2
                :key="page._id">
          <v-hover>
            <v-card slot-scope="{ hover }"
                    :class="`elevation-${hover ? 12 : 2}`">
              <v-img :src="page.screenshot"
                     :aspect-ratio="375/667">
                <v-fade-transition>
                  <v-menu v-show="hover"
                          bottom
                          class="page-more"
                          left>
                    <v-btn slot="activator"
                           class="more-btn"
                           dark
                           icon>
                      <v-icon>more_vert</v-icon>
                    </v-btn>
                    <v-list>
                      <ApolloMutation v-if="page.status===PageStatus.OFFLINE"
                                      @done="refresh"
                                      :tag="null"
                                      :mutation="require('@/graphql/EditPage.gql')"
                                      :variables="{input:{
                                  _id:page._id,
                                  status:PageStatus.ONLINE,
                                }}">
                        <v-list-tile slot-scope="{ mutate,loading }"
                                     :disabled="loading"
                                     @click="pageOnline(mutate)">
                          <v-list-tile-title>上线</v-list-tile-title>
                        </v-list-tile>
                      </ApolloMutation>
                      <ApolloMutation v-else
                                      @done="refresh"
                                      :tag="null"
                                      :mutation="require('@/graphql/EditPage.gql')"
                                      :variables="{input:{
                                  _id:page._id,
                                  status:PageStatus.OFFLINE,
                                }}">
                        <v-list-tile slot-scope="{ mutate,loading }"
                                     :disabled="loading"
                                     @click="mutate">
                          <v-list-tile-title>下线</v-list-tile-title>
                        </v-list-tile>
                      </ApolloMutation>
                      <ApolloMutation :tag="null"
                                      :mutation="require('@/graphql/DelPage.gql')"
                                      @done="delPageHandle"
                                      :variables="{input:{
                                  _id:page._id,
                                }}">
                        <v-list-tile slot-scope="{ mutate ,loading }"
                                     :disabled="loading"
                                     @click="mutate">
                          <v-list-tile-title>
                            删除
                          </v-list-tile-title>
                        </v-list-tile>
                      </ApolloMutation>
                      <v-list-tile :to="{name:'Home',params:{_id:page._id}}">
                        <v-list-tile-title>
                          编辑
                        </v-list-tile-title>
                      </v-list-tile>
                      <v-dialog v-if="page.status===PageStatus.ONLINE"
                                v-model="addressDialog"
                                max-width="500px">
                        <v-list-tile slot="activator">
                          <v-list-tile-title>
                            地址
                          </v-list-tile-title>
                        </v-list-tile>
                        <v-card>
                          <v-card-title class="headline">页面地址</v-card-title>
                          <v-card-text>
                            <v-text-field label="URL"
                                          :value="`${VUE_APP_UPYUN_URL}/mofang/${page._id}/index.html`"
                                          readonly></v-text-field>
                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>

                            <v-btn color="primary"
                                   flat="flat"
                                   @click="addressDialog = false">
                              关闭
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-dialog>
                    </v-list>
                  </v-menu>
                </v-fade-transition>
                <v-layout fill-height
                          ma-0
                          column>
                  <v-spacer></v-spacer>
                  <v-card class="page-mask"
                          tile>
                    <v-card-title primary-title>
                      <div class="headline">{{page.name}}</div>
                    </v-card-title>
                  </v-card>
                </v-layout>
              </v-img>
            </v-card>
          </v-hover>
        </v-flex>
      </v-layout>
      <!-- No result -->
      <div v-else
           class="no-result apollo">No result :(</div>
    </v-container>
    <div v-if="pages.pages.length"
         class="text-xs-center mt-4">
      <v-pagination v-model="currentPage"
                    :length="pages.length"></v-pagination>
    </div>
  </section>
</template>

<script>
import PAGES from '@/graphql/Pages.gql';
import { PageStatus } from '@/constant';
import Toast from '@/plugins/Toast';
/* @vue/component */
export default {
  data() {
    return {
      loading: true,
      error: null,
      pageInput: {
        _id: null,
      },
      addressDialog: false,
      pages: {
        pages: [],
        length: 0,
      },
      // length: null,
      currentPage: 1,
    };
  },
  apollo: {
    pages: {
      query: PAGES,
      variables() {
        return {
          input: {
            page: this.currentPage,
          },
        };
      },
      result({ data, loading, networkStatus }) {
        if (data) this.currentPage = data.pages.currentPage;

        this.loading = loading;
      },
      // watchLoading(isLoading) {
      //   this.loading = isLoading;
      // },
      error(error) {
        this.error = error;
      },
    },
  },
  methods: {
    pageOnline(mutate) {
      Toast.loading();
      mutate();
    },
    delPageHandle() {
      this.refresh();
    },
    refresh() {
      this.$apollo.queries.pages.refresh();
      Toast.clear();
    },
  },
  created() {
    this.PageStatus = PageStatus;
    this.VUE_APP_UPYUN_URL = process.env.VUE_APP_UPYUN_URL;
  },
  mounted() {
    // const loading = Toast.loading();
    // setTimeout(() => { loading.clear(); }, 3000);
  },
};
</script>

<style lang="stylus" scoped>
.page-more {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 50;

  .more-btn {
    background: rgba(0, 0, 0, 0.5);
  }
}

.page-mask {
  background: rgba(0, 0, 0, 0.5);
}
</style>
