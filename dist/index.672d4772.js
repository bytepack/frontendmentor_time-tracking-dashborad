const periodRadios = [
    ...document.querySelectorAll("[data-radio]")
];
const items = [
    ...document.querySelectorAll("[data-item]")
];
let allData;
getData().then((d)=>{
    allData = d;
    setupDashboard();
    periodRadios.forEach((radio)=>{
        radio.addEventListener("click", setupDashboard);
    });
});
function setupDashboard() {
    const period = getSelectedPeriod();
    renderDashboard(period);
}
async function getData() {
    const url = "/data.json";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            console.log("Response wasn't OK!");
            return {};
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.log("Yo, some errors happened, err.message: ", err.message);
        return {};
    }
}
function getSelectedPeriod() {
    const checkedRadio = periodRadios.filter((radio)=>radio.checked)[0];
    const checkedLabel = document.querySelector("label[for=" + checkedRadio.id + "]");
    const period = checkedLabel.innerText.toLowerCase();
    return period;
}
function removeLoading() {
    items.forEach((item)=>item.classList.remove("dashboard__item--loading"));
}
function renderDashboard(period) {
    removeLoading();
    items.forEach((item)=>{
        const { current, previous } = allData.find((d)=>d.title.toLowerCase() === item.dataset.item)["timeframes"][period];
        item.querySelector("[data-time]").textContent = current.toString();
        item.querySelector("[data-previous-time]").textContent = previous.toString();
        item.querySelector("[data-hrs]").textContent = current > 1 ? "hrs" : "hr";
        item.querySelector("[data-previous-hrs]").textContent = previous > 1 ? "hrs" : "hr";
        switch(period){
            case "daily":
                item.querySelector("[data-previous-title]").textContent = "Last Day";
                break;
            case "weekly":
                item.querySelector("[data-previous-title]").textContent = "Last Week";
                break;
            case "monthly":
                item.querySelector("[data-previous-title]").textContent = "Last Month";
                break;
        }
    });
}

//# sourceMappingURL=index.672d4772.js.map
