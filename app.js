const ad = document.querySelector('#ad');
const soyad = document.querySelector('#soyad');
const mail = document.querySelector('#mail');
const kisiListesi = document.querySelector('.kisi-listesi');

const form = document.querySelector('#form-rehber');

const tumKisilerDizisi = [];
let secilenSatir = 'undefined';

form.addEventListener('submit', kaydet);
kisiListesi.addEventListener('click', kisiIslemleriniYap);

function kaydet(e) {

    e.preventDefault();

    const eklenecekveyaGuncellenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value
    }


   const sonuc = verileriKontrolEt(eklenecekveyaGuncellenecekKisi);

   if(sonuc.durum) {


        if(secilenSatir !== 'undefined') {

            kisiyiGuncelle(eklenecekveyaGuncellenecekKisi);

        } else {

            kisiyiEkle(eklenecekveyaGuncellenecekKisi);
            
        }

   } else {

        bilgileriGoster(sonuc.mesaj,sonuc.durum);

   }

}

function verileriKontrolEt(kisi) {
    for(const deger in kisi) {

        if(kisi[deger]) {
            
            console.log(kisi[deger]);

        } else {
            
            const sonuc = {
                durum:false,
                mesaj: "Boş değerler var."
                }

            return sonuc;
        }

     
    }

    alanlariTemizle();

    return {
        durum : true,
        mesaj : "Başarılı"
    }
}

function bilgileriGoster(mesaj,durum) {

    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent = mesaj;
    olusturulanBilgi.className = 'bilgi';

    olusturulanBilgi.classList.add(durum ? 'bilgi--success' : 'bilgi--error' )

    document.querySelector('.container').insertBefore(olusturulanBilgi,form);

    setTimeout(function() {

        const silinecekdiv = document.querySelector('.bilgi');
        if(silinecekdiv) {
            silinecekdiv.remove();
        }

    },2000)


}

function alanlariTemizle() {

    ad.value = '';
    soyad.value = '';
    mail.value = '';
}

function kisiyiEkle(eklenecekKisi) {

    const olusturulanTrElementi = document.createElement('tr');
    olusturulanTrElementi.innerHTML = ` <td>${eklenecekKisi.ad}</td>
    <td>${eklenecekKisi.soyad}</td>
    <td>${eklenecekKisi.mail}</td>
    <td>
    <button class="btn btn--edit"><i class="far fa-edit"></i></button>
    <button class="btn btn--delete">
        <i class="far fa-trash-alt"></i>
    </button>
    </td>
    `
    kisiListesi.appendChild(olusturulanTrElementi);
    tumKisilerDizisi.push(eklenecekKisi);
    console.log("Diziye yeni eleman eklendi: ");
    console.log(tumKisilerDizisi);
    bilgileriGoster("Kişi Rehbere Kaydedildi.",true);
}

function kisiIslemleriniYap(event) {

    if(event.target.classList.contains('btn--delete')) {

        const silinecekTrElement = event.target.parentElement.parentElement;
        const silinecekTrMail = event.target.parentElement.previousElementSibling.textContent;

        rehberdenSil(silinecekTrElement, silinecekTrMail);

    } else if (event.target.classList.contains('btn--edit')) {

        document.querySelector('.kaydetGuncelle').value = 'Güncelle';

        const secilenTR = event.target.parentElement.parentElement;
        const guncellenecekMail = secilenTR.cells[2].textContent;

        ad.value = secilenTR.cells[0].textContent;
        soyad.value = secilenTR.cells[1].textContent;
        mail.value = secilenTR.cells[2].textContent;

        secilenSatir =secilenTR;

    }

}

function rehberdenSil(silinecekTrElement, silinecekTrMail) {

    const silinmeyecekKisiler = tumKisilerDizisi.filter((kisi,index) => {

        return kisi.mail !== silinecekTrMail;

    });

    tumKisilerDizisi.length = 0;

    tumKisilerDizisi.push(...silinmeyecekKisiler);

    console.log(tumKisilerDizisi);

    silinecekTrElement.remove();

}

function kisiyiGuncelle(kisi) {

    for(let i=0; i<tumKisilerDizisi.length; i++) {
        if(tumKisilerDizisi[i].mail === secilenSatir.cells[2].textContent) {
            
            tumKisilerDizisi[i] = kisi;
            console.log(tumKisilerDizisi);
            break;
        }
    }

    secilenSatir.cells[0].textContent = kisi.ad;
    secilenSatir.cells[1].textContent = kisi.soyad;
    secilenSatir.cells[2].textContent = kisi.mail;

    document.querySelector('.kaydetGuncelle').value = 'Kaydet';
    secilenSatir = 'undefined';
}