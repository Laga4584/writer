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
                            
                            <v-text-field class="mx-1" v-model="titleInput" label="폴더명" solo flat hide-details></v-text-field>
                           
                        </v-col>
                    </v-row>
                    <v-row dense no-gutters class="my-4 mx-1">
                        <v-btn-toggle id="color_toggle" v-model="colorSelection" active-class="active" mandatory>
                            <v-btn v-for="color in colors" :key="color" :color="color" fab x-small depressed class="toggle_button" :ripple="false"></v-btn>
                        </v-btn-toggle>
                    </v-row>
                    <!--
                    <v-item-group active-class="active">
                        <v-container>
                        <v-row dense>
                            <v-col  v-for="color in colors" :key="color" cols="2">
                            <v-item v-slot="{ active, toggle }">
                                <v-card :color="active ? color : color" :class="active ? 'active' : ''" height="20" @click="toggle">
                                </v-card>
                            </v-item>
                            </v-col>
                        </v-row>
                        </v-container>
                    </v-item-group>
                -->
                </v-sheet>
            </v-bottom-sheet>
</template>
<script>
export default {
    name: 'folderSheet',
    props: {
        sheetState: {
            type: Boolean,
            default: false
        },
    
    },
     
    data () {
        return {
            sheet: false,
            folderSeq:0,
            titleInput: '',
            colorSelection: 0,
            colors: ['folder1', 'folder2', 'folder3', 'folder4', 'folder5', 'folder6', 'folder7', 'folder8', 'folder9', 'folder10', 'folder11'],
        }
    },
    watch : {
        sheetState: function(){
            //console.log(this.sheetState);
            this.sheet=this.sheetState;
            //console.log(this.sheet);
        },
        sheet: function(newVal, oldVal){
            //console.log("changed");
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
                //this.$emit('callSnackbar', '폴더명을 입력해주세요');
                this.$callSnackbar('폴더명을 입력해주세요');
                //this.sbText='폴더명을 입력해주세요';
                //this.snackbar=true;
            }else{
                if(this.folderSeq==0){
                    var folderItem = {user_seq:1, name:this.titleInput, color:this.colors[this.colorSelection]};
                    let result = await this.$api("api/createFolder", "post", {param:[folderItem]});
                    this.$callSnackbar('폴더가 생성되었습니다');
                    //this.$emit('callSnackbar', '폴더가 생성되었습니다');
                    this.sheet=false;
                    folderItem.seq=result.insertId;
                    //this.$emit('folderCreated', folderItem);
                    this.$emit('folderCreated');
                }else{
                    await this.$api("api/editFolder", "post", {param:[this.titleInput, this.colors[this.colorSelection], this.folderSeq]});
                    this.$callSnackbar('폴더가 수정되었습니다');
                    //this.$emit('callSnackbar', '폴더가 수정되었습니다');
                    this.sheet=false;
                    this.$emit('folderEdited');
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