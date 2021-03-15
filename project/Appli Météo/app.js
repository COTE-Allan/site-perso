var app = new Vue({
    el: '#app',
    data(){
        return {
            settingVisible: false,
            loading: true,
            infos: null,
            key: '9c61498a557aaa488b84870763bab53d',
            ville: 'Paris',
            detectedVille: '',
            meteo: '',
            description:'',
            lang: 'fr',
            temp: '',
            background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)',
            unit: "metric",
            expression: "°C",

            // Date 3heure+Tard
            meteo3h: '',
            description3h: '',
            temp3h: '',
            date3h: '',



            // Actual Trad 
            ActualLang: {
                setting: 'Paramètres',
                language: 'Langue',
                prevision: 'Prévision pour',
            },
            // trad FR EN
            TradEN: {
                setting:'Settings',
                language: 'Language',
                prevision: 'Weather at',
            },
            TradFR: {
                setting:'Paramètres',
                language: 'Langue',
                prevision: 'Prévision pour',
            }
                
        }
    },
    mounted: function(){
        this.getWeatherInfo();
    },

    methods: {
        getWeatherInfo: function() {
            axios.get('https://api.openweathermap.org/data/2.5/weather?q=' + this.ville + '&appid=' + this.key + '&lang=' + this.lang + '&units=' + this.unit).then(response => {
                this.infos = response.data
                this.meteo = this.infos.weather[0].main;
                this.description = this.infos.weather[0].description
                this.detectedVille = this.infos.name;
                this.temp = parseInt(this.infos.main.temp);
                this.date = this.infos.dt_txt;
            });
            axios.get('https://api.openweathermap.org/data/2.5/forecast?q=' + this.ville + '&appid=' + this.key + '&lang=' + this.lang + '&units=' + this.unit).then(response => {
                console.log(response);
                this.infos = response.data
                this.meteo3h = this.infos.list[1].weather[0].main;
                this.description3h = this.infos.list[1].weather[0].description
                this.temp3h = parseInt(this.infos.list[1].main.temp);
                this.date3h = this.infos.list[1].dt_txt.split(' ')[1].split(':')[0];
            });
            axios.get('https://api.unsplash.com/search/photos', {
                params: { query: this.ville},
                headers: {
                    Authorization: 'Client-ID NenJnJV0absfhA93LxsQLF37BQ-zC22BdGk_W80lsnE'
                }
            }).then(picture => {
                this.background = picture.data.results[0].urls.regular;
            })
            },
        setLang: function(){
            if (this.lang == "fr") {
                this.expression = "°C"
                this.unit = "metric";
                this.ActualLang.setting = this.TradFR.setting
                this.ActualLang.prevision = this.TradFR.prevision
                this.ActualLang.language = this.TradFR.language
            } else if (this.lang == 'en') {
                this.expression = "°F"
                this.unit = "imperial"
                this.ActualLang.setting = this.TradEN.setting
                this.ActualLang.prevision = this.TradEN.prevision
                this.ActualLang.language = this.TradEN.language


            }
            this.getWeatherInfo();
        },
        settingView: function(){
            if (this.settingVisible == true) {
                this.settingVisible = false;
            }
            else {
                this.settingVisible = true;
            }
        }
        },
    computed: {
        bgEdit: function(){
            return 'background-image:url(' + this.background + ')'
        }
    }
})
