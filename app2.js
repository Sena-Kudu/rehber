class Kisi {

    constructor(ad,soyad,mail) {
        this.ad = ad;
        this.soyad = soyad;
        this.mail = mail;

    }
}

class Ekran {
    constructor() {

        this.ad = document.getElementById('ad');
        this.soyad = document.getElementById('soyad');
        this.mail = document.getElementById('mail');

        this.ekleGuncelleButon = document.querySelector('.kaydetGuncelle');

    }
    
}

class Depo { //Static bir class

    constructor() {
        this.tumKisiler = [];
    }

    verileriGetir() {
        let tumKisilerLocal;

        if(localStorage.getItem('tumKisiler') === null) {

            tumKisilerLocal = [];

        } else {

            tumKisilerLocal = localStorage.JSON.parse(localStorage.getItem('tumKisiler'));
        }

        this.tumKisiler = tumKisilerLocal;
        return tumKisilerLocal;
    }

    kisiEkle(kisi) {

        const tumKisilerLocal = this.verileriGetir();
        tumKisilerLocal.push(kisi);
        localStorage.setItem(('tumKisiler'), JSON.stringify(tumKisilerLocal));
    }

}