import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  LayoutDashboard, Droplet, Bell, ChartLine, Users, Truck, Power,
  AlertTriangle, FlaskConical, MapPin, Send, Image as ImageIcon,
  Bolt, Clock, TrendingUp, Search, Activity, CheckCircle2, XCircle,
  AlertCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';

const AdminDash = () => {
  const navigate = useNavigate();
  const posterRef = useRef(null);

  // --- ÉTATS ---
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('vue-globale');
  const [dashboardStats, setDashboardStats] = useState(null);
  const [donors, setDonors] = useState([]);
  const [allPoches, setAllPoches] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showVisuel, setShowVisuel] = useState(false);
  const [alertConfig, setAlertConfig] = useState({ groupe: 'O-', besoin: '' });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // --- LOGIQUE API ---

  const triggerNotify = (msg, type) => {
    setNotification({ show: true, message: msg, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const fetchAdminStats = async () => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      if (!token) return;
      const res = await axios.get('http://127.0.0.1:8000/api/admin/stats-globales', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDashboardStats(res.data);
    } catch (err) {
      console.error("Erreur récupération stats:", err);
    }
  };

  const fetchDonors = async () => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      if (!token) return;
      const res = await axios.get('http://127.0.0.1:8000/api/donors', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDonors(res.data);
    } catch (err) {
      console.error("Erreur récupération donneurs:", err);
    }
  };

  const fetchAllPoches = async () => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      if (!token) return;
      const res = await axios.get('http://127.0.0.1:8000/api/admin/poches', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAllPoches(res.data);
    } catch (err) {
      console.error("Erreur récupération inventaire:", err);
    }
  };

  // --- ACTIONS ---

  const handlePublishAlert = async () => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      if (!alertConfig.besoin) {
        triggerNotify("Veuillez entrer une quantité de poches", "error");
        return;
      }
      await axios.post('http://127.0.0.1:8000/api/admin/publish-alert', {
        group: alertConfig.groupe,
        needed_pockets: alertConfig.besoin,
        location: "CNHU-HKM (COTONOU)"
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowVisuel(true);
      triggerNotify("Alerte de crise publiée", "success");
      fetchAdminStats(); // Rafraîchir pour voir l'urgence active
    } catch (error) {
      triggerNotify("Erreur lors de la publication", "error");
    }
  };

  const handleStopAlert = async () => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      await axios.post('http://127.0.0.1:8000/api/admin/publish-alert', 
        { stop: true }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowVisuel(false); 
      triggerNotify("L'alerte a été retirée", "success");
      fetchAdminStats();
    } catch (error) {
      triggerNotify("Erreur lors de la désactivation", "error");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/'); 
  };

  // --- EFFETS ---

  // 1. Montage du composant
  useEffect(() => {
    const storedUser = localStorage.getItem('USER_DATA');
    if (storedUser) {
      try { setUser(JSON.parse(storedUser)); } catch (e) { console.error(e); }
    }
    fetchAdminStats();
    fetchDonors();
  }, []);

  // 2. Changement d'onglet
  useEffect(() => {
    if (activeTab === 'vue-globale') fetchAdminStats();
    if (activeTab === 'inventaire-detail') fetchAllPoches();
  }, [activeTab]);



  // A mettre avant le return du composant
const updateDonorStatus = async (donorId, newStatus) => {
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    await axios.patch(`http://127.0.0.1:8000/api/donors/${donorId}/status`, 
      { status: newStatus },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    triggerNotify(`Statut mis à jour : ${newStatus}`, "success");
    fetchDonors(); // Recharge la liste
  } catch (error) {
    triggerNotify("Erreur lors de la mise à jour", "error");
  }
};

const downloadPoster = () => {
  if (posterRef.current) {
    html2canvas(posterRef.current).then(canvas => {
      const link = document.createElement('a');
      link.download = `ALERTE-SANG-${alertConfig.groupe}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  }
};
  return (
    <div className="flex min-h-screen text-white bg-transparent font-['Plus_Jakarta_Sans'] p-6 gap-8">
      
      {/* SIDEBAR COMPLÈTE - VERSION ÉPURÉE SANS ITALIQUE */}
<aside className="w-80 glass rounded-[2.5rem] p-8 flex flex-col h-[calc(100vh-3rem)] sticky top-6 shadow-2xl border border-white/5">
  
  
{/* LOGO & TITRE SIDEBAR */}
<div className="flex items-center gap-4 mb-12 px-2">
  <img src="assets/LG1.png" alt="SV" className="w-9 h-9 object-contain" />
  <div className="flex flex-col">
    <span className="text-sm font-bold block leading-none uppercase tracking-tighter text-white/90">
      SANG-VIE — CNHU
    </span>
    <span className="text-[7px] uppercase tracking-[0.2em] text-white/20 font-bold mt-1.5 leading-tight">
      Administration Hospitalière
    </span>
  </div>
</div>

 

  {/* NAVIGATION */}
  <nav className="flex-1 space-y-2">
    <p className="text-[9px] font-bold text-white/10 uppercase tracking-[0.2em] mb-4 ml-4">
      Navigation
    </p>
    {[
      { id: 'vue-globale', label: 'Vue Globale', icon: <LayoutDashboard size={16}/> },
      { id: 'inventaire-detail', label: 'Inventaire Précis', icon: <FlaskConical size={16}/> },
      { id: 'urgence-sang', label: 'Urgence Sang', icon: <Bell size={16} className={activeTab === 'urgence-sang' ? 'text-red-500 animate-pulse' : ''}/> },
      { id: 'analyses', label: 'Analyses & Rapports', icon: <ChartLine size={16}/> },
      { id: 'liste-donneurs', label: 'Base Donneurs', icon: <Users size={16}/> }
    ].map((item) => (
      <button 
        key={item.id}
        onClick={() => setActiveTab(item.id)} 
        className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-[10px] uppercase tracking-tight ${
          activeTab === item.id 
          ? 'bg-white/10 text-white shadow-lg border border-white/5' 
          : 'text-white/30 hover:bg-white/5 hover:text-white'
        }`}
      >
        <span className={activeTab === item.id ? 'text-red-500' : 'text-inherit'}>
          {item.icon}
        </span> 
        {item.label}
      </button>
    ))}
      
    {/* BOUTON ACTION SPÉCIAL */}
    <button 
      onClick={() => setIsModalOpen(true)} 
      className="group w-full flex items-center gap-4 p-5 rounded-[1.8rem] text-red-500 bg-red-500/5 border border-red-500/10 hover:bg-red-600 hover:text-white transition-all duration-500 mt-8 relative overflow-hidden"
    >
      <Truck size={18} />
      <div className="text-left">
        <span className="block text-[10px] font-bold uppercase tracking-wider">Réappro. CNTS</span>
        <span className="block text-[8px] opacity-40 font-bold uppercase tracking-tight">Liaison Directe</span>
      </div>
    </button>
  </nav>

  {/* FOOTER SIDEBAR CORRIGÉ */}
      <div className="mt-auto border-t border-white/5 pt-6 space-y-4">
        {/* Petit badge profil admin */}
        <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 flex items-center justify-center font-bold text-[10px] border border-red-600/30 text-red-500">
            {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : 'AD'}
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-[10px] font-bold text-white truncate uppercase tracking-tighter">
              {user?.name || "Administrateur"}
            </span>
            <span className="text-[7px] text-white/20 font-bold uppercase tracking-widest">En ligne</span>
          </div>
        </div>

        <button 
          onClick={handleLogout} // Utilise la fonction de déconnexion
          className="flex items-center gap-4 p-4 text-white/20 hover:text-red-500 font-bold text-[10px] uppercase transition-colors w-full tracking-widest"
        >
          <Power size={16} /> Déconnexion
        </button>
      </div>
</aside>

      {/* ZONE DE CONTENU DYNAMIQUE */}
      <main className="flex-1">
        <header className="flex justify-between items-center mb-10">
          <div>
            {/* Nom dynamique de l'admin */}
            <h2 className="text-3xl font-black tracking-tighter uppercase">
              {user?.name || "Responsable UTS"}
            </h2>
            <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
              Unité de Traitement : CNHU Cotonou
            </p>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          
          {/* 1. VUE GLOBALE - ALIGNEMENT 100% SUR LE STYLE DU BLOC 4 */}
{activeTab === 'vue-globale' && (
  <div className="animate-in fade-in duration-500 space-y-8">
    
    {/* GRILLE DES KPI - STYLE ÉPURÉ DU BLOC 4 */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {[
        { label: "Stock Total", val: dashboardStats?.total_poches || "0", unit: "Poches", color: "border-red-600", sub: "Flux temps réel" },
        { label: "Urgences UTS", val: dashboardStats?.urgences_actives || "0", unit: "En cours", color: "border-orange-500", sub: "Action immédiate" },
        { label: "Péremption", val: dashboardStats?.poches_perimees || "0", unit: "Poches", color: "border-yellow-600", sub: "Délai < 48h" },
        { label: "Donneurs", val: donors.length, unit: "Inscrits", color: "border-blue-600", sub: "Base Sang-Vie" }
      ].map((s, i) => (
        <div key={i} className="glass p-8 rounded-[2rem] border border-white/10 border-t-2 hover:bg-white/5 transition-colors">
          <div className="flex justify-between items-start mb-6">
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{s.label}</p>
            <div className={`w-2 h-2 rounded-full ${s.color.replace('border-', 'bg-')}`}></div>
          </div>
          
          <div className="flex items-baseline gap-2">
            <h3 className="text-4xl font-medium tracking-tight text-white">{s.val}</h3>
            <span className="text-[10px] text-white/20 font-bold uppercase">{s.unit}</span>
          </div>
          <p className="text-[9px] font-bold uppercase mt-4 text-white/20 tracking-wider">{s.sub}</p>
        </div>
      ))}
    </div>

    {/* HEATMAP - ARRONDIS ET STYLE IDENTIQUE AUX GRAPHIQUES DU BLOC 4 */}
    <div className="glass rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-1 h-6 bg-red-600 rounded-full"></div>
        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
          Heatmap de Disponibilité UTS
        </h4>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
  {['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'].map((g) => {
    
    const count = dashboardStats?.stocks_par_groupe?.[g] || 0;
  
    const isCritical = count < 5;

    return (
      <div 
        key={g} 
        className={`p-6 rounded-[1.5rem] border text-center transition-all ${
          isCritical 
          ? 'bg-red-600/5 border-red-600/20' 
          : 'bg-white/5 border-white/5'
        }`}
      >
        <p className={`text-2xl font-bold mb-1 ${isCritical ? 'text-red-500' : 'text-white/80'}`}>
          {g}
        </p>
        <p className={`text-[8px] font-bold uppercase tracking-tighter ${isCritical ? 'text-red-500/60' : 'text-white/10'}`}>
          {/* On affiche ton texte exact, avec le vrai chiffre à côté */}
          {isCritical ? `CRITIQUE (${count})` : `SÉCURITÉ (${count})`}
        </p>
      </div>
    );
  })}
</div>
    </div>
    {/* RÉPARTITION PAR SERVICE DU CNHU - VERSION CHIFFRÉE UNITAIRE */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
  <div className="glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-4">
        <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Consommation par Service</h4>
      </div>
      <div className="px-3 py-1 bg-blue-500/10 rounded-lg text-[9px] font-bold text-blue-400 uppercase tracking-widest">
        Dernières 24h
      </div>
    </div>

    <div className="grid grid-cols-2 gap-y-10 gap-x-6">
      {[
        { name: "Urgences", val: "45%", trend: "up", color: "text-red-500" },
        { name: "Maternité", val: "28%", trend: "down", color: "text-pink-500" },
        { name: "Réanimation", val: "15%", trend: "up", color: "text-orange-500" },
        { name: "Chirurgie", val: "12%", trend: "stable", color: "text-blue-500" }
      ].map((service, i) => (
        <div key={i} className="flex flex-col gap-1">
          <span className="text-[9px] font-bold uppercase tracking-widest text-white/20">
            {service.name}
          </span>
          <div className="flex items-baseline gap-3">
            <span className={`text-3xl font-medium tracking-tight ${service.color}`}>
              {service.val}
            </span>
            {/* Petit indicateur de tendance discret */}
            <span className={`text-[8px] font-bold ${
              service.trend === 'up' ? 'text-emerald-500' : 
              service.trend === 'down' ? 'text-red-500' : 'text-white/20'
            }`}>
              {service.trend === 'up' ? '▲' : service.trend === 'down' ? '▼' : '●'}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* RÉSUMÉ DES DERNIÈRES SORTIES (RAPPEL) */}
  <div className="glass p-10 rounded-[2.5rem] border border-white/10 shadow-2xl">
    <div className="flex items-center justify-between mb-10">
      <div className="flex items-center gap-4">
        <div className="w-1 h-6 bg-emerald-600 rounded-full"></div>
        <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Dernières Validations</h4>
      </div>
      <Clock size={16} className="text-white/20" />
    </div>
    
    <div className="space-y-4">
      {[
        { id: "#SV-091", gp: "O-", service: "Urgences", time: "5 min" },
        { id: "#SV-104", gp: "A+", service: "Maternité", time: "14 min" },
        { id: "#SV-055", gp: "B-", service: "Chirurgie", time: "1h" }
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black text-red-600 w-6">{item.gp}</span>
            <span className="text-[10px] font-bold text-white/60 tracking-tighter">{item.id}</span>
          </div>
          <span className="text-[9px] font-bold uppercase text-white/20">{item.service}</span>
          <span className="text-[9px] text-white/10">{item.time}</span>
        </div>
      ))}
    </div>
  </div>
</div>

    {/* BARRE DE STATUT BASSE */}
    {/* BARRE DE STATUT BASSE DYNAMIQUE */}
<div className="flex justify-between items-center glass p-8 rounded-[2.5rem] border border-white/10">
  <div className="flex gap-12">
    <div className="space-y-1">
      <p className="text-[9px] font-bold uppercase text-white/20 tracking-widest">Entrées (24h)</p>
      <p className="text-xl font-medium text-emerald-500">
        +{dashboardStats?.entrees_24h || 0} poches
      </p>
    </div>
    <div className="space-y-1">
      <p className="text-[9px] font-bold uppercase text-white/20 tracking-widest">Sorties (24h)</p>
      <p className="text-xl font-medium text-white/80">
        {dashboardStats?.sorties_24h || 0} poches
      </p>
    </div>
  </div>
  
</div>

  </div>
)}


         {/* 2. INVENTAIRE PRÉCIS - SANS ACTIONS */}
{activeTab === 'inventaire-detail' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
    
    {/* En-tête de section */}
    <div className="flex justify-between items-end mb-6 gap-4">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Stock UTS — CNHU</h2>
        <p className="text-white/20 text-[9px] font-bold uppercase tracking-widest mt-1">
          Registre d'hémovigilance en temps réel
        </p>
      </div>
      
      <div className="flex items-center gap-3">
        {/* Filtres existants */}
        <select className="glass bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 text-[9px] font-bold uppercase text-white/40 outline-none focus:border-red-500/50 transition-all cursor-pointer">
          <option className="bg-[#0f0f0f]">Tous Produits</option>
          <option className="bg-[#0f0f0f]">CGR (Globules)</option>
          <option className="bg-[#0f0f0f]">PFC (Plasma)</option>
          <option className="bg-[#0f0f0f]">CPA (Plaquettes)</option>
        </select>

        <select className="glass bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 text-[9px] font-bold uppercase text-white/40 outline-none focus:border-red-500/50 transition-all cursor-pointer">
          <option className="bg-[#0f0f0f]">Tous Statuts</option>
          <option className="bg-[#0f0f0f]">Qualifié</option>
          <option className="bg-[#0f0f0f]">En Analyse</option>
          <option className="bg-[#0f0f0f]">Écarté</option>
          <option className="bg-[#0f0f0f]">Disponible</option>
          <option className="bg-[#0f0f0f]">Sorti</option>
        </select>

        <div className="glass bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2 flex items-center gap-3">
          <Search size={14} className="text-white/20" />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
            placeholder="ID Poche..." 
            className="bg-transparent border-none outline-none text-[10px] font-bold text-white placeholder:text-white/10 uppercase w-24" 
          />
        </div>
      </div>
    </div>

    {/* Tableau principal épuré */}
    <div className="glass rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-white/[0.02] text-[9px] font-bold uppercase text-white/20 tracking-widest border-b border-white/5">
          <tr>
            <th className="p-6">Identifiant</th>
            <th className="p-6">Type</th>
            <th className="p-6">Péremption</th>
            <th className="p-6 text-center">Groupe</th>
            <th className="p-6 text-right">Statut</th> {/* Aligné à droite car c'est la fin de ligne désormais */}
          </tr>
        </thead>
        <tbody className="text-[10px] font-bold uppercase divide-y divide-white/5">
          {allPoches.filter(p => p.code_barre.includes(searchTerm)).map((poche) => {
            const isExpired = new Date(poche.date_peremption) < new Date();
            
            return (
              <tr key={poche.id} className={`${isExpired ? 'bg-red-500/[0.02] border-l-2 border-red-600' : 'hover:bg-white/[0.01] transition-colors group'}`}>
                <td className="p-6 text-red-600 font-black">{poche.code_barre}</td>
                <td className="p-6 text-white/60 font-medium">{poche.type_produit}</td>
                <td className="p-6">
                  <span className={isExpired ? "text-red-500/80" : "text-white/40"}>
                    {isExpired ? "Périmé" : new Date(poche.date_peremption).toLocaleDateString('fr-FR')}
                  </span>
                </td>
                <td className="p-6 text-center">
                  <span className={`bg-white/5 px-2 py-1 rounded border border-white/10 ${isExpired ? 'text-white/20' : 'text-red-500'}`}>
                    {poche.groupe}
                  </span>
                </td>
                <td className="p-6 text-right">
                  <span className={`inline-flex items-center gap-1.5 ${
                    poche.status === 'Disponible' ? 'text-emerald-500' : 
                    poche.status === 'Sorti' ? 'text-blue-500' : 'text-red-500'
                  }`}>
                    {poche.status === 'Disponible' ? <CheckCircle2 size={10} /> : <Activity size={10} />}
                    {poche.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
)}


        {/* 3. URGENCE SANG - SECTION DE TON DASHBOARD */}
{activeTab === 'urgence-sang' && (
  <div className="animate-in fade-in duration-500">
    
    {/* 1. CONFIGURATION DE L'ALERTE */}
    <div className="glass rounded-[2.5rem] p-10 mb-10 border border-white/10 shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-6 mb-10 border-b border-white/10 pb-8">
        <div className="w-12 h-12 bg-red-600/10 border border-red-600/20 rounded-2xl flex items-center justify-center shadow-lg">
          <Bell className="text-red-600" size={20} />
        </div>
        <div>
          <h3 className="text-lg font-bold uppercase tracking-wider text-white/80">Configuration de l'Alerte de Crise</h3>
          <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] mt-1">Génération de visuels de mobilisation nationale</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-end relative z-10">
        <div className="space-y-3">
          <label className="text-[9px] font-bold uppercase text-red-500/80 ml-2 tracking-[0.2em]">1. Groupe Critique</label>
          <select 
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold uppercase tracking-tight outline-none focus:border-red-600 transition-all appearance-none cursor-pointer text-white/70"
            value={alertConfig.groupe}
            onChange={(e) => setAlertConfig({...alertConfig, groupe: e.target.value})}
          >
            <option className="bg-[#0a0a0a]">O- (Universel)</option>
            <option className="bg-[#0a0a0a]">A-</option>
            <option className="bg-[#0a0a0a]">B-</option>
            <option className="bg-[#0a0a0a]">AB-</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="text-[9px] font-bold uppercase text-white/20 ml-2 tracking-[0.2em]">2. Centre Hospitalier</label>
          <input type="text" value="CNHU-HKM (COTONOU)" readOnly className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-xs font-bold uppercase opacity-30 cursor-not-allowed outline-none" />
        </div>

        <div className="space-y-3">
          <label className="text-[9px] font-bold uppercase text-white/20 ml-2 tracking-[0.2em]">3. Besoin (Poches)</label>
          <input 
            type="number" 
            placeholder="quantité"
            value={alertConfig.besoin} 
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-xs font-bold outline-none focus:border-red-600 transition-all text-white/70"
            onChange={(e) => setAlertConfig({...alertConfig, besoin: e.target.value})}
          />
        </div>

        {/* --- MODIFICATION ICI : Alternance des boutons --- */}
        <div className="flex items-center gap-3 w-full">
          {!showVisuel ? (
            <button 
              onClick={handlePublishAlert} 
              className="flex-1 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest shadow-xl shadow-red-900/20 transition-all flex items-center justify-center gap-3"
            >
              Générer <Bolt size={14} />
            </button>
          ) : (
            <button 
              onClick={handleStopAlert}
              className="flex-1 py-4 bg-white/5 hover:bg-red-600 text-white border border-white/10 rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-3"
            >
              Arrêter <XCircle size={14} />
            </button>
          )}
        </div>
      </div>
    </div>

    {/* 2. ZONE DE PRÉVISUALISATION */}
    {!showVisuel ? (
      <div className="glass rounded-[2.5rem] p-24 border border-dashed border-white/10 flex flex-col items-center justify-center text-center opacity-40">
        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/5">
          <ImageIcon className="text-white/20" size={32} />
        </div>
        <h4 className="text-[9px] font-bold uppercase text-white/20 tracking-[0.4em]">Le visuel s'affichera ici</h4>
      </div>
    ) : (
      <div className="animate-in zoom-in-95 duration-500 flex flex-col items-center pb-20">
        
        {/* --- MODIFICATION ICI : AJOUT DE LA REF SUR TON POSTER --- */}
        <div ref={posterRef} className="bg-white p-16 rounded-[2rem] text-black w-full max-w-2xl shadow-[0_50px_100px_rgba(0,0,0,0.4)] border-[1px] border-black/10 relative overflow-hidden">
          <div className="absolute top-8 right-8 flex items-center gap-2">
            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
            <span className="font-bold uppercase text-[10px] tracking-widest">Alerte Prioritaire</span>
          </div>
          
          <div className="flex justify-between items-start mb-16">
            <div className="flex flex-col">
              <span className="text-3xl font-medium tracking-tighter leading-none">SANG-VIE</span>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] opacity-30 mt-1">Plateforme Nationale</span>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-bold uppercase">Cotonou, Bénin</p>
              <p className="text-[10px] font-medium text-black/40 uppercase tracking-tight mt-1">30 Mars 2026</p>
            </div>
          </div>

          <div className="flex items-center gap-12 mb-16 py-12 border-y-[1px] border-black/10">
            <div className="bg-black text-white w-40 h-40 rounded-[2.5rem] flex items-center justify-center shadow-2xl shrink-0">
              <span className="text-7xl font-medium tracking-tighter">{alertConfig.groupe.split(' ')[0]}</span>
            </div>
            <div className="flex-1">
              <h2 className="text-5xl font-medium uppercase leading-[0.9] tracking-tighter mb-4">Besoin<br />Immédiat</h2>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-red-600">Urgence : CNHU-HKM</p>
            </div>
          </div>

          <p className="text-xl font-medium uppercase leading-relaxed mb-16 px-2">
            Mobilisation pour <span className="text-red-600 font-bold border-b-2 border-red-600 pb-1">{alertConfig.besoin || "XX"}</span> donneurs afin de sécuriser les interventions de réanimation.
          </p>

          <div className="flex justify-between items-end pt-10 border-t border-black/5">
            <div>
              <p className="text-[9px] font-bold uppercase text-black/30 mb-2 tracking-widest">Contact Direct</p>
              <p className="text-2xl font-medium tracking-tighter">+229 90 00 00 00</p>
            </div>
            <div className="bg-black text-white px-6 py-3 rounded-xl font-bold text-[10px] uppercase tracking-[0.2em]">
              #SangVieBénin
            </div>
          </div>

          <div className="absolute -bottom-20 -right-20 opacity-[0.03] pointer-events-none">
            <Droplet size={300} />
          </div>
        </div>

        {/* OPTIONS DE DIFFUSION */}
        <div className="flex flex-wrap justify-center gap-6 mt-16">
          
          <button 
            onClick={downloadPoster}
            className="px-10 py-5 bg-white text-black rounded-2xl font-bold uppercase text-[9px] tracking-[0.2em] flex items-center gap-4 transition-all hover:bg-red-600 hover:text-white"
          >
            <ImageIcon size={16} /> Télécharger
          </button>
        </div>
      </div>
    )}
  </div>
)}

          {/* 4. ANALYSES & RAPPORTS - DESIGN ÉPURÉ */}
{activeTab === 'analyses' && (
  <div className="animate-in fade-in duration-500 space-y-8">
    
    {/* SECTION HAUTE : CARTES DE DONNÉES CLAIRES */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {[
        { label: "Taux de Péremption", val: "1.4", unit: "%", trend: "-2% vs M-1", color: "text-red-500" },
        { label: "Réactivité Moyenne", val: "14.2", unit: "min", trend: "FAST", color: "text-emerald-500" },
        { label: "Volume Mensuel", val: "842", unit: "Poches", trend: "Stable", color: "text-blue-500" }
      ].map((kpi, i) => (
        <div key={i} className="glass rounded-[2rem] p-8 border border-white/10 hover:bg-white/5 transition-colors">
          <div className="flex justify-between items-center mb-6">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/40">{kpi.label}</p>
            <span className={`text-[9px] font-bold px-2 py-1 rounded bg-white/5 border border-white/10 ${kpi.color}`}>
              {kpi.trend}
            </span>
          </div>
          
          <div className="flex items-baseline gap-2">
            <h3 className={`text-5xl font-medium tracking-tight ${kpi.color}`}>
              {kpi.val}
            </h3>
            <span className="text-sm font-bold uppercase opacity-20">{kpi.unit}</span>
          </div>
        </div>
      ))}
    </div>

    {/* SECTION CENTRALE : RÉPARTITION SANS BARRES */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      {/* CARD : CONSOMMATION PAR GROUPE */}
      <div className="glass rounded-[2rem] p-10 border border-white/10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-6 bg-red-600 rounded-full"></div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/60">Demande par Groupe</h4>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { g: "O+", p: "45%", desc: "Majoritaire" },
            { g: "O-", p: "30%", desc: "Universel" },
            { g: "A+", p: "15%", desc: "Stable" },
            { g: "Autres", p: "10%", desc: "Rare" }
          ].map((item, idx) => (
            <div key={idx} className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] text-white/40 font-bold uppercase mb-1">{item.g}</p>
              <p className="text-2xl font-bold text-white mb-1">{item.p}</p>
              <p className="text-[9px] text-white/20 uppercase font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CARD : FLUX SERVICES */}
      <div className="glass rounded-[2rem] p-10 border border-white/10">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-1 h-6 bg-white/20 rounded-full"></div>
          <h4 className="text-[11px] font-bold uppercase tracking-widest text-white/60">Distribution par Service</h4>
        </div>

        <div className="space-y-3">
          {[
            { s: "Urgences & Réanimation", v: "312", active: true },
            { s: "Maternité (Gynéco)", v: "245", active: false },
            { s: "Bloc Chirurgical", v: "180", active: false },
            { s: "Hématologie", v: "105", active: false }
          ].map((service, i) => (
            <div key={i} className={`flex items-center justify-between p-5 rounded-xl border ${service.active ? 'bg-red-600/10 border-red-600/30' : 'bg-white/5 border-white/5'}`}>
              <span className="text-[10px] font-bold uppercase tracking-wide text-white/80">{service.s}</span>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-white">{service.v}</span>
                <span className="text-[9px] font-bold text-white/20 uppercase">Poches</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* PIED DE PAGE : ACTION SIMPLE */}
    <div className="flex justify-end pt-4">
      <button className="flex items-center gap-3 px-8 py-4 bg-white text-black rounded-xl font-bold uppercase text-[10px] tracking-wider hover:bg-red-600 hover:text-white transition-all shadow-xl">
        <ChartLine size={16} />
        Exporter le Rapport PDF
      </button>
    </div>
  </div>
)}

  
         {/* 5. BASE DONNEURS - ALIGNEMENT STYLE BLOC 4 */}
{activeTab === 'liste-donneurs' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="glass rounded-[2.5rem] border border-white/10 overflow-hidden shadow-2xl">
      <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
        <div>
          <h3 className="text-xl font-bold uppercase tracking-tight text-white">Registre des Donneurs</h3>
          <p className="text-[10px] text-white/20 font-bold uppercase tracking-[0.2em] mt-1">Validation et certification des profils</p>
        </div>
        <div className="flex gap-2">
           <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
             {donors.filter(d => d.status === 'verified').length} Vérifiés
           </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 uppercase text-[9px] font-bold tracking-[0.2em] text-white/30">
              <th className="px-8 py-6">Donneur</th>
              <th className="px-8 py-6">Groupe</th>
              <th className="px-8 py-6">Contact</th>
              <th className="px-8 py-6">Statut</th>
              <th className="px-8 py-6 text-right">Actions</th>
              <th className="px-8 py-6">Dernier Don</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {donors.map((donor) => (
              <tr key={donor.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-8 py-6">
                  <div className="font-bold text-sm text-white">{donor.fullname}</div>
                  <div className="text-[10px] text-white/20 uppercase tracking-wider">{donor.city}</div>
                </td>
                <td className="px-8 py-6">
                  <span className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center text-red-500 font-bold">
                    {donor.blood_group}
                  </span>
                </td>
                <td className="px-8 py-6 font-mono text-xs text-white/60">{donor.phone}</td>
                <td className="px-8 py-6">
                  <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-tighter ${
                    donor.status === 'verified' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                    donor.status === 'deferred' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                    'bg-white/5 text-white/40 border border-white/10'
                  }`}>
                    {donor.status === 'verified' ? 'Vérifié' : 
                     donor.status === 'deferred' ? 'Ajourné' : 'En attente'}
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {donor.status !== 'verified' && (
                      <button 
                        onClick={() => updateDonorStatus(donor.id, 'verified')}
                        className="p-2 bg-emerald-500/10 hover:bg-emerald-500 text-emerald-500 hover:text-white rounded-lg transition-all"
                        title="Valider le donneur"
                      >
                        <CheckCircle2 size={16} />
                      </button>
                    )}
                    {donor.status !== 'deferred' && (
                      <button 
                        onClick={() => updateDonorStatus(donor.id, 'deferred')}
                        className="p-2 bg-orange-500/10 hover:bg-orange-500 text-orange-500 hover:text-white rounded-lg transition-all"
                        title="Ajourner / Indisponible"
                      >
                        <Clock size={16} />
                      </button>
                    )}
                  </div>
                </td>
                <td className="px-8 py-6 text-xs text-white/40">
                  {donor.last_donation_date 
                    ? new Date(donor.last_donation_date).toLocaleDateString('fr-FR') 
                    : 'Jamais'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {donors.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-white/20 text-xs uppercase tracking-widest font-bold">Aucun donneur enregistré</p>
          </div>
        )}
      </div>
    </div>
  </div>
)}
        </div>
      </main>

      {/* MODALE CNTS LIAISON DIRECTE */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/95 backdrop-blur-2xl">
          <div className="absolute inset-0" onClick={() => setIsModalOpen(false)}></div>
          <div className="glass w-full max-w-lg rounded-[4rem] p-12 relative z-10 border border-white/10 shadow-[0_50px_100px_rgba(220,38,38,0.2)] animate-in zoom-in-95 duration-300">
            <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-2 text-white">Liaison <span className="text-red-600 underline decoration-red-600 underline-offset-4">CNTS</span></h3>
            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-10 italic italic">Commande d'Urgence Nationale - Système Twilio</p>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase text-white/20 italic ml-4">Produit Requis</label>
                <select className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-xs font-black uppercase italic outline-none focus:border-red-600 transition-all appearance-none cursor-pointer">
                  <option className="bg-[#0a0a0a]">CGR (Concentré de Globules Rouges)</option>
                  <option className="bg-[#0a0a0a]">PFC (Plasma Frais Congelé)</option>
                  <option className="bg-[#0a0a0a]">CP (Concentré de Plaquettes)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-white/20 italic ml-4">Groupe</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-xs font-black uppercase italic outline-none focus:border-red-600 transition-all appearance-none cursor-pointer">
                    <option className="bg-[#0a0a0a]">O-</option>
                    <option className="bg-[#0a0a0a]">O+</option>
                  </select>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase text-white/20 italic ml-4">Quantité</label>
                  <input type="number" placeholder="POCHES..." className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 text-xs font-black uppercase italic outline-none focus:border-red-600 transition-all" />
                </div>
              </div>

              <button 
                onClick={() => {
                  alert("Signal transmis au CNTS !");
                  setIsModalOpen(false);
                }}
                className="w-full bg-white text-black p-7 rounded-[2rem] text-[12px] font-black uppercase italic flex items-center justify-center gap-4 hover:scale-[1.03] active:scale-95 transition-all shadow-2xl mt-4"
              >
                <Send size={20} className="text-emerald-600" /> Transmettre au Régulateur
              </button>
            </div>
          </div>
          
        </div>
      )}
      {notification.show && (
  <div className="fixed top-10 right-10 z-[100] animate-in slide-in-from-right-10 duration-500">
    <div className={`glass flex items-center gap-4 px-6 py-4 rounded-[1.5rem] border shadow-2xl relative overflow-hidden ${
      notification.type === 'success' ? 'border-emerald-500/50' : 'border-red-500/50'
    }`}>
      {/* Icône */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        notification.type === 'success' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-red-500/20 text-red-500'
      }`}>
        {notification.type === 'success' ? <CheckCircle2 size={18} /> : <AlertTriangle size={18} />}
      </div>

      {/* Texte */}
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 leading-none mb-1">
          Système Sang-Vie
        </p>
        <p className="text-xs font-bold text-white tracking-wide">
          {notification.message}
        </p>
      </div>

      {/* Barre de progression */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-white/10 w-full overflow-hidden">
        <div className={`h-full animate-progress-shrink ${
          notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
        }`} />
      </div>
    </div>
  </div>
)}
    </div>
    
  );
  
};


export default AdminDash;