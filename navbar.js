// Ambil semua elemen dengan kelas 'a-navbar'
const navbarLinkItems = document.querySelectorAll('.a-navbar');

// Dapatkan nama file halaman saat ini (hanya nama file, misalnya 'index.html')
const currentPage = window.location.pathname.split("/").pop();

// Fungsi untuk konfirmasi pemesanan dan menyimpan transaksi
function confirmOrder() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const alamat = document.getElementById('alamat').value;
    const kode = document.getElementById('kode').value;
    const product = document.getElementById('product').value;
    const jumlah = document.getElementById('jumlah').value;
    const payment = document.getElementById('payment').value;

    // Ambil data metode pembayaran, jika menggunakan Virtual Account (VA) tampilkan bank yang dipilih
    let vaBank = null;
    if (payment === 'VA') {
        vaBank = document.getElementById('va-type').value;
    }

    // Buat objek transaksi
    const transactionData = {
        name: name,
        email: email,
        phone: phone,
        alamat: alamat,
        kode: kode,
        product: product,
        jumlah: jumlah,
        payment: payment,
        vaBank: vaBank,  // Menyimpan bank pilihan jika VA dipilih
    };

    // Ambil transaksi yang sudah ada dari localStorage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Tambahkan transaksi baru ke dalam array
    transactions.push(transactionData);

    // Simpan kembali array transaksi ke localStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Tampilkan pesan konfirmasi
    alert("Pemesanan Anda Telah Berhasil Tersimpan");

    // Pastikan form tetap dikirimkan
    return true;
}

// Fungsi untuk menambahkan feedback
const feedbackForm = document.getElementById('feedbackForm');
const feedbackList = document.getElementById('feedbackList');

if (feedbackForm && feedbackList) { // Pastikan elemen ada di DOM
    feedbackForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Ambil nilai dari form
        const userName = document.getElementById('userName').value;
        const userFeedback = document.getElementById('userFeedback').value;

        // Tambahkan feedback ke daftar
        const newFeedback = document.createElement('div');
        newFeedback.classList.add('feedback-item');
        newFeedback.innerHTML = `
            <p><strong>${userName}:</strong></p>
            <p>${userFeedback}</p>
            <hr>
        `;
        feedbackList.appendChild(newFeedback);

        // Bersihkan form
        feedbackForm.reset();

        // Jika sebelumnya ada placeholder "Belum ada testimoni"
        const placeholder = feedbackList.querySelector('p');
        if (placeholder && placeholder.textContent.includes('Belum ada testimoni')) {
            placeholder.remove();
        }
    });
}

// Tambahkan kelas 'active' ke elemen yang sesuai
navbarLinkItems.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
        link.classList.add('active');
    }
});

// JavaScript untuk interaksi hamburger menu
const hamburger = document.getElementById('hamburger-menu');
const navbarMenu = document.getElementById('navbar-links');

if (hamburger && navbarMenu) { // Pastikan elemen ada di DOM
    hamburger.addEventListener('click', () => {
        console.log('Hamburger clicked'); // Debugging log
        hamburger.classList.toggle('active');
        navbarMenu.classList.toggle('active');
    });
} else {
    console.error('Hamburger menu or navbar menu is not found in the DOM.'); // Debugging error
}

// Fungsi untuk konfirmasi log out
function confirmLogout() {
    // Tampilkan konfirmasi dengan pesan
    var confirmation = confirm("Apakah anda ingin log out?");
    if (confirmation) {
        // Jika "Ya" dipilih, arahkan ke halaman index.html
        window.location.href = "index.html";
    } else {
        // Jika "Tidak" dipilih, tetap di halaman yang sedang aktif
        return false;
    }
}

// Fungsi untuk menampilkan pilihan metode pembayaran
function showPaymentOptions() {
    var paymentMethod = document.getElementById('payment').value;
    var vaOptions = document.getElementById('va-options');
    var qrCode = document.getElementById('qr-code');
    var vaNumberDisplay = document.getElementById('va-number-display');
    var vaNumberInput = document.getElementById('va-number'); // Input yang menampilkan nomor VA

    // Show options based on payment method
    if (paymentMethod == 'VA') {
        vaOptions.style.display = 'block';
        qrCode.style.display = 'none';
    } else if (paymentMethod == 'Qris') {
        qrCode.style.display = 'block';
        vaOptions.style.display = 'none';
    } else {
        vaOptions.style.display = 'none';
        qrCode.style.display = 'none';
    }

    // Cek apakah pilihan bank adalah BCA, BRI, atau Mandiri
    var vaType = document.getElementById('va-type').value;
    
    // Bersihkan nomor VA sebelumnya
    vaNumberDisplay.style.display = 'none';
    vaNumberInput.value = ''; // Reset input VA nomor jika bank berubah

    if (vaType === 'BCA') {
        // Tampilkan nomor VA BCA
        vaNumberInput.value = '11420890910';
        vaNumberDisplay.style.display = 'block'; // Tampilkan div yang berisi nomor VA
    } else if (vaType === 'BRI') {
        // Tampilkan nomor VA BRI
        vaNumberInput.value = '22188198394';
        vaNumberDisplay.style.display = 'block'; // Tampilkan div yang berisi nomor VA
    } else if (vaType === 'Mandiri') {
        // Tampilkan nomor VA Mandiri
        vaNumberInput.value = '33419289827';
        vaNumberDisplay.style.display = 'block'; // Tampilkan div yang berisi nomor VA
    }
}
