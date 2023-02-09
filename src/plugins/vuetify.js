import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import '@/sass/_index.scss';

Vue.use(Vuetify);

export default new Vuetify({
    customVariables: ['@/assets/styles/variables.scss'],
    theme: {
        themes: {
          light: {
            primary: '#3f51b5',
            secondary: '#b0bec5',
            button: '#e5dbff',
            button_text: '#9775fa',
            content: '#343a40',
            bg_primary: '#d8e6f3',
            bg_sheet: '#e9ecef',
            bg_alert: '#bac8ff',
            caption: '#ced4da',
            folder1: '#ff8787',
            folder2: '#f783ac',
            folder3: '#da77f2',
            folder4: '#9775fa',
            folder5: '#748ffc',
            folder6: '#4dabf7',
            folder7: '#3bc9db',
            folder8: '#38d9a9',
            folder9: '#69db7c',
            folder10: '#a9e34b',
            folder11: '#ffd43b',
            folder12: '#ffa94d',
          },
          dark: {
            primary: '#3f51b5',
            secondary: '#b0bec5',
            anchor: '#8c9eff',
            button: '#e5dbff',
            button_text: '#9775fa',
            content: '#343a40',
            bg_primary: '#d8e6f3',
            bg_sheet: '#e9ecef',
            bg_alert: '#bac8ff',
            caption: '#ced4da',
            folder1: '#ff8787',
            folder2: '#f783ac',
            folder3: '#da77f2',
            folder4: '#9775fa',
            folder5: '#748ffc',
            folder6: '#4dabf7',
            folder7: '#3bc9db',
            folder8: '#38d9a9',
            folder9: '#69db7c',
            folder10: '#a9e34b',
            folder11: '#ffd43b',
            folder12: '#ffa94d',
          },
        },
      },
});
