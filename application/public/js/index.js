Vue.directive('mask', VueMask.VueMaskDirective);

new Vue({// eslint-disable-line no-new
  el: '#app',
  data: {
    cpf: null,
    msg: null,
    messageClass: null,
  },
  methods: {
    async searchInBlacklist() {
      try {
        const response = await axios.get(`api/v1/cpf/${this.cpf}`);
        this.msg = response.data.msg;
        this.messageClass = 'messageRed';
      } catch (error) {
        if (error.response.status === 404) {
          this.msg = error.response.data.msg;
          this.messageClass = 'messageGreen';
          return;
        }
        if (error.response.status === 422) {
          this.messageClass = 'messageRed';
          this.msg = error.response.data.msg;
        }

        if (error.response.status === 500) {
          swal('Oops', 'Ocorreu um erro inesperado, tente novamente!', 'error');
          return;
        }

        if (typeof error.response.data.msg !== 'undefined') {
          swal({ title: 'Oops', text: error.response.data.msg, icon: 'error' });
        }
      }
    },

    async addToBlacklist() {
      try {
        await axios.post('api/v1/cpf/', { cpf: this.cpf });
        swal('Adicionado', 'CPF adicionado a blacklist com sucesso!', 'success');
      } catch (error) {
        if (error.response.status === 422) {
          this.messageClass = 'messageRed';
          this.msg = error.response.data.msg;
        }

        if (error.response.status === 500) {
          swal('Oops', 'CPF já consta na blacklist!', 'error');
          return;
        }

        if (typeof error.response.data.msg !== 'undefined') {
          swal({ title: 'Oops', text: error.response.data.msg, icon: 'error' });
        }
      }
    },

    async deleteFromBlacklist() {
      try {
        await axios.delete(`api/v1/cpf/${this.cpf}`);
        swal('Removido', 'CPF removido da blacklist com sucesso!', 'success');
      } catch (error) {
        if (error.response.status === 404) {
          swal('Não consta', 'CPF não consta na blacklist!', 'error');
          return;
        }

        if (error.response.status === 422) {
          this.messageClass = 'messageRed';
          this.msg = error.response.data.msg;
        }

        if (error.response.status === 500) {
          swal('Oops', 'Ocorreu um erro inesperado, tente novamente!', 'error');
          return;
        }
        if (typeof error.response.data.msg !== 'undefined') {
          swal({ title: 'Oops', text: error.response.data.msg, icon: 'error' });
        }
      }
    },
  },
});
