<template>
<v-bottom-sheet v-model="sheet" width="100%">
                <v-sheet class="text-center" height="200px" color="bg_sheet">
                    <v-row class="my-4">
                            <v-btn depressed color="transparent" @click="sheet = !sheet">
                                <v-icon>clear</v-icon>
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn depressed color="transparent" @click="checkSheet()">
                                <v-icon>done</v-icon>
                            </v-btn>
                    </v-row>
                    <v-row dense no-gutters class="my-4 mx-2">
                        <v-col cols="12" class="content_card">
                            
                            <v-text-field class="mx-1" v-model="titleInput" label="카테고리명" solo flat hide-details></v-text-field>
                           
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters class="my-4 mx-1">
                        <v-btn-toggle id="color_toggle" v-model="colorSelection" active-class="active" mandatory>
                            <v-btn v-for="color in colors" :key="color" :color="color" fab x-small depressed class="toggle_button" :ripple="false"></v-btn>
                        </v-btn-toggle>
                    </v-row>
                </v-sheet>
            </v-bottom-sheet>
</template>
<script>
export default {
    name: 'categorySheet',
    props: {
        sheetState: {
            type: Boolean,
            default: false
        },
    
    },
     
    data () {
        return {
            sheet: false,
            categorySeq:0,
            titleInput: '',
            colorSelection: 0,
            colors: ['folder1', 'folder2', 'folder3', 'folder4', 'folder5', 'folder6', 'folder7', 'folder8', 'folder9', 'folder10', 'folder11'],
        }
    },
    watch : {
        sheetState: function(){
            this.sheet=this.sheetState;
        },
        sheet: function(newVal, oldVal){
        this.$emit('stateChange', this.sheet);
    }
    },
    setup () {},
    created () {
    },
    mounted () {},
    unmounted () {},
    methods: {
        async checkSheet(){
            if(!this.titleInput){
                this.$callSnackbar('카테고리명을 입력해주세요');
            }else{
                if(this.categorySeq==0){
                    var categoryItem = {user_seq:1, name:this.titleInput, color:this.colors[this.colorSelection]};
                    let result = await this.$api("api/createCategory", "post", {param:[categoryItem]});
                    this.$callSnackbar('카테고리가 생성되었습니다');
                    this.sheet=false;
                    categoryItem.seq=result.insertId;
                    this.$emit('categoryCreated');
                }else{
                    await this.$api("api/editCategory", "post", {param:[this.titleInput, this.colors[this.colorSelection], this.categorySeq]});
                    this.$callSnackbar('카테고리가 수정되었습니다');
                    this.sheet=false;
                    this.$emit('categoryEdited');
                }
            }
        },
    }
}
</script>
<style>
 #color_toggle .active{
        border: 1px solid black !important;
    }

    .active{
        border: 1px solid black !important;
    }

    .toggle_button::before{
        display:none !important;
    }
</style>