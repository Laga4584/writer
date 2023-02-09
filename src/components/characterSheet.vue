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
                                <v-text-field class="mx-1" v-model="titleInput" label="이름" solo flat hide-details></v-text-field>
                               
                            </v-col>
                        </v-row>
                        <v-row dense no-gutters class="my-4 mx-2">
                            <v-btn-toggle v-model="selectedCategory" mandatory tile background-color="white" color="purple">
                                <v-btn v-for="category in categories" :key="category" :ripple="false">{{ category }}</v-btn>
                            </v-btn-toggle>
                        </v-row>
                    </v-sheet>
                </v-bottom-sheet>
    </template>
    <script>
    export default {
        name: 'characterSheet',
        props: {
            sheetState: {
                type: Boolean,
                default: false
            },
            conceptSeq: {
                type: Number,
                default: 0
            },
        },
         
        data () {
            return {
                sheet: false,
                characterSeq:0,
                titleInput: '',
                categories: ['주연', '조연'],
                selectedCategory: 0,
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
                    this.$callSnackbar('이름을 입력해주세요');
                }else{
                    if(this.characterSeq==0){
                        var characterItem = {concept_seq:this.conceptSeq, content:this.titleInput, category:this.selectedCategory+1, menu:'character'};
                        let result = await this.$api("api/createCharacter", "post", {param:[characterItem]});
                        this.$callSnackbar('캐릭터가 생성되었습니다');
                        this.sheet=false;
                        this.$emit('characterCreated');
                    }else{
                        await this.$api("api/editCharacter", "post", {param:[this.titleInput, this.selectedCategory+1, this.characterSeq]});
                        this.$callSnackbar('캐릭터가 수정되었습니다');
                        this.sheet=false;
                        this.$emit('characterEdited');
                    }
                }
            },
        }
    }
    </script>