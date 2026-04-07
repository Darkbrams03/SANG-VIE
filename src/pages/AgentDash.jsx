import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  PlusSquare, Truck, Trash2, ClipboardList, FileOutput, Power,
  Search, Filter, ArrowUpRight, Calendar, CheckCircle2, 
  FlaskConical, Inbox, Bell, Activity, Clock, ShieldCheck, AlertTriangle
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';




const AgentDash = () => {


  const [user, setUser] = useState(null);

useEffect(() => {
  
  fetchDashboardData();

  // 2. Charger l'utilisateur
  const storedUser = localStorage.getItem('USER_DATA'); 
  if (storedUser) {
    try {
      setUser(JSON.parse(storedUser));
    } catch (e) {
      console.error("Erreur de lecture du localStorage", e);
    }
  }
}, []);
    
  const [activeTab, setActiveTab] = useState('vue-globale');
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentActivity, setRecentActivity] = useState([]);
  const [sortiesHistory, setSortiesHistory] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [regEntreeSearch, setRegEntreeSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroupe, setSelectedGroupe] = useState('');
  const [selectedPoche, setSelectedPoche] = useState(null);
  const [formData, setFormData] = useState({
    code_barre: '',
    type_produit: 'CGR',
    date_prelevement: '',
    date_peremption: ''
  });
  const [sortieData, setSortieData] = useState({
    motif: 'Transfusion Urgente',
    service: ''
  });

 



  const [stats, setStats] = useState([
    { label: 'Total Stock', val: '0', icon: Inbox, color: 'text-blue-400' },
    { label: 'En Analyse', val: '0', icon: FlaskConical, color: 'text-amber-400' },
    { label: 'Sorties Jour', val: '0', icon: Truck, color: 'text-emerald-400' },
    { label: 'Alertes', val: '0', icon: Bell, color: 'text-red-400' },
  ]);

  const navigate = useNavigate();

  // --- 2. LOGIQUE DE FILTRAGE (CORRIGÉE) ---
  
  const filteredRegEntree = stocks.filter(poche => 
    (poche.code_barre || "").toLowerCase().includes(regEntreeSearch.toLowerCase()) ||
    (poche.groupe || "").toLowerCase().includes(regEntreeSearch.toLowerCase())
  );


  //  Filtrage pour le registre des sorties
  const filteredRegSortie = (sortiesHistory || []).filter(poche => 
  (poche.code_barre || "").toLowerCase().includes(regEntreeSearch.toLowerCase()) ||
  (poche.groupe || "").toLowerCase().includes(regEntreeSearch.toLowerCase())
);

  const filteredStocks = stocks.filter(poche => 
    (poche.code_barre || poche.id || "").toLowerCase().includes(searchTerm.toLowerCase()) &&
    poche.status === 'Disponible'
  );

  // --- 3. LOGIQUE API ---

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      const response = await axios.get('http://127.0.0.1:8000/api/agent/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      });

      setStocks(response.data.stocks || []);
      setRecentActivity(response.data.recent_activity || []);
      setSortiesHistory(response.data.sorties || []);
      
      if (response.data.stats) {
        setStats([
          { label: 'Total Stock', val: response.data.stats.total || '0', icon: Inbox, color: 'text-blue-400' },
          { label: 'En Analyse', val: response.data.stats.analysis || '0', icon: FlaskConical, color: 'text-amber-400' },
          { label: 'Sorties Jour', val: response.data.stats.outputs || '0', icon: Truck, color: 'text-emerald-400' },
          { label: 'Alertes', val: response.data.stats.alerts || '0', icon: Bell, color: 'text-red-400' },
        ]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Erreur de chargement", error);
      setLoading(false);
    }
  };

 

  

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const showToast = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.code_barre || !selectedGroupe || !formData.date_prelevement || !formData.date_peremption) {
      return showToast("Veuillez remplir tous les champs obligatoires !", "error");
    }
    try {
      const token = localStorage.getItem('ACCESS_TOKEN');
      await axios.post('http://127.0.0.1:8000/api/poches', { ...formData, groupe: selectedGroupe, status: 'Disponible' }, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
      });
      showToast("Poche enregistrée avec succès !");
      setFormData({ code_barre: '', type_produit: 'CGR', date_prelevement: '', date_peremption: '' });
      setSelectedGroupe('');
      setTimeout(() => { fetchDashboardData(); setActiveTab('vue-globale'); }, 800);
    } catch (error) {
      showToast(error.response?.data?.message || "Erreur de connexion", "error");
    }
  };

 const handleSortie = async () => {
  if(!selectedPoche) return showToast("Veuillez sélectionner une poche !", "error");
  try {
    const token = localStorage.getItem('ACCESS_TOKEN');
    // On n'envoie plus le nom en dur ici, Laravel s'en occupe
    await axios.post(`http://127.0.0.1:8000/api/poches/${selectedPoche.id}/sortie`, sortieData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    showToast("Sortie validée avec succès !");
    setSelectedPoche(null);
    fetchDashboardData(); 
  } catch (error) {
    showToast("Impossible de valider la sortie", "error");
  }
};
  const handleLogout = () => {
    localStorage.removeItem('ACCESS_TOKEN');
    localStorage.removeItem('USER_DATA');
    localStorage.removeItem('USER_ROLE');
    navigate('/'); 
  };

  return (
    <div className="flex p-6 gap-8 min-h-screen text-white bg-transparent font-['Plus_Jakarta_Sans']">
      
      {/* SIDEBAR */}
      <aside className="w-80 glass rounded-[2.5rem] p-8 flex flex-col h-[calc(100vh-3rem)] sticky top-6 border border-white/5 shadow-2xl">
        <div className="flex items-center gap-4 mb-12 px-2">
          <img src="assets/LG1.png" alt="SV" className="w-9 h-9 object-contain" />
          <div>
            <span className="text-lg font-bold block leading-none tracking-tight">SANG-VIE</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/20 font-semibold">Agent UTS</span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <button onClick={() => setActiveTab('vue-globale')} className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'vue-globale' ? 'bg-white/10 text-white border border-white/10' : 'text-white/30 hover:text-white'}`}>
            <Activity size={17} /> Vue Globale
          </button>
          
          <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.2em] mt-8 mb-4 ml-4">Opérations</p>
          <button onClick={() => setActiveTab('mod-entree')} className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'mod-entree' ? 'bg-white/5 text-white border border-white/5' : 'text-white/30 hover:text-white'}`}>
            <PlusSquare size={17} /> Réception
          </button>
          <button onClick={() => setActiveTab('mod-sortie')} className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'mod-sortie' ? 'bg-white/5 text-white border border-white/5' : 'text-white/30 hover:text-white'}`}>
            <Truck size={17} /> Sortie
          </button>
          
          <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.2em] mt-8 mb-4 ml-4">Archives</p>
          <button onClick={() => setActiveTab('reg-entree')} className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'reg-entree' ? 'bg-white/5 text-white border border-white/5' : 'text-white/30 hover:text-white'}`}>
            <ClipboardList size={17} /> Registres des Entrées
          </button>
          <button onClick={() => setActiveTab('reg-sortie')} className={`w-full flex items-center gap-3 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'reg-sortie' ? 'bg-white/5 text-white border border-white/5' : 'text-white/30 hover:text-white'}`}>
            <FileOutput size={17} /> Registres des Sorties
          </button>
        </nav>

        <div className="mt-auto pt-6 border-t border-white/5 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center font-bold text-[10px] border border-emerald-500/20 text-emerald-500">
          {user?.name ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) : '??'}
        </div>
        <div className="flex flex-col">
          <p className="text-xs font-bold uppercase tracking-tighter text-white/80">
            {user?.name || 'Agent UTS'}
          </p>
          <div className="flex items-center gap-1">
            <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
            <p className="text-[8px] text-white/20 uppercase tracking-widest font-medium">En ligne</p>
          </div>
        </div>
      </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        <header className="flex justify-end mb-10">
          <button className="glass px-5 py-3 rounded-xl border border-white/5 text-red-500/50 hover:text-red-500 transition-all flex items-center gap-3 group" onClick={handleLogout}>
            <span className="text-[10px] font-bold uppercase tracking-widest group-hover:text-red-400">Déconnexion</span>
            <Power size={16} />
          </button>
        </header>

        {/* ONGLET RÉCAPITULATIF : VUE GLOBALE */}
        {activeTab === 'vue-globale' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-white tracking-tight">Tableau de Bord Agent</h2>
              <p className="text-white/20 text-sm mt-1">Résumé en temps réel de votre unité de stock.</p>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-10">
              {stats.map((s, i) => (
                <div key={i} className="glass p-6 rounded-[2rem] border border-white/5">
                  <div className={`w-10 h-10 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-center mb-4 ${s.color}`}>
                    <s.icon size={20} />
                  </div>
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{s.label}</p>
                  <p className="text-2xl font-bold text-white mt-1">{loading ? '...' : s.val}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-8">
              <div className="col-span-2 glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                <div className="p-6 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Flux Récents</h3>
                  <button className="text-[10px] font-bold text-blue-400 hover:underline uppercase tracking-tighter">Voir tout</button>
                </div>
                <table className="w-full text-left">
                  <tbody className="divide-y divide-white/5">
                    {recentActivity.map((act, i) => (
                      <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-2 h-2 rounded-full ${act.type === 'Entrée' ? 'bg-blue-500' : act.type === 'Sortie' ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
                            <span className="text-sm font-bold text-white/80">{act.id}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-[11px] font-bold text-white/20 uppercase">{act.type}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 rounded bg-white/5 text-white/60 text-[10px] font-bold">{act.groupe}</span>
                        </td>
                        <td className="px-6 py-4 text-[11px] text-white/20 italic">{act.heure}</td>
                        <td className="px-6 py-4 text-right">
                          <ArrowUpRight size={14} className="text-white/10 group-hover:text-white transition-all ml-auto" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="space-y-6">
                <div className="glass p-8 rounded-[2.5rem] border border-white/5">
                  <div className="flex items-center gap-3 mb-6">
                    <ShieldCheck className="text-emerald-500" size={20} />
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Qualif. Bio</h3>
                  </div>
                  <p className="text-2xl font-bold text-white">{loading ? '..' : stats[1].val} <small className="text-[10px] text-white/20 font-normal">Poches</small></p>
                  <p className="text-[11px] text-white/30 mt-2 leading-relaxed">En attente de confirmation sérologique avant mise en stock public.</p>
                </div>

                <div className="glass p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-br from-red-500/[0.02] to-transparent">
                  <div className="flex items-center gap-3 mb-6">
                    <Clock className="text-red-400" size={20} />
                    <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Péremption</h3>
                  </div>
                  <p className="text-2xl font-bold text-white">03 <small className="text-[10px] text-white/20 font-normal">Poches</small></p>
                  <p className="text-[11px] text-white/30 mt-2 leading-relaxed">Unités arrivant à échéance sous 48h. Action requise.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. FORMULAIRE DE RÉCEPTION (ENTRÉE EN STOCK) */}
       {activeTab === 'mod-entree' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-4xl">
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-white tracking-tight">Réception de Poche</h2>
      <p className="text-white/20 text-sm mt-1 uppercase tracking-widest font-bold text-[10px]">
        Enregistrement d'un nouveau don dans le système
      </p>
    </div>

    <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-8">
      {/* SECTION GAUCHE : IDENTIFICATION */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <PlusSquare size={18} />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Identification</h3>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-white/20 uppercase mb-2 ml-1">ID Unique de la Poche</label>
          <input 
            type="text" 
            name="code_barre"
            value={formData.code_barre}
            onChange={handleInputChange}
            placeholder="#SV-BJ-2026-XXXX" 
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white outline-none focus:border-blue-500/50 transition-all" 
            required 
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-white/20 uppercase mb-2 ml-1">Type de Produit Sanguin</label>
          <select 
            name="type_produit"
            value={formData.type_produit}
            onChange={handleInputChange}
            className="w-full bg-[#0f0f0f] border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white/60 outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
          >
            <option value="CGR">CGR (Concentré de Globules Rouges)</option>
            <option value="PFC">PFC (Plasma Frais Congelé)</option>
            <option value="CPA">CPA (Concentré de Plaquettes Aphérèse)</option>
          </select>
        </div>
      </div>

      {/* SECTION DROITE : DATES & TYPAGE */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5 space-y-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <Calendar size={18} />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Dates & Typage</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-bold text-white/20 uppercase mb-2 ml-1">Date Collecte</label>
            <input 
              type="date" 
              name="date_prelevement"
              onChange={handleInputChange}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-4 text-xs font-bold text-white/60 outline-none focus:border-emerald-500/50" 
              required
            />
          </div>
          <div>
            <label className="block text-[10px] font-bold text-white/20 uppercase mb-2 ml-1">Péremption</label>
            <input 
              type="date" 
              name="date_peremption"
              onChange={handleInputChange}
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-4 py-4 text-xs font-bold text-white/60 outline-none focus:border-red-500/50" 
              required
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-bold text-white/20 uppercase mb-2 ml-1">Groupe Sanguin</label>
          <div className="grid grid-cols-4 gap-2">
            {['O+', 'O-', 'A+', 'A-', 'B+', 'B-', 'AB+', 'AB-'].map((gp) => (
              <button 
                key={gp} 
                type="button" 
                onClick={() => setSelectedGroupe(gp)}
                className={`py-3 rounded-xl border transition-all active:scale-95 text-[10px] font-bold ${
                  selectedGroupe === gp 
                  ? 'bg-red-600 border-red-600 text-white shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
                  : 'border-white/5 bg-white/[0.02] text-white/60 hover:bg-white/5'
                }`}
              >
                {gp}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* BOUTON VALIDATION */}
      <div className="col-span-2">
        <button 
          type="submit"
          className="w-full glass py-6 rounded-[2rem] border border-white/10 flex items-center justify-center gap-4 group hover:bg-white/5 transition-all shadow-xl"
        >
          <div className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center group-hover:scale-110 transition-transform">
            <CheckCircle2 size={20} />
          </div>
          <span className="text-sm font-bold uppercase tracking-[0.3em]">Confirmer l'entrée en stock</span>
        </button>
      </div>
    </form>
    {/* SYSTÈME DE NOTIFICATION STYLISÉ */}
{notification.show && (
  <div className="fixed bottom-10 right-10 z-[100] animate-in fade-in slide-in-from-right-10 duration-500">
    <div className={`glass px-8 py-5 rounded-3xl border flex items-center gap-4 shadow-2xl ${
      notification.type === 'error' ? 'border-red-500/50 bg-red-500/5' : 'border-emerald-500/50 bg-emerald-500/5'
    }`}>
      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
        notification.type === 'error' ? 'bg-red-500 text-white' : 'bg-emerald-500 text-white'
      }`}>
        {notification.type === 'error' ? <AlertTriangle size={20} /> : <CheckCircle2 size={20} />}
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">Système Sang-Vie</p>
        <p className="text-sm font-bold text-white">{notification.message}</p>
      </div>
      <button 
        onClick={() => setNotification({ ...notification, show: false })}
        className="ml-4 p-2 hover:bg-white/10 rounded-xl transition-colors text-white/20 hover:text-white"
      >
        <Trash2 size={16} />
      </button>
    </div>
  </div>
)}
  </div>
)}

        {/* 3. MODULE DE SORTIE */}
        {activeTab === 'mod-sortie' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl">
    <div className="mb-10">
      <h2 className="text-3xl font-bold text-white tracking-tight">Sortie de Stock</h2>
      <p className="text-white/20 text-sm mt-1 uppercase tracking-widest font-bold text-[10px]">
        Délivrance de produits sanguins pour transfusion
      </p>
    </div>

    <div className="grid grid-cols-3 gap-8">
      <div className="col-span-2 space-y-6">
        <div className="glass p-8 rounded-[2.5rem] border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 text-orange-400 flex items-center justify-center">
              <Search size={18} />
            </div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Sélectionner une unité</h3>
          </div>
          
          {/* BARRE DE RECHERCHE DYNAMIQUE */}
          <div className="relative group mb-6">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-red-500 transition-colors" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par ID (ex: #SV...)" 
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm font-bold text-white outline-none focus:border-red-500/50 transition-all" 
            />
          </div>

          <div className="mt-6 space-y-2 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
              <p className="text-[9px] font-bold text-white/10 uppercase tracking-widest ml-2 mb-3">Résultats</p>
              
              {filteredStocks.length > 0 ? filteredStocks.map((poche, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedPoche(poche)}
                  className={`flex items-center justify-between p-4 rounded-2xl transition-all cursor-pointer group border ${
                    selectedPoche?.id === poche.id 
                    ? 'bg-red-600/20 border-red-500' 
                    : 'bg-white/[0.02] border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-600/10 text-red-500 flex items-center justify-center font-bold text-xs">{poche.groupe}</div>
                    <div>
                      <p className="text-[11px] font-bold text-white/80">{poche.code_barre || poche.id}</p>
                      <p className="text-[9px] text-white/20 uppercase font-bold">Expiration : {poche.date_peremption}</p>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg text-[9px] font-bold uppercase tracking-widest transition-all ${
                    selectedPoche?.id === poche.id ? 'bg-red-600 text-white' : 'bg-white/5 text-white/40'
                  }`}>
                    {selectedPoche?.id === poche.id ? 'Sélectionné' : 'Choisir'}
                  </div>
                </div>
              )) : (
                <p className="text-center py-10 text-white/10 text-[10px] font-bold uppercase tracking-widest">Aucune poche disponible</p>
              )}
          </div>
        </div>
      </div>

      {/* DESTINATION (DYNAMISÉ) */}
      <div className="glass p-8 rounded-[2.5rem] border border-white/5 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <FileOutput size={18} />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Détails Sortie</h3>
        </div>
        
        <div className="space-y-6 flex-1">
          
          {selectedPoche && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 animate-in zoom-in-95 duration-300">
               <p className="text-[9px] font-bold text-white/20 uppercase mb-2">Poche sélectionnée</p>
               <p className="text-sm font-bold text-red-500">{selectedPoche.code_barre}</p>
               <p className="text-[10px] text-white/60">Groupe {selectedPoche.groupe}</p>
            </div>
          )}

          <div>
            <label className="block text-[10px] font-bold text-white/20 uppercase mb-3">Motif de Sortie</label>
            <select 
              value={sortieData.motif}
              onChange={(e) => setSortieData({...sortieData, motif: e.target.value})}
              className="w-full bg-[#0f0f0f] border border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold text-white/60 outline-none"
            >
              <option value="Transfusion Urgente">Transfusion Urgente</option>
              <option value="Transfert Inter-Hospitalier">Transfert Inter-Hospitalier</option>
              <option value="Péremption / Destruction">Péremption / Destruction</option>
            </select>
          </div>
          
          <div>
            <label className="block text-[10px] font-bold text-white/20 uppercase mb-3">Service Demandeur</label>
            <input 
              type="text" 
              placeholder="Ex: Réanimation / Urgences" 
              value={sortieData.service}
              onChange={(e) => setSortieData({...sortieData, service: e.target.value})}
              className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 text-[11px] font-bold text-white outline-none focus:border-blue-500/50" 
            />
          </div>

          <div className="pt-6 border-t border-white/5 mt-auto">
              <button 
                onClick={handleSortie}
                disabled={!selectedPoche}
                className={`w-full py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all shadow-lg ${
                  selectedPoche 
                  ? 'bg-red-600 hover:bg-red-700 text-white shadow-red-900/20' 
                  : 'bg-white/5 text-white/20 cursor-not-allowed'
                }`}
              >
                Valider la Sortie
              </button>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

        {/* 4. REGISTRE DES ENTRÉES */}
{activeTab === 'reg-entree' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex justify-between items-end mb-10">
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Registre des Entrées</h2>
        <p className="text-white/20 text-sm mt-1 uppercase tracking-widest font-bold text-[10px]">Historique exhaustif des réceptions</p>
      </div>
      <div className="flex gap-3">
        {/* BARRE DE RECHERCHE DYNAMIQUE */}
        <div className="glass px-4 py-2 rounded-xl border border-white/5 flex items-center gap-3 focus-within:border-blue-500/50 transition-all">
          <Search size={14} className="text-white/20" />
          <input 
            type="text" 
            placeholder="RECHERCHER ID OU GROUPE..." 
            value={regEntreeSearch}
            onChange={(e) => setRegEntreeSearch(e.target.value)}
            className="bg-transparent border-none outline-none text-[10px] font-bold text-white/60 uppercase w-48 placeholder:text-white/10" 
          />
        </div>
        <button className="glass px-4 py-2 rounded-xl border border-white/5 text-[10px] font-bold uppercase text-white/40 hover:text-white transition-all flex items-center gap-2 group">
          <FileOutput size={14} className="group-hover:text-blue-400" /> Exporter PDF
        </button>
      </div>
    </div>

    <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/[0.02] text-[9px] font-bold uppercase text-white/20 tracking-[0.2em] sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-6">Date Saisie</th>
              <th className="p-6">ID Poche</th>
              <th className="p-6">Type</th>
              <th className="p-6 text-center">Groupe</th>
              <th className="p-6">Provenance</th>
              <th className="p-6 text-right">Statut Initial</th>
            </tr>
          </thead>
          <tbody className="text-[10px] font-bold uppercase divide-y divide-white/5">
            {filteredRegEntree.length > 0 ? filteredRegEntree.map((row, i) => (
              <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
                <td className="p-6"><span className="text-white/80">{row.date_prelevement}</span></td>
                <td className="p-6 text-red-600 font-black tracking-tighter">{row.code_barre}</td>
                <td className="p-6 text-white/40">{row.type_produit || 'CGR'}</td>
                <td className="p-6 text-center">
                  <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60 group-hover:border-red-500/30 transition-all">
                    {row.groupe}
                  </span>
                </td>
                <td className="p-6 text-white/30 italic lowercase font-normal">Don Volontaire</td>
                <td className="p-6 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                    <span className="text-emerald-500">{row.status}</span>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan="6" className="p-20 text-center text-white/10 text-[10px] tracking-[0.5em] font-bold uppercase">
                  Aucun résultat trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}




      
        {/* 5. REGISTRE DES SORTIES */}
{activeTab === 'reg-sortie' && (
  <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="flex justify-between items-end mb-10">
      <div>
        <h2 className="text-3xl font-bold text-white tracking-tight">Registre des Sorties</h2>
        <p className="text-white/20 text-sm mt-1 uppercase tracking-widest font-bold text-[10px]">Historique des mouvements de stock sortants</p>
      </div>
      <button className="glass px-4 py-2 rounded-xl border border-white/5 text-[10px] font-bold uppercase text-white/40 hover:text-white transition-all flex items-center gap-2 group">
        <FileOutput size={14} className="group-hover:text-emerald-400 transition-colors" /> Rapport Mensuel
      </button>
    </div>

    <div className="glass rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
      <div className="max-h-[600px] overflow-y-auto custom-scrollbar">
        <table className="w-full text-left border-collapse">
          <thead className="bg-white/[0.02] text-[9px] font-bold uppercase text-white/20 tracking-[0.2em] sticky top-0 z-10 backdrop-blur-md">
            <tr>
              <th className="p-6">Date Sortie</th>
              <th className="p-6">ID Poche</th>
              <th className="p-6">Groupe</th>
              <th className="p-6">Motif</th>
              <th className="p-6">Service</th>
              <th className="p-6 text-right">Responsable</th>
            </tr>
          </thead>
          <tbody className="text-[10px] font-bold uppercase divide-y divide-white/5">
  {/* On vérifie si filteredRegSortie contient des données */}
  {filteredRegSortie.length > 0 ? (
    filteredRegSortie.map((row, i) => (
      <tr key={i} className="hover:bg-white/[0.01] transition-colors group">
        <td className="p-6 text-white/80">
          {new Date(row.updated_at).toLocaleDateString('fr-FR')} 
          <span className="text-[8px] opacity-30 ml-2 font-normal">
            {new Date(row.updated_at).toLocaleTimeString('fr-FR', {hour: '2-digit', minute:'2-digit'})}
          </span>
        </td>
        <td className="p-6 text-red-600 font-black tracking-tighter">{row.code_barre}</td>
        <td className="p-6 text-center">
          <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-white/60">
            {row.groupe}
          </span>
        </td>
        <td className="p-6">
          <div className="flex items-center gap-2">
            <div className={`w-1.5 h-1.5 rounded-full ${
              row.motif_sortie === 'Péremption / Destruction' ? 'bg-red-500 shadow-[0_0_8px_#ef4444]' : 
              row.motif_sortie === 'Transfert Inter-Hospitalier' ? 'bg-blue-400 shadow-[0_0_8px_#60a5fa]' : 
              'bg-emerald-500 shadow-[0_0_8px_#10b981]'
            }`} />
            <span className="text-white/60 normal-case">{row.motif_sortie || 'Sortie Standard'}</span>
          </div>
        </td>
        <td className="p-6 text-white/30 italic font-normal">
          {row.service_destinataire || 'Urgence / Bloc'}
        </td>
        <td className="p-6 text-right">
          <div className="flex items-center justify-end gap-2 text-[9px] text-white/40">
            <span className="uppercase tracking-tighter italic">
              {row.agent ? row.agent.name : 'Système'}
            </span>
            <div className="w-5 h-5 rounded-md bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-emerald-500/30 transition-colors">
              <CheckCircle2 size={10} className="text-emerald-500/40" />
            </div>
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" className="p-20 text-center text-white/10 text-[10px] tracking-[0.5em] font-bold uppercase">
        Aucun historique de sortie trouvé
      </td>
    </tr>
  )}
</tbody>
        </table>
      </div>
    </div>
  </div>
)}
      </main>
    </div>
  );
};

export default AgentDash;