const courseData = [
  {id:1,title:"Initiation à l’informatique",category:"Informatique",type:"En ligne",price:0,priceLabel:"Gratuit",duration:"4 modules",lessons:"8 leçons",level:"Débutant",description:"Maîtrisez les bases de l’ordinateur et des outils numériques.",image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",badge:"En ligne",enrolled:74},
  {id:2,title:"Leadership et gestion d’équipe",category:"Développement personnel",type:"Présentiel",price:50,priceLabel:"50 $",duration:"2 jours",lessons:"12 places",level:"Intermédiaire",description:"Développez votre leadership et apprenez à mobiliser une équipe.",image:"https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=900&q=80",badge:"En présentiel",enrolled:32},
  {id:3,title:"Marketing digital",category:"Entrepreneuriat",type:"En ligne",price:0,priceLabel:"Gratuit",duration:"5 modules",lessons:"10 leçons",level:"Débutant",description:"Découvrez les bases du marketing et développez votre visibilité.",image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",badge:"En ligne",enrolled:56},
  {id:4,title:"Formation en électricité",category:"Métiers techniques",type:"Présentiel",price:80,priceLabel:"80 $",duration:"3 jours",lessons:"10 places",level:"Débutant",description:"Acquérez les bases de la sécurité et des installations électriques.",image:"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=900&q=80",badge:"En présentiel",enrolled:18},
  {id:5,title:"Développement personnel",category:"Développement personnel",type:"En ligne",price:0,priceLabel:"Gratuit",duration:"4 modules",lessons:"8 leçons",level:"Débutant",description:"Apprenez à mieux vous organiser et à atteindre vos objectifs.",image:"https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",badge:"En ligne",enrolled:68},
  {id:6,title:"Anglais pratique",category:"Langues",type:"En ligne",price:25,priceLabel:"25 $",duration:"6 modules",lessons:"18 leçons",level:"Débutant",description:"Développez les bases de l’anglais pour vos études et votre travail.",image:"https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=900&q=80",badge:"En ligne",enrolled:41}
];
const newsData = [
  {title:"La Fondation Maïka prépare de nouveaux parcours de formation",date:"12 octobre 2026",category:"À la une",image:"https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=700&q=80",text:"De nouveaux contenus pédagogiques sont en préparation pour accompagner les apprenants dans leur parcours."},
  {title:"Développer ses compétences numériques : par où commencer ?",date:"8 octobre 2026",category:"Conseils",image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=700&q=80",text:"Quelques pistes simples pour commencer à apprendre et progresser régulièrement."},
  {title:"Restez attentifs aux prochaines opportunités",date:"2 octobre 2026",category:"Opportunités",image:"https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=700&q=80",text:"Consultez régulièrement les annonces et les activités publiées par la Fondation."}
];
let currentPage = "home";
let toastTimer;
const $ = (s,root=document)=>root.querySelector(s);
const $$ = (s,root=document)=>[...root.querySelectorAll(s)];

function escapeHTML(value){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function courseCard(c){
  return `<article class="course-card"><div class="course-image" style="background-image:url('${c.image}')"><span class="course-badge ${c.type==='Présentiel'?'presential':''}">${c.badge}</span></div><div class="course-body"><h3>${escapeHTML(c.title)}</h3><p>${escapeHTML(c.description)}</p><div class="course-meta"><span>◷ ${c.duration}</span><span>▤ ${c.lessons}</span></div><div class="course-bottom"><span class="course-price ${c.price?'paid':''}">${c.priceLabel}</span><button class="course-open" data-open-course="${c.id}">Découvrir →</button></div></div></article>`;
}
function renderCourses(){
  $("#featuredCourses").innerHTML=courseData.slice(0,4).map(courseCard).join("");
  filterCourses();
}
function filterCourses(){
  const q=($("#catalogSearch")?.value||"").trim().toLowerCase();
  const cat=$("#categoryFilter")?.value||"";
  const type=$("#typeFilter")?.value||"";
  const items=courseData.filter(c=>(!q||(c.title+" "+c.description+" "+c.category).toLowerCase().includes(q))&&(!cat||c.category===cat)&&(!type||c.type===type));
  $("#catalogCourses").innerHTML=items.length?items.map(courseCard).join(""):`<div class="empty-state" style="grid-column:1/-1"><div class="empty-illustration">⌕</div><h2>Aucune formation trouvée</h2><p>Essayez un autre mot-clé ou modifiez les filtres.</p></div>`;
  $("#courseCount").textContent=`${items.length} formation${items.length!==1?"s":""} disponible${items.length!==1?"s":""}`;
}
function renderNews(){
  const card=n=>`<article class="news-card"><div class="news-thumb" style="background-image:url('${n.image}')"></div><div><small>${escapeHTML(n.category)} · ${escapeHTML(n.date)}</small><h3>${escapeHTML(n.title)}</h3><button class="text-button read-news" data-news="${newsData.indexOf(n)}">Lire l’article →</button></div></article>`;
  $("#homeNews").innerHTML=newsData.slice(0,2).map(card).join("");
  $("#newsPageGrid").innerHTML=newsData.map(card).join("");
}
function renderAdmin(){
  $("#adminCourseRows").innerHTML=courseData.slice(0,4).map((c,i)=>`<tr><td>${escapeHTML(c.title)}</td><td><span class="format-pill ${c.type==='Présentiel'?'presential':''}">${c.type}</span></td><td><span class="table-status ${i===2?'draft':''}">${i===2?'Brouillon':'Publiée'}</span></td><td>${c.enrolled}</td></tr>`).join("");
  const payments=[
    {initials:"MK",name:"M. Kanda",course:"Marketing digital",amount:"50 $"},
    {initials:"LM",name:"Mme Lumu",course:"Leadership",amount:"25 $"},
    {initials:"MB",name:"M. Banza",course:"Électricité",amount:"80 $"},
    {initials:"TN",name:"Mme Tshibanda",course:"Informatique",amount:"Gratuit"}
  ];
  $("#paymentList").innerHTML=payments.map((p,i)=>`<div class="payment-row" data-payment-row="${i}"><span class="payment-avatar">${p.initials}</span><div class="payment-info"><b>${p.name}</b><small>${p.course}</small></div><span class="payment-amount">${p.amount}</span><div class="payment-actions"><button class="approve" aria-label="Valider le paiement" data-payment="approve">✓</button><button class="reject" aria-label="Rejeter le paiement" data-payment="reject">×</button></div></div>`).join("");
}
function navigate(page){
  const target=$("#page-"+page);
  if(!target)return;
  currentPage=page;
  $$(".page").forEach(p=>p.classList.toggle("active",p===target));
  $$(".nav-link[data-page]").forEach(b=>b.classList.toggle("active",b.dataset.page===page));
  const labels={home:"Accueil",courses:"Formations",lesson:"Ma formation",certificates:"Mes certificats",admin:"Tableau de bord",news:"Actualités",resources:"Ressources",opportunities:"Opportunités",about:"À propos"};
  $("#pageCrumb").textContent=labels[page]||"Maïka App";
  $("#sidebar").classList.remove("open");
  window.scrollTo({top:0,behavior:"smooth"});
}
function showToast(message){
  const toast=$("#toast");toast.textContent=message;toast.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove("show"),2800);
}
function openModal(content){
  $("#modalContent").innerHTML=content;$("#modalBackdrop").hidden=false;document.body.style.overflow="hidden";
}
function closeModal(){$("#modalBackdrop").hidden=true;document.body.style.overflow="";}
function openLogin(mode="login"){
  const isCreate=mode==="create";
  openModal(`<h2 id="modalTitle">${isCreate?"Créer votre compte":"Ravi de vous revoir !"}</h2><p class="modal-intro">${isCreate?"Les comptes apprenants sont activés selon les modalités de la Fondation.":"Connectez-vous pour retrouver vos formations et votre progression."}</p><form id="authForm">${isCreate?'<div class="form-field"><label>Nom complet</label><input required placeholder="Votre nom complet"></div>':''}<div class="form-field"><label>Adresse e-mail</label><input type="email" required placeholder="vous@exemple.com"></div><div class="form-field"><label>Mot de passe</label><input type="password" required minlength="6" placeholder="Votre mot de passe"></div><button class="primary-button" type="submit">${isCreate?"Continuer":"Se connecter"}</button></form><p class="modal-note">Prototype de démonstration : l’authentification et la création de compte seront reliées au backend lors de l’intégration.</p>`);
  $("#authForm").addEventListener("submit",e=>{e.preventDefault();closeModal();$("#signinButton").hidden=true;$("#createAccountButton").hidden=true;$("#profileButton").hidden=false;showToast("Connexion de démonstration réussie.");});
}
function openCourse(id){
  const c=courseData.find(x=>x.id===Number(id));if(!c)return;
  openModal(`<span class="eyebrow">${escapeHTML(c.category.toUpperCase())}</span><h2 id="modalTitle">${escapeHTML(c.title)}</h2><p class="modal-intro">${escapeHTML(c.description)}</p><div class="choice-row"><div class="choice-card selected"><b>${c.priceLabel}</b><small>${c.price===0?"Accès gratuit":"Frais de formation"}</small></div><div class="choice-card"><b>${c.type}</b><small>${c.duration} · ${c.lessons}</small></div></div><div class="form-field"><label>Votre adresse e-mail</label><input type="email" id="enrollEmail" placeholder="vous@exemple.com"></div>${c.price?'<div class="form-field"><label>Modalité de paiement</label><select id="paymentMode"><option>Je vais payer et envoyer un justificatif</option><option>Je souhaite des informations sur le paiement</option></select></div>':''}<button class="primary-button" id="enrollSubmit">${c.price?"Demander l’inscription":"S’inscrire à cette formation"}</button><p class="modal-note">${c.price?"L’accès à une formation payante est activé après vérification manuelle du paiement par un responsable.":"Prototype : l’inscription sera enregistrée dans le backend lors de l’intégration."}</p>`);
  $("#enrollSubmit").addEventListener("click",()=>{const email=$("#enrollEmail").value;if(!email||!email.includes("@")){showToast("Veuillez saisir une adresse e-mail valide.");return;}closeModal();if(c.price){showToast("Demande simulée : un responsable devra vérifier le paiement.");}else{navigate("lesson");$("#lessonCourseName").textContent=c.title;$("#lessonTitle").textContent=c.title;showToast("Inscription de démonstration effectuée.");}});
}
function openVideoManager(){
  openModal(`<h2 id="modalTitle">Bibliothèque vidéo</h2><p class="modal-intro">Ajoutez une vidéo à une leçon en téléversant un fichier vers le service vidéo retenu ou en utilisant un lien externe.</p><div class="choice-row"><button class="choice-card selected" data-video-mode="upload"><b>⇧ Téléverser une vidéo</b><small>Fichier envoyé vers un service spécialisé</small></button><button class="choice-card" data-video-mode="link"><b>↗ Ajouter un lien</b><small>Vidéo hébergée sur une plateforme externe</small></button></div><form id="videoForm"><div class="form-field"><label>Formation concernée</label><select required><option value="">Choisir une formation</option>${courseData.map(c=>`<option>${escapeHTML(c.title)}</option>`).join("")}</select></div><div class="form-field"><label>Titre de la leçon</label><input required placeholder="Ex. : Introduction au module"></div><div class="form-field" id="videoInputField"><label>Fichier vidéo</label><input id="videoFile" type="file" accept="video/*"><small style="color:#91a0b4;font-size:10px">Démo uniquement : l’envoi réel nécessite la connexion au service vidéo.</small></div><button class="primary-button" type="submit">Enregistrer la vidéo</button></form><p class="modal-note">Aucune vidéo ne sera stockée durablement dans cette maquette. L’intégration du téléversement et des clés d’accès sera réalisée côté backend.</p>`);
  let mode="upload";
  $$("[data-video-mode]").forEach(b=>b.addEventListener("click",()=>{mode=b.dataset.videoMode;$$("[data-video-mode]").forEach(x=>x.classList.toggle("selected",x===b));$("#videoInputField").innerHTML=mode==="upload"?'<label>Fichier vidéo</label><input id="videoFile" type="file" accept="video/*"><small style="color:#91a0b4;font-size:10px">Démo uniquement : l’envoi réel nécessite la connexion au service vidéo.</small>':'<label>Lien vidéo externe</label><input id="videoUrl" type="url" placeholder="https://...">';}));
  $("#videoForm").addEventListener("submit",e=>{e.preventDefault();closeModal();showToast(mode==="upload"?"Maquette : téléversement à connecter au service vidéo.":"Maquette : lien vidéo prêt à être relié au backend.");});
}
function openNewCourse(){
  openModal(`<h2 id="modalTitle">Nouvelle formation</h2><p class="modal-intro">Ajoutez les informations principales de votre nouvelle formation.</p><form id="newCourseForm"><div class="form-field"><label>Titre de la formation</label><input required id="newTitle" placeholder="Ex. : Entrepreneuriat pratique"></div><div class="form-field"><label>Catégorie</label><select id="newCategory"><option>Informatique</option><option>Développement personnel</option><option>Entrepreneuriat</option><option>Métiers techniques</option><option>Langues</option></select></div><div class="form-field"><label>Format</label><select id="newType"><option>En ligne</option><option>Présentiel</option></select></div><div class="form-field"><label>Prix (USD, 0 si gratuit)</label><input type="number" min="0" value="0" id="newPrice"></div><button class="primary-button">Créer un brouillon</button></form><p class="modal-note">La création est simulée dans cette maquette ; les données seront persistées après connexion au backend.</p>`);
  $("#newCourseForm").addEventListener("submit",e=>{e.preventDefault();const title=$("#newTitle").value.trim();const price=Number($("#newPrice").value)||0;courseData.unshift({id:Date.now(),title,category:$("#newCategory").value,type:$("#newType").value,price,priceLabel:price?price+" $":"Gratuit",duration:"À définir",lessons:"À définir",level:"Débutant",description:"Nouvelle formation proposée par la Fondation Maïka.",image:"https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",badge:$("#newType").value==="En ligne"?"En ligne":"En présentiel",enrolled:0});renderCourses();renderAdmin();closeModal();navigate("courses");showToast("Formation ajoutée à la maquette comme brouillon.");});
}
function showNews(index){const n=newsData[Number(index)];if(!n)return;openModal(`<span class="eyebrow">${escapeHTML(n.category.toUpperCase())} · ${escapeHTML(n.date)}</span><h2 id="modalTitle">${escapeHTML(n.title)}</h2><p class="modal-intro" style="margin-top:15px">${escapeHTML(n.text)}</p><p style="font-size:12px;color:#687b96;line-height:1.8">Retrouvez les prochaines informations sur Maïka App et consultez régulièrement les nouvelles publications de la Fondation.</p><button class="primary-button" id="newsDone">Terminé</button>`);$("#newsDone").addEventListener("click",closeModal);}
function handlePayment(button){
  const row=button.closest("[data-payment-row]");if(!row)return;
  const approve=button.dataset.payment==="approve";row.style.opacity=".45";row.querySelector(".payment-actions").innerHTML=`<span class="status-pill ${approve?"status-green":"status-blue"}">${approve?"Validé":"Rejeté"}</span>`;
  const count=Math.max(0,Number($("#pendingPaymentsCount").textContent)-1);$("#pendingPaymentsCount").textContent=count;
  showToast(approve?"Paiement marqué comme validé dans la maquette.":"Demande marquée comme rejetée dans la maquette.");
}
document.addEventListener("click",e=>{
  const pageButton=e.target.closest("[data-page]");if(pageButton){navigate(pageButton.dataset.page);return;}
  const category=e.target.closest("[data-category]");if(category){navigate("courses");$("#categoryFilter").value=category.dataset.category==="Autres"?"":category.dataset.category;filterCourses();return;}
  const course=e.target.closest("[data-open-course]");if(course){openCourse(course.dataset.openCourse);return;}
  const pay=e.target.closest("[data-payment]");if(pay){handlePayment(pay);return;}
  const news=e.target.closest("[data-news]");if(news){showNews(news.dataset.news);return;}
  if(e.target.closest("#videoManagerButton")||e.target.closest("#videoManagerButton2")){openVideoManager();return;}
  if(e.target.closest("#newCourseButton")){openNewCourse();return;}
  if(e.target.closest("#signinButton")){openLogin("login");return;}
  if(e.target.closest("#createAccountButton")){openLogin("create");return;}
  if(e.target.closest("#profileButton")){openModal('<h2 id="modalTitle">Votre espace apprenant</h2><p class="modal-intro">Vous êtes connecté au prototype de démonstration.</p><button class="primary-button" id="goCertificates">Mes certificats</button>');$("#goCertificates").addEventListener("click",()=>{closeModal();navigate("certificates");});return;}
  if(e.target.closest("#notificationButton")){showToast("Vous êtes à jour : aucune nouvelle notification.");return;}
  if(e.target.closest("#viewAllPayments")){showToast("Les filtres et la liste complète seront reliés au backend.");return;}
  if(e.target.closest(".resource-open")){showToast("La bibliothèque de ressources sera connectée au backend.");return;}
  if(e.target.closest("#modalClose")||e.target.id==="modalBackdrop"){closeModal();return;}
  if(e.target.closest("#menuToggle")){$("#sidebar").classList.toggle("open");return;}
  if(e.target.closest("#videoPlay")){showToast("La lecture vidéo sera activée avec la source vidéo de la leçon.");return;}
  if(e.target.closest("#completeLesson")){const bar=$("#lessonProgressBar");bar.style.width="60%";$("#lessonProgressText").textContent="60 % terminé";$("#progressPercent").textContent="60%";$("#moduleTwoPercent").textContent="60%";$("#moduleTwoBar").style.width="60%";$(".progress-ring").style.background="conic-gradient(var(--blue) 60%,#e7effc 0)";showToast("Progression mise à jour dans la maquette.");return;}
  if(e.target.closest("#downloadCertificate")){showToast("Le PDF réel sera généré par le backend après validation des critères.");return;}
});
$("#heroSearch").addEventListener("submit",e=>{e.preventDefault();navigate("courses");$("#catalogSearch").value=$("#searchInput").value;filterCourses();});
$("#catalogSearch").addEventListener("input",filterCourses);
$("#categoryFilter").addEventListener("change",filterCourses);
$("#typeFilter").addEventListener("change",filterCourses);
$("#modalClose").addEventListener("click",closeModal);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!$("#modalBackdrop").hidden)closeModal();});
$$(".tab-button").forEach(b=>b.addEventListener("click",()=>{$$(".tab-button").forEach(x=>x.classList.toggle("active",x===b));const content={description:'<p>Dans cette leçon, vous découvrirez des techniques simples pour mieux gérer votre temps, hiérarchiser vos tâches et préserver votre énergie.</p><ul><li>Identifier les priorités de la journée.</li><li>Découper un objectif en étapes concrètes.</li><li>Créer une routine adaptée à votre rythme.</li></ul>',notes:'<div class="form-field"><label>Mes notes personnelles</label><textarea placeholder="Notez ici vos idées importantes..."></textarea></div><button class="outline-button" id="saveNotes">Enregistrer mes notes</button>',resources:'<p>Ressources associées à cette leçon :</p><button class="outline-button" id="lessonResource">↓ Guide pratique — PDF</button>'};$("#lessonTabContent").innerHTML=content[b.dataset.tab];}));
renderCourses();renderNews();renderAdmin();
