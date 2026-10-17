document.addEventListener("DOMContentLoaded", function() {
    const btnMasuk = document.getElementById("btnMasuk");
    if (btnMasuk) {
        btnMasuk.addEventListener("click", masukWeb);
    }
});

function masukWeb() {
    var namaInput = document.getElementById("namaSobatChemist").value.trim();
    var pesan = document.getElementById("pesanPeringatan");
    var btn = document.getElementById("btnMasuk");

    // 1. Validasi Input Nama Kosong
    if (namaInput === "") {
        pesan.style.display = "block";
        document.getElementById("namaSobatChemist").focus();
        return;
    }

    pesan.style.display = "none";
    btn.innerText = "Mengirim...";
    btn.disabled = true;

    // 2. Data Google Form Rekap Kehadiran/Nama
    var formURL = "https://docs.google.com/forms/d/e/1FAIpQLSck4CulKoImhixLcT9h0GIm3lJMGhxyidNHqQo0pZgV29ectg/formResponse";
    var entryID = "entry.2030998785";

    // 3. Ambil Tujuan Redirect dari URL Parameter (Misal: ?redirect=capaian-pembelajaran)
    const urlParams = new URLSearchParams(window.location.search);
    const destination = urlParams.get('redirect');

    // Base URL Google Sites Sobat Chemist
    var baseURL = "https://sites.google.com/view/zellaweb/";
    var targetURL = "";

    if (destination) {
        // Jika ada parameter redirect, langsung arahkan ke halaman sub-menu tersebut
        targetURL = baseURL + destination;
    } else {
        // Jika dibuka dari link utama saja, arahkan ke Capaian Pembelajaran / Home
        targetURL = baseURL + "capaian-pembelajaran";
    }

    // 4. Simpan nama sementara di storage (opsional jika dibutuhkan di dalam web)
    localStorage.setItem("namaSobatChemist", namaInput);

    // 5. Kirim Data Nama ke Google Form di Latar Belakang (Hidden Iframe)
    try {
        var form = document.createElement("form");
        form.action = formURL;
        form.method = "POST";
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

    // 6. Langsung Pindah ke Halaman Google Sites Tujuan
    setTimeout(function () {
        try {
            window.top.location.href = targetURL;
        } catch (e) {
            window.open(targetURL, "_top");
        }
    }, 800);
}
