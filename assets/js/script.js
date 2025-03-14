//Aos
AOS.init()

//Music
var tempMusic=''
music = document.querySelector('.music')
if(tempMusic){
    music.src =tempMusic
}

//door mulai
function mulai() {
    //back to top
    window.scrollTo(0,0)

    //sound door
    var soundDoor =document.querySelector('.sound-door')
    soundDoor.play()

    //door section
    var doorSection = $('#door-section')
    var doors = document.querySelectorAll('.door')
    doors.forEach(function(door, index){
        var direction = (index === 0) ? -1 : 1 //artinya jika index === 0 maka -1 else 1 (pengkondisian dalam satu baris/ifels satu baris)
        door.style.transform = 'rotateY(' + (70 * direction) + 'deg)'
    })

    //set time out
    setTimeout(function() {
        //music play
        music.play()
        doorSection.css('transform','scale(6)')
    }, 600)

    //set timeout door section
    setTimeout(function() {
        doorSection.css('opacity', 0)
        $('body').removeClass('overflow-hidden')
        $('body').addClass('transition')
        doorSection.css('display','none') 
    },2000) //waktu untuk transisi pintunya bertahan
}

//buton music
var isPlaying = true

function toggleMusic(event) {
    event.preventDefault()
    
    const musicButton = document.getElementById('music-button')
    
    if (isPlaying) {
        musicButton.innerHTML = '<i class="fas fa-fw fa-pause"></i>'
        musicButton.classList.remove('rotate')
        musicButton.style.transform = 'translateY(0)'
        music.pause()
    } else {
        musicButton.innerHTML = '<i class="fas fa-fw fa-compact-disc"></i>'
        musicButton.classList.add('rotate')
        music.play()
    }

    isPlaying =!isPlaying

}

//countdown
var countdownDate = new Date ("May 25, 2025 08:00:00").getTime()

var x =setInterval(function() {
    var now = new Date().getTime()

    var distance = countdownDate - now

    var days = Math.floor(distance / (1000 * 60 * 60 * 24))
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 *60))
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    var seconds = Math.floor((distance % (1000 * 60)) / (1000))

    document.getElementById('countdown-wedding').innerHTML =`
    <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${days}</h5>Hari</div></div>
    <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${hours}</h5>Jam</div></div>
    <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${minutes}</h5>Menit</div></div>
    <div class="col-lg-1 col-3"><div class="text-center p-2 rounded text-light"><h5>${seconds}</h5>Detik</div></div>
    `
    if (distance < 0) {
        clearInterval(x)
        document.getElementById(`countdown-wedding`).innerHTML = "<span class='text-center p-3 rounded text-light m-2'><h2>Sudah dimulai!</h2></span>"
    }
}, 1000)


//nama sambutan
const urlParams = new URLSearchParams(window.location.search)
const panggilan = urlParams.get('p')
const nama =urlParams.get('n')
const namaSambutan = document.querySelector('#nama-sambutan')
namaSambutan.innerText = `${panggilan} ${nama},`

//copy text
/*function copyText(el)
{
    var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim();
    
    var temp = document.createElement("textarea")
    document.body.appendChild(temp)

    temp.value = content.replace(/\s+/g, '')
    temp.select()
    //Document.execCommand(commandId: string, showUI?: boolean | undefined, value?: string | undefined): boolean
    document.execCommand("copy");
    document.body.removeChild(temp);
    jQuery(el).text('Berhasil di copy')

    setTimeout(function () {
        jQuery(el).html(`<i class="fas fa-regular fa-copy"></i>Copy`)
    })
}
*/
//revisi copy text karena yang diatas gagal salin
function copyText(el) {
    // Dapatkan konten teks dari elemen yang sesuai
    var content = jQuery(el).siblings('div.card-container').find('div.card-number').text().trim();

    if (content) {
        // Hilangkan spasi pada konten
        var cleanedContent = content.replace(/\s+/g, '');

        // Salin teks menggunakan Clipboard API
        navigator.clipboard.writeText(cleanedContent).then(() => {
            // Ubah tombol untuk menunjukkan status berhasil
            jQuery(el).text('Berhasil di copy');

            // Kembalikan tombol ke ikon setelah beberapa waktu
            setTimeout(() => {
                jQuery(el).html('<i class="fas fa-regular fa-copy"></i> Copy');
            }, 2000);
        }).catch(err => {
            console.error('Gagal menyalin teks:', err);
            alert('Gagal menyalin teks. Silakan coba lagi.');
        });
    } else {
        alert('Tidak ada teks untuk disalin.');
    }
}

//button submit rsvp
window.addEventListener("load", function() {
    const form = document.getElementById('my-form');
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const data = new FormData(form);
      const action = e.target.action;
      fetch(action, {
        method: 'POST',
        body: data,
      })
      .then(() => {
        alert("Konfirmasi kehadiran berhasil terkirim");
      })
    });
  });
  

  //button submit wish
window.addEventListener("load", function() {
    const form = document.getElementById('my-form-wish');
    form.addEventListener("submit", function(e) {
      e.preventDefault();
      const data = new FormData(form);
      const action = e.target.action;
      fetch(action, {
        method: 'POST',
        body: data,
      })
      .then(() => {
        alert("Ucapan terkirim");
      })
    });
  });
  