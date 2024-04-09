// 1-TÜM KOLTUKLARIN KAPSAYICISI CONTAINER İ ÇEK

const container =document.querySelector('.container');
//console.log('container') --->KONTROL

// 4- INFO YU ÇEKME

const infoText=document.querySelector('.infoText')
//console.log(infoText)

// 4- MOIVE LIST ÇEKME

const movieList=document.querySelector('#movie')
//console.log(movieList)

const seatCount=document.getElementById('count')
//console.log(seatCount)

const totalAmount=document.getElementById('amount')
//console.log(totalAmount)

const seats=document.querySelectorAll(".seat:not(.reserved)");
//console.log(seats)

const saveToDatabase=(index)=>{
//console.log('data',index)

    localStorage.setItem('seatsIndex', JSON.stringify(index));

//FİLM VERİSİ KAYDI

    localStorage.setItem('movieIndex',JSON.stringify(movieList.selectedIndex));

};

const getFromDatabase=()=>{
    const dbSelectedSeats=JSON.parse(localStorage.getItem("seatsIndex"));

    if(dbSelectedSeats!==null){
        seats.forEach((seat,index)=>{
            if(dbSelectedSeats.includes(index)){
                seat.classList.add('selected')
            }
        });
    }

const dbSelectedMovie=JSON.parse(localStorage.getItem('movieIndex'))
movieList.selectedIndex=dbSelectedMovie    

};

getFromDatabase();

const createIndex=()=>{
let allSeatsArray=[]

seats.forEach((seat)=>{
    allSeatsArray.push(seat)
});
//console.log(allSeatsArray)

const allSelectedSeatsArray=[]
const allSelectedSeats=container.querySelectorAll('.seat.selected');

allSelectedSeats.forEach((selectedSeat)=>{
    allSelectedSeatsArray.push(selectedSeat)
});

//console.log(allSelectedSeatsArray)

const selectedSeatIndex = allSelectedSeatsArray.map ((selectedSeat) => {
    return allSeatsArray.indexOf(selectedSeat);
});

//console.log(selectedSeatIndex);

saveToDatabase(selectedSeatIndex)

};



// 2- HESAPLAMA İŞLEMİ

const calculateTotal = () => {
    //console.log('çalıştı')-->KONTROL

    createIndex()

    let selectedSeatsCount =
        container.querySelectorAll('.seat.selected').length;
    //console.log(selectedSeatsCount)-->KONTROL

    count.innerText = selectedSeatsCount;

    if (movieList.value) {
        totalAmount.innerText = selectedSeatsCount * movieList.value;
        infoText.classList.add('open');
    } else {
        totalAmount.innerText ="Lütfen Film Seçiniz --";
        infoText.classList.add('open');
    };

    if(selectedSeatsCount){
        infoText.classList.add('open')
    } else {
        infoText.classList.remove('open')
    }
};


// 2- HESAPLAMA İŞLEMİ
//
//const calculateTotal = () => {
//    //console.log('çalıştı')-->KONTROL
//
//    createIndex()
//
//    let selectedSeatsCount=
//        container.querySelectorAll('.seat.selected').length;
////console.log(selectedSeatsCount)-->KONTROL
//
//    count.innerText = selectedSeatsCount;
//    totalAmount.innerText = selectedSeatsCount * movieList.value;
//
//
//    if(selectedSeatsCount){
//        infoText.classList.add('open')
//    } else {
//        infoText.classList.remove('open')
//    }
//};
//
// 3- CONTAINER E CLICK EVENT İ EKLE

container.addEventListener('click',(pointerEvent)=>{
    //console.log('container e tıklandı gardassss')
    //console.log(pointerEvent.target.offsetParent)--> uzun bi fonksiyon kısaca
    const clickedSeat=pointerEvent.target.offsetParent;

    if(
        clickedSeat.classList.contains("seat") &&
        !clickedSeat.classList.contains("reserved")
    ) {
        clickedSeat.classList.toggle('selected');
    }
    calculateTotal();
});

movieList.addEventListener('change', () => {
    calculateTotal()
});




// Projeyi sıfırdan başlatmak için localStorage'ı temizleme
const resetProject = () => {
    localStorage.removeItem('movieIndex');
    localStorage.removeItem('seatsIndex');
    // Diğer anahtarları da gerekirse burada temizleyebilirsiniz
};

// Projeyi her açılışta sıfırdan başlatmak için resetProject fonksiyonunu çağırabilirsiniz
resetProject();