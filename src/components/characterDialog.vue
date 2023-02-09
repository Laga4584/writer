<template>
    <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition" content-class="bg_normal">
        <v-container fluid>
            <v-row class="title_area ma-2" dense>
                <v-btn icon @click="close()">
            <v-icon>arrow_back</v-icon>
          </v-btn>
                <v-spacer></v-spacer>
                
                <div class="d-flex justify-space-between align-end">
                    <v-btn icon @click="cancelData()" v-show=showButton>
                        <v-icon>clear</v-icon>
                    </v-btn>
                    <v-btn icon @click="saveData()" v-show=showButton>
                        <v-icon>done</v-icon>
                    </v-btn>
                </div>
            </v-row>
            <v-row class="title_area ma-2" dense align-content="space-around"><span>{{ characterItem.content }}</span>
                <v-spacer></v-spacer>
                <div class="d-flex justify-space-between align-end">
                    <v-btn icon @click="callCharacterSheet()">
                    <v-icon>settings</v-icon>
                </v-btn>
                    <v-btn icon @click="alertDelete()">
                        <v-icon>delete</v-icon>
                    </v-btn> 
                </div>
            </v-row>
            <v-row dense>
                    <v-col v-for="(item, index) in itemList" :key="index" cols="12">
                        <div class="content_card pa-4 text-caption" >
                            <p class="mb-0">
                                <span class="color_main--text">{{item}}</span>
                            </p>
                            <v-textarea solo flat class="ma-0 pa-0" hide-details auto-grow v-model="dataText[index]" @focus="showButton = true">
                            </v-textarea>
                        </div>
                    </v-col>
                </v-row>
                <characterSheet ref="character_sheet" :sheetState="sheetState" @stateChange="stateChange"  @characterCreated="getCharacter"/>
            <v-snackbar v-model="snackbar" :timeout="1000" text color="bg_alert">{{ sbText }}</v-snackbar>
            <deleteDialog @deleteItem="deleteCharacter" ref="dialogRef"/>
        </v-container>
    </v-dialog>
    </template>
    <script>
    import characterSheet from '../components/characterSheet.vue';
    import deleteDialog from '../components/deleteDialog.vue';
    export default {
        name: 'characterDialog',
        props: {
                
            },
        components: {characterSheet, deleteDialog},
        data () {
        return {
            dialog:false,
            showButton: false,
            sheetState: false,
            snackbar: false,
            sbText: '',
            characterItem: {},
            itemList: [],
            dataText: [],
            dataTextPrev: []
            }
        },
        watch : {
        characterItem: function(newVal, oldVal){
            switch(newVal.category) {
                case 1:  
                    this.itemList= ['외모', '성격', '출생/배경', '신분/직업', '가치관', '트라우마/결핍', '욕구/동기', '메모']
                    break;
                case 2:  
                    this.itemList= ['외모', '성격', '출생/배경', '신분/직업', '역할', '메모']
                    break;
                }
           this.getCharacter();
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
            async getCharacter(){
                this.dataText = [];
               const characterData = await this.$api("api/getCharacter", "post", {param:[this.characterItem.seq]});
                for (var i = 0; i < characterData.length; i++) {
                    this.dataText.push(characterData[i].content);
                }
                this.dataTextPrev = this.dataText;
                //console.log(this.storyText);
            
               //this.storyText = await this.$api("api/getStoryline", "post", {param:[this.conceptSeq]});
            },

            callCharacterSheet(){
                this.$refs.character_sheet.chracterSeq = this.characterItem.seq;
                this.$refs.character_sheet.titleInput = this.characterItem.content;
                this.$refs.character_sheet.selectedCategory = this.characterItem.category-1;
                this.sheetState = true;
            },

            alertDelete(){
            this.$refs.dialogRef.message="캐릭터를 삭제하시겠습니까?";
            this.$refs.dialogRef.dialog=true;
            },

            async deleteCharacter(){
                await this.$api("api/deleteCharacter", "post", {param:[this.characterItem.seq]});
                this.$callSnackbar('캐릭터가 삭제되었습니다');
                this.close();
            },

            stateChange(state){
                this.sheetState = state;
            },

            cancelData(){
                this.dataText = this.dataTextPrev;
                this.showButton=false;
            },

            async saveData(){
                for (var i = 0; i < this.dataText.length; i++) {
                    await this.$api("api/saveCharacter", "post", {param:[this.dataText[i], this.characterItem.seq, i]});
                    this.$callSnackbar('캐릭터 변경사항이 저장되었습니다');
                    this.showButton=false;
                }
            },

            close(){
            this.dialog=false;
            this.$emit('dialogClosed');
        },
        }
        
    }
    </script>
    
    