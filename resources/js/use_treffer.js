/****************************************************
 *
 *
 * MATCH DATEN ANZEIGEN - START
 *
 *
 ***************************************************/

var Match = function (id, vorname, nachname, geburtsdatum, gender, genderLike, url) {
    this.id = id;
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
    this.d = this.geburtsdatum.slice(8, 10);
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
    switch (this.genderLike) {
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

Match.prototype.ausgabe = function () {

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
                console.log(parseData, 'parse');
                if (parseData.length == 0) {
                    $('.treffer_wrapper').html('<div class="treffer_user">' +
                        '<div class="treffer_name">' +
                        '<h2>Noch kein Treffer vorhanden</h2>' +
                        '</div></div>');
                } else {


                    for (var i = 0 in parseData) {
                        var id = parseData[i].id;
                        var vorname = parseData[i].vorname;
                        var nachname = parseData[i].nachname;
                        var geburtsdatum = parseData[i].geburtsdatum;
                        var gender = parseData[i].geschlecht;
                        var genderLike = parseData[i].orientierung;
                        var url = parseData[i].picuserpfad;

console.log('Line 93: genderLike', genderLike );
                        var name = 'user' + i;
                        name = new Match(id, vorname, nachname, geburtsdatum, gender, genderLike, url);

                        var div = $('<div class="treffer_user">').html(`
            
                        <div class="treffer_name">
                            <h2>${name.vollername}</h2>
                        </div>
                        <div class="treffer_flex_wrapper">
                            <div class="treffer_image" style="background-image: url(${name.url})"></div>
                            <div class="treffer_info">
                                <p>
                                    <span class="treffer_bezeichnung">Geburtsdatum: </span>
                                    <span class="treffer_geburtsdatum">${name.datumcov()}</span>
                                </p>
            
                                <p>
                                    <span class="treffer_bezeichnung">Geschlecht: </span>
                                    <span class="treffer_gender">${name.ownGender()}</span>
                                </p>
            
                                <p>
                                    <span class="treffer_bezeichnung">Sucht nach: </span>
                                    <span class="treffer_like_gender">${name.likeGender()}</span>
                                </p>
                            </div>
                        </div>
                        <div class="treffer_dislike_footer">
                            <p>
                                <button class="treffer_dislike" data-db="${name.id}">Entfernen</button>
                            </p>
                        </div>
                    `);

                        $(document).on('click', '.treffer_dislike', function () {
                            var that = $(this);
                            var fk_id = $(this).data('db');
                            $.ajax({
                                url: 'https://www.lang-thomas.at/resources/php/treffer_entfernen.php',
                                method: 'POST',
                                data: {
                                    id: localStorage.getItem('id'),
                                    fk_id: fk_id
                                },
                                success: function (data) {
                                    if (data !== "Error") {
                                        // var parseData = JSON.parse(data);
                                        // console.log(parseData, 'parse');
                                        console.log('Line 141: this', that);
                                        $(that).closest('.treffer_user').remove();
                                        // fk_id.parent().css({'background-color': 'green'});
                                    } else {
                                        console.log(data, 'parse');
                                    }
                                }

                            });
                        });
                        
                        div.appendTo('.treffer_wrapper');


                    }
                }
            } else {
                console.log('Line 83: data error', data);
            }


        }


    });




};
