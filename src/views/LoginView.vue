<template>
    <div>
        <v-container>
        <v-row>
            <v-col cols="4 mt-10 mx-auto" lg="2"><v-img src="@/assets/writer_logo.png"></v-img></v-col>
        </v-row>
        <v-row>
            <v-col cols="4 mx-auto" lg="2" class="text-center logo_text">The Writer</v-col>
        </v-row>
        <v-row>
            <v-col cols="8 mx-auto" lg="4">
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field outlined v-model="id" :rules="idRules" label="아이디" required heigth="40"></v-text-field>

                    <v-text-field outlined v-model="pwd" :rules="pwdRules" label="비밀번호" required height="40" type="password"></v-text-field>

                    <v-btn :disabled="!valid" class="mb-6 title_area text-h5" outlined @click="validate" width="100%" height="56">로그인</v-btn>
                    <v-btn outlined class="title_area text-h5" to="/join" exact width="100%" height="56">회원가입</v-btn>
                </v-form>
            </v-col>
        </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'LoginView',
    components: { },
    data () {
    return {
        valid: true,
        id: '',
        idRules: [
            v => !!v || '아이디를 입력해주세요',
            //v => (v && v.length <= 10) || '닉네임은 10자 이하여야 합니다',
        ],
        pwd: '',
        pwdRules: [
            v => !!v || '비밀번호를 입력해주세요',
            //v => /.+@.+\..+/.test(v) || '올바른 형식으로 입력해주세요',
        ],

        }
    },
    setup () {},
    created () {},
    mounted () {},
    unmounted () {},
    methods: {
        async validate () {
        this.$refs.form.validate()
        let result = await this.$api("api/getId", "post", {param:[this.id]});
        if(result.length==0){
            //console.log('here');
            this.$callSnackbar('존재하지 않는 아이디입니다');
        }else{
            let result2 = await this.$api("api/getPwd", "post", {param:[this.id, this.pwd]});
            if(result2.length==0){
                this.$callSnackbar('비밀번호가 일치하지 않습니다');
            }else{
                this.$store.commit('editUser', result2[0].seq);
                this.$store.commit('editBasicFolder', result2[0].folder_basic);
                this.$store.commit('editStartFolder', result2[0].folder_start);
                this.$router.push('/memo');
                this.$emit('changeState');
            }
        }
      },
    }
}
</script>
<style scoped> 
.v-text-field >>> .v-input__slot {
  background: white;
}
</style>