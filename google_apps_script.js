/**
 * ====================================================================
 * GOOGLE APPS SCRIPT - BACKEND UNDANGAN DIGITAL HARI & DILLA
 * Menyimpan & Membaca RSVP & Ucapan Otomatis ke Google Spreadsheet
 * ====================================================================
 * 
 * PANDUAN CEPAT (HANYA 1 - 2 MENIT):
 * --------------------------------------------------------------------
 * 1. Buka Google Spreadsheet baru di https://sheets.google.com
 * 2. Beri nama sheet (contoh: "RSVP Undangan Hari & Dilla")
 * 3. Di baris 1 (Header), buat judul kolom:
 *    - Kolom A: Waktu
 *    - Kolom B: Nam
 *    - Kolom C: Kehadiran
 *    - Kolom D: Jumlah Tamu
 *    - Kolom E: Ucapan & Doa
 * 4. Klik menu: Ekstensi (Extensions) -> Apps Script
 * 5. Hapus semua tulisan di editor Apps Script, lalu COPAS seluruh isi file ini.
 * 6. Klik tombol "Simpan" (ikon disket atau Ctrl+S).
 * 7. Klik tombol biru "Terapkan" (Deploy) -> "Penerapan Baru" (New deployment).
 * 8. Pada ikon roda gigi "Pilih jenis", pilih "Aplikasi Web" (Web app).
 * 9. Konfigurasi penting:
 *    - Deskripsi: RSVP Undangan Hari & Dilla
 *    - Jalankan sebagai (Execute as): Saya (email Google Anda)
 *    - Yang memiliki akses (Who has access): "Siapa saja" (Anyone) <-- WAJIB PILIH INI!
 * 10. Klik "Terapkan" (Deploy) -> Klik "Izinkan Akses" (Authorize access) -> Pilih Akun Google Anda -> Klik "Advanced" -> Klik "Go to Untitled project (unsafe)" -> Klik "Allow".
 * 11. Salin "URL Aplikasi Web" (Web app URL) yang berakhiran "/exec".
 * 12. Buka file `script.js` di project ini, lalu tempelkan URL tersebut ke variabel:
 *     const SPREADSHEET_SCRIPT_URL = "https://script.google.com/macros/s/.../exec";
 * ====================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    // Data dari Form Website Undangan
    var rawData = (e && e.parameter) ? e.parameter : {};

    // Jika data dikirim berupa JSON body
    if (e && e.postData && e.postData.contents) {
      try {
        var jsonBody = JSON.parse(e.postData.contents);
        for (var key in jsonBody) {
          rawData[key] = jsonBody[key];
        }
      } catch (err) { }
    }

    var now = new Date();
    var timestamp = Utilities.formatDate(now, "Asia/Makassar", "dd/MM/yyyy HH:mm:ss") + " WITA";

    var nama = rawData.nama || rawData.name || "Anonim";
    var kehadiran = rawData.kehadiran || rawData.attendance || "Hadir";
    var jumlahTamu = rawData.jumlah_tamu || rawData.guestCount || "1 Orang";
    var ucapan = rawData.ucapan || rawData.message || "";

    // Tambahkan baris baru ke Google Spreadsheet
    sheet.appendRow([timestamp, nama, kehadiran, jumlahTamu, ucapan]);

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "message": "Data RSVP berhasil disimpan!" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = doc.getActiveSheet();

    // Fallback GET Request jika browser mengirim lewat query params
    if (e && e.parameter && (e.parameter.action === "add" || e.parameter.submit === "true" || (e.parameter.nama && e.parameter.ucapan))) {
      var now = new Date();
      var timestamp = Utilities.formatDate(now, "Asia/Makassar", "dd/MM/yyyy HH:mm:ss") + " WITA";

      var nama = e.parameter.nama || e.parameter.name || "Anonim";
      var kehadiran = e.parameter.kehadiran || e.parameter.attendance || "Hadir";
      var jumlahTamu = e.parameter.jumlah_tamu || e.parameter.guestCount || "1 Orang";
      var ucapan = e.parameter.ucapan || e.parameter.message || "";

      sheet.appendRow([timestamp, nama, kehadiran, jumlahTamu, ucapan]);

      return ContentService
        .createTextOutput(JSON.stringify({ "result": "success", "message": "Data berhasil disimpan via GET!" }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    // Membaca semua data ucapan dari Google Spreadsheet untuk ditampilkan di Web
    var rows = sheet.getDataRange().getValues();
    var wishes = [];
    var avatarColors = ['#4a0e17', '#6b1426', '#961c36', '#7d182e', '#851b32'];

    // Lewati baris 0 (Header), baca mulai baris 1
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      if (row[1] && row[1].toString().trim() !== "") {
        var randomColor = avatarColors[(i - 1) % avatarColors.length];
        wishes.unshift({
          id: i,
          time: row[0] ? row[0].toString() : "Baru saja",
          name: row[1] ? row[1].toString() : "Tamu Undangan",
          attendance: row[2] ? row[2].toString() : "Hadir",
          guestCount: row[3] ? row[3].toString() : "1 Orang",
          message: row[4] ? row[4].toString() : "",
          avatarBg: randomColor
        });
      }
    }

    return ContentService
      .createTextOutput(JSON.stringify({ "result": "success", "data": wishes }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ "result": "error", "error": error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
