<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="4 mx-auto mt-10" class="text-center title_area">회원가입</v-col>
            </v-row>
            <v-row>
                <v-col cols="8 mx-auto">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-text-field outlined v-model="id" :rules="idRules" label="아이디" required heigth="40"></v-text-field>
                        <v-text-field outlined v-model="pwd" :rules="pwdRules" label="비밀번호" required heigth="40"></v-text-field>
                        <v-text-field outlined v-model="pwdCheck" :rules="pwdCheckRules" label="비밀번호 확인" required heigth="40"></v-text-field>
                        <v-text-field outlined v-model="name" :rules="nameRules" label="닉네임" required heigth="40"></v-text-field>

                        <v-text-field outlined v-model="email" :rules="emailRules" label="이메일" required height="40"></v-text-field>

                        <v-checkbox v-model="checkbox" :rules="[v => !!v || '약관에 동의해주세요']" label="약관 동의" required></v-checkbox>

                        <v-btn :disabled="!valid" color="button" class="mr-4" @click="validate" width="100%" height="56">회원가입</v-btn>
                    </v-form>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'JoinView',
    components: { },
    data () {
    return {
        valid: true,
        id: '',
        idRules: [
            v => !!v || '아이디를 입력해주세요',
            v => (v && v.length <= 10) || '아이디는 10자 이하여야 합니다',
        ],
        pwd: '',
        pwdRules: [
            v => !!v || '비밀번호를 입력해주세요',
            v => (v && v.length <= 10) || '아이디는 10자 이하여야 합니다',
        ],
        pwdCheck: '',
        pwdCheckRules: [
            v => !!v || '비밀번호를 다시 한번 입력해주세요',
            v => (v && v.length <= 10) || '아이디는 10자 이하여야 합니다',
        ],
        name: '',
        nameRules: [
            v => !!v || '닉네임을 입력해주세요',
            v => (v && v.length <= 10) || '닉네임은 10자 이하여야 합니다',
        ],
        email: '',
        emailRules: [
            v => !!v || '이메일을 입력해주세요',
            v => /.+@.+\..+/.test(v) || '올바른 형식으로 입력해주세요',
        ],
        checkbox: false,
        }
    },
    setup () {},
    created () {},
    mounted () {},
    unmounted () {},
    methods: {}
}
</script>
<style scoped>
.v-text-field >>> .v-input__slot {
  background: white;
}
</style>
