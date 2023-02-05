const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const movie = document.getElementById("movie");
const seats = document.querySelectorAll(".seats:not(.reserved)");

container.addEventListener("click", (e) => {
    if(e.target.classList.contains("seats") && !e.target.classList.contains("reserved")){
        e.target.classList.toggle("selected");
        calculateTotal();
    }
});

movie.addEventListener("change", (e) => {
    calculateTotal();
})
const saveToLocalStorage = (indexs) =>{
    localStorage.setItem("selectedSeats", JSON.stringify(indexs));
    localStorage.setItem("selectedMovieIndex", movie.selectedIndex);
}
const calculateTotal = () => {
    const selectedSeats = container.querySelectorAll(".seats.selected");
    const selectedSeatsArr = [];
    const seatsArr = [];
    selectedSeats.forEach((seat) =>{
        selectedSeatsArr.push(seat);
    })
    seats.forEach((seat) =>{
        seatsArr.push(seat);
    })
    let selectedSeatIndexs = selectedSeatsArr.map((seat) => {
        return seatsArr.indexOf(seat);
    })
    let selectedSeatCount = selectedSeats.length;
    count.innerText = selectedSeatCount;
    amount.innerText = selectedSeatCount * movie.value;
    saveToLocalStorage(selectedSeatIndexs);
}

const getFromLocalStorage = () =>{
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach((seat, index) =>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if(selectedMovieIndex != null){
        movie.selectedIndex = selectedMovieIndex;
    }
}
getFromLocalStorage();
calculateTotal();
