class Kisi {

    constructor(ad,soyad,mail) {
        this.ad = ad;
        this.soyad = soyad;
        this.mail = mail;

    }
}

class Util {
    static bosAlanKontrolEt(...alanlar) {
        let sonuc = true;
        alanlar.forEach( alan => {

            if(alan.length === 0 ) {

                sonuc = false;
                return false;

            }
        

        });
        return sonuc;
    }
}

class Ekran {
    constructor() {

        this.ad = document.getElementById('ad');
        this.soyad = document.getElementById('soyad');
        this.mail = document.getElementById('mail');

        this.ekleGuncelleButon = document.querySelector('.kaydetGuncelle');
        this.form = document.getElementById('form-rehber').addEventListener('submit' , this.kaydetGuncelle.bind(this));
        this.kisiListesi = document.querySelector('.kisi-listesi');
        this.depo = new Depo();
        this.kisileriEkranaYazdir();

    }

    kisileriEkranaYazdir() {
        this.depo.tumKisiler.forEach(kisi => {
            this.kisiyiEkranaEkle(kisi);

        });
    }

    kisiyiEkranaEkle(kisi) {

        const olusturulanTrElementi = document.createElement('tr');

        olusturulanTrElementi.innerHTML = `<td>${kisi.ad}</td>
        <td>${kisi.soyad}</td>
        <td>${kisi.mail}</td>
        <td>
        <button class="btn btn--edit"><i class="far fa-edit"></i></button>
        <button class="btn btn--delete">
            <i class="far fa-trash-alt"></i>
        </button>
        </td>`

      
        this.kisiListesi.appendChild(olusturulanTrElementi);

    }

    kaydetGuncelle(e) {

        e.preventDefault();
        
        const kisi = new Kisi(this.ad.value, this.soyad.value, this.mail.value);

        const sonuc = Util.bosAlanKontrolEt(kisi.ad,kisi.soyad,kisi.mail);

        if(sonuc) {

            this.kisiyiEkranaEkle(kisi);
            this.depo.kisiEkle(kisi);

        } else {

            console.log("Boşluklar Var");

        }

    }
    
}

class Depo { //Static bir class

    constructor() {
        this.tumKisiler = this.verileriGetir();
    }

    verileriGetir() {
        let tumKisilerLocal;

        if(localStorage.getItem('tumKisiler') === null) {

            tumKisilerLocal = [];

        } else {

            tumKisilerLocal = JSON.parse(localStorage.getItem('tumKisiler'));
        }

        return tumKisilerLocal;
    }

    kisiEkle(kisi) {

        const tumKisilerLocal = this.verileriGetir();
        tumKisilerLocal.push(kisi);
        localStorage.setItem(('tumKisiler'), JSON.stringify(tumKisilerLocal));
    }

}

document.addEventListener('DOMContentLoaded', function(e) {

    const ekran =new Ekran();
});