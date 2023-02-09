<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="transparent" flat>
          <v-btn icon @click="close()">
            <v-icon>clear</v-icon>
          </v-btn>
          <v-toolbar-title>폴더편집</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="save()">
                <v-icon>done</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-row no-gutters class="pa-2 bg_sheet">
                <v-col cols="4 pl-2">폴더명</v-col>
                <v-col cols="2" class="text-center">기본</v-col>
                <v-col cols="2" class="text-center">시작</v-col>
                <v-col cols="2" class="text-center">편집</v-col>
                <v-col cols="2" class="text-center">삭제</v-col>
        </v-row>
        <v-list>
            <v-list-item class="pa-0" v-for="(item, index) in folderList" :key="index">
                <v-row no-gutters class="pa-2">
                    <v-col cols="4 pl-2">
                        <v-icon class="mr-2" :color="item.color">circle</v-icon>
                        <span>{{ item.name }}</span>
                    </v-col>
                    <v-col cols="2" class="text-center" @click="editBasic(item.seq)"><v-icon :color="item.seq==basicFolder ? 'button_text' : 'caption'">check</v-icon></v-col>
                    <v-col cols="2" class="text-center" @click="editStart(item.seq)"><v-icon :color="item.seq==startFolder ? 'button_text' : 'caption'">check</v-icon></v-col>
                    <v-col cols="2" class="text-center" @click="callFolderSheet(item)"><v-icon>edit</v-icon></v-col>
                    <v-col cols="2" class="text-center" @click="alertDelete(item.seq)"><v-icon>delete</v-icon></v-col>
                </v-row>
            </v-list-item>
        </v-list>
      </v-card>
      <folderSheet ref="folder_sheet" :sheetState="sheetState" @stateChange="stateChange" @folderEdited="folderEdited"/>
        <v-snackbar v-model="snackbar" :timeout="1000" text color="bg_alert">{{ sbText }}</v-snackbar>
        <deleteDialog @deleteItem="deleteFolder" ref="dialogRef"/>
    </v-dialog>
</template>
<script>
import folderSheet from '../components/folderSheet.vue';
import deleteDialog from './deleteDialog.vue';

export default {
    name: 'folderDialog',
    components: { folderSheet, deleteDialog },
    data () {
    return {
        dialog:false,
        folderList:[],
        basicFolder:0,
        startFolder:0,
        basicFolderPrev:0,
        startFolderPrev:0,
        sheetState: false,
        snackbar: false,
        sbText: '',
        }
    },
    setup () {},
    created () {
        this.getFolderList();
        
    },
    mounted () {},
    unmounted () {},
    methods: {
        async getFolderList(){
            this.folderList = await this.$api("api/folderList", "post", {param:1});
            this.getFolderSetting();
        },
        getFolderSetting(){
            this.basicFolder=this.$store.getters.getBasicFolder;
            this.startFolder=this.$store.getters.getStartFolder;
            this.basicFolderPrev=this.basicFolder;
            this.startFolderPrev=this.startFolder;
            //this.basicFolder = this.folderList.findIndex(e => e.seq === this.$store.getters.getBasicFolder);
            //this.startFolder = this.folderList.findIndex(e => e.seq === this.$store.getters.getStartFolder);
        },
        editBasic(seq){ 
            this.basicFolderPrev=this.basicFolder;
            //console.log(this.basicFolderPrev);
            this.basicFolder=seq;
            //console.log(this.basicFolder);
        },
        editStart(seq){
            this.startFolderPrev=this.startFolder;
            this.startFolder=seq;
        },
        // folder sheet functions
        /*
        folderCreated(folderItem){
            this.folderList.push(folderItem);
        },*/
        folderEdited(){
            this.getFolderList();
        },

        stateChange(state){
            this.sheetState = state;
        },
        callFolderSheet(item){
            this.$refs.folder_sheet.folderSeq=item.seq;
            this.$refs.folder_sheet.titleInput=item.name;
            let colorIndex = this.$refs.folder_sheet.colors.indexOf(item.color);
            this.$refs.folder_sheet.colorSelection=colorIndex;
            this.sheetState=true;
        },

        alertDelete(folderSeq){
            this.$refs.dialogRef.itemSeq=folderSeq;
            this.$refs.dialogRef.message="폴더를 삭제하시겠습니까?";
            this.$refs.dialogRef.dialog=true;
        },
        async deleteFolder(folderSeq){
            await this.$api("api/deleteFolder", "post", {param:[folderSeq]});
            this.$callSnackbar('폴더가 삭제되었습니다');
            this.getFolderList();
            //console.log(this.folderList);
        },

        close(){
            this.basicFolder=this.basicFolderPrev;
            this.startFolder=this.startFolderPrev;
            //console.log(this.basicFolder);
            this.dialog=false;
            this.$emit('dialogClosed');
        },
        async save(){
            //let basicSeq = this.folderList[this.basicFolder].seq;
            //let startSeq = this.folderList[this.startFolder].seq;
            await this.$api("api/editFolderSetting", "post", {param:[this.basicFolder, this.startFolder, 1]});
            this.dialog=false;
            this.$emit('dialogSaved');
        }
    }
}
</script>