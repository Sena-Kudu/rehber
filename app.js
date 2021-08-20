const ad = document.querySelector('#ad');
const soyad = document.querySelector('#soyad');
const mail = document.querySelector('#mail');

const form = document.querySelector('#form-rehber');

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

        bilgileriGoster(sonuc.mesaj,sonuc.durum);

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

    return {
        durum : true,
        mesaj : "Başarılı"
    }
}

function bilgileriGoster(mesaj,durum) {

    const olusturulanBilgi = document.createElement('div');
    olusturulanBilgi.textContent = mesaj;

    olusturulanBilgi.classList.add(durum ? 'bilgi--success' : 'bilgi--error' )

    document.querySelector('.container').insertBefore(olusturulanBilgi,form);


}