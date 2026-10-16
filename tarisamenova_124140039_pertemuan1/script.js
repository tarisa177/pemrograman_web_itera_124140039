// ==========================================
// MINI POS
// KASIR & KERANJANG BELANJA SEDERHANA
// Tarisa Menova
// NIM: 124140039
// Kelas: PAW RA
// ==========================================


// ==========================================
// 1. DATA KERANJANG
// ==========================================

// Ambil data dari localStorage.
// Kalau belum ada data, gunakan array kosong.

let cart =
    JSON.parse(
        localStorage.getItem("miniPOSCart")
    ) || [];


// ==========================================
// 2. MENGAMBIL ELEMENT HTML
// ==========================================

const productForm =
    document.getElementById("productForm");

const productName =
    document.getElementById("productName");

const productPrice =
    document.getElementById("productPrice");

const productQty =
    document.getElementById("productQty");

const resetForm =
    document.getElementById("resetForm");

const cartTableBody =
    document.getElementById("cartTableBody");

const emptyCart =
    document.getElementById("emptyCart");

const cartCount =
    document.getElementById("cartCount");

const totalBelanja =
    document.getElementById("totalBelanja");

const discount =
    document.getElementById("discount");

const totalAkhir =
    document.getElementById("totalAkhir");

const payment =
    document.getElementById("payment");

const paymentError =
    document.getElementById("paymentError");

const paymentResult =
    document.getElementById("paymentResult");

const newTransaction =
    document.getElementById("newTransaction");

const storageStatus =
    document.getElementById("storageStatus");


// ==========================================
// 3. FORMAT RUPIAH
// ==========================================

function formatRupiah(number) {

    return new Intl.NumberFormat(
        "id-ID",
        {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0
        }
    ).format(number);

}


// ==========================================
// 4. MEMBERSIHKAN ERROR
// ==========================================

function clearErrors() {

    document.getElementById(
        "productNameError"
    ).textContent = "";

    document.getElementById(
        "productPriceError"
    ).textContent = "";

    document.getElementById(
        "productQtyError"
    ).textContent = "";

    paymentError.textContent = "";

}


// ==========================================
// 5. VALIDASI FORM BARANG
// ==========================================

function validateProductForm() {

    clearErrors();

    let valid = true;


    const name =
        productName.value.trim();

    const price =
        Number(productPrice.value);

    const qty =
        Number(productQty.value);


    // -------------------------------
    // VALIDASI NAMA
    // -------------------------------

    if (name === "") {

        document.getElementById(
            "productNameError"
        ).textContent =
            "Nama barang wajib diisi.";

        valid = false;

    }

    else if (name.length < 3) {

        document.getElementById(
            "productNameError"
        ).textContent =
            "Nama barang minimal 3 karakter.";

        valid = false;

    }


    // -------------------------------
    // VALIDASI HARGA
    // -------------------------------

    if (productPrice.value === "") {

        document.getElementById(
            "productPriceError"
        ).textContent =
            "Harga satuan wajib diisi.";

        valid = false;

    }

    else if (price < 500) {

        document.getElementById(
            "productPriceError"
        ).textContent =
            "Harga minimal Rp500.";

        valid = false;

    }


    // -------------------------------
    // VALIDASI QTY
    // -------------------------------

    if (productQty.value === "") {

        document.getElementById(
            "productQtyError"
        ).textContent =
            "Jumlah barang wajib diisi.";

        valid = false;

    }

    else if (
        !Number.isInteger(qty) ||
        qty < 1
    ) {

        document.getElementById(
            "productQtyError"
        ).textContent =
            "Qty harus berupa bilangan bulat minimal 1.";

        valid = false;

    }


    return valid;

}


// ==========================================
// 6. SIMPAN CART KE LOCAL STORAGE
// ==========================================

function saveCart() {

    localStorage.setItem(
        "miniPOSCart",
        JSON.stringify(cart)
    );


    storageStatus.textContent =
        "Data keranjang berhasil disimpan ke localStorage.";

}


// ==========================================
// 7. TAMBAH BARANG KE KERANJANG
// ==========================================

productForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        // Jalankan validasi

        if (!validateProductForm()) {

            return;

        }


        const name =
            productName.value.trim();

        const price =
            Number(productPrice.value);

        const qty =
            Number(productQty.value);


        // Buat object barang

        const item = {

            id: Date.now(),

            name: name,

            price: price,

            qty: qty,

            subtotal: price * qty

        };


        // Masukkan ke array cart

        cart.push(item);


        // Simpan ke localStorage

        saveCart();


        // Tampilkan ulang keranjang

        renderCart();


        // Reset form setelah berhasil

        productForm.reset();

        clearErrors();

    }
);


// ==========================================
// 8. TAMPILKAN KERANJANG
// ==========================================

function renderCart() {

    cartTableBody.innerHTML = "";


    // Jika keranjang kosong

    if (cart.length === 0) {

        emptyCart.style.display =
            "block";

    }

    else {

        emptyCart.style.display =
            "block";

        emptyCart.textContent = "";


        // Buat setiap baris barang

        cart.forEach(
            function (item, index) {

                const row =
                    document.createElement(
                        "tr"
                    );


                row.innerHTML = `

                    <td>
                        ${index + 1}
                    </td>

                    <td>
                        ${escapeHTML(
                            item.name
                        )}
                    </td>

                    <td>
                        ${formatRupiah(
                            item.price
                        )}
                    </td>

                    <td>
                        ${item.qty}
                    </td>

                    <td>
                        ${formatRupiah(
                            item.subtotal
                        )}
                    </td>

                    <td>

                        <button
                            type="button"
                            class="delete-btn"
                            onclick="deleteItem(${item.id})"
                        >
                            Hapus
                        </button>

                    </td>

                `;


                cartTableBody.appendChild(
                    row
                );

            }
        );

    }


    updateCartCount();

    calculateTotal();

}


// ==========================================
// 9. JUMLAH ITEM DI KERANJANG
// ==========================================

function updateCartCount() {

    const totalQty =
        cart.reduce(
            function (total, item) {

                return total + item.qty;

            },
            0
        );


    cartCount.textContent =
        `${totalQty} item`;

}


// ==========================================
// 10. HITUNG TOTAL BELANJA
// ==========================================

function calculateTotal() {

    const total =
        cart.reduce(
            function (sum, item) {

                return sum + item.subtotal;

            },
            0
        );


    // Diskon 10% jika total >= Rp50.000

    let discountAmount = 0;


    if (total >= 50000) {

        discountAmount =
            total * 0.10;

    }


    const finalTotal =
        total - discountAmount;


    // Tampilkan hasil

    totalBelanja.textContent =
        formatRupiah(total);

    discount.textContent =
        formatRupiah(discountAmount);

    totalAkhir.textContent =
        formatRupiah(finalTotal);


    // Update pembayaran

    calculatePayment(
        finalTotal
    );

}


// ==========================================
// 11. KALKULATOR PEMBAYARAN
// ==========================================

payment.addEventListener(
    "input",
    function () {

        const total =
            getFinalTotal();

        calculatePayment(total);

    }
);


function calculatePayment(finalTotal) {

    const paymentValue =
        Number(payment.value);


    paymentError.textContent = "";


    // Kalau belum ada uang bayar

    if (
        payment.value === ""
    ) {

        paymentResult.textContent =
            "Masukkan uang bayar untuk menghitung kembalian.";

        return;

    }


    // Kalau uang kurang

    if (
        paymentValue < finalTotal
    ) {

        const kurang =
            finalTotal - paymentValue;


        paymentResult.innerHTML = `

            <strong class="not-enough">
                Uang belum mencukupi.
            </strong>

            <p>
                Kekurangan:
                ${formatRupiah(kurang)}
            </p>

        `;

        return;

    }


    // Kalau uang cukup

    const change =
        paymentValue - finalTotal;


    paymentResult.innerHTML = `

        <strong class="enough">
            Pembayaran mencukupi.
        </strong>

        <p>
            Kembalian:
            <strong>
                ${formatRupiah(change)}
            </strong>
        </p>

    `;

}


// ==========================================
// 12. MENGAMBIL TOTAL AKHIR
// ==========================================

function getFinalTotal() {

    const total =
        cart.reduce(
            function (sum, item) {

                return sum + item.subtotal;

            },
            0
        );


    let discountAmount = 0;


    if (total >= 50000) {

        discountAmount =
            total * 0.10;

    }


    return total - discountAmount;

}


// ==========================================
// 13. HAPUS SATU BARANG
// ==========================================

function deleteItem(id) {

    cart =
        cart.filter(
            function (item) {

                return item.id !== id;

            }
        );


    // Simpan perubahan

    saveCart();


    // Render ulang

    renderCart();

}


// ==========================================
// 14. TRANSAKSI BARU
// ==========================================

newTransaction.addEventListener(
    "click",
    function () {

        if (cart.length === 0) {

            productForm.reset();

            payment.value = "";

            clearErrors();

            paymentResult.textContent =
                "Masukkan uang bayar untuk menghitung kembalian.";

            return;

        }


        const confirmation =
            confirm(
                "Yakin ingin memulai transaksi baru? Keranjang akan dikosongkan."
            );


        if (!confirmation) {

            return;

        }


        // Kosongkan array
saveCompletedTransaction();
        cart = [];


        // Hapus LocalStorage

        localStorage.removeItem(
            "miniPOSCart"
        );


        // Reset form

        productForm.reset();

        payment.value = "";


        clearErrors();


        paymentResult.textContent =
            "Masukkan uang bayar untuk menghitung kembalian.";


        storageStatus.textContent =
            "Transaksi baru dimulai. Keranjang telah dikosongkan.";


        // Tampilkan ulang

        renderCart();

    }
);


// ==========================================
// 15. PENGAMAN TEXT
// ==========================================

function escapeHTML(value) {

    const div =
        document.createElement(
            "div"
        );


    div.textContent = value;


    return div.innerHTML;

}


// ==========================================
// 16. LOAD DATA SAAT HALAMAN DIBUKA
// ==========================================

renderCart();
// ==========================================
// CATATAN TRANSAKSI / RIWAYAT
// ==========================================


// Ambil data transaksi sebelumnya

let transactionHistory =
    JSON.parse(
        localStorage.getItem(
            "miniPOSTransactionHistory"
        )
    ) || [];


// Element HTML

const transactionHistoryBody =
    document.getElementById(
        "transactionHistoryBody"
    );

const emptyTransactionHistory =
    document.getElementById(
        "emptyTransactionHistory"
    );

const transactionHistoryCount =
    document.getElementById(
        "transactionHistoryCount"
    );

const clearTransactionHistory =
    document.getElementById(
        "clearTransactionHistory"
    );


// ==========================================
// SIMPAN RIWAYAT TRANSAKSI
// ==========================================

function saveTransactionHistory() {

    localStorage.setItem(
        "miniPOSTransactionHistory",
        JSON.stringify(
            transactionHistory
        )
    );

}


// ==========================================
// MENAMPILKAN RIWAYAT TRANSAKSI
// ==========================================

function renderTransactionHistory() {

    transactionHistoryBody.innerHTML = "";


    transactionHistoryCount.textContent =
        `${transactionHistory.length} transaksi`;


    if (
        transactionHistory.length === 0
    ) {

        emptyTransactionHistory.style.display =
            "block";

        return;

    }


    emptyTransactionHistory.style.display =
        "none";


    transactionHistory.forEach(
        function (transaction, index) {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${transaction.date}
                </td>

                <td>
                    ${formatRupiah(
                        transaction.total
                    )}
                </td>

                <td>
                    ${formatRupiah(
                        transaction.discount
                    )}
                </td>

                <td>
                    ${formatRupiah(
                        transaction.finalTotal
                    )}
                </td>

                <td>
                    ${formatRupiah(
                        transaction.payment
                    )}
                </td>

                <td>
                    ${formatRupiah(
                        transaction.change
                    )}
                </td>

                <td>

                    <button
                        type="button"
                        class="history-delete-btn"
                        onclick="deleteTransactionHistory(${transaction.id})"
                    >
                        Hapus
                    </button>

                </td>

            `;


            transactionHistoryBody.appendChild(
                row
            );

        }
    );

}


// ==========================================
// SIMPAN SATU TRANSAKSI SELESAI
// ==========================================

function saveCompletedTransaction() {

    const paymentValue =
        Number(payment.value);


    const finalTotal =
        getFinalTotal();


    // Jangan simpan kalau keranjang kosong

    if (cart.length === 0) {

        return;

    }


    // Jangan simpan kalau pembayaran kurang

    if (
        paymentValue < finalTotal
    ) {

        return;

    }


    const total =
        cart.reduce(
            function (sum, item) {

                return sum + item.subtotal;

            },
            0
        );


    let discountAmount = 0;


    if (total >= 50000) {

        discountAmount =
            total * 0.10;

    }


    const change =
        paymentValue - finalTotal;


    const transaction = {

        id: Date.now(),

        date:
            new Date().toLocaleString(
                "id-ID"
            ),

        total:
            total,

        discount:
            discountAmount,

        finalTotal:
            finalTotal,

        payment:
            paymentValue,

        change:
            change

    };


    transactionHistory.push(
        transaction
    );


    saveTransactionHistory();

    renderTransactionHistory();

}


// ==========================================
// HAPUS SATU CATATAN
// ==========================================

function deleteTransactionHistory(id) {

    transactionHistory =
        transactionHistory.filter(
            function (transaction) {

                return transaction.id !== id;

            }
        );


    saveTransactionHistory();

    renderTransactionHistory();

}


// ==========================================
// HAPUS SEMUA CATATAN
// ==========================================

clearTransactionHistory.addEventListener(
    "click",
    function () {

        if (
            transactionHistory.length === 0
        ) {

            return;

        }


        const confirmation =
            confirm(
                "Yakin ingin menghapus semua catatan transaksi?"
            );


        if (!confirmation) {

            return;

        }


        transactionHistory = [];


        localStorage.removeItem(
            "miniPOSTransactionHistory"
        );


        renderTransactionHistory();

    }
);


// ==========================================
// TAMPILKAN RIWAYAT SAAT WEBSITE DIBUKA
// ==========================================

renderTransactionHistory();