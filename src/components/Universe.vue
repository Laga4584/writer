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
                            <v-list-item-title :class="selectedCategory==0 ? 'font-weight-bold' : ''">전체 카테고리</v-list-item-title>
                            </v-list-item>
                            <v-list-item v-for="(item, index) in categoryList" :key="index" d-flex align-center @click="changeCategory(item.seq)">
                                <v-icon class="mr-2" :color="item.color">circle</v-icon>
                                <v-list-item-title :class="item.seq==selectedCategory ? 'font-weight-bold' : ''">{{ item.name }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="sheetState = !sheetState">
                                <v-icon class="mr-2">add</v-icon>
                                <v-list-item-title>새 카테고리</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="openCategoryDialog()">
                                <v-icon class="mr-2">edit</v-icon>
                                <v-list-item-title>카테고리 편집</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-row>
            <!--리스트 영역-->
            <v-row dense>
                <v-col v-for="item in settingList" :key="item.id" cols="12" lg="3" md="4" sm="6" xs="12">
                    <div class="content_card pa-4 text-caption" @click="goToDetail(item.seq)">
                        <p class="mb-1 content--text flex-grow-0 clamp">
                            {{item.content}}
                        </p>
                        <p class="mb-0">
                            <span :class="item.category_color">{{item.category_name}}</span>
                            <span>&nbsp&nbsp</span>
                            <span class="caption--text">{{item.reg_date}}</span>
                        </p>
                    </div>
                </v-col>
            </v-row>
            <v-btn fab fixed bottom right class="mb-14" color="button" @click="goToDetail(0)">
                <v-icon>add</v-icon>
            </v-btn>
            <categorySheet :sheetState="sheetState" @stateChange="stateChange" @categoryCreated="categoryCreated"/>
            <categoryDialog ref="dialogRef" @dialogClosed="dialogClosed" @dialogSaved="dialogSaved"/>
            <settingDialog ref="settingRef" :conceptSeq="conceptSeq" @dialogClosed="getSettingList" @dialogSaved="dialogSaved"/>
        </v-container>    
    </div>
</template>
<script>
import categorySheet from '../components/categorySheet.vue';
import categoryDialog from '../components/categoryDialog.vue';
import settingDialog from '../components/settingDialog.vue';
export default {
    name: 'Universe',
    props: {
            conceptSeq: {
                type: Number,
                default: 0
            },
        },
    components: { categorySheet, categoryDialog, settingDialog},
    data() {
        return {
            settingList: [],
            categoryList: [],
            sheetState: false,
            reverse: false,
            selectedCategory:0,
        }
      },
      created(){
        this.getSettingList();
        this.getCategoryList();
      },
      methods: {
        async getSettingList(){
            if(this.selectedCategory==0){
                this.settingList = await this.$api("api/getSettingListAll", "post", {param:[this.conceptSeq]});
            }else{
                this.settingList = await this.$api("api/getSettingList", "post", {param:[this.conceptSeq, this.selectedCategory]});
            }
            for(var i = 0; i < this.settingList.length; i++){
                this.settingList[i].category_color += "--text";
            }
            if(this.reverse) {
                this.settingList.reverse();
            }
        },
        async getCategoryList(){
            this.categoryList = await this.$api("api/getCategoryList", "post", {param:this.$store.state.userSeq});
        },
        changeAlign(setting){
            if(setting=="newer"&&this.reverse){
                this.settingList.reverse();
                this.reverse=false;
            }
            if(setting=="older"&&!this.reverse){
                this.settingList.reverse();
                this.reverse=true;
            }
        },
        changeCategory(categorySeq){
            this.selectedCategory = categorySeq;
            this.getSettingList();
        },

        goToDetail(settingSeq){
            this.$refs.settingRef.dialog=true;
            this.$refs.settingRef.settingSeq=settingSeq;
        },
        categoryCreated(){
            this.getCategoryList();
        },

        stateChange(state){
            this.sheetState = state;
        },
        openCategoryDialog(){
            this.$refs.dialogRef.dialog=true;
        },
        dialogClosed(){
            this.getCategoryList();
        },
        dialogSaved(){
            this.getCategoryList();
        }
      }
}
</script>
