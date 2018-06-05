/****************************************************
 *
 *
 * MATCH DATEN ANZEIGEN - START
 *
 *
 ***************************************************/

var Match = function(vorname, nachname, geburtsdatum, gender, genderLike, url){
    this.vorname = vorname;
    this.nachname = nachname;
    this.geburtsdatum = geburtsdatum;
    this.gender = gender;
    this.genderLike = genderLike;
    this.url = url;
    this.vollername = `${this.vorname} ${this.nachname}`;
};

Match.prototype.datumcov = function () {
    this.j = this.geburtsdatum.slice(0, 4);
    console.log(this.j);
    this.m = this.geburtsdatum.slice(5, 7);
    console.log(this.m);
    this.d = datedb.slice(8, 10);
    console.log(this.d);
    this.newDateString = (this.d + '.' + this.m + '.' + this.j);
    return this.newDateString;
};

Match.prototype.ownGender = function () {
    switch (this.gender) {
        case 'female':
            this.geschlecht = 'Frau';
            break;
        case 'male':
            this.geschlecht = 'Mann';
            break;
    }
    return this.geschlecht;
};


Match.prototype.likeGender = function () {
    switch (this.orientierung) {
        case 'female':
            this.fremdGeschlecht = 'Frauen';
            break;
        case 'male':
            this.fremdGeschlecht = 'Männer';
            break;
        case 'bi':
            this.fremdGeschlecht = 'Frauen und Männer';
            break;
    }
    return this.fremdGeschlecht;
};

var fillMatchData = function () {

        $.ajax({
                url: 'https://www.lang-thomas.at/resources/php/treffer_show.php',
                method: 'POST',
                data: {
                    id: localStorage.getItem('id'),
                },
                success: function (data) {
                    if (data !== "Error") {
                        var parseData = JSON.parse(data);
                        console.log(data);
                        console.log(parseData, 'parse');


                    } else {
                        console.log('Line 83: data error', data);
                    }


                }







                });
            };
