<template>
    <div>
        <v-container fluid>
            <v-row class="title_area ma-2" dense>
                <span class="">소설 쓰기</span>
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
                </div>
            </v-row>
            <!--소설 정보 영역-->
            <v-row dense no-gutters>
                <v-col cols="12" lg="3" md="4" sm="6" xs="12" class="content_card pa-2 mb-4">
                    <p>카엘 전기</p>

                </v-col>
            </v-row>
            <!--리스트 영역-->
            <v-row dense no-gutters>
                <v-col cols="12" lg="3" md="4" sm="6" xs="12" class="content_card pa-2">
               
                    <v-expansion-panels flat>
                        <v-expansion-panel v-for="(chapter,i) in novelChapterList" :key="i">
                            <v-expansion-panel-header class="px-2">{{chapter.chapter_seq}}장 {{ chapter.title }}</v-expansion-panel-header>
                            <v-divider class="content"/>
                            <v-expansion-panel-content>
                            <v-list>
                                <template v-for="(item, index) in novelSeriesList[i]">
                                    <v-list-item  class="pa-0"  @click="goToDetail(item.seq)">
                                    {{ item.sequence }}화 {{ item.title }}
                                    </v-list-item>
                                    <v-divider></v-divider>
                                </template>
                            </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
               
            </v-col>
            </v-row>
            <v-btn fab fixed bottom right class="mb-14" color="button" @click="goToDetail(0)">
                <v-icon>add</v-icon>
            </v-btn>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'NovelChapterView',
    components: { },
    data () {
    return {
        reverse:false,
        novelSeq: 0,
        novelChapterList:[],
        novelSeriesList:[],
        }
    },
    setup () {},
    created () {
        this.novelSeq = this.$route.query.novelSeq;
        this.getNovelSeriesList();
    },
    mounted () {},
    unmounted () {},
    methods: {
        async getNovelSeriesList(){
            this.novelChapterList = await this.$api("api/getNovelChapterList", "post", {param:[this.novelSeq]});
            let novelSeriesList = await this.$api("api/getNovelSeriesList", "post", {param:[this.novelSeq]});
            var sortedList = [];
            console.log(novelSeriesList);
            for(var item of this.novelChapterList){
                var found = novelSeriesList.filter(e => e.chapter_seq === item.chapter_seq);
                sortedList.push(found);
            }
            this.novelSeriesList=sortedList;
            
            
            if(this.reverse) {
                this.novelChapterList.reverse();
                this.novelSeriesList.reverse();
                for(var item of this.novelSeriesList){
                    item.reverse();
                }
            }
        },
        changeAlign(setting){
            if(setting=="newer"&&this.reverse){
                this.novelChapterList.reverse();
                this.novelSeriesList.reverse();
                for(var item of this.novelSeriesList){
                    item.reverse();
                }
                this.reverse=false;
            }
            if(setting=="older"&&!this.reverse){
                this.novelChapterList.reverse();
                this.novelSeriesList.reverse();
                for(var item of this.novelSeriesList){
                    item.reverse();
                }
                this.reverse=true;
            }
        },
        goToDetail(novel_seq){
            this.$router.push({path:'/novel_detail', query:{novel_seq:novel_seq}})
        },
    }
}
</script>
