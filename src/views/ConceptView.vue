<template>
    <div>
        <v-container fluid>
            <v-row class="title_area ma-2" dense>
                <span class="">소설 구상하기</span>
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
                <v-col v-for="item in conceptList" :key="item.id" cols="12" lg="3" md="4" sm="6" xs="12">
                    <div class="content_card pa-4 text-caption" @click="goToDetail(item.seq)">
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
            <v-btn fab fixed bottom right class="mb-14" color="button" @click="sheetState = !sheetState">
                <v-icon>add</v-icon>
            </v-btn>
            <conceptSheet ref="concept_sheet" :sheetState="sheetState" @stateChange="stateChange" @conceptCreated="conceptCreated"/>
        </v-container>
    </div>
</template>
<script>
import conceptSheet from '../components/conceptSheet.vue';
export default {
    name: 'ConceptView',
    components: {conceptSheet},
    data () {
    return {
        conceptList: [],
        reverse: false,
        sheetState: false,
        }
    },
    setup () {},
    created () {
        this.getConceptList();
    },
    mounted () {},
    unmounted () {},
    methods: {
        async getConceptList(){
            this.conceptList = await this.$api("api/getConceptList", "post", {param:[1]});
            console.log(this.conceptList);
            if(this.reverse) {
                this.conceptList.reverse();
            }
        },

        changeAlign(setting){
            if(setting=="newer"&&this.reverse){
                this.conceptList.reverse();
                this.reverse=false;
            }
            if(setting=="older"&&!this.reverse){
                this.conceptList.reverse();
                this.reverse=true;
            }
        },

        goToDetail(conceptSeq){
            this.$router.push({path:'/concept_detail', query:{concept_seq:conceptSeq}})
        },

        stateChange(state){
            this.sheetState = state;
        },

        conceptCreated(conceptSeq){
            this.goToDetail(conceptSeq);
        }
    }
}
</script>
