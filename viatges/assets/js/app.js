function renderPackages(){
    const c = document.getElementById('packages')
    packages.forEach(p=>{
        c.innerHTML += `
        <article class="bg-white rounded-3xl shadow overflow-hidden">
            <img src="${p.img}" class="h-56 w-full object-cover" />
            <div class="p-6">
            <h3 class="font-bold text-xl mb-2">${p.title}</h3>
            <p class="text-slate-600 mb-3">${p.days} días · desde €${p.price}</p>
            <button class="text-emerald-600 font-semibold">Ver detalles →</button>
            </div>
        </article>`
    })
}

function initTours(){
    const grid = document.getElementById('toursGrid')
    const regionSel = document.getElementById('filterRegion')
    const typeSel = document.getElementById('filterType')

    ;[...new Set(tours.map(t=>t.region))].forEach(r=>regionSel.innerHTML += `<option>${r}</option>`)
    ;[...new Set(tours.map(t=>t.type))].forEach(t=>typeSel.innerHTML += `<option>${t}</option>`)

    function render(list){
        grid.innerHTML=''
        list.forEach(t=>{
        grid.innerHTML += `
            <article class="bg-white rounded-3xl shadow overflow-hidden">
            <img src="${t.img}" class="h-48 w-full object-cover" />
            <div class="p-5">
                <h4 class="font-semibold">${t.title}</h4>
                <p class="text-sm text-slate-600">${t.region} · ${t.type}</p>
            </div>
            </article>`
        })
    }

    function apply(){
        let f = tours
        if(regionSel.value) f = f.filter(t=>t.region===regionSel.value)
        if(typeSel.value) f = f.filter(t=>t.type===typeSel.value)
        render(f)
    }

    regionSel.onchange = apply
    typeSel.onchange = apply
    render(tours)
}
