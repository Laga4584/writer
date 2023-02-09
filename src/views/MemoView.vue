<template>
    <div>
        <v-container fluid>
            <v-row class="title_area ma-2" dense>
                <span class="">아이디어 메모</span>
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
                            <v-list-item d-flex align-center @click="changeFolder(0)">
                                <v-icon class="mr-2">circle</v-icon>
                            <v-list-item-title :class="selectedFolder==0 ? 'font-weight-bold' : ''">전체 메모</v-list-item-title>
                            </v-list-item>
                            <v-list-item v-for="(item, index) in folderList" :key="index" d-flex align-center @click="changeFolder(item.seq)">
                                <v-icon class="mr-2" :color="item.color">circle</v-icon>
                                <v-list-item-title :class="item.seq==selectedFolder ? 'font-weight-bold' : ''">{{ item.name }}</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="sheetState = !sheetState">
                                <v-icon class="mr-2">add</v-icon>
                                <v-list-item-title>새 폴더</v-list-item-title>
                            </v-list-item>
                            <v-list-item @click="openFolderDialog()">
                                <v-icon class="mr-2">edit</v-icon>
                                <v-list-item-title>폴더 편집</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </div>
            </v-row>
            <!--리스트 영역-->
            <v-row dense>
                <v-col v-for="item in memoList" :key="item.id" cols="12" lg="3" md="4" sm="6" xs="12">
                    <div class="content_card pa-4 text-caption" @click="goToDetail(item.seq)">
                        <p class="mb-1 content--text flex-grow-0 clamp">
                            {{item.content}}
                        </p>
                        <p class="mb-0">
                            <span :class="item.folder_color">{{item.folder_name}}</span>
                            <span>&nbsp&nbsp</span>
                            <span class="caption--text">{{item.reg_date}}</span>
                        </p>
                    </div>
                </v-col>
            </v-row>
            <v-btn fab fixed bottom right class="mb-14" color="button" @click="goToDetail(0)">
                <v-icon>add</v-icon>
            </v-btn>
            <folderSheet :sheetState="sheetState" @stateChange="stateChange" @folderCreated="folderCreated"/>
            <folderDialog ref="dialogRef" @dialogClosed="dialogClosed" @dialogSaved="dialogSaved"/>
        </v-container>
    </div>
 
</template>
<script>
import folderSheet from '../components/folderSheet.vue';
import folderDialog from '../components/folderDialog.vue';

export default {
    components: {folderSheet, folderDialog},
    data() {
        return {
            memoList: [
            ],
            folderList: [],
            sheetState: false,
            reverse: false,
            selectedFolder:0,
        }
      },
      created(){
        this.selectedFolder = this.$store.state.startFolder;
        this.getMemoList();
        this.getFolderList();
      },
      methods: {
        async getMemoList(){
            if(this.selectedFolder==0){
                this.memoList = await this.$api("api/memoListAll", "post", {param:[1, this.selectedFolder]});
            }else{
                this.memoList = await this.$api("api/memoList", "post", {param:[1, this.selectedFolder]});
            }
            for(var i = 0; i < this.memoList.length; i++){
                this.memoList[i].folder_color += "--text";
            }
            if(this.reverse) {
                this.memoList.reverse();
            }
        },
        async getFolderList(){
            this.folderList = await this.$api("api/folderList", "post", {param:1});
        },
        changeAlign(setting){
            if(setting=="newer"&&this.reverse){
                console.log("newest");
                this.memoList.reverse();
                this.reverse=false;
            }
            if(setting=="older"&&!this.reverse){
                console.log("oldest");
                this.memoList.reverse();
                this.reverse=true;
            }
            /*
            for(var item of this.memoList){
                let ref = 'ref'+item.seq
                this.$refs.ref1.textContent(item.content);
            }
            */
        },
        changeFolder(folderSeq){
            this.selectedFolder = folderSeq;
            this.getMemoList();
        },

        goToDetail(memoSeq){
            this.$router.push({path:'/memo_detail', query:{memo_seq:memoSeq}})
        },
        folderCreated(){
            this.getFolderList();
        },

        stateChange(state){
            this.sheetState = state;
        },
        openFolderDialog(){
            this.$refs.dialogRef.dialog=true;
        },
        dialogClosed(){
            this.getFolderList;
        },
        dialogSaved(){
            this.getFolderList;
        }
      }
  }
</script>
