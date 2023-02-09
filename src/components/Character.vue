<template>
    <div>
        <v-container fluid>
            <v-row class="title_area ma-2" dense>
                <v-spacer></v-spacer>
                
                <div class="d-flex justify-space-between align-end">
                    <!-- 정렬 -->
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn depressed color="transparent" v-bind="attrs" v-on="on">
                                <v-icon>subject</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item d-flex align-center @click="changeAlign('newer')">
                                <v-list-item-title :class="reverse ? '' : 'font-weight-bold'">최신순</v-list-item-title>
                            </v-list-item>
                            <v-list-item d-flex align-center @click="changeAlign('older')">
                                <v-list-item-title :class="reverse ? 'font-weight-bold' : ''">오래된순</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    
                    <!--폴더-->
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn depressed color="transparent" v-bind="attrs" v-on="on">
                                <v-icon>folder</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item d-flex align-center @click="changeCategory(0)">
                                <v-icon class="mr-2">circle</v-icon>
                            <v-list-item-title :class="selectedCategory==0 ? 'font-weight-bold' : ''">전체</v-list-item-title>
                            </v-list-item>
                            <v-list-item v-for="(item, index) in categoryList" :key="index" d-flex align-center @click="changeCategory(item.seq)">
                                <v-icon class="mr-2" :color="item.color">circle</v-icon>
                                <v-list-item-title :class="item.seq==selectedCategory ? 'font-weight-bold' : ''">{{ item.name }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-row>
            <!--리스트 영역-->
            <v-row dense>
                <v-col v-for="(item, index) in characterList" :key="index" cols="12" lg="3" md="4" sm="6" xs="12">
                    <div class="content_card pa-4 text-caption" @click="goToDetail(index)">
                        <p class="mb-1 content--text flex-grow-0 clamp">
                            {{item.content}}
                        </p>
                        <p class="mb-0">
                            <span :class="categoryList[item.category-1].color">{{categoryList[item.category-1].name}}</span>
                            <span>&nbsp&nbsp</span>
                            <span class="caption--text">{{item.reg_date}}</span>
                        </p>
                    </div>
                </v-col>
            </v-row>
            <v-btn fab fixed bottom right class="mb-14" color="button" @click="sheetState=!sheetState">
                <v-icon>add</v-icon>
            </v-btn>
            <characterSheet :sheetState="sheetState" :conceptSeq="conceptSeq" @stateChange="stateChange" @characterCreated="dialogClosed"/>
            <characterDialog ref="characterRef" @dialogClosed="dialogClosed" />
        </v-container>    
    </div>
</template>
<script>
import characterSheet from '../components/characterSheet.vue';
import characterDialog from '../components/characterDialog.vue';
export default {
    name: 'Character',
    props: {
            conceptSeq: {
                type: Number,
                default: 0
            },
        },
    components: { characterSheet, characterDialog},
    data() {
        return {
            characterList: [],
            categoryList: [{seq: 1, name: '주연', color: 'folder1--text'}, {seq: 2, name: '조연', color: 'folder5--text'}],
            sheetState: false,
            reverse: false,
            selectedCategory:0,
        }
      },
      created(){
        this.getCharacterList();
      },
      methods: {
        async getCharacterList(){
            if(this.selectedCategory==0){
                this.characterList = await this.$api("api/getCharacterListAll", "post", {param:[this.conceptSeq]});
            }else{
                this.characterList = await this.$api("api/getCharacterList", "post", {param:[this.conceptSeq, this.selectedCategory]});
            }
            if(this.reverse) {
                this.characterList.reverse();
            }
        },
        changeAlign(character){
            if(character=="newer"&&this.reverse){
                this.characterList.reverse();
                this.reverse=false;
            }
            if(character=="older"&&!this.reverse){
                this.characterList.reverse();
                this.reverse=true;
            }
        },
        changeCategory(categorySeq){
            this.selectedCategory = categorySeq;
            this.getCharacterList();
        },

        goToDetail(index){
            this.$refs.characterRef.dialog=true;
            this.$refs.characterRef.characterItem=this.characterList[index];
        },
        stateChange(state){
            this.sheetState = state;
        },
        dialogClosed(){
            this.getCharacterList();
        }
      }
}
</script>
