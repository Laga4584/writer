<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar color="transparent" flat>
          <v-btn icon @click="close()">
            <v-icon>clear</v-icon>
          </v-btn>
          <v-toolbar-title>카테고리 편집</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn icon @click="save()">
                <v-icon>done</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-row no-gutters class="pa-2 bg_sheet">
                <v-col cols="4 pl-2">카테고리명</v-col>
                <v-col cols="2" class="text-center">편집</v-col>
                <v-col cols="2" class="text-center">삭제</v-col>
        </v-row>
        <v-list>
            <v-list-item class="pa-0" v-for="(item, index) in categoryList" :key="index">
                <v-row no-gutters class="pa-2">
                    <v-col cols="4 pl-2">
                        <v-icon class="mr-2" :color="item.color">circle</v-icon>
                        <span>{{ item.name }}</span>
                    </v-col>
                    <v-col cols="2" class="text-center" @click="callCategorySheet(item)"><v-icon>edit</v-icon></v-col>
                    <v-col cols="2" class="text-center" @click="alertDelete(item.seq)"><v-icon>delete</v-icon></v-col>
                </v-row>
            </v-list-item>
        </v-list>
      </v-card>
      <categorySheet ref="category_sheet" :sheetState="sheetState" @stateChange="stateChange" @categoryEdited="categoryEdited"/>
        <v-snackbar v-model="snackbar" :timeout="1000" text color="bg_alert">{{ sbText }}</v-snackbar>
        <deleteDialog @deleteItem="deleteCategory" ref="dialogRef"/>
    </v-dialog>
</template>
<script>
import categorySheet from '../components/categorySheet.vue';
import deleteDialog from './deleteDialog.vue';

export default {
    name: 'categoryDialog',
    components: { categorySheet, deleteDialog },
    data () {
    return {
        dialog:false,
        categoryList:[],
        sheetState: false,
        snackbar: false,
        sbText: '',
        }
    },
    setup () {},
    created () {
        this.getCategoryList();
        
    },
    mounted () {},
    unmounted () {},
    methods: {
        async getCategoryList(){
            this.categoryList = await this.$api("api/getCategoryList", "post", {param:1});
        },
        categoryEdited(){
            this.getCategoryList();
        },

        stateChange(state){
            this.sheetState = state;
        },
        callCategorySheet(item){
            this.$refs.category_sheet.categorySeq=item.seq;
            this.$refs.category_sheet.titleInput=item.name;
            let colorIndex = this.$refs.category_sheet.colors.indexOf(item.color);
            this.$refs.category_sheet.colorSelection=colorIndex;
            this.sheetState=true;
        },

        alertDelete(categorySeq){
            this.$refs.dialogRef.itemSeq=categorySeq;
            this.$refs.dialogRef.message="카테고리를 삭제하시겠습니까?";
            this.$refs.dialogRef.dialog=true;
        },
        async deleteCategory(categorySeq){
            await this.$api("api/deleteCategory", "post", {param:[categorySeq]});
            this.$callSnackbar('카테고리가 삭제되었습니다');
            this.getCategoryList();
        },

        close(){
            this.dialog=false;
            this.$emit('dialogClosed');
        },
        async save(){
            this.dialog=false;
            this.$emit('dialogSaved');
        }
    }
}
</script>