<template>
<div>
    <v-container fluid>
        <v-row dense>
                <v-col v-for="(item, index) in storyList" :key="index" cols="12">
                    <div class="content_card pa-4 text-caption" >
                        <p class="mb-0">
                            <span class="color_main--text">{{item}}</span>
                        </p>
                        <v-textarea solo flat class="ma-0 pa-0" hide-details auto-grow v-model="storyText[index]" @blur="editStoryline(index)">
                        </v-textarea>
                    </div>
                </v-col>
            </v-row>
    </v-container>
</div>
</template>
<script>
export default {
    name: 'Storyline',
    props: {
            conceptSeq: {
                type: Number,
                default: 0
            },
            structure: {
                type: Number,
                default: 0
            }
        },
    components: { },
    data () {
    return {
        storyList: [],
        storyText: []
        }
    },
    setup () {},
    created () {
        switch(this.structure) {
            case 0:  
                this.storyList= ['시작', '중간', '끝']
                break;
            case 1:  
                this.storyList= ['기', '승', '전', '결']
                break;
            case 2:  
                this.storyList= ['발단', '전개', '위기', '절정', '결말']
                break; 
            }
            this.getStoryline();
            
    },      
    mounted () {},
    unmounted () {},
    methods: {
        async getStoryline(){
            
           const storyline = await this.$api("api/getStoryline", "post", {param:[this.conceptSeq]});
            for (var i = 0; i < storyline.length; i++) {
                this.storyText.push(storyline[i].content);
            }
            //console.log(this.storyText);
        
           //this.storyText = await this.$api("api/getStoryline", "post", {param:[this.conceptSeq]});
        },

        async editStoryline(index){
            await this.$api("api/saveStoryline", "post", {param:[this.storyText[index], this.conceptSeq, index]});
        },
    }
}
</script>

