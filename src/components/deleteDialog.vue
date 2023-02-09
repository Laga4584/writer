<template>
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-text class="pt-4" color="content">
          {{message}}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="button_text" text @click="dialog = false">
            취소
          </v-btn>
          <v-btn color="button_text" text @click="deleteItem()">
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: 'deleteDialog',
    props: {
     },
    data () {
    return {
        message: '',
        dialog: false,
        itemSeq:0,
        }
    },
    watch: {
        /*
        dialogState: function(){
            this.dialog = this.dialogState;
        }
        */
    },
    setup () {},
    created () {},
    mounted () {},
    unmounted () {},
    methods: {
        deleteItem(){
            this.$emit('deleteItem', this.itemSeq);
            this.dialog=false;
        }
    }
}
</script>
