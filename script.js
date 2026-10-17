document.addEventListener("DOMContentLoaded", function() {
    // Memastikan elemen tombol sudah ada sebelum menambahkan event listener
    const btnMasuk = document.getElementById("btnMasuk");
    if (btnMasuk) {
        btnMasuk.addEventListener("click", masukWeb);
    }
});

function masukWeb() {
    var namaInput = document.getElementById("namaSobatChemist").value.trim();
    var pesan = document.getElementById("pesanPeringatan");
    var btn = document.getElementById("btnMasuk");

    // Validasi input kosong
    if (namaInput === "") {
        pesan.style.display = "block";
        document.getElementById("namaSobatChemist").focus();
        return;
    }

    // Ubah tampilan saat proses berjalan
    pesan.style.display = "none";
    btn.innerText = "Mengirim...";
    btn.disabled = true;

    // 1. LINK GOOGLE FORM 
    var formURL = "https://docs.google.com/forms/d/e/1FAIpQLSck4CulKoImhixLcT9h0GIm3lJMGhxyidNHqQo0pZgV29ectg/formResponse";

    // 2. ENTRY ID GOOGLE FORM 
    var entryID = "entry.2030998785";

    // 3. LINK WEB UTAMA / WEB KEDUA PEMBELAJARAN
    var urlWebKedua = "https://sites.google.com/view/zellaweb/capaian-pembelajaran";

    // Simpan nama di memori lokal browser (jika dibutuhkan di halaman selanjutnya)
    localStorage.setItem("namaSobatChemist", namaInput);

    // Proses Pengiriman ke Google Form menggunakan Hidden Iframe
    try {
        var form = document.createElement("form");
        form.action = formURL;
        form.method = "POST";
        // Arahkan target form ke iframe tersembunyi di HTML
        form.target = "hidden_iframe";

        var input = document.createElement("input");
        input.type = "hidden";
        input.name = entryID;
        input.value = namaInput;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
    } catch (e) {
        console.log("Submit Error:", e);
    }

    // Pindah otomatis ke web kedua dalam 0.8 detik menggunakan block try-catch untuk melewati batas keamanan iframe
    setTimeout(function () {
        try {
            // Mencoba merubah URL jendela paling atas (sering diblokir jika diembed)
            window.top.location.href = urlWebKedua;
        } catch (e) {
            // Jika diblokir (SecurityError), gunakan metode alternatif pembukaan tab/jendela
            window.open(urlWebKedua, "_top");
        }
    }, 800);
}