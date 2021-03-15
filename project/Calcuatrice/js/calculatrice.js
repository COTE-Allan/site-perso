new Vue({
  el: "#calculatrice",
  data: {
    operations: "",
    nombreActuel: "",
    reponse: "",
    operatorClicked: true,
  },
  methods: {
    terminerNombreActuel: function (signe) {
      if (this.operatorClicked == false) {
        console.log("test");
        this.operations += eval(this.nombreActuel + this.reponse) + signe;
        this.nombreActuel = "";
        this.operatorClicked = true;
        this.reponse = "";
      }
    },
    ajouterValeur: function (number) {
      if (this.operatorClicked) {
        this.nombreActuel = "";
        this.operatorClicked = false;
      }
      this.nombreActuel = this.reponse + this.nombreActuel + number;
      this.reponse = "";
    },
    reverseNumber: function () {
      if ((this.nombreActuel != "") || (this.reponse != "")) {
        this.nombreActuel = this.reponse + this.nombreActuel;
        this.reponse = "";
        this.nombreActuel = this.nombreActuel - this.nombreActuel * 2;
      }
    },
    resultat() {
      reponse = "";
      if (this.operatorClicked == false) {
        console.log("test");
        this.reponse = eval(this.operations + this.nombreActuel);
        if (this.reponse == "Infinity") {
          this.reponse = "0";
        }
        this.operations = "";
        this.nombreActuel = "";
        this.operatorClicked = false;
      }
    },
    resetValeur: function (event) {
      this.operations = "";
      this.reponse = "";
      this.nombreActuel = "";
      this.operatorClicked = false;
      //   this.reponse = "";
    },
    ajoutVirgule: function (event) {
      if (
        this.nombreActuel.indexOf(".") === -1 &&
        this.reponse.toString().indexOf(".") === -1
      ) {
        this.nombreActuel += this.reponse + ".";
        this.reponse = "";
      }
    },
    percent() {
      if ((this.nombreActuel != "") || (this.reponse != "")) {
        this.nombreActuel = this.reponse + this.nombreActuel;
        this.reponse = "";
        this.nombreActuel = parseFloat(this.nombreActuel) / 100;
      }
    },
  },
});
