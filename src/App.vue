<template>
  <v-app>
    <v-app-bar app color="black" dark class="hidden-xs-only" v-if="state">
      <img src="./assets/writer_logo.png" :aspect-ratio="1/1" height="100%">
      <v-toolbar-title class="logo_text ml-4">
        The Writer
      </v-toolbar-title>
      <v-spacer></v-spacer>
        <v-btn icon to="/memo" exact>
              <v-icon>view_list</v-icon>
            </v-btn>
            <v-btn icon to="/concept" exact>
              <v-icon>dashboard</v-icon>
            </v-btn>
            <v-btn icon to="/novel" exact>
              <v-icon>article</v-icon>
            </v-btn>
            <v-btn icon to="/mypage" exact>
              <v-icon>person</v-icon>
            </v-btn>
    </v-app-bar>
    <v-main class="pt-0 mt-sm-14">
      <router-view @changeState="changeState"></router-view>
      <v-snackbar v-model="snackbar.active" :timeout="1000" text color="bg_alert">{{ snackbar.message }}</v-snackbar>
    </v-main>
   
      <v-bottom-navigation v-if="state" v-model="value" dark fixed  class="hidden-sm-and-up">
            <v-btn icon value="memo" to="/memo" exact>
              <v-icon>view_list</v-icon>
            </v-btn>
            <v-btn icon value="concept" to="/concept" exact>
              <v-icon>dashboard</v-icon>
            </v-btn>
            <v-btn icon value="novel" to="/novel" exact>
              <v-icon>article</v-icon>
            </v-btn>
            <v-btn icon value="mypage" to="/mypage" exact>
              <v-icon>person</v-icon>
            </v-btn>
          </v-bottom-navigation>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: 'App',
 
  data(){
    return{
      value: '',
      state: false,
    }
  },
  computed: {
    ...mapState(["snackbar"])
    /*
    sbText(){
      return this.$store.state.sbText;
    },
    showSb(){
      return this.$store.state.showSb;
    }
    */
  },
  methods: {
    changeState(){
      this.state=!this.state;
    }
  }
};
</script>
<style lang="scss" scoped>
.v-application {
  background-color: #d8e6f3;
  font-family: $body-font-family, sans-serif !important;
  .title, .text-h3, .headline {
       font-family: $title-font, sans-serif !important;
    }

}

</style>
