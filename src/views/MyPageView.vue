<template>
    <div>
        <v-container fluid>
            <v-row class="title_area ma-2" dense>
                <span class="">마이페이지</span>
                <v-spacer></v-spacer>
                <div class="d-flex justify-space-between align-end"> 
                </div>
            </v-row>
            <!--리스트 영역-->
            <v-row dense>
                <v-col cols="12" lg="3" md="4" sm="6" xs="12">
                    <div class="content_card pa-4 text-caption d-flex justify-space-between align-center">
                        <span>내 정보</span>
                        <v-btn icon @click="close()">
                            <v-icon>navigate_next</v-icon>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
            <v-row dense>
                <v-col cols="12" lg="3" md="4" sm="6" xs="12">
                    <div class="content_card pa-4 text-caption d-flex justify-space-between align-center">
                        <span>공지사항</span>
                        <v-btn icon @click="close()">
                            <v-icon>navigate_next</v-icon>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'MyPageView',
    components: { },
    data () {
    return {
        
        }
    },
    setup () {},
    created () {
       
    },
    mounted () {},
    unmounted () {},
    methods: {
       
    }
}
</script>
