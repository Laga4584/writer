<template>
    <div>
        <v-container fluid>
            <v-row class="title_area ma-2" dense>
                <v-spacer></v-spacer>
                <div class="d-flex justify-space-between align-end">
                </div>
            </v-row>
            <!--리스트 영역-->
            <v-row dense>
                <v-col v-for="(item, index) in plotList" :key="index" cols="12" lg="3" md="4" sm="6" xs="12">
                    <div class="content_card pa-4 text-caption" @click="goToDetail(index)">
                        <p class="mb-1 content--text flex-grow-0 clamp">
                            {{item.content}}
                        </p>
                        <p class="mb-0">
                        </p>
                    </div>
                </v-col>
            </v-row>
            <v-btn fab fixed bottom right class="mb-14" color="button" @click="sheetState=!sheetState">
                <v-icon>add</v-icon>
            </v-btn>
            <plotDialog ref="plotRef" @dialogClosed="dialogClosed" />
        </v-container>    
    </div>
</template>
<script>
import plotDialog from '../components/plotDialog.vue';
export default {
    name: 'Plot',
    props: {
            conceptSeq: {
                type: Number,
                default: 0
            },
        },
    components: { plotDialog},
    data() {
        return {
            plotList: [],
        }
      },
      created(){
        this.getPlotList();
      },
      methods: {
        async getPlotList(){
            this.plotList = await this.$api("api/getPlotList", "post", {param:[this.conceptSeq]});
        },

        goToDetail(index){
            this.$refs.plotRef.dialog=true;
            this.$refs.plotRef.plotItem=this.plotList[index];
        },
        
        dialogClosed(){
            this.getPlotList();
        }
      }
}
</script>
