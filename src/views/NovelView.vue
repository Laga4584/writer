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
            <!--리스트 영역-->
            <v-row dense>
                <v-col v-for="item in novelList" :key="item.id" cols="12" lg="3" md="4" sm="6" xs="12">
                    <div class="content_card pa-4 text-caption" @click="goToSeries(item.seq)">
                        <p class="mb-1 content--text font-weight-bold">
                            {{item.title}}
                        </p>
                        <p class="mb-0">
                            <span :class="$store.state.novelType[item.type].color+'--text'">{{ $store.state.novelType[item.type].name }}</span>
                            <span>&nbsp&nbsp</span>
                            <span class="caption--text">{{item.reg_date}}</span>
                        </p>
                    </div>
                </v-col>
            </v-row>
            <v-btn fab fixed bottom right class="mb-14" color="button" @click="goToSeries(0)">
                <v-icon>add</v-icon>
            </v-btn>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'NovelView',
    components: { },
    data () {
    return {
        novelList: [],
        reverse: false,
        }
    },
    setup () {},
    created () {
        this.getNovelList();
    },
    mounted () {},
    unmounted () {},
    methods: {
        async getNovelList(){
            this.novelList = await this.$api("api/getNovelList", "post", {param:[1]});
            
            if(this.reverse) {
                this.novelList.reverse();
            }
        },

        changeAlign(setting){
            if(setting=="newer"&&this.reverse){
                this.novelList.reverse();
                this.reverse=false;
            }
            if(setting=="older"&&!this.reverse){
                this.novelList.reverse();
                this.reverse=true;
            }
        },

        goToSeries(novelSeq){
            this.$router.push({path:'/novel_series', query:{novelSeq}})
        },
    }
}
</script>
