<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" content-class="bg_normal">
        <v-container fluid>
            <v-row class="title_area ma-2" dense>
                <v-btn icon @click="close()">
            <v-icon>arrow_back</v-icon>
          </v-btn>
                <v-spacer></v-spacer>
                
                <div class="d-flex justify-space-between align-end">
                    <!--폴더-->
                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn depressed color="transparent" v-bind="attrs" v-on="on">
                                <v-icon>drive_file_move</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item v-for="(item, index) in categoryList" :key="index" @click="moveCategory(index)" d-flex align-center>
                            <v-icon class="mr-2" :color="item.color">circle</v-icon>
                            <v-list-item-title>{{ item.name }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="sheetState = !sheetState">
                                <v-icon class="mr-2">add</v-icon>
                                <v-list-item-title>새 폴더</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                    <v-btn depressed color="transparent" @click="alertDelete()" v-if="notNew">
                        <v-icon>delete</v-icon>
                    </v-btn>
                    <v-btn depressed color="transparent" @click="cancelText()" v-show=showButton>
                        <v-icon>clear</v-icon>
                    </v-btn>
                    <v-btn depressed color="transparent" @click="saveText()" v-show=showButton>
                        <v-icon>done</v-icon>
                    </v-btn>
                </div>
            </v-row>
            <v-row dense>
                <v-col cols="12">
                    <div class="content_card pa-4 text-caption" >
                        <p class="mb-0">
                            <span :class="settingItem.category_color">{{settingItem.category_name}}</span>
                            <span>&nbsp&nbsp</span>
                            <span class="color_main--text">{{settingItem.reg_date}}</span>
                        </p>
                        <v-textarea solo flat class="ma-0 pa-0" hide-details auto-grow v-model="settingText" @focus="showButton = true">
                        </v-textarea>
                    </div>

                </v-col>
            </v-row>
            <categorySheet :sheetState="sheetState" @stateChange="stateChange"  @categoryCreated="categoryCreated"/>
            <v-snackbar v-model="snackbar" :timeout="1000" text color="bg_alert">{{ sbText }}</v-snackbar>
            <deleteDialog @deleteItem="deleteSetting" ref="dialogRef"/>
        </v-container>
    </v-dialog>
</template>
<script>
import categorySheet from '../components/categorySheet.vue';
import deleteDialog from '../components/deleteDialog.vue';
export default {
    name: 'settingDialog',
    components: { categorySheet, deleteDialog },
    props: {
            conceptSeq: {
                type: Number,
                default: 0
            },
        },
    data () {
    return {
        dialog:false,
        settingSeq: 0,
            settingItem: {
                category: 0,
            },
            settingText: '',
            showButton: false,
            categoryList: [],
            sheetState: false,
            snackbar: false,
            sbText: '',
            notNew: true,
        }
    },
    watch : {
        settingSeq: function(newVal, oldVal){
            if(newVal == 0){
                this.notNew = false;
                this.settingItem.category_name='';
                this.settingItem.content='';
                this.settingItem.reg_date='';
                this.settingText='';

            }else{
                this.notNew = true;
            this.getSettingItem();
            
        }
        },
        sheet: function(newVal, oldVal){
            //console.log("changed");
        this.$emit('stateChange', this.sheet);
    }
    },
    setup () {},
    created () {
        /*
        if(this.settingSeq==0){
            this.notNew = false;
        }else{
            this.getSettingItem();
            
        }
        */
        this.getCategoryList();
        
        
    },
    mounted () {},
    unmounted () {},

    methods: {
        async getSettingItem(){
            let settingItem = await this.$api("api/getSettingItem", "post", {param:[this.settingSeq]});
            this.settingItem = settingItem[0];
            this.settingItem.category_color += "--text";
            this.settingText = this.settingItem.content;
        },

        async getCategoryList(){
            this.categoryList = await this.$api("api/getCategoryList", "post", {param:1});
        },

        alertDelete(){
            this.$refs.dialogRef.message="세계관 설정을 삭제하시겠습니까?";
            this.$refs.dialogRef.dialog=true;
        },

        async deleteSetting(){
            await this.$api("api/deleteSetting", "post", {param:[this.settingSeq]});
            this.$callSnackbar('세계관 설정이 삭제되었습니다');
            this.close();
        },

        async moveCategory(index){
            if(this.settingSeq==0){
                this.settingItem.category=this.categoryList[index].seq;

            }else{
                await this.$api("api/moveCategory", "post", {param:[this.categoryList[index].seq, this.settingSeq]});
            }
            this.settingItem.category=this.categoryList[index].seq;
            this.settingItem.category_color=this.categoryList[index].color+"--text";
            this.settingItem.category_name=this.categoryList[index].name;
        },

        // category sheet functions
        categoryCreated(categoryItem){
            this.categoryList.push(categoryItem);
        },

        stateChange(state){
            this.sheetState = state;
        },

        cancelText(){
            this.settingText=this.settingItem.content;
            this.showButton=false;
        },

        async saveText(){
            console.log(this.settingSeq);
            if(this.settingSeq==0){
                console.log(this.settingItem);
    
                if(this.settingItem.category==0){
                    this.$callSnackbar('카테고리를 선택해주세요');
                }else{
                    var settingItem = {concept_seq:this.conceptSeq, content:this.settingText, category:this.settingItem.category, menu:'universe'};
                    let result = await this.$api("api/createSetting", "post", {param:[settingItem]});
                    this.settingSeq=result.insertId;
                    this.$callSnackbar('세계관 설정이 저장되었습니다');
                    this.showButton=false;
                }
            }else{
                await this.$api("api/saveSetting", "post", {param:[this.settingText, this.settingSeq]});
                this.settingItem.content=this.settingText;
                this.$callSnackbar('세계관 설정이 저장되었습니다');
                this.showButton=false;
            }
            //this.settingItem.content=this.settingText;
            //this.showButton=false;
            //this.$callSnackbar('세계관 설정이 저장되었습니다');
        },                 
        
        close(){
            this.dialog=false;
            this.$emit('dialogClosed');
        },
    }
}
</script>
