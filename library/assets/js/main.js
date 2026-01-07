// Funcions comunes per renderitzar targetes, gestionar carret i utilitats
function currency(n){ return n.toLocaleString('ca-ES',{style:'currency',currency:'EUR'}); }

function renderCard(book){
    return `
    <article class="bg-white rounded-2xl shadow overflow-hidden">
        <img src="${book.cover}" alt="${escapeHtml(book.title)}" class="h-56 w-full object-cover">
        <div class="p-4">
            <h4 class="font-semibold text-lg mb-1">${escapeHtml(book.title)}</h4>
            <p class="text-sm text-gray-500 mb-3">${escapeHtml(book.author)} · <span class="italic">${escapeHtml(book.category)}</span></p>
            <p class="text-sm text-gray-600 mb-4">${escapeHtml(book.description)}</p>
            <div class="flex items-center justify-between">
                <div class="text-indigo-600 font-bold">${currency(book.price)}</div>
                <div class="flex items-center gap-2">
                    <button onclick="addToCart(${book.id})" class="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm">Afegir</button>
                    <button onclick="viewDetails(${book.id})" class="border px-3 py-1 rounded-lg text-sm">Veure</button>
                </div>
            </div>
        </div>
    </article>
    `;
}

function escapeHtml(str){ return String(str).replace(/[&<>\"]/g, s=>({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;' })[s]); }

// Carret senzill a localStorage
function getCart(){ try{ return JSON.parse(localStorage.getItem('cart')||'[]'); }catch(e){return [];} }
function saveCart(c){ localStorage.setItem('cart', JSON.stringify(c)); }
function addToCart(id){
    const book = books.find(b=>b.id===id);
    if(!book) return;
    const cart = getCart();
    const item = cart.find(i=>i.id===id);
    if(item) item.qty++; else cart.push({id:id, title:book.title, price:book.price, qty:1});
    saveCart(cart);
    updateCartUI();
    toast('Afegit al carret: ' + book.title);
}

function updateCartUI(){
    const count = getCart().reduce((s,i)=>s+i.qty,0);
    document.querySelectorAll('#cartBtn, #cartBtn2').forEach(el=>{ if(el) el.textContent = `Carret (${count})`; });
}

function viewDetails(id){
    const b = books.find(x=>x.id===id);
    if(!b) return;
    alert(`${b.title} — ${b.author}\n\n${b.description}\n\nPreu: ${currency(b.price)}`);
}

function toast(msg){
    let t = document.createElement('div');
    t.className = 'fixed bottom-6 right-6 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg';
    t.textContent = msg; document.body.appendChild(t);
    setTimeout(()=>{ t.classList.add('opacity-0'); setTimeout(()=>t.remove(),400); },1800);
}

// Si s'importa en altres pàgines, actualitza UI
window.addEventListener('DOMContentLoaded', ()=>updateCartUI());