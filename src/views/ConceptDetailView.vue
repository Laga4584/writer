<template>
    <div>
    <v-app-bar
      absolute
      color="#d8e6f3"
      flat
      hide-on-scroll
      height="70px"
      class="flex-grow-0 hidden-sm-and-up"
      scroll-target="#scrolling-techniques-3"
      
    >
     

      <v-btn icon @click="close()">
            <v-icon>arrow_back</v-icon>
          </v-btn>
      <span class="title_area">{{ conceptItem.title }}</span>

      <v-spacer></v-spacer>

      <v-btn icon @click="callConceptSheet()">
        <v-icon>settings</v-icon>
      </v-btn>

      <v-btn icon @click="alertDelete()">
        <v-icon>delete</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs background-color="#6A76AB" color="white" v-model="tab">
            <v-tab
        v-for="item in menu"
        :key="item"
      >
        {{ item }}
      </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    
    <v-row dense class="hidden-xs-only">
      <v-col cols="2" class="tab_height">
    <v-tabs background-color="#6A76AB" color="white" v-model="tab" vertical class="">
            <v-tab
        v-for="item in menu"
        :key="item"
      >
        {{ item }}
      </v-tab>
        </v-tabs>
      </v-col>
      <v-col cols="10">
        <v-row class="ma-2 d-flex justify-space-between align-center" dense>
      <v-btn icon @click="close()">
            <v-icon>arrow_back</v-icon>
          </v-btn>
      <span class="title_area ml-2">{{ conceptItem.title }}</span>

      <v-spacer></v-spacer>

      <v-btn icon @click="callConceptSheet()">
        <v-icon>settings</v-icon>
      </v-btn>

      <v-btn icon @click="alertDelete()">
        <v-icon>delete</v-icon>
      </v-btn>
            </v-row>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="800"
      color="transparent"
    >
     
        <v-tabs-items v-model="tab" class="top_margin">
      <v-tab-item>
       <Storyline :conceptSeq="conceptSeq" :structure="conceptItem.structure" />
      </v-tab-item>
      <v-tab-item>
       <Universe :conceptSeq="conceptSeq" />
      </v-tab-item>
      <v-tab-item>
       <Character :conceptSeq="conceptSeq" />
      </v-tab-item>
      <v-tab-item>
       <Plot :conceptSeq="conceptSeq" />
      </v-tab-item>
    </v-tabs-items>
    </v-sheet>
  </v-col>
  </v-row>
  <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="800"
      color="transparent"
    >
     
        <v-tabs-items v-model="tab" class="top_margin hidden-sm-and-up">
      <v-tab-item>
       <Storyline :conceptSeq="conceptSeq" :structure="conceptItem.structure" />
      </v-tab-item>
      <v-tab-item>
       <Universe :conceptSeq="conceptSeq" />
      </v-tab-item>
      <v-tab-item>
       <Character :conceptSeq="conceptSeq" />
      </v-tab-item>
      <v-tab-item>
       <Plot :conceptSeq="conceptSeq" />
      </v-tab-item>
    </v-tabs-items>
    </v-sheet>
    <conceptSheet ref="concept_sheet" :sheetState="sheetState" @stateChange="stateChange" @conceptEdited="conceptEdited"/>
    <deleteDialog @deleteItem="deleteConcept" ref="dialogRef"/>
    </div>
</template>
<script>
import Storyline from '../components/Storyline'
import Universe from '../components/Universe'
import Character from '../components/Character'
import Plot from '../components/Plot'
import deleteDialog from '../components/deleteDialog.vue';
import conceptSheet from '../components/conceptSheet.vue';

export default {
    name: 'ConceptDetailView',
    components: { Storyline, Universe, Character, Plot, deleteDialog, conceptSheet},
    data () {
    return {
        tab: null,
        menu: [
          '줄거리', '세계관', '캐릭터', '플롯',
        ],
        conceptSeq: 0,
        conceptItem: {},
        sheetState: false,
        snackbar: false,
        sbText: '',
        }
    },
    setup () {},
    created () {
        this.conceptSeq = Number(this.$route.query.concept_seq);
        this.getConceptItem();
    },
    mounted () {},
    unmounted () {},
    methods: {
        async getConceptItem(){
            let conceptItem = await this.$api("api/getConceptItem", "post", {param:[this.conceptSeq]});
            this.conceptItem = conceptItem[0];
        },

        stateChange(state){
            this.sheetState = state;
        },
        callConceptSheet(){
            this.$refs.concept_sheet.conceptSeq=this.conceptItem.seq;
            this.$refs.concept_sheet.titleInput=this.conceptItem.title;
            this.$refs.concept_sheet.selectedGenre=this.conceptItem.type;
            this.$refs.concept_sheet.selectedStructure=this.conceptItem.structure;
            this.sheetState=true;
        },
        conceptEdited(){
            this.getConceptItem();
        },


        alertDelete(){
            this.$refs.dialogRef.message="구상을 삭제하시겠습니까?";
            this.$refs.dialogRef.dialog=true;
        },

        async deleteConcept(){
            await this.$api("api/deleteConcept", "post", {param:[this.conceptSeq]});
            this.$callSnackbar('구상이 삭제되었습니다');
            this.goBack();
        },

        close(){
          this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
    .tab_height {
      height: calc(100vh - 64px);
      background-color: rgb(106, 118, 171);
    }
    .top_margin {
      @media screen and (max-width: 576px){
        margin-top: 118px;
        margin-bottom: 56px;
      }
    }
    /*
    .v-window__container{
        background: blue;
    }
    .v-window-item{
        background: transparent;
    }
    */
    .v-window-item > div{
        background: #d8e6f3 ;
    }
</style>
