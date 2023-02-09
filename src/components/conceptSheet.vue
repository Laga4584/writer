<template>
    <v-bottom-sheet v-model="sheet" width="100%">
                    <v-sheet class="text-center" height="500px" color="bg_sheet">
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
                                <v-text-field class="mx-1" v-model="titleInput" label="제목" solo flat hide-details></v-text-field>
                               
                            </v-col>
                        </v-row>
                        <v-row dense no-gutters class="my-4 mx-2">장르</v-row>
                        <v-row dense no-gutters class="my-4 mx-2">
                            <v-btn-toggle v-model="selectedGenre" mandatory tile background-color="white" color="purple">
                                <v-btn v-for="genre in genres" :key="genre" :ripple="false">{{ genre }}</v-btn>
                            </v-btn-toggle>
                        </v-row>
                        <v-row dense no-gutters class="my-4 mx-2">구조</v-row>
                        <v-row dense no-gutters class="my-4 mx-2">
                            <v-btn-toggle v-model="selectedStructure" mandatory tile background-color="white" color="purple">
                                <v-btn v-for="structure in structures" :key="structure" :ripple="false">{{ structure }}</v-btn>
                            </v-btn-toggle>
                        </v-row>
                    </v-sheet>
                </v-bottom-sheet>
    </template>
    <script>
    export default {
        name: 'conceptSheet',
        props: {
            sheetState: {
                type: Boolean,
                default: false
            },
        
        },
         
        data () {
            return {
                sheet: false,
                conceptSeq:0,
                titleInput: '',
                genres: ['남성향', '여성향'],
                selectedGenre: 0,
                structures: ['3막', '4막', '5막'],
                selectedStructure: 0,
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
                    this.$callSnackbar('제목을 입력해주세요');
                }else{
                    if(this.conceptSeq==0){
                        var conceptItem = {user_seq:1, title:this.titleInput, type:this.selectedGenre, structure:this.selectedStructure};
                        let result = await this.$api("api/createConcept", "post", {param:[conceptItem]});
                        this.$callSnackbar('구상이 생성되었습니다');
                        this.sheet=false;
                        //conceptItem.seq=result.insertId;
                        this.$emit('conceptCreated', result.insertId);
                    }else{
                        await this.$api("api/editConcept", "post", {param:[this.titleInput, this.selectedGenre, this.selectedStructure, this.conceptSeq]});
                        this.$callSnackbar('구상이 수정되었습니다');
                        this.sheet=false;
                        this.$emit('conceptEdited');
                    }
                }
            },
        }
    }
    </script>
    <style>
    /*
     #color_toggle .active{
            border: 1px solid black !important;
        }
    
        .active{
            border: 1px solid black !important;
        }
    
        .toggle_button::before{
            display:none !important;
        }
        */
    </style>