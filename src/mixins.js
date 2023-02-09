import axios from 'axios';

/*
const instance = axios.create({
    baseURL: process.env.VUE_APP_API
});
*/
const baseURL = 'http://ec2-3-36-6-64.ap-northeast-2.compute.amazonaws.com:3000/';
//const baseURL = 'http://localhost:3000/';

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export default {
    methods: {
        async $api(url, method, data) {
            
            return(
                await axios.post(baseURL+url, data, {
                    withCredentials: true,
                })
                .then((res) => {
                    if(res.status  === 200){
                        //console.log(res.data);
                        return res.data;
                    }
                
                })
                .catch((err) => {
                    console.log(err);
                }))
            
                /*
                await axios({
                method: method,
                url: baseURL+url,
                data
            }).catch(e => {
                console.log(e);
            })).data;
            */
            /*
            return instance.post('/api2/getScripts', {
                title,
                content
              });
              */

        },

        $callSnackbar(message){
            //this.$store.commit('editSbText', message);
            //this.$store.commit('editShowSb', true);
            this.$store.dispatch('showSnack', {
                message: message
             })
            //console.log('callsb');
        }
    }
}