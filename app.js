const ad = document.querySelector('#ad');
const soyad = document.querySelector('#soyad');
const mail = document.querySelector('#mail');
const kisiListesi = document.querySelector('.kisi-listesi');

const form = document.querySelector('#form-rehber');

const tumKisilerDizisi = [];

//console.log(ad,soyad,mail);

form.addEventListener('submit', kaydet);

function kaydet(e) {

    e.preventDefault();

    const eklenecekKisi = {
        ad: ad.value,
        soyad: soyad.value,
        mail: mail.value
    }

   const sonuc = verileriKontrolEt(eklenecekKisi);

   if(sonuc.durum) {

        kisiyiEkle(eklenecekKisi);

   } else {

        bilgileriGoster(sonuc.mesaj,sonuc.durum);
        //console.log(sonuc.mesaj);

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
    bilgileriGoster("Kişi Rehbere Kaydedildi.",true);
}