<template>
    <div>
        <v-container fluid>
            <v-row class="title_area ma-2" dense>
                <v-btn depressed color="transparent" @click="goBack()"><v-icon>arrow_back</v-icon></v-btn>
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
                            <v-list-item v-for="(item, index) in folderList" :key="index" @click="moveFolder(index)" d-flex align-center>
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
                            <span :class="memoItem.folder_color">{{memoItem.folder_name}}</span>
                            <span>&nbsp&nbsp</span>
                            <span class="color_main--text">{{memoItem.reg_date}}</span>
                        </p>
                        <v-textarea solo flat class="ma-0 pa-0" hide-details auto-grow v-model="memoText" @focus="showButton = true">
                        </v-textarea>
                    </div>

                </v-col>
            </v-row>
            <folderSheet :sheetState="sheetState" @stateChange="stateChange"  @folderCreated="folderCreated"/>
            <v-snackbar v-model="snackbar" :timeout="1000" text color="bg_alert">{{ sbText }}</v-snackbar>
            <deleteDialog @deleteItem="deleteMemo" ref="dialogRef"/>
        </v-container>
    </div>
 
</template>
<script>
import folderSheet from '../components/folderSheet.vue';
import deleteDialog from '../components/deleteDialog.vue';

 export default {
    components: {folderSheet, deleteDialog},
    data() {
        return {
            memoSeq: 0,
            memoItem: {
                folder: -1,
            },
            memoText: '',
            showButton: false,
            folderList: [],
            sheetState: false,
            snackbar: false,
            sbText: '',
            notNew: true,
        }
      },
      
      computed:{
        
      },
      created(){
        this.memoSeq = this.$route.query.memo_seq;
        if(this.memoSeq==0){
            this.notNew = false;
        }else{
            this.getMemoItem();
            
        }
        this.getFolderList();
        
      },
      methods: {
        async getMemoItem(){
            let memoItem = await this.$api("api/memoItem", "post", {param:[this.memoSeq]});
            this.memoItem = memoItem[0];
            this.memoItem.folder_color += "--text";
            this.memoText = this.memoItem.content;
            //this.getFolderList();
        },

        async getFolderList(){
            this.folderList = await this.$api("api/folderList", "post", {param:1});
        },

        alertDelete(){
            this.$refs.dialogRef.message="메모를 삭제하시겠습니까?";
            this.$refs.dialogRef.dialog=true;
        },

        async deleteMemo(){
            await this.$api("api/deleteMemo", "post", {param:[this.memoSeq]});
            this.$callSnackbar('메모가 삭제되었습니다');
            this.goBack();
        },

        async moveFolder(index){
            if(this.memoSeq==0){
                

            }else{
                await this.$api("api/moveFolder", "post", {param:[this.folderList[index].seq, this.memoSeq]});
            }
            this.memoItem.folder=this.folderList[index].seq;
            this.memoItem.folder_color=this.folderList[index].color+"--text";
            this.memoItem.folder_name=this.folderList[index].name;
        },

        // folder sheet functions
        folderCreated(folderItem){
            this.folderList.push(folderItem);
        },

        stateChange(state){
            this.sheetState = state;
        },

        cancelText(){
            this.memoText=this.memoItem.content;
            this.showButton=false;
        },

        async saveText(){
            if(this.memoSeq==0){
    
                if(this.memoItem.folder==-1){
                    this.memoItem.folder = this.$store.state.basicFolder;
                }
                var memoItem = {user_seq:this.$store.state.userSeq, content:this.memoText, folder:this.memoItem.folder};
                let result = await this.$api("api/createMemo", "post", {param:[memoItem]});
                memoItem.seq=result.insertId;
            }else{
                await this.$api("api/saveMemo", "post", {param:[this.memoText, this.memoSeq]});
            }
            this.memoItem.content=this.memoText;
            this.showButton=false;
            this.$callSnackbar('메모가 저장되었습니다');
        },                 
        
        goBack(){
            this.$router.go(-1);
        }
      }
  }
</script>
<style scoped>
    .v-text-field >>> .v-input__slot{
        margin:0 !important;
        padding:0 !important;
    }
/*
    .v-text-field >>> textarea{
        margin:0 !important;
        padding:0 !important;
    }
    */
   
</style>
